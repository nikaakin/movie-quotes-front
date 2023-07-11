import { useIntersectionObserver, useUserQuery } from '@/hooks';
import { RootState, setCurrentModal } from '@/state';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { googleLogin } from '@/services';

export const useLandingPage = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [linkExpiredOnClick, setLinkExpiredOnClick] = useState('');
  const [resetPaswordData, setResetPaswordData] = useState({
    email: '',
    token: '',
  });
  const currentModal = useSelector(
    (state: RootState) => state.currentModal.currentModal
  );

  const { t } = useTranslation(['common', 'modals']);
  const { locale, query, replace, push } = useRouter();
  const dispatch = useDispatch();
  const { refetch: signInWithGoogle } = useUserQuery({
    onSuccess: () => {
      push('/news-feed/home');
    },
    onError: (error) => {
      dispatch(setCurrentModal('login'));
      const errors = error!.response!.data as { details: { username: string } };
      push(`/?error=${errors.details.username}`);
    },
    queryFn: () => googleLogin(query),
    enabled: false,
  });

  useEffect(() => {
    if (query.code) {
      signInWithGoogle();
    }
    if (query.token) {
      dispatch(setCurrentModal('reset-password'));
      setResetPaswordData({
        email: query.email as string,
        token: query.token as string,
      });
      setLinkExpiredOnClick('password-change');
      replace(`/${locale}`);
    }
    if (query.verified === 'true') {
      dispatch(setCurrentModal('account-activated'));
      replace(`/${locale}`);
    }
    if (query.verified === 'false') {
      dispatch(setCurrentModal('link-expired'));
      replace(`/${locale}`);
      setLinkExpiredOnClick('verification');
    }

    if (query.is_available === 'false') {
      dispatch(setCurrentModal('link-expired'));
      replace(`/${locale}`);
      setLinkExpiredOnClick('password-change');
    }
  }, [
    query,
    dispatch,
    setLinkExpiredOnClick,
    replace,
    locale,
    push,
    signInWithGoogle,
  ]);

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
    setTimeout(() => {
      const bottom = imageRefs[index]?.current?.getBoundingClientRect()?.bottom;
      bottom &&
        window.scrollTo({ behavior: 'smooth', top: 1200 * (index + 1) - 280 });
    }, 0);

    setTimeout(() => setShouldAnimate(false), 1000);
  };

  const onClose = () => dispatch(setCurrentModal(null));

  const onShowRegister = () => dispatch(setCurrentModal('register'));

  const onLogin = () => dispatch(setCurrentModal('login'));

  const onLinkExpired = () => {
    if (linkExpiredOnClick === 'verification') {
      dispatch(setCurrentModal('login'));
    }
    if (linkExpiredOnClick === 'password-change') {
      dispatch(setCurrentModal('forgot-password'));
    }
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
    t,
    locale,
    onLogin,
    onLinkExpired,
    resetPaswordData,
  };
};
