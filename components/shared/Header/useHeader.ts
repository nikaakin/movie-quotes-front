import { setCurrentModal } from '@/state';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

export const useHeader = () => {
  const disaptch = useDispatch();
  const { t } = useTranslation('common');

  const onShowLogin = () => disaptch(setCurrentModal('login'));
  const onShowRegister = () => disaptch(setCurrentModal('register'));

  return {
    onShowLogin,
    onShowRegister,
    t,
  };
};
