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

export const modals = {
  login: <Login />,
  register: <Registration />,
  'forgot-password': <ForgotPassword />,
  'login-notification': <>login notification</>,
  'register-notification': <>register notifiaction</>,
  'forgot-password-notification': <>forgot password notification</>,
};
