import { modals } from '@/config';
import { useIntersectionObserver } from '@/hooks';
import { RootState, setCurrentModal } from '@/store';
import { Suspense, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../shared';

export const useLandingPage = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const currentModal = useSelector(
    (state: RootState) => state.currentModal.currentModal
  );
  const disaptch = useDispatch();

  const backgrounfRef = useRef<HTMLDivElement>(null);
  const imageRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const backgroundEntry = useIntersectionObserver(
    { threshold: 0, rootMargin: '-180px' },
    backgrounfRef
  );
  const isBackgroundIntersected = backgroundEntry?.isIntersecting;

  const show =
    !((backgroundEntry?.target.getBoundingClientRect().width || 0) < 768) &&
    !isBackgroundIntersected;

  const changeIndex = (index: number) => {
    if (index > 2) return;
    setShouldAnimate(true);
    setTimeout(() => setShouldAnimate(false), 1000);
    const bottom = imageRefs[index]?.current?.getBoundingClientRect()?.bottom;
    bottom &&
      window.scrollTo({ behavior: 'smooth', top: 1200 * (index + 1) - 280 });
  };

  const onClose = () => disaptch(setCurrentModal(null));

  const onShowRegister = () => disaptch(setCurrentModal('register'));

  const modal = () => {
    if (currentModal === null) return;
    const component = modals[currentModal];
    if (!component) return;
    return (
      <Suspense fallback={<span>Loading...</span>}>
        <Modal onClose={onClose}>{component}</Modal>
      </Suspense>
    );
  };

  return {
    shouldAnimate,
    show,
    changeIndex,
    isBackgroundIntersected,
    backgrounfRef,
    imageRefs,
    currentModal,
    onClose,
    onShowRegister,
    modal,
  };
};
