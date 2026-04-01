import { motion } from 'framer-motion';
import { Wifi, Play, ChevronDown } from 'lucide-react';
import { GradientOrbs } from '../GradientOrbs';

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
    <GradientOrbs />
    <div className="container relative z-10 px-4 py-20 flex flex-col items-center text-center">
      <motion.div
        className="mb-8 relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
      >
        <Wifi className="w-16 h-16 text-primary" />
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 2 + i * 0.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            style={{ width: 64, height: 64 }}
          />
        ))}
      </motion.div>

      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="gradient-text">Turn Your WiFi</span>
        <br />
        <span className="text-foreground">Into A Business</span>
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Generate vouchers, control bandwidth, track earnings — from any device, anywhere.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <a href="/register" className="gradient-bg px-8 py-4 rounded-xl font-display font-semibold text-primary-foreground hover:opacity-90 transition-all hover:scale-105 hover:shadow-lg">
          Start Free — No Card Needed
        </a>
        <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-foreground border border-white/10 hover:border-primary/50 transition-all group">
          <Play className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          Watch Demo
        </button>
      </motion.div>

      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </div>
  </section>
);
