import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Share2, Printer, MessageSquare, X, Wifi, QrCode, Loader2 } from 'lucide-react';
import { usePlans } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const QuickSell = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const { tenant } = useAuth();
  const queryClient = useQueryClient();
  const { data: plans = [], isLoading } = usePlans();

  const sellMutation = useMutation({
    mutationFn: async () => {
      if (!tenant) throw new Error("No tenant found");
      const { data, error } = await supabase.functions.invoke('sell-voucher', {
        body: {
          tenant_id: tenant.id,
          plan_id: selectedPlan,
          payment_method: paymentMethod,
          phone: phone
        }
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setGeneratedCode(data.code);
      setShowSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success("Voucher sold!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to sell voucher");
    }
  });

  const handleSell = () => {
    sellMutation.mutate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const plan = plans.find((p: any) => p.id === selectedPlan);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Quick Sell</h1>
        <p className="text-muted-foreground text-sm mt-1">Sell a voucher in seconds</p>
      </motion.div>

      {/* Plan selector */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-sm font-medium text-foreground mb-3">Select Plan</p>
        <div className="grid grid-cols-2 gap-3">
          {plans.map((p: any) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              className={`glass-card p-4 text-left transition-all relative ${
                selectedPlan === p.id ? 'ring-2 ring-primary' : 'hover:border-white/10'
              }`}
            >
              {selectedPlan === p.id && <Check className="w-4 h-4 text-primary absolute top-2 right-2" />}
              <p className="font-display font-bold text-foreground text-sm">{p.name}</p>
              <p className="text-muted-foreground text-xs mt-1">{p.duration_minutes} min · {p.data_limit_mb} MB</p>
              <p className="text-muted-foreground text-xs">{p.speed_limit_mbps} Mbps</p>
              <p className="font-display font-bold text-primary text-lg mt-2">TZS {(p.price_tzs || 0).toLocaleString()}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Payment method */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className="text-sm font-medium text-foreground mb-3">Payment Method</p>
        <div className="flex gap-3">
          {['cash', 'mpesa', 'airtel'].map(m => (
            <button
              key={m}
              onClick={() => setPaymentMethod(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                paymentMethod === m ? 'gradient-bg text-primary-foreground' : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {m === 'mpesa' ? 'M-Pesa' : m === 'airtel' ? 'Airtel' : 'Cash'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-sm font-medium text-foreground mb-1.5">Customer Phone (optional)</p>
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+255 7XX XXX XXX"
          className="input-dark w-full"
        />
      </motion.div>

      {/* Sell button */}
      <motion.button
        onClick={handleSell}
        disabled={!selectedPlan || sellMutation.isPending}
        className="w-full gradient-bg text-primary-foreground py-4 rounded-xl font-display font-bold text-lg hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
      >
        {sellMutation.isPending ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          `Sell Now — TZS ${plan ? (plan.price_tzs || 0).toLocaleString() : ''}`
        )}
      </motion.button>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && plan && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md glass-card p-6 rounded-2xl border-2 border-dashed border-primary/30 relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <button onClick={() => { setShowSuccess(false); setSelectedPlan(''); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-success" />
                </motion.div>
                <h2 className="font-display text-xl font-bold text-foreground">Voucher Sold! 🎉</h2>
              </div>

              <div className="text-center mb-6 p-4 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Voucher Code</p>
                <p className="font-mono text-2xl font-bold text-primary tracking-wider">{generatedCode}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-muted-foreground text-xs">Plan</p>
                  <p className="text-foreground font-medium">{plan.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-muted-foreground text-xs">Price</p>
                  <p className="text-foreground font-medium">TZS {(plan.price_tzs || 0).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-muted-foreground text-xs">Duration</p>
                  <p className="text-foreground font-medium">{plan.duration_minutes} min</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-muted-foreground text-xs">Data</p>
                  <p className="text-foreground font-medium">{plan.data_limit_mb} MB</p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-xl bg-muted/30 flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleCopy} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-sm font-medium text-foreground hover:bg-muted/30 transition-all">
                  {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-sm font-medium text-foreground hover:bg-muted/30 transition-all">
                  <Share2 className="w-4 h-4" /> WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-sm font-medium text-foreground hover:bg-muted/30 transition-all">
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-sm font-medium text-foreground hover:bg-muted/30 transition-all">
                  <MessageSquare className="w-4 h-4" /> SMS
                </button>
              </div>

              <button
                onClick={() => { setShowSuccess(false); setSelectedPlan(''); }}
                className="w-full mt-4 gradient-bg text-primary-foreground py-3 rounded-xl font-display font-semibold"
              >
                Sell Another
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickSell;
