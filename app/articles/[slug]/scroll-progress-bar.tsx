'use client';

import { motion, useScroll, useTransform } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-40 h-1 w-full bg-primary-500 origin-left"
      style={{ scaleX }}
    />
  );
}
