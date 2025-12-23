import { useEffect, useRef } from 'react';

export interface IconAnimationHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export const useIconAnimation = () => {
  const refs = useRef<IconAnimationHandle[]>([]);

  const addRef = (ref: IconAnimationHandle | null) => {
    if (ref && !refs.current.includes(ref)) {
      refs.current.push(ref);
    }
  };

  useEffect(() => {
    // Trigger animation on mount
    refs.current.forEach(ref => ref.startAnimation());

    // Set up interval to animate every 5 seconds
    const interval = setInterval(() => {
      refs.current.forEach(ref => ref.startAnimation());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { addRef, refs };
};
