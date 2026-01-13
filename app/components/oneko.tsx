'use client';

import { useEffect, useRef } from 'react';

// oneko.js adaptation for React
// Original by Hajime Kumumiya, adapted for React by Subash's AI Assistant

export default function Oneko() {
  const catRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const catEl = document.createElement('div');
    catEl.id = 'oneko';
    catEl.style.width = '32px';
    catEl.style.height = '32px';
    catEl.style.position = 'fixed';
    catEl.style.pointerEvents = 'none';
    catEl.style.backgroundImage = "url('/oneko/cat-follow-cursor-oneko/oneko.gif')";
    catEl.style.imageRendering = 'pixelated';
    catEl.style.left = '0px';
    catEl.style.top = '0px';
    catEl.style.zIndex = '9999';
    catEl.style.filter = 'invert(0)'; // Default
    document.body.appendChild(catEl);

    // Initial check for theme
    if (document.documentElement.classList.contains('light')) {
      catEl.style.filter = 'invert(1)';
    }

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isLight = document.documentElement.classList.contains('light');
          catEl.style.filter = isLight ? 'invert(1)' : 'invert(0)';
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let catPosX = 32;
    let catPosY = 32;
    let mousePosX = 32;
    let mousePosY = 32;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    const catSpeed = 10;

    const spriteSets: Record<string, number[][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    function setSprite(name: string, frame: number) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      catEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdle() {
      idleAnimation = null;
      idleAnimationFrame = 0;
      idleTime = 0;
    }

    function frame() {
      frameCount++;
      const diffX = catPosX - mousePosX;
      const diffY = catPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < catSpeed || distance < 48) {
        idleTime++;
        if (idleTime > 10) {
          if (!idleAnimation && Math.random() < 0.01) {
            const idles = ['scratchSelf', 'sleeping'];
            idleAnimation = idles[Math.floor(Math.random() * idles.length)];
          }
        }

        if (idleAnimation) {
          setSprite(idleAnimation, idleAnimationFrame);
          if (frameCount % 10 === 0) {
            idleAnimationFrame++;
          }
        } else {
          setSprite('idle', 0);
        }
        return;
      }

      resetIdle();
      
      let direction = '';
      if (diffY / distance > 0.5) direction = 'N';
      else if (diffY / distance < -0.5) direction = 'S';

      if (diffX / distance > 0.5) direction += 'W';
      else if (diffX / distance < -0.5) direction += 'E';

      catPosX -= (diffX / distance) * catSpeed;
      catPosY -= (diffY / distance) * catSpeed;

      catEl.style.left = `${catPosX - 16}px`;
      catEl.style.top = `${catPosY - 16}px`;

      setSprite(direction, frameCount);
    }

    const onMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    const interval = setInterval(frame, 100);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(interval);
      catEl.remove();
      observer.disconnect();
    };
  }, []);

  return null;
}
