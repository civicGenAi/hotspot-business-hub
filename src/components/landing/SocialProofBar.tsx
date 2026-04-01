import { motion } from 'framer-motion';

const items = ['500+ hotspot owners', 'TZS 50M+ earned', 'Tanzania · Kenya · Uganda', 'MikroTik · OpenWRT · Ubiquiti'];

export const SocialProofBar = () => (
  <div className="border-y border-white/5 bg-card/50 overflow-hidden py-4">
    <motion.div
      className="flex gap-12 whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="text-muted-foreground text-sm flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);
