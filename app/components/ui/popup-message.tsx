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

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-8 left-8 z-[100] w-[280px] bg-primary-600 dark:bg-primary-500 text-white p-6 rounded-2xl shadow-2xl pointer-events-auto"
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>
        <div className="space-y-2">
          <h3 className="font-bold text-lg leading-tight">
            Pick any idea to get started
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            This will start to personalize your home feed recommendations.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
