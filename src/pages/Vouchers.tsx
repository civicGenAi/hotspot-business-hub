import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Search, Copy, Share2, Ban, Plus, Filter, Loader2 } from 'lucide-react';
import { usePlans, useVouchers } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  active: 'bg-success/20 text-success',
  unused: 'bg-primary/20 text-primary',
  expired: 'bg-muted text-muted-foreground',
  sold: 'bg-warning/20 text-warning',
  revoked: 'bg-destructive/20 text-destructive',
};

const Vouchers = () => {
  const [tab, setTab] = useState<'plans' | 'generate' | 'all'>('all');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  // Generation State
  const [genPlanId, setGenPlanId] = useState('');
  const [genQuantity, setGenQuantity] = useState(10);
  const [genPrefix, setGenPrefix] = useState('');

  const { tenant } = useAuth();
  const queryClient = useQueryClient();

  const { data: plans = [], isLoading: plansLoading } = usePlans();
  const { data: vouchers = [], isLoading: vouchersLoading } = useVouchers(filter);

  // Set default plan for generation when plans load
  useEffect(() => {
    if (plans.length > 0 && !genPlanId) {
      setGenPlanId(plans[0].id);
    }
  }, [plans, genPlanId]);

  const generateMutation = useMutation({
    mutationFn: async () => {
      if (!tenant) throw new Error("No tenant found");
      const { data, error } = await supabase.functions.invoke('generate-vouchers', {
        body: {
          tenant_id: tenant.id,
          plan_id: genPlanId,
          quantity: genQuantity,
          prefix: genPrefix,
        }
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Vouchers generated successfully!");
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      setTab('all');
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to generate vouchers");
    }
  });

  const filtered = vouchers.filter((v: any) => {
    if (search && !v.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Vouchers</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage plans, generate, and track vouchers</p>
        </div>
        <button className="gradient-bg text-primary-foreground px-4 py-2 rounded-xl font-display font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/30 p-1 rounded-xl w-fit">
        {(['plans', 'generate', 'all'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t ? 'gradient-bg text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'all' ? 'All Vouchers' : t}
          </button>
        ))}
      </div>

      {tab === 'plans' && (
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              className="glass-card p-5 gradient-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-foreground">{p.name}</h3>
                <div className="w-10 h-5 rounded-full bg-success/30 flex items-center justify-end px-0.5">
                  <div className="w-4 h-4 rounded-full bg-success" />
                </div>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p>{p.duration_minutes} min · {p.data_limit_mb}MB · {p.speed_limit_mbps} Mbps</p>
                <p className="font-display font-bold text-primary text-lg">TZS {(p.price_tzs || 0).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-muted/20">
                  <p className="text-xs text-muted-foreground">Sold</p>
                  <p className="font-display font-bold text-foreground text-sm">{p.sold}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/20">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="font-display font-bold text-foreground text-sm">{(p.revenue/1000).toFixed(0)}k</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/20">
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="font-display font-bold text-foreground text-sm">{p.activeSessions}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'all' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {['all', 'unused', 'active', 'expired', 'sold'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  filter === f ? 'gradient-bg text-primary-foreground' : 'bg-muted/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by code..."
              className="input-dark w-full pl-10"
            />
          </div>

          {/* Voucher list */}
          <div className="space-y-2">
            {filtered.map((v, i) => (
              <motion.div
                key={v.id}
                className="glass-card p-4 flex items-center gap-4 flex-wrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Ticket className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1 min-w-[120px]">
                  <p className="font-mono text-sm font-semibold text-foreground">{v.code}</p>
                  <p className="text-xs text-muted-foreground">{v.planName} · TZS {v.price.toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[v.status]}`}>
                  {v.status === 'active' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse mr-1.5" />}
                  {v.status}
                </span>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === 'generate' && (
        <motion.div
          className="glass-card p-6 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-display font-bold text-foreground mb-4">Generate Vouchers</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Select Plan</label>
              <select 
                value={genPlanId} 
                onChange={e => setGenPlanId(e.target.value)}
                className="input-dark w-full"
              >
                {plans.map((p: any) => <option key={p.id} value={p.id}>{p.name} — TZS {(p.price_tzs || 0).toLocaleString()}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setGenQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg border border-white/10 text-foreground font-bold hover:bg-muted/30 transition-all">−
                </button>
                <input 
                  type="number" 
                  value={genQuantity} 
                  onChange={e => setGenQuantity(parseInt(e.target.value) || 1)}
                  className="input-dark w-20 text-center" 
                />
                <button 
                  onClick={() => setGenQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-lg border border-white/10 text-foreground font-bold hover:bg-muted/30 transition-all">+
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Code Prefix (optional)</label>
              <input 
                value={genPrefix}
                onChange={e => setGenPrefix(e.target.value)}
                placeholder="e.g. VIP-" 
                className="input-dark w-full" 
              />
            </div>
            <button 
              onClick={() => generateMutation.mutate()}
              disabled={generateMutation.isPending || !genPlanId}
              className="w-full gradient-bg text-primary-foreground py-3 rounded-xl font-display font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {generateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Generate Vouchers
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Vouchers;
