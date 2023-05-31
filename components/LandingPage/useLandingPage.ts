import { imageUrls } from '@/config';
import { useIntersectionObserver } from '@/hooks';
import { useRef, useState } from 'react';

export const useLandingPage = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const backgrounfRef = useRef<HTMLDivElement>(null);
  const imageRefs = imageUrls.map(() => useRef<HTMLDivElement>(null));
  const backgroundEntry = useIntersectionObserver(
    { threshold: 0, rootMargin: '-180px' },
    backgrounfRef
  );
  const isBackgroundIntersected = backgroundEntry?.isIntersecting;

  const show =
    !((backgroundEntry?.target.getBoundingClientRect().width || 0) < 768) &&
    !isBackgroundIntersected;

  const changeIndex = (index: number) => {
    setShouldAnimate(true);
    setTimeout(() => setShouldAnimate(false), 1000);
    const bottom = imageRefs[index]?.current?.getBoundingClientRect()?.bottom;
    bottom && scrollTo({ behavior: 'smooth', top: 1200 * (index + 1) - 280 });
  };

  const onShowRegisterChange = () => setShowRegister(!showRegister);

  return {
    shouldAnimate,
    show,
    changeIndex,
    isBackgroundIntersected,
    backgrounfRef,
    imageRefs,
    showRegister,
    onShowRegisterChange,
  };
};
