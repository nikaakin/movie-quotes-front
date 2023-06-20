import { getCsrf, logout } from '@/services';
import { RootState, logOut, setCurrentModal } from '@/state';
import { setIsSearchBarOn } from '@/state';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export const useHeader = () => {
  const disaptch = useDispatch();
  const { t } = useTranslation('common');
  const state = useSelector((state: RootState) => state);
  const {
    query: { slug },
  } = useRouter();

  const { isSignedIn } = state.user;
  const { push } = useRouter();
  const onShowLogin = () => disaptch(setCurrentModal('login'));
  const onShowRegister = () => disaptch(setCurrentModal('register'));
  const onLogout = async () => {
    await getCsrf();
    await logout();
    push('/');
    disaptch(logOut());
  };
  const onSearchBarClick = () => disaptch(setIsSearchBarOn(true));

  return {
    onShowLogin,
    onShowRegister,
    isSignedIn,
    onLogout,
    slug,
    onSearchBarClick,
    t,
  };
};
