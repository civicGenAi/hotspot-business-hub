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

    const { user_id, business_name, city, country, plan, phone } = await req.json()

    // 1. Create Tenant
    const { data: tenant, error: tenantError } = await supabaseClient
      .from('tenants')
      .insert({
        owner_id: user_id,
        business_name,
        city,
        country,
        plan
      })
      .select()
      .single()

    if (tenantError) throw tenantError

    // 2. Create Default Portal
    const slug = business_name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 7)
    const { error: portalError } = await supabaseClient
      .from('portals')
      .insert({
        tenant_id: tenant.id,
        business_name,
        slug,
        welcome_heading: `Welcome to ${business_name}`,
        welcome_subtext: 'Enjoy our high-speed hotspot service.'
      })

    if (portalError) throw portalError

    return new Response(JSON.stringify({ success: true, tenant_id: tenant.id }), {
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
