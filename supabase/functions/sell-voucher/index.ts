import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { plan_id, payment_method, phone, tenant_id } = await req.json()

    if (!plan_id || !payment_method || !tenant_id) {
      throw new Error('Missing required parameters')
    }

    // 1. Find an available voucher for this plan
    const { data: voucher, error: fetchError } = await supabaseClient
      .from('vouchers')
      .select('id, code')
      .eq('tenant_id', tenant_id)
      .eq('plan_id', plan_id)
      .eq('status', 'unused')
      .limit(1)
      .single()

    if (fetchError || !voucher) {
      throw new Error('No available vouchers for this plan. Please generate more.')
    }

    // 2. Fetch plan price
    const { data: plan, error: planError } = await supabaseClient
      .from('voucher_plans')
      .select('price_tzs')
      .eq('id', plan_id)
      .single()

    if (planError) throw planError

    // 3. Mark as sold and create transaction
    // Note: We use individual calls here, but in a real production PG function (RPC) is better for atomic transactions.
    // For this demonstration, we'll do it sequentially.
    
    const { error: updateError } = await supabaseClient
      .from('vouchers')
      .update({ 
        status: 'sold', 
        sold_at: new Date().toISOString(),
        sold_to_phone: phone,
        payment_method: payment_method
      })
      .eq('id', voucher.id)

    if (updateError) throw updateError

    const { error: txError } = await supabaseClient
      .from('transactions')
      .insert({
        tenant_id,
        voucher_id: voucher.id,
        amount_tzs: plan.price_tzs,
        payment_method,
        status: 'completed',
        customer_phone: phone
      })

    if (txError) throw txError

    return new Response(JSON.stringify({ 
      success: true, 
      voucher_id: voucher.id, 
      code: voucher.code 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
