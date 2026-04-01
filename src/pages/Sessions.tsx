import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Wifi, X as XIcon, Clock, Activity } from 'lucide-react';
import { sessions } from '@/data/mockData';

const deviceIcons: Record<string, React.ComponentType<any>> = {
  smartphone: Smartphone,
  laptop: Laptop,
};

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const Sessions = () => {
  const [time, setTime] = useState(0);
  const activeSessions = sessions.filter(s => s.status === 'active');
  const expiredSessions = sessions.filter(s => s.status === 'expired');

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Sessions Monitor</h1>
        <p className="text-muted-foreground text-sm mt-1">Track live connections in real-time</p>
      </motion.div>

      {/* Summary */}
      <div className="flex gap-4 flex-wrap">
        <div className="glass-card px-4 py-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-foreground font-medium">{activeSessions.length} Active Now</span>
        </div>
        <div className="glass-card px-4 py-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{sessions.length} Today</span>
        </div>
      </div>

      {/* Active sessions */}
      <div>
        <h3 className="font-display font-bold text-foreground mb-3">Active Sessions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {activeSessions.map((s, i) => {
            const DeviceIcon = deviceIcons[s.deviceType] || Wifi;
            const remaining = Math.max(0, s.timeRemaining - time);
            const dataPercent = (s.dataUsed / s.dataLimit) * 100;

            return (
              <motion.div
                key={s.id}
                className="glass-card p-5 gradient-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center">
                      <DeviceIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{s.device}</p>
                      <p className="text-xs text-muted-foreground font-mono">{s.mac}</p>
                    </div>
                  </div>
                  <button className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors">
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="text-sm font-medium text-foreground">{s.plan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Voucher</p>
                    <p className="text-sm font-mono text-muted-foreground">{s.voucher.slice(0, 7)}****</p>
                  </div>
                </div>

                {/* Time remaining */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Time Left</span>
                    <span className="font-mono text-primary font-semibold">{formatTime(remaining)}</span>
                  </div>
                </div>

                {/* Data usage */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Data Used</span>
                    <span className="text-foreground">{s.dataUsed}MB / {s.dataLimit}MB</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full gradient-bg"
                      initial={{ width: 0 }}
                      animate={{ width: `${dataPercent}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Signal */}
                <div className="flex items-center gap-1 mt-3">
                  {[1, 2, 3, 4].map(bar => (
                    <div
                      key={bar}
                      className={`w-1 rounded-full ${bar <= s.signal ? 'bg-success' : 'bg-muted/30'}`}
                      style={{ height: 4 + bar * 3 }}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">Signal</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* History */}
      {expiredSessions.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-foreground mb-3">Recent History</h3>
          <div className="space-y-2">
            {expiredSessions.map((s, i) => {
              const DeviceIcon = deviceIcons[s.deviceType] || Wifi;
              return (
                <motion.div
                  key={s.id}
                  className="glass-card p-4 flex items-center gap-4 opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <DeviceIcon className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{s.device}</p>
                    <p className="text-xs text-muted-foreground">{s.plan} · {s.startedAt}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">Expired</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
