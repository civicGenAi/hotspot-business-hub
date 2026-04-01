import { motion } from 'framer-motion';
import { DollarSign, Users, Ticket, TrendingUp, Zap, Plus, Activity, Router, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { revenueData, transactions, sessions } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { label: 'Today\'s Revenue', value: 45000, prefix: 'TZS ', trend: 12, up: true, icon: DollarSign, color: 'text-primary' },
  { label: 'Active Sessions', value: 8, trend: 0, up: true, icon: Users, color: 'text-success', live: true },
  { label: 'Vouchers Sold', value: 23, trend: 8, up: true, icon: Ticket, color: 'text-warning' },
  { label: 'Monthly Revenue', value: 890000, prefix: 'TZS ', trend: 8, up: true, icon: TrendingUp, color: 'text-secondary' },
];

const quickActions = [
  { icon: Zap, label: 'Quick Sell', path: '/dashboard/quick-sell' },
  { icon: Plus, label: 'Generate Vouchers', path: '/dashboard/vouchers' },
  { icon: Activity, label: 'View Sessions', path: '/dashboard/sessions' },
  { icon: Router, label: 'Add Router', path: '/dashboard/locations' },
];

const DashboardHome = () => {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{greeting}, Mama Ntilie 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Main Shop — Arusha · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </motion.div>

      {/* Router status */}
      <motion.div
        className="glass-card p-3 flex items-center gap-3 border-success/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-sm text-foreground">MikroTik RB951 — <span className="text-success">Online</span></span>
        <span className="text-xs text-muted-foreground ml-auto">192.168.88.1</span>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="glass-card p-5 gradient-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              {kpi.live && <div className="w-2 h-2 rounded-full bg-success animate-pulse" />}
              {kpi.trend > 0 && (
                <span className={`text-xs flex items-center gap-0.5 ${kpi.up ? 'text-success' : 'text-destructive'}`}>
                  {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.trend}%
                </span>
              )}
            </div>
            <div className="font-display text-2xl font-bold text-foreground">
              <AnimatedCounter value={kpi.value} prefix={kpi.prefix || ''} />
            </div>
            <p className="text-muted-foreground text-xs mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((a, i) => (
          <motion.button
            key={a.label}
            onClick={() => navigate(a.path)}
            className="glass-card p-4 flex flex-col items-center gap-2 gradient-border group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <a.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-foreground">{a.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-foreground">Revenue Trend</h3>
          <div className="flex gap-1">
            {['7D', '30D', '90D'].map(p => (
              <button key={p} className={`text-xs px-3 py-1 rounded-lg ${p === '30D' ? 'gradient-bg text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(186 100% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(186 100% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(219 25% 53%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(219 25% 53%)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'hsl(222 50% 10%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: 'hsl(224 60% 97%)' }}
                itemStyle={{ color: 'hsl(186 100% 45%)' }}
                formatter={(v: number) => [`TZS ${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(186 100% 45%)" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-display font-bold text-foreground mb-4">Recent Sales</h3>
        <div className="space-y-3">
          {transactions.map((t, i) => (
            <motion.div
              key={t.id}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Ticket className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.plan}</p>
                  <p className="text-xs text-muted-foreground">{t.time} · {t.method === 'mpesa' ? 'M-Pesa' : t.method === 'airtel' ? 'Airtel' : 'Cash'}</p>
                </div>
              </div>
              <span className="font-mono text-sm font-semibold text-success">+TZS {t.amount.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
