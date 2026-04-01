import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function usePlans() {
  return useQuery({
    queryKey: ['voucher_plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('voucher_plans')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    },
  });
}

export function useVouchers(filter?: string) {
  return useQuery({
    queryKey: ['vouchers', filter],
    queryFn: async () => {
      let query = supabase.from('vouchers').select('*, plan:voucher_plans(name, price_tzs)');
      
      if (filter && filter !== 'all') {
        query = query.eq('status', filter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map(v => ({
        ...v,
        planName: (v.plan as any)?.name,
        price: (v.plan as any)?.price_tzs
      }));
    },
  });
}

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('*, voucher:vouchers(code, plan:voucher_plans(name))')
        .order('started_at', { ascending: false });
      
      if (error) throw error;
      return data.map(s => ({
        ...s,
        voucherCode: (s.voucher as any)?.code,
        planName: (s.voucher as any)?.plan?.name
      }));
    },
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*, voucher:vouchers(plan:voucher_plans(name))')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data.map(t => ({
        ...t,
        planName: (t.voucher as any)?.plan?.name
      }));
    },
  });
}

export function usePortal() {
  return useQuery({
    queryKey: ['portal'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portals')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // Allow empty if not found
      return data;
    },
  });
}
