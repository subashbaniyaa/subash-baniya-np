'use client';

import { useEffect, useRef, useState } from 'react';
import Experience from './Experience/Experience.js';
import styles from './style.module.css';

export default function RobotContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !experienceRef.current) {
      experienceRef.current = new Experience({
        targetElement: containerRef.current
      });

      return () => {
        if (experienceRef.current && typeof experienceRef.current.destroy === 'function') {
          experienceRef.current.destroy();
        }
      };
    }
  }, []);

  return (
    <div className={styles.robotContainer}>
      <div ref={containerRef} className="experience" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}
