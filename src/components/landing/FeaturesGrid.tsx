import { motion } from 'framer-motion';
import { Activity, Ticket, TrendingUp, Router, Smartphone, MessageSquare, MapPin, Layout, CreditCard } from 'lucide-react';

const features = [
  { icon: Activity, title: 'Live Session Monitor', desc: 'Track every connected device in real-time with live bandwidth and data usage.', large: true },
  { icon: Ticket, title: 'Voucher Generator', desc: 'Create and print vouchers with QR codes in seconds.' },
  { icon: TrendingUp, title: 'Revenue Analytics', desc: 'Charts, heatmaps, and reports to grow your business.' },
  { icon: Router, title: 'MikroTik Integration', desc: 'Auto-configure your router with one click.' },
  { icon: CreditCard, title: 'M-Pesa Payments', desc: 'Accept mobile money payments seamlessly.' },
  { icon: MessageSquare, title: 'SMS & WhatsApp', desc: 'Deliver vouchers via SMS or WhatsApp.' },
  { icon: MapPin, title: 'Multi-Location', desc: 'Manage multiple hotspot locations.' },
  { icon: Layout, title: 'Captive Portal', desc: 'Beautiful branded login pages.' },
  { icon: Smartphone, title: 'Mobile POS', desc: 'Sell vouchers from your phone.' },
];

export const FeaturesGrid = () => (
  <section className="py-24 relative">
    <div className="container px-4">
      <motion.h2
        className="font-display text-3xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Everything You <span className="gradient-text">Need</span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className={`glass-card p-6 gradient-border group cursor-default ${f.large ? 'col-span-2 row-span-2' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <f.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-foreground mb-2 text-sm md:text-base">{f.title}</h3>
            <p className="text-muted-foreground text-xs md:text-sm">{f.desc}</p>
            {f.large && (
              <div className="mt-6 space-y-2">
                {[1, 2, 3].map(j => (
                  <div key={j} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <div className="h-2 rounded bg-muted flex-1" />
                    <div className="h-2 w-16 rounded bg-muted" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
