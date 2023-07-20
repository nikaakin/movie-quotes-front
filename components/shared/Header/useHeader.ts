import { setCookie } from '@/helpers';
import { useUserQuery } from '@/hooks';
import { getCsrf, isAuthenticated, logout } from '@/services';
import { setCurrentModal } from '@/state';
import { setIsSearchBarOn } from '@/state';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

  const queryClient = useQueryClient();

  const { data } = useUserQuery({
    enabled: false,
    queryFn: isAuthenticated,
  });

  const { mutate: logoutUser } = useMutation({
    mutationFn: () => logout(),
  });

  const username = data?.username;
  const onShowLogin = () => disaptch(setCurrentModal('login'));
  const onShowRegister = () => disaptch(setCurrentModal('register'));
  const onLogout = async () => {
    await getCsrf();
    window.Echo.leaveChannel('notification.' + data?.id);
    await logoutUser();
    setCookie('user', 'false');
    queryClient.removeQueries(['user']);
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
