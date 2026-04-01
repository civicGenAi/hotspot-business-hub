import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Eye, EyeOff } from 'lucide-react';
import { GradientOrbs } from '@/components/GradientOrbs';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left brand panel - desktop only */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden noise-overlay">
        <GradientOrbs />
        <div className="relative z-10 text-center px-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <Wifi className="w-20 h-20 text-primary mx-auto mb-6" />
          </motion.div>
          <h2 className="font-display text-4xl font-bold gradient-text mb-4">HotspotHive</h2>
          <p className="text-muted-foreground text-lg">Turn your WiFi into a business</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Wifi className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground text-lg">HotspotHive</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-dark w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-dark w-full pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="rounded border-white/10" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full gradient-bg text-primary-foreground py-3 rounded-xl font-display font-semibold hover:opacity-90 transition-all hover:scale-[1.02]">
              Sign In
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account? <a href="/register" className="text-primary hover:underline">Register</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
