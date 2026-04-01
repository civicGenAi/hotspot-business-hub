import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ value, prefix = '', suffix = '', duration = 1.5, className = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const stepTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += Math.ceil(end / 60);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.span ref={ref} className={className} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};
