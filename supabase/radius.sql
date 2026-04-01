-- Phase 4 — RADIUS Server Setup (Supabase SQL Functions)

-- radius_auth: Simple function for FreeRADIUS to verify credentials
-- FreeRADIUS will call this: SELECT count(*) FROM radius_auth('code', 'mac_address')
CREATE OR REPLACE FUNCTION radius_auth(p_code text, p_mac text DEFAULT NULL)
RETURNS TABLE (auth_status boolean, reason text) AS $$
DECLARE
  v_voucher_id uuid;
  v_status text;
  v_expires_at timestamptz;
BEGIN
  -- 1. Find voucher
  SELECT id, status, expires_at INTO v_voucher_id, v_status, v_expires_at
  FROM vouchers
  WHERE code = p_code;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Voucher code not found';
    RETURN;
  END IF;

  -- 2. Check if unused
  IF v_status = 'unused' THEN
    -- First time use: Activate it
    UPDATE vouchers 
    SET status = 'active', activated_at = now()
    WHERE id = v_voucher_id;
    RETURN QUERY SELECT true, 'Voucher activated';
    RETURN;
  END IF;

  -- 3. Check if active and not expired
  IF v_status = 'active' THEN
    IF v_expires_at IS NOT NULL AND v_expires_at < now() THEN
      UPDATE vouchers SET status = 'expired' WHERE id = v_voucher_id;
      RETURN QUERY SELECT false, 'Voucher expired';
    ELSE
      RETURN QUERY SELECT true, 'Voucher active';
    END IF;
    RETURN;
  END IF;

  RETURN QUERY SELECT false, 'Voucher status: ' || v_status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- radius_acct: Function to update accounting data (bandwidth/time)
CREATE OR REPLACE FUNCTION radius_acct(
  p_code text, 
  p_session_id text, 
  p_data_used_mb int, 
  p_disconnect_reason text DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_voucher_id uuid;
  v_tenant_id uuid;
BEGIN
  SELECT id, tenant_id INTO v_voucher_id, v_tenant_id FROM vouchers WHERE code = p_code;
  
  IF FOUND THEN
    -- Update session record
    INSERT INTO sessions (tenant_id, voucher_id, radius_session_id, data_used_mb, disconnect_reason)
    VALUES (v_tenant_id, v_voucher_id, p_session_id, p_data_used_mb, p_disconnect_reason)
    ON CONFLICT (radius_session_id) DO UPDATE 
    SET data_used_mb = p_data_used_mb, 
        ended_at = CASE WHEN p_disconnect_reason IS NOT NULL THEN now() ELSE NULL END;

    -- Update total usage in voucher
    UPDATE vouchers 
    SET data_used_mb = data_used_mb + p_data_used_mb
    WHERE id = v_voucher_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
