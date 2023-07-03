import { useEffect, useRef, useState } from 'react';

export const useOutsideClickDetect = () => {
  const [isOutside, setIsOutside] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current) {
        if (ref.current.contains(e.target as Node | null)) {
          setIsOutside(false);
        } else {
          setIsOutside(true);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { ref, isOutside };
};
