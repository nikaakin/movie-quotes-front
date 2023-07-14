import { useIntersectionObserver, useUserQuery } from '@/hooks';
import { RootState, setCurrentModal } from '@/state';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { googleLogin } from '@/services';

export const useLandingPage = () => {
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
    queryFn: () => googleLogin(query),
    onSuccess: () => {
      push('/news-feed/home');
    },
    onError: (error) => {
      dispatch(setCurrentModal('login'));
      const errors = error?.response?.data as { details: { username: string } };
      push(`/?error=${errors?.details?.username}`);
    },
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

  const changeIndex = (index: number) => {
    if (index > 2) return;
    setTimeout(() => {
      const fromTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      const top = imageRefs[index]?.current?.getBoundingClientRect()?.top;
      (fromTop || fromTop === 0) &&
        top &&
        window.scrollTo({ behavior: 'smooth', top: fromTop + top });
    }, 0);
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
    changeIndex,
    isBackgroundIntersected,
    backgrounfRef,
    imageRefs,
    currentModal,
    onClose,
    onShowRegister,
    t,
    onLogin,
    onLinkExpired,
    resetPaswordData,
  };
};
