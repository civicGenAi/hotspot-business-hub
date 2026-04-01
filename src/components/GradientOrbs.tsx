import { motion } from 'framer-motion';

export const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
      style={{ background: 'hsl(186 100% 45%)' }}
      animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      initial={{ top: '-10%', left: '-10%' }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
      style={{ background: 'hsl(261 100% 59%)' }}
      animate={{ x: [0, -80, 50, 0], y: [0, 60, -40, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      initial={{ bottom: '-10%', right: '-10%' }}
    />
  </div>
);
