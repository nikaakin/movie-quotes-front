import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useHeader = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useTranslation('common');
  const onShowRegisterChange = () => setShowRegister(!showRegister);
  const onShowLoginChange = () => setShowLogin(!showLogin);
  return {
    showRegister,
    onShowRegisterChange,
    showLogin,
    onShowLoginChange,
    t,
  };
};
