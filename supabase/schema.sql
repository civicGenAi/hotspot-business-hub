-- Phase 1 — Supabase Schema (Foundation)

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. tenants
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid REFERENCES auth.users NOT NULL,
  business_name text,
  city text,
  country text,
  plan text DEFAULT 'starter',
  plan_expires_at timestamptz,
  radius_secret text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_owner UNIQUE (owner_id)
);

-- 2. portals
CREATE TABLE portals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  slug text UNIQUE,
  business_name text,
  logo_url text,
  bg_color text,
  button_color text,
  welcome_heading text,
  welcome_subtext text,
  collect_phone bool DEFAULT false,
  allow_self_purchase bool DEFAULT false,
  hide_branding bool DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. locations
CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text,
  city text,
  router_brand text,
  router_model text,
  router_ip text,
  router_port int DEFAULT 8728,
  router_username text,
  router_password text, -- Needs encryption logic in app
  status text DEFAULT 'offline',
  last_seen_at timestamptz,
  portal_id uuid REFERENCES portals(id),
  created_at timestamptz DEFAULT now()
);

-- Update tenants with optional radius_secret or other fields if needed

-- 4. voucher_plans
CREATE TABLE voucher_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text CHECK (type IN ('time', 'data', 'combo')),
  duration_minutes int,
  data_limit_mb int,
  speed_limit_mbps int,
  price_tzs int NOT NULL,
  simultaneous_devices int DEFAULT 1,
  mac_binding bool DEFAULT false,
  is_active bool DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 5. vouchers
CREATE TABLE vouchers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES voucher_plans(id) NOT NULL,
  location_id uuid REFERENCES locations(id),
  code text UNIQUE NOT NULL,
  status text DEFAULT 'unused' CHECK (status IN ('unused', 'active', 'expired', 'sold', 'revoked')),
  sold_at timestamptz,
  sold_to_phone text,
  activated_at timestamptz,
  expires_at timestamptz,
  data_used_mb int DEFAULT 0,
  payment_method text,
  payment_ref text,
  batch_id uuid,
  created_at timestamptz DEFAULT now()
);

-- 6. sessions
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  voucher_id uuid REFERENCES vouchers(id) NOT NULL,
  location_id uuid REFERENCES locations(id) NOT NULL,
  mac_address text,
  device_type text,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  data_used_mb int DEFAULT 0,
  disconnect_reason text,
  radius_session_id text,
  created_at timestamptz DEFAULT now()
);

-- 7. transactions
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  voucher_id uuid REFERENCES vouchers(id),
  amount_tzs int NOT NULL,
  payment_method text,
  provider_ref text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  customer_phone text,
  created_at timestamptz DEFAULT now()
);

-- 8. admin_tenants
CREATE TABLE admin_tenants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_admin_user UNIQUE (user_id)
);

-- Enable RLS on ALL tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE voucher_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_tenants ENABLE ROW LEVEL SECURITY;

-- Core RLS Policies

-- tenants: Users can see only their own tenant record
CREATE POLICY "tenant_isolation" ON tenants
FOR ALL USING (owner_id = auth.uid());

-- locations: Isolation by tenant_id lookup
CREATE POLICY "loc_isolation" ON locations
FOR ALL USING (tenant_id IN (SELECT id FROM tenants WHERE owner_id = auth.uid()));

-- voucher_plans: Isolation by tenant_id lookup
CREATE POLICY "plan_isolation" ON voucher_plans
FOR ALL USING (tenant_id IN (SELECT id FROM tenants WHERE owner_id = auth.uid()));

-- vouchers: Isolation by tenant_id lookup
CREATE POLICY "voucher_isolation" ON vouchers
FOR ALL USING (tenant_id IN (SELECT id FROM tenants WHERE owner_id = auth.uid()));

-- sessions: Isolation by tenant_id lookup
CREATE POLICY "session_isolation" ON sessions
FOR ALL USING (tenant_id IN (SELECT id FROM tenants WHERE owner_id = auth.uid()));

-- portals: Isolation by tenant_id lookup
CREATE POLICY "portal_isolation" ON portals
FOR ALL USING (tenant_id IN (SELECT id FROM tenants WHERE owner_id = auth.uid()));

-- transactions: Isolation by tenant_id lookup
CREATE POLICY "transaction_isolation" ON transactions
FOR ALL USING (tenant_id IN (SELECT id FROM tenants WHERE owner_id = auth.uid()));

-- admin_tenants: Only admins can see this
CREATE POLICY "admin_isolation" ON admin_tenants
FOR ALL USING (user_id = auth.uid());

-- Phase 9 — Admin SQL View
CREATE OR REPLACE VIEW admin_platform_stats AS
SELECT 
  COUNT(DISTINCT t.id) as total_tenants,
  COUNT(DISTINCT l.id) as total_locations,
  COUNT(DISTINCT s.id) FILTER (WHERE s.ended_at IS NULL) as active_sessions,
  SUM(tx.amount_tzs) FILTER (WHERE tx.created_at > now() - interval '30d') as mrr_tzs
FROM tenants t
LEFT JOIN locations l ON l.tenant_id = t.id
LEFT JOIN sessions s ON s.tenant_id = t.id  
LEFT JOIN transactions tx ON tx.tenant_id = t.id;
