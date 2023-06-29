import { useUserQuery } from '@/hooks';
import { getCsrf, isAuthenticated, logout } from '@/services';
import { setCurrentModal } from '@/state';
import { setIsSearchBarOn } from '@/state';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export const useHeader = () => {
  const disaptch = useDispatch();
  const { t } = useTranslation('common');
  const {
    query: { slug },
  } = useRouter();

  const { data } = useUserQuery({ enabled: false, queryFn: isAuthenticated });
  const { refetch: logoutUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => logout(),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const username = data?.username;
  const { push } = useRouter();
  const onShowLogin = () => disaptch(setCurrentModal('login'));
  const onShowRegister = () => disaptch(setCurrentModal('register'));
  const onLogout = async () => {
    await getCsrf();
    logoutUser().then(() => push('/'));
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
