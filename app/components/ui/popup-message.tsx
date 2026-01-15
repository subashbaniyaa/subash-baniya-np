'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

export default function PopUpMessage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 15000); // 5s wait + 10s show = 15s total

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.9, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed bottom-8 left-1/2 z-[100] w-[280px] bg-primary-600 dark:bg-primary-500 text-white p-6 rounded-2xl shadow-2xl pointer-events-auto"
        >
          <div className="space-y-2 text-center">
            <h3 className="font-bold text-lg leading-tight">
              Pick any idea to get started
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              This will start to personalize your home feed recommendations.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
