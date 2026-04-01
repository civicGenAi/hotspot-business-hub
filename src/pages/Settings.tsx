import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Globe, Mail, Phone, Shield, Trash2, Camera, Save, CheckCircle2 } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences</p>
        </div>
        <button className="gradient-bg text-primary-foreground px-6 py-2 rounded-xl font-display font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/30 p-1 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'gradient-bg text-primary-foreground shadow-lg' 
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Profile Hero */}
            <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative group cursor-pointer shrink-0">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-[20px] bg-sidebar flex items-center justify-center text-3xl font-bold text-foreground overflow-hidden">
                    MN
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display text-2xl font-bold text-foreground">Mama Ntilie</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Mail className="w-3 h-3" /> hello@mamantilie.com
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" /> +255 712 345 678
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe className="w-3 h-3" /> Arusha, Tanzania
                  </div>
                </div>
              </div>

              <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-foreground hover:bg-white/10 transition-all shrink-0">
                Edit Avatar
              </button>
            </div>

            {/* Profile Fields */}
            <div className="glass-card p-6 grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                <input className="input-dark w-full" defaultValue="Mama Ntilie Business" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Official Email</label>
                <input className="input-dark w-full" defaultValue="hello@mamantilie.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                <input className="input-dark w-full" defaultValue="+255 712 345 678" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Language</label>
                <select className="input-dark w-full">
                  <option>English (United States)</option>
                  <option>Swahili (Tanzania)</option>
                  <option>French (France)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 space-y-6">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Password & Authentication
              </h3>
              
              <div className="space-y-4 max-w-sm">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Current Password</label>
                  <input type="password" placeholder="••••••••••••" className="input-dark w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">New Password</label>
                  <input type="password" placeholder="••••••••••••" className="input-dark w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••••••" className="input-dark w-full" />
                </div>
                <button className="text-primary text-xs font-bold hover:underline">Forgotten your password?</button>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Protect your account with an extra layer of security.</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest">Enable 2FA</button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 border-destructive/20">
              <h3 className="font-display font-bold text-destructive flex items-center gap-2 mb-2">
                <Trash2 className="w-4 h-4" /> Danger Zone
              </h3>
              <p className="text-xs text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-4 py-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold hover:bg-destructive/20 transition-all">
                Delete My Account
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 space-y-6"
          >
            <h3 className="font-display font-bold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4 text-warning" /> Notification Preferences
            </h3>

            <div className="space-y-1 mt-6">
              {[
                { title: 'Voucher Sold Alerts', desc: 'Receive a notification every time a voucher is sold.', default: true },
                { title: 'Router Offline Alerts', desc: 'Get notified immediately if a router goes offline.', default: true },
                { title: 'New Device Connected', desc: 'Alert when a new device connects to your network.', default: false },
                { title: 'Billing & Subscriptions', desc: 'Invoices, payment reminders and plan changes.', default: true },
                { title: 'Marketing & Tips', desc: 'Get insights on how to grow your business.', default: false },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button 
                    className={`w-12 h-6 rounded-full relative transition-colors ${item.default ? 'bg-success' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.default ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="text-[10px] font-medium">All settings are automatically encrypted and stored securely.</span>
      </div>
    </div>
  );
};

export default Settings;
