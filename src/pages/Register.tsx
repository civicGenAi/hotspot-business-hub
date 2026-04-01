import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Eye, EyeOff, Check, ChevronRight, ChevronLeft, Router, Circle } from 'lucide-react';
import { GradientOrbs } from '@/components/GradientOrbs';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const steps = ['Account', 'Business', 'Router', 'Plan'];

const Register = () => {
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
    country: 'Tanzania',
    city: '',
  });

  const [selectedRouter, setSelectedRouter] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const navigate = useNavigate();

  const routers = [
    { id: 'mikrotik', name: 'MikroTik', recommended: true },
    { id: 'openwrt', name: 'OpenWRT' },
    { id: 'ubiquiti', name: 'Ubiquiti UniFi' },
    { id: 'other', name: 'Other / Later' },
  ];

  const plans = [
    { id: 'starter', name: 'Starter', price: 'Free', desc: '1 router, 50 vouchers/mo' },
    { id: 'pro', name: 'Pro', price: 'TZS 25,000/mo', desc: '3 routers, unlimited', popular: true },
    { id: 'business', name: 'Business', price: 'TZS 75,000/mo', desc: 'Unlimited everything' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Registration failed");

      // 2. Initialise tenant via Edge Function
      // Calling 'create-tenant' edge function
      const { error: funcError } = await supabase.functions.invoke('create-tenant', {
        body: {
          user_id: authData.user.id,
          business_name: formData.businessName,
          city: formData.city,
          country: formData.country,
          plan: selectedPlan,
          phone: formData.phone
        }
      });

      if (funcError) {
        console.error("Edge function error:", funcError);
        // We continue anyway if auth succeeded, but warn
        toast.warning("Account created, but tenant initialization had an issue. Please contact support.");
      } else {
        toast.success("Account created successfully!");
      }

      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden noise-overlay">
      <GradientOrbs />
      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
            <Wifi className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground text-lg">HotspotHive</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display transition-all ${
                i < step ? 'gradient-bg text-primary-foreground' : i === step ? 'ring-2 ring-primary text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'gradient-bg' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>

        <div className="glass-card p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Create your account</h2>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="you@example.com" className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+255 7XX XXX XXX" className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                  <div className="relative">
                    <input name="password" value={formData.password} onChange={handleInputChange} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-dark w-full pr-10" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Business info</h2>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Business / Hotspot Name</label>
                  <input name="businessName" value={formData.businessName} onChange={handleInputChange} placeholder='e.g. "Mama Ntilie WiFi"' className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Country</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} className="input-dark w-full">
                    <option>Tanzania</option><option>Kenya</option><option>Uganda</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">City / Region</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} placeholder="Arusha" className="input-dark w-full" />
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">What router are you using?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {routers.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRouter(r.id)}
                      className={`glass-card p-4 text-center transition-all relative ${
                        selectedRouter === r.id ? 'ring-2 ring-primary' : 'hover:border-white/10'
                      }`}
                    >
                      {r.recommended && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Recommended</span>}
                      <Router className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-display font-semibold text-foreground text-sm">{r.name}</p>
                      {selectedRouter === r.id && <Check className="w-4 h-4 text-primary absolute top-2 right-2" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Choose your plan</h2>
                <div className="space-y-3">
                  {plans.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`w-full glass-card p-4 text-left transition-all flex items-center justify-between ${
                        selectedPlan === p.id ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-display font-bold text-foreground">{p.name}</p>
                          {p.popular && <span className="text-[10px] gradient-bg text-primary-foreground px-2 py-0.5 rounded-full">Popular</span>}
                        </div>
                        <p className="text-muted-foreground text-sm">{p.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-foreground">{p.price}</p>
                        {selectedPlan === p.id && <Check className="w-4 h-4 text-primary ml-auto mt-1" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-4 py-3 rounded-xl border border-white/10 text-foreground font-display font-semibold text-sm hover:border-primary/50 transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(step + 1) : handleFinish()}
              disabled={loading}
              className="flex-1 gradient-bg text-primary-foreground py-3 rounded-xl font-display font-semibold hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center gap-1 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : step < 3 ? (
                <>Next <ChevronRight className="w-4 h-4" /></>
              ) : (
                'Create My Account'
              )}
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account? <a href="/login" className="text-primary hover:underline">Sign in</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
