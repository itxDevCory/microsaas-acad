'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  id?: string;
}

export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = '',
  id 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <section ref={ref} className={className} id={id}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </section>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className = '' }: ParallaxLayerProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
