import { useIntersectionObserver } from '@/hooks';
import { RootState, setCurrentModal } from '@/state';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const useLandingPage = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const currentModal = useSelector(
    (state: RootState) => state.currentModal.currentModal
  );

  const { t } = useTranslation(['common', 'modals']);
  const { locale, query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.verified === 'true') {
      dispatch(setCurrentModal('account-activated'));
    }
    if (query.verified === 'false') {
      dispatch(setCurrentModal('link-expired'));
    }
  }, [query.verified, dispatch]);

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

  const onClose = () => dispatch(setCurrentModal(null));

  const onShowRegister = () => dispatch(setCurrentModal('register'));

  const onLogin = () => dispatch(setCurrentModal('login'));

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
    t,
    locale,
    query,
    onLogin,
  };
};
