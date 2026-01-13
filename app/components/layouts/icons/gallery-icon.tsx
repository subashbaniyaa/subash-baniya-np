'use client';

import classNames from 'classnames';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

export interface GalleryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GalleryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const containerVariants: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const imageVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.6,
      ease: 'circIn',
    },
  },
};

const GalleryIcon = forwardRef<GalleryIconHandle, GalleryIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const mounted = useRef(false);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    useImperativeHandle(ref, () => ({
      startAnimation: () => {
        if (!mounted.current) return;
        controls.start('animate');
      },
      stopAnimation: () => {
        if (!mounted.current) return;
        controls.start('normal');
      },
    }));

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        controls.start('animate');
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        controls.start('normal');
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={classNames(
          `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          variants={containerVariants}
          initial="normal"
          animate={controls}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <motion.circle 
            variants={imageVariants}
            cx="9" cy="9" r="2" 
          />
          <motion.path 
            variants={imageVariants}
            d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" 
          />
        </motion.svg>
      </div>
    );
  },
);

GalleryIcon.displayName = 'GalleryIcon';

export { GalleryIcon };
