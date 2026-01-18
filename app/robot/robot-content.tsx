'use client';

import { useEffect, useRef, useState } from 'react';
import Experience from './Experience/Experience.js';
import styles from './style.module.css';

export default function RobotContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<any>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (containerRef.current && !experienceRef.current) {
      experienceRef.current = new Experience({
        targetElement: containerRef.current
      });

      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 9000);

      return () => {
        clearTimeout(timer);
        if (experienceRef.current && typeof experienceRef.current.destroy === 'function') {
          experienceRef.current.destroy();
        }
      };
    }
  }, []);

  return (
    <div className={styles.robotContainer}>
      <div ref={containerRef} className="experience" style={{ width: '100%', height: '100vh' }}></div>
      <div className={styles.credits}>
        Works with PS4 and XBOX 360 controllers
        <br />
        <a href="https://www.youtube.com/watch?v=mIMgSVuW0y0" target="_blank" rel="noreferrer">Woodkid Volcano Live</a> inspired robot by <a href="https://bruno-simon.com" target="_blank" rel="noreferrer">Bruno Simon</a> (<a href="https://github.com/brunosimon/experiment-robot-controls" target="_blank" rel="noreferrer">Source code</a>)
      </div>
      <div className={`${styles.intro} ${isHidden ? styles.isHidden : ''}`}>
        <div className={styles.title}>Woodkid Volcano Robot</div>
        <div className={styles.subTitle}>Inspired by the live version of the Volcano song by Woodkid</div>
        <div className={styles.subTitle}>Works with keyboard and PS4 controller</div>
      </div>
    </div>
  );
}
