import { motion } from 'framer-motion';
import { MapPin, Router, Activity, Signal, Plus, MoreVertical, Globe, HardDrive, Loader2 } from 'lucide-react';
import { useLocations } from '@/hooks/useSupabaseData';

const Locations = () => {
  const { data: locations = [], isLoading } = useLocations();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Locations & Routers</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your hotspot network infrastructure</p>
        </div>
        <button className="gradient-bg text-primary-foreground px-4 py-2 rounded-xl font-display font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" /> Add Router
        </button>
      </motion.div>

      <div className="grid gap-4">
        {locations.length === 0 && (
          <div className="glass-card p-12 text-center border-dashed">
            <Router className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-bold text-foreground">No Routers Connected</h3>
            <p className="text-muted-foreground text-sm mt-1">Add your first MikroTik router to start selling vouchers.</p>
          </div>
        )}
        {locations.map((loc: any, i) => (
          <motion.div
            key={loc.id}
            className="glass-card p-5 gradient-border relative overflow-hidden group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2 }}
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${loc.status === 'online' ? 'bg-success' : 'bg-destructive'}`} />

            <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
              {/* Status Icon */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${loc.status === 'online' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                  <Router className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                    {loc.name}
                    <span className={`w-2 h-2 rounded-full ${loc.status === 'online' ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {loc.city} · {loc.address}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 md:py-0 border-y md:border-y-0 md:border-x border-white/5 md:px-6">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Status</p>
                  <p className={`text-sm font-bold capitalize ${loc.status === 'online' ? 'text-success' : 'text-destructive'}`}>
                    {loc.status || 'Offline'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Active Clients</p>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-primary" />
                    <p className="text-sm font-bold text-foreground">0</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Last Seen</p>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-3 h-3 text-secondary" />
                    <p className="text-sm font-bold text-foreground truncate">{loc.last_seen_at ? new Date(loc.last_seen_at).toLocaleTimeString() : 'Never'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Model</p>
                  <p className="text-sm font-bold text-foreground truncate">{loc.router_model || 'Generic'}</p>
                </div>
              </div>

              {/* Network Details */}
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-mono text-muted-foreground">{loc.router_ip}</p>
                  <div className="flex justify-end gap-0.5 mt-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step} 
                        className={`w-1 h-3 rounded-full ${step <= 3 ? 'bg-primary' : 'bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>
                <button className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors group-hover:bg-white/10">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 bg-primary/5 border-primary/20"
      >
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-foreground">Need help connecting a new router?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              HotspotHive works best with MikroTik routers. Our automatic configuration script 
              setting up your captive portal and voucher system takes less than 2 minutes.
            </p>
            <button className="text-primary text-sm font-semibold mt-3 hover:underline">
              View setup guide →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ClockIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default Locations;
