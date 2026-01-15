'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { format } from 'date-fns';

export default function PopUpMessage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 65000); // 5s wait + 60s show = 65s total

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed bottom-8 left-8 z-[100] w-[260px] bg-primary-600 dark:bg-primary-500 text-white p-5 rounded-2xl shadow-2xl pointer-events-auto"
        >
          <motion.button
            onClick={() => setIsVisible(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <IoClose size={18} />
          </motion.button>
          <div className="space-y-2 text-left">
            <div className="space-y-1">
              <h3 className="font-bold text-xl leading-tight whitespace-nowrap tabular-nums">
                {format(currentTime, 'pp')}
              </h3>
              <p className="text-sm font-medium text-white/90">
                {format(currentTime, 'EEEE, MMMM do, yyyy')}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
