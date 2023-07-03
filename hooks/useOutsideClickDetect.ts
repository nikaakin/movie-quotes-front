import { RefObject, useEffect, useState } from 'react';

export const useOutsideClickDetect = (ref: RefObject<HTMLElement>) => {
  const [isOutside, setIsOutside] = useState(false);
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
  }, [ref]);

  return isOutside;
};
