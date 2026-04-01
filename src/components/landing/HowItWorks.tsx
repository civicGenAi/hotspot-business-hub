import { motion } from 'framer-motion';
import { Router, Ticket, Coins } from 'lucide-react';

const steps = [
  { icon: Router, title: 'Connect Your Router', desc: 'Link your MikroTik, OpenWRT, or UniFi router in minutes.' },
  { icon: Ticket, title: 'Create Voucher Plans', desc: 'Set prices, speed limits, and data caps for your customers.' },
  { icon: Coins, title: 'Sell & Earn', desc: 'Sell vouchers via Quick Sell, SMS, or self-service portal.' },
];

export const HowItWorks = () => (
  <section className="py-24 relative">
    <div className="container px-4">
      <motion.h2
        className="font-display text-3xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        How It <span className="gradient-text">Works</span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 gradient-bg opacity-30" />
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="glass-card p-8 text-center relative gradient-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -6 }}
          >
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-2 text-primary-foreground font-bold font-display">
              {i + 1}
            </div>
            <step.icon className="w-10 h-10 text-primary mx-auto mb-4 mt-4" />
            <h3 className="font-display text-xl font-bold mb-2 text-foreground">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
