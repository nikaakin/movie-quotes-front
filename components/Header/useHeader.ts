import { useState } from 'react';

export const useHeader = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const onShowRegisterChange = () => setShowRegister(!showRegister);
  const onShowLoginChange = () => setShowLogin(!showLogin);
  return {
    showRegister,
    onShowRegisterChange,
    showLogin,
    onShowLoginChange,
  };
};
