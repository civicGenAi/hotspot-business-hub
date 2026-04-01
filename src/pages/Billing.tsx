import { motion } from 'framer-motion';
import { CreditCard, Receipt, ShieldCheck, TrendingUp, Zap, Download, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { useTransactions } from '@/hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';

const Billing = () => {
  const { tenant, loading: authLoading } = useAuth();
  const { data: transactions = [], isLoading: txLoading } = useTransactions();

  if (authLoading || txLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const planName = tenant?.plan ? (tenant.plan.charAt(0).toUpperCase() + tenant.plan.slice(1) + ' Business') : 'Starter Business';
  const planPrice = tenant?.plan === 'pro' ? 25000 : 0;
  const nextBilling = tenant?.plan_expires_at ? new Date(tenant.plan_expires_at).toLocaleDateString() : 'N/A';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Billing & Subscription</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your plan and payment methods</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card p-8 bg-primary/5 border-primary/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-32 h-32 text-primary -mr-8 -mt-8 rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">CURRENT PLAN</span>
                <h2 className="font-display text-2xl font-bold text-foreground">{planName}</h2>
              </div>
              <span className="ml-auto px-3 py-1 bg-success/20 text-success rounded-full text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pricing</p>
                <p className="text-xl font-display font-bold text-foreground">TZS {planPrice.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Next Billing Date</p>
                <p className="text-lg font-display font-bold text-foreground">{nextBilling}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-muted-foreground">VISA</div>
                  <p className="text-sm font-bold text-foreground">•••• 4242</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="gradient-bg px-6 py-2.5 rounded-xl text-primary-foreground font-display font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                Upgrade to Enterprise
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground font-display font-bold text-sm hover:bg-white/10 transition-all">
                Cancel Subscription
              </button>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-secondary" /> Wallet
            </h3>
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-black text-white">VISA</div>
                <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              <p className="text-sm font-mono text-foreground tracking-widest">•••• •••• •••• 4242</p>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider font-bold">Expires 09/26</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-[10px] font-black text-white">M-PESA</div>
              </div>
              <p className="text-sm font-mono text-foreground tracking-widest">+255 712 ••• •••</p>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider font-bold">Primary Mobile Money</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-warning/10 border border-warning/20 flex gap-3">
            <AlertCircle className="w-4 h-4 text-warning shrink-0" />
            <p className="text-[10px] text-warning-foreground leading-relaxed">
              Auto-renewal is enabled. Your primary VISA card will be charged on the next billing date.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Invoice History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            <Receipt className="w-4 h-4 text-primary" /> Recent Transactions
          </h3>
          <button className="text-xs font-bold text-primary hover:underline">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2">
                <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date</th>
                <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Item</th>
                <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Amount</th>
                <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx: any, i: number) => (
                <tr key={tx.id} className="hover:bg-white/2 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-medium text-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.id.slice(0, 8)}</p>
                  </td>
                  <td className="p-4 text-sm text-foreground">{tx.planName || 'Voucher Sale'}</td>
                  <td className="p-4 text-sm font-bold text-foreground">TZS {(tx.amount_tzs || 0).toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-success/20 text-success rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground text-sm">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 py-4">
        <ShieldCheck className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Secure billing powered by HotspotHive Payments API. Your data is encrypted.</span>
      </div>
    </div>
  );
};

export default Billing;
