'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Spider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !spiderRef.current) return;

    const container = containerRef.current;
    const spider = spiderRef.current;
    const pupils = container.querySelectorAll('.pupil');
    const leftLegs = container.querySelectorAll('.leg-left');
    const rightLegs = container.querySelectorAll('.leg-right');
    const mouth = mouthRef.current;

    // Initial drop animation
    gsap.to(spider, {
      top: '35%',
      duration: 4,
      ease: 'elastic.out(1, 0.3)',
      delay: 0.5
    });

    const handleMouseMove = (e: MouseEvent) => {
      const xPos = (e.clientX / window.innerWidth) - 0.5;
      const yPos = (e.clientY / window.innerHeight) - 0.5;
      const rotation = xPos > 0 ? -5 : 10;

      // Animate pupils
      pupils.forEach((pupil) => {
        gsap.to(pupil, {
          x: xPos * 5,
          y: yPos * 5,
          duration: 0.5,
          ease: 'power1.out',
        });
      });

      // Animate mouth
      if (mouth) {
        gsap.to(mouth, {
          x: xPos * 5,
          rotation: rotation,
          duration: 0.5,
          ease: 'power1.out',
        });
      }

      // Animate legs
      leftLegs.forEach((leg) => {
        gsap.to(leg, {
          rotation: Math.random() * xPos * yPos * 100,
          duration: 1,
          ease: 'power1.out',
          transformOrigin: 'right 50%',
        });
      });

      rightLegs.forEach((leg) => {
        gsap.to(leg, {
          rotation: Math.random() * xPos * yPos * 100,
          duration: 1,
          ease: 'power1.out',
          transformOrigin: 'left 50%',
        });
      });

      // Animate container rotation
      gsap.to(container, {
        rotation: rotation,
        duration: 3,
        ease: 'power1.inOut',
        transformOrigin: 'center top',
        onComplete: () => {
          gsap.to(container, {
            rotation: 0,
            duration: 2.5,
            ease: 'elastic.out(1, 0.15)',
            transformOrigin: 'center top',
          });
        },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-[75%] -translate-x-1/2 z-[0] opacity-50 pointer-events-none w-[200px] h-[400px]">
      <div ref={spiderRef} className="relative -top-[350px] w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 124.9 176.7"
          className="w-full h-auto overflow-visible"
        >
          {/* Spider Line */}
          <rect x="61.5" y="-500" width="2" height="606" fill="#F8CF21" />

          {/* Legs Right */}
          <path className="leg-right" d="M67.6,109.9c-0.1,0-0.2,0-0.3,0c-0.7-0.2-1.2-0.9-1-1.7c2.3-10.3,9.6-18.3,19-20.9c6.3-1.8,12.9-1.1,19,2 c0.7,0.3,1,1.2,0.6,1.9c-0.3,0.7-1.2,1-1.9,0.6c-5.5-2.8-11.4-3.4-17-1.8c-8.4,2.4-14.9,9.6-17,18.9 C68.8,109.4,68.2,109.9,67.6,109.9z" fill="#F8CF21"/>
          <path className="leg-right" d="M123.6,130.1c-0.5,0-1-0.3-1.2-0.8c-0.1-0.1-0.1-0.3-0.2-0.5c-3-6.9-8.3-11.4-15.8-13.4 c-12.5-3.3-21.9,5.4-22,5.4c-0.5,0.5-1.4,0.5-2,0c-0.5-0.5-0.5-1.4,0-2c0.1-0.1,10.4-9.9,24.6-6.2c5.7,1.5,13.4,5.3,17.6,15 c0.1,0.2,0.1,0.3,0.2,0.4c0.3,0.7,0.1,1.5-0.6,1.9C124,130,123.8,130.1,123.6,130.1z" fill="#F8CF21"/>
          <path className="leg-right" d="M107.2,166.2c-0.2,0-0.5-0.1-0.7-0.2c-0.7-0.4-0.9-1.2-0.5-1.9c2.6-4.7,2.1-8,1.8-9.2 c-1.6-6.7-11.2-12.8-24.5-11.5c-0.8,0.1-1.4-0.5-1.5-1.2c-0.1-0.8,0.5-1.4,1.2-1.5c13.6-1.3,25.4,4.5,27.5,13.6 c0.5,1.8,1,5.9-2,11.3C108.2,165.9,107.7,166.2,107.2,166.2z" fill="#F8CF21"/>
          <path className="leg-right" d="M91.4,174.5c-0.1,0-0.3,0-0.4-0.1c-0.7-0.2-1.1-1-0.9-1.7c0.9-2.8,1-5.8,0.3-8.7c-2-7.3-9.6-12.8-19.3-14.2 c-0.8-0.1-1.3-0.8-1.2-1.6c0.1-0.8,0.8-1.3,1.6-1.2c10.9,1.5,19.4,7.8,21.7,16.2c0.9,3.4,0.8,7-0.3,10.3 C92.5,174.1,92,174.5,91.4,174.5z" fill="#F8CF21"/>
          
          {/* Legs Left */}
          <path className="leg-left" d="M32.1,176.7c-0.3,0-0.7-0.1-0.9-0.4c-1.6-1.5-2.9-3.4-3.7-5.5c-2.4-7.4,2.5-17.1,12.1-24 c0.6-0.4,1.5-0.3,1.9,0.3c0.4,0.6,0.3,1.5-0.3,1.9c-8.7,6.2-13.1,14.6-11.1,20.8c0.6,1.7,1.6,3.2,2.9,4.4c0.6,0.5,0.6,1.4,0.1,2 C32.8,176.5,32.5,176.7,32.1,176.7z" fill="#F8CF21"/>
          <path className="leg-left" d="M12.1,163.4c-0.6,0-1.1-0.3-1.3-0.9c-1.6-4.3-1.6-9.1,0-13.5c2.8-7.3,10.4-12.4,19.3-12.8 c0.8,0,1.4,0.6,1.4,1.3c0,0.8-0.6,1.4-1.3,1.5c-7.8,0.4-14.5,4.7-16.9,11c-1.4,3.7-1.4,7.8,0,11.5c0.3,0.7-0.1,1.5-0.8,1.8 C12.4,163.4,12.3,163.4,12.1,163.4z" fill="#F8CF21"/>
          <path className="leg-left" d="M1.4,134.6c-0.2,0-0.5-0.1-0.7-0.2c-0.7-0.4-0.9-1.2-0.5-1.9c1.5-2.4,3.5-4.5,5.9-6.1c6.7-4,16.1-3,24.5,2.5 c0.6,0.4,0.8,1.3,0.4,1.9c-0.4,0.6-1.3,0.8-1.9,0.4c-7.5-5-15.7-5.9-21.5-2.5c-2,1.3-3.8,3-5,5.1C2.3,134.3,1.9,134.6,1.4,134.6z" fill="#F8CF21"/>
          <path className="leg-left" d="M43.8,110.5c-0.4,0-0.9-0.2-1.1-0.6c-5.8-8.5-14.3-13.2-22.1-12.2c-2.7,0.4-5.4,1.5-7.7,3.2 c-0.6,0.4-1.5,0.3-1.9-0.3c-0.4-0.6-0.3-1.5,0.3-1.9c2.6-1.9,5.7-3.1,8.9-3.6c8.9-1.1,18.3,4,24.8,13.4c0.4,0.6,0.3,1.5-0.4,1.9 C44.3,110.4,44.1,110.5,43.8,110.5z" fill="#F8CF21"/>

          {/* Spider Body (Simplified) */}
          <ellipse cx="62.5" cy="145" rx="35" ry="45" fill="#F8CF21" />

          {/* Eyes */}
          <ellipse cx="53" cy="140" rx="6" ry="10" fill="white" />
          <ellipse cx="72" cy="140" rx="6" ry="10" fill="white" />

          {/* Pupils */}
          <circle className="pupil" cx="53" cy="142" r="4" fill="black" />
          <circle className="pupil" cx="72" cy="142" r="4" fill="black" />

          {/* Mouth */}
          <path
            ref={mouthRef}
            d="M55,165 Q62.5,175 70,165"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
