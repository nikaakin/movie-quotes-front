import { useIntersectionObserver } from '@/hooks';
import { RootState, setCurrentModal } from '@/store';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckEmailIcon,
  CheckMarkIcon,
  ForgotPassword,
  Login,
  NotificationModal,
  Registration,
} from '@/components';

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

    return currentModal === 'login' ? (
      <Login />
    ) : currentModal === 'register' ? (
      <Registration />
    ) : currentModal === 'forgot-password' ? (
      <ForgotPassword />
    ) : currentModal === 'register-notification' ? (
      <NotificationModal
        image={<CheckEmailIcon />}
        title='Thank you!'
        text='Please check your email and follow the instructions to activate your account.'
        buttonText='Go to my email'
      />
    ) : currentModal === 'forgot-password-notification' ? (
      <NotificationModal
        image={<CheckEmailIcon />}
        title='Check your email'
        text='We have sent a password recover instructions to your email'
        buttonText='Go to my email'
        skip
      />
    ) : currentModal === 'account-activated' ? (
      <NotificationModal
        image={<CheckMarkIcon />}
        title='Thank you!'
        text='Your account has been activated.'
        buttonText='Go to my news feed'
      />
    ) : currentModal === 'password-changed' ? (
      <NotificationModal
        image={<CheckMarkIcon />}
        title='Success!'
        text='Your Password changed successfully'
        buttonText='Log in'
      />
    ) : currentModal === 'email-changed' ? (
      <NotificationModal
        image={<CheckMarkIcon />}
        title='Success!'
        text='Your Email changed successfully'
        buttonText='Log in'
      />
    ) : currentModal === 'link-expired' ? (
      <NotificationModal
        image='/assets/images/link-expired.png'
        title='Link expired!'
        text='Login link has expired, because you haven’t used it'
        buttonText='Request another link'
      />
    ) : (
      <></>
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
    modal: modal(),
  };
};
