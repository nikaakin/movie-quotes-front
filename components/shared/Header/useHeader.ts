import { getCsrf, logout } from '@/services';
import { RootState, logOut, setCurrentModal } from '@/state';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export const useHeader = () => {
  const disaptch = useDispatch();
  const { t } = useTranslation('common');
  const state = useSelector((state: RootState) => state);

  const isSignedIn = state.isSignedin.isSignedIn;
  const { push } = useRouter();
  const onShowLogin = () => disaptch(setCurrentModal('login'));
  const onShowRegister = () => disaptch(setCurrentModal('register'));
  const onLogout = async () => {
    await getCsrf();
    await logout();
    disaptch(logOut());
    push('/');
  };

  return {
    onShowLogin,
    onShowRegister,
    isSignedIn,
    onLogout,
    t,
  };
};
