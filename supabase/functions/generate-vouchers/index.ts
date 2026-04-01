import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function generateCode(length = 8, prefix = '') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // No I, O, 0, 1 for clarity
  let result = prefix
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
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

    const { plan_id, quantity, prefix, tenant_id } = await req.json()

    if (!plan_id || !quantity || !tenant_id) {
      throw new Error('Missing required parameters')
    }

    const batch_id = crypto.randomUUID()
    const vouchersToInsert = []

    for (let i = 0; i < quantity; i++) {
      vouchersToInsert.push({
        tenant_id,
        plan_id,
        code: generateCode(8, prefix),
        batch_id,
        status: 'unused'
      })
    }

    const { data, error } = await supabaseClient
      .from('vouchers')
      .insert(vouchersToInsert)
      .select()

    if (error) throw error

    return new Response(JSON.stringify({ success: true, count: data.length, batch_id }), {
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
