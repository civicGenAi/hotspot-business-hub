import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Palette, Type, Image as ImageIcon, Settings, Save, Eye, CheckCircle2, Wifi } from 'lucide-react';

const Portal = () => {
  const [businessName, setBusinessName] = useState('Mama Ntilie Wi-Fi');
  const [welcomeMsg, setWelcomeMsg] = useState('Welcome to our hotspot! Enjoy high-speed internet while you dine.');
  const [accentColor, setAccentColor] = useState('hsl(186 100% 45%)');
  const [showTerms, setShowTerms] = useState(true);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Captive Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Customize your Wi-Fi login experience</p>
        </div>
        <button className="gradient-bg text-primary-foreground px-4 py-2 rounded-xl font-display font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Settings Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-display font-bold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" /> General Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Business Name</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-dark w-full pl-10" 
                    placeholder="Enter your business name"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Welcome Message</label>
                <textarea 
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                  className="input-dark w-full min-h-[100px] py-3" 
                  placeholder="Welcome message for your customers..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={accentColor.startsWith('hsl') ? '#00e5ff' : accentColor} 
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer"
                    />
                    <span className="text-xs font-mono text-muted-foreground">#00E5FF</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <button 
                    onClick={() => setShowTerms(!showTerms)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${showTerms ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                      animate={{ x: showTerms ? 20 : 0 }}
                    />
                  </button>
                  <span className="text-xs font-medium text-foreground">Require Terms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="font-display font-bold text-foreground flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-secondary" /> Branding Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground text-center">UPLOAD LOGO</p>
                <p className="text-[8px] text-muted-foreground/60">SVG, PNG or JPG</p>
              </div>
              <div className="border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground text-center">BACKGROUND</p>
                <p className="text-[8px] text-muted-foreground/60">High-res image</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center sticky top-20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Live Preview</span>
          </div>

          {/* Phone Mockup */}
          <div className="w-[300px] h-[600px] border-[8px] border-white/10 rounded-[40px] bg-sidebar relative shadow-2xl overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/10 rounded-b-2xl z-20" />
            
            {/* Screen Content */}
            <div className="h-full bg-background flex flex-col p-6 text-center animate-in fade-in duration-700">
              <div className="mt-12 flex justify-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl" style={{ background: accentColor }}>
                  <Wifi className="w-8 h-8 text-black" />
                </div>
              </div>

              <h2 className="font-display text-xl font-bold text-foreground mt-6">{businessName}</h2>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                {welcomeMsg}
              </p>

              <div className="mt-8 space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Voucher Code</label>
                  <input 
                    readOnly 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" 
                    placeholder="Enter Code (e.g. HH-4829)"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-display font-bold text-sm text-black shadow-lg"
                  style={{ background: accentColor }}
                >
                  Connect Now
                </motion.button>
              </div>

              <div className="mt-auto pb-4">
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span className="text-[10px] text-muted-foreground">High Speed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span className="text-[10px] text-muted-foreground">Safe VPN</span>
                  </div>
                </div>
                {showTerms && (
                  <p className="text-[9px] text-muted-foreground/60">
                    By connecting, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-6 flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> Preview scale: 1:1 Mobile View
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Portal;
