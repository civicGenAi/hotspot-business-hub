import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/mockData';

export const TestimonialsSection = () => (
  <section className="py-24">
    <div className="container px-4">
      <motion.h2
        className="font-display text-3xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Loved by <span className="gradient-text">Owners</span>
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="glass-card p-6 gradient-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm">
                {t.avatar}
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.location}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">"{t.quote}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
