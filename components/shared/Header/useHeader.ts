import { setCookie } from '@/helpers';
import { useUserQuery } from '@/hooks';
import { getCsrf, isAuthenticated, logout } from '@/services';
import { setCurrentModal } from '@/state';
import { setIsSearchBarOn } from '@/state';
import Echo from 'laravel-echo';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export const useHeader = () => {
  const disaptch = useDispatch();
  const { push } = useRouter();
  const { t } = useTranslation('common');
  const {
    query: { slug },
  } = useRouter();

  const { data } = useUserQuery({
    enabled: false,
    queryFn: isAuthenticated,
  });

  const { refetch: logoutUser } = useUserQuery({
    queryFn: () => logout(),
    enabled: false,
    isLogout: true,
  });

  const username = data?.username;
  const onShowLogin = () => disaptch(setCurrentModal('login'));
  const onShowRegister = () => disaptch(setCurrentModal('register'));
  const onLogout = async () => {
    await getCsrf();
    await logoutUser();
    setCookie('user', 'false');
    (window as Window & typeof globalThis & { Echo: Echo })!.Echo!.leaveChannel(
      'notification.' + data?.id
    );
    push('/');
  };
  const onSearchBarClick = () => disaptch(setIsSearchBarOn(true));

  return {
    onShowLogin,
    onShowRegister,
    username,
    onLogout,
    slug,
    onSearchBarClick,
    t,
  };
};
