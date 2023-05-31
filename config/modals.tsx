import { lazy } from 'react';

const Login = lazy(() =>
  import('@/components').then(({ Login }) => ({
    default: Login,
  }))
);

const Registration = lazy(() =>
  import('@/components').then(({ Registration }) => ({
    default: Registration,
  }))
);

const ForgotPassword = lazy(() =>
  import('@/components').then(({ ForgotPassword }) => ({
    default: ForgotPassword,
  }))
);

const NotificationModal = lazy(() =>
  import('@/components').then(({ NotificationModal }) => ({
    default: NotificationModal,
  }))
);

const CheckEmailIcon = lazy(() =>
  import('@/components').then(({ CheckEmailIcon }) => ({
    default: CheckEmailIcon,
  }))
);

const CheckMarkIcon = lazy(() =>
  import('@/components').then(({ CheckMarkIcon }) => ({
    default: CheckMarkIcon,
  }))
);

export const modals = {
  login: <Login />,
  register: <Registration />,
  'forgot-password': <ForgotPassword />,
  'register-notification': (
    <NotificationModal
      image={<CheckEmailIcon />}
      title='Thank you!'
      text='Please check your email and follow the instructions to activate your account.'
      buttonText='Go to my email'
    />
  ),
  'forgot-password-notification': (
    <NotificationModal
      image={<CheckEmailIcon />}
      title='Check your email'
      text='We have sent a password recover instructions to your email'
      buttonText='Go to my email'
      skip
    />
  ),

  'account-activated': (
    <NotificationModal
      image={<CheckMarkIcon />}
      title='Thank you!'
      text='Your account has been activated.'
      buttonText='Go to my news feed'
    />
  ),
  'password-changed': (
    <NotificationModal
      image={<CheckMarkIcon />}
      title='Success!'
      text='Your Password changed successfully'
      buttonText='Log in'
    />
  ),
  'email-changed': (
    <NotificationModal
      image={<CheckMarkIcon />}
      title='Success!'
      text='Your Email changed successfully'
      buttonText='Log in'
    />
  ),
  'link-expired': (
    <NotificationModal
      image='/assets/images/link-expired.png'
      title='Link expired!'
      text='Login link has expired, because you haven’t used it'
      buttonText='Request another link'
    />
  ),
};
