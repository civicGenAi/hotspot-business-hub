import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter', price: 0, priceYearly: 0, desc: 'Perfect for getting started',
    features: ['1 router', '50 vouchers/month', 'Basic analytics', 'Default captive portal', 'Cash payments'],
    cta: 'Start Free',
  },
  {
    name: 'Pro', price: 25000, priceYearly: 20000, desc: 'For growing hotspot businesses', popular: true,
    features: ['3 routers', 'Unlimited vouchers', 'SMS delivery', 'M-Pesa integration', 'Advanced analytics', 'Custom captive portal', 'Priority support'],
    cta: 'Go Pro',
  },
  {
    name: 'Business', price: 75000, priceYearly: 60000, desc: 'For multi-location enterprises',
    features: ['Unlimited routers', 'Everything in Pro', 'White-label portal', 'API access', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact Sales',
  },
];

export const PricingSection = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 relative" id="pricing">
      <div className="container px-4">
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple <span className="gradient-text">Pricing</span>
        </motion.h2>
        <p className="text-muted-foreground text-center mb-10">Start free, scale as you grow.</p>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!yearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="w-14 h-7 rounded-full bg-muted relative transition-colors"
          >
            <motion.div
              className="w-5 h-5 rounded-full gradient-bg absolute top-1"
              animate={{ left: yearly ? 32 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm ${yearly ? 'text-foreground' : 'text-muted-foreground'}`}>Yearly</span>
          {yearly && <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full font-medium">Save 20%</span>}
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`glass-card p-8 relative ${tier.popular ? 'ring-2 ring-primary/50 scale-105' : ''} gradient-border`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-4">{tier.desc}</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-foreground">
                  TZS {(yearly ? tier.priceYearly : tier.price).toLocaleString()}
                </span>
                {tier.price > 0 && <span className="text-muted-foreground text-sm">/mo</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/register"
                className={`block text-center py-3 rounded-xl font-display font-semibold transition-all hover:scale-105 ${
                  tier.popular
                    ? 'gradient-bg text-primary-foreground'
                    : 'border border-white/10 text-foreground hover:border-primary/50'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
