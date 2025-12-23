'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MoonIcon } from '../icons/moon-icon';
import { SunMediumIcon } from '../icons/sun-icon';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-11">
      {mounted ? (
        <motion.button
          aria-label="Toggle Dark Mode"
          type="button"
          whileTap={{
            scale: 0.7,
            rotate: 360,
            transition: { duration: 0.2 },
          }}
          whileHover={{ scale: 1.2 }}
          onClick={toggleTheme}
        >
          {theme === 'dark' || resolvedTheme === 'dark' ? (
            <SunMediumIcon className="h-9 w-9" />
          ) : (
            <MoonIcon className="h-9 w-9" />
          )}
        </motion.button>
      ) : (
        <div className="h-9 w-9 p-2" />
      )}
    </div>
  );
};

export default ThemeSwitch;
