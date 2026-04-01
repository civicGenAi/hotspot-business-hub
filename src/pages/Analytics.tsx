import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Ticket, Users, Clock, DollarSign } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { revenueData } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kpis = [
  { label: 'Total Revenue', value: 890000, prefix: 'TZS ', icon: DollarSign },
  { label: 'Total Sessions', value: 456, icon: Users },
  { label: 'Vouchers Sold', value: 457, icon: Ticket },
  { label: 'Avg Session', value: 45, suffix: ' min', icon: Clock },
];

const planData = [
  { name: '1 Hour Browse', value: 234, revenue: 117000, color: 'hsl(186 100% 45%)' },
  { name: 'Daily Pass', value: 156, revenue: 312000, color: 'hsl(261 100% 59%)' },
  { name: 'Weekly Pro', value: 67, revenue: 536000, color: 'hsl(145 100% 45%)' },
];

const paymentData = [
  { name: 'M-Pesa', value: 65 },
  { name: 'Cash', value: 25 },
  { name: 'Airtel', value: 10 },
];

const Analytics = () => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Insights to grow your business</p>
      </div>
      <div className="flex gap-1">
        {['7D', '30D', '90D'].map(p => (
          <button key={p} className={`text-xs px-3 py-1.5 rounded-lg ${p === '30D' ? 'gradient-bg text-primary-foreground' : 'bg-muted/30 text-muted-foreground'}`}>{p}</button>
        ))}
      </div>
    </motion.div>

    {/* KPIs */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((k, i) => (
        <motion.div key={k.label} className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
          <k.icon className="w-5 h-5 text-primary mb-2" />
          <div className="font-display text-2xl font-bold text-foreground">
            <AnimatedCounter value={k.value} prefix={k.prefix || ''} suffix={k.suffix || ''} />
          </div>
          <p className="text-muted-foreground text-xs mt-1">{k.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Revenue chart */}
    <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <h3 className="font-display font-bold text-foreground mb-4">Revenue Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(186 100% 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(186 100% 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(219 25% 53%)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(219 25% 53%)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: 'hsl(222 50% 10%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(186 100% 45%)" strokeWidth={2} fill="url(#analyticsGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Plan breakdown */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="font-display font-bold text-foreground mb-4">Vouchers by Plan</h3>
        <div className="h-48 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={planData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {planData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(222 50% 10%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-2">
          {planData.map(p => (
            <div key={p.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                <span className="text-muted-foreground">{p.name}</span>
              </div>
              <span className="text-foreground font-medium">{p.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Payment methods */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3 className="font-display font-bold text-foreground mb-4">Payment Methods</h3>
        <div className="space-y-4 mt-8">
          {paymentData.map((p, i) => (
            <div key={p.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{p.name}</span>
                <span className="text-foreground font-medium">{p.value}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: i === 0 ? 'hsl(186 100% 45%)' : i === 1 ? 'hsl(261 100% 59%)' : 'hsl(145 100% 45%)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default Analytics;
