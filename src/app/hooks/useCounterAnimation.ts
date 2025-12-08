import { useEffect, useRef } from 'react';

export const useCounterAnimation = (target: number, duration: number = 2000) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toString();
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return ref;
};