import React from 'react';
import { Dropdown } from './components';
import { Button, Login, Modal, Registration } from '@/components';
import { useHeader } from './useHeader';

export const Header = () => {
  const { onShowLoginChange, onShowRegisterChange, showLogin, showRegister } =
    useHeader();

  return (
    <header className='py-6 sm:py-8 sm:px-16 px-4 flex justify-between w-full text-white'>
      {showRegister && (
        <Modal onClose={onShowRegisterChange}>
          <Registration />
        </Modal>
      )}
      {showLogin && (
        <Modal onClose={onShowLoginChange}>
          <Login />
        </Modal>
      )}
      <h1 className='uppercase text-orange-250 text-base font-medium '>
        Movies Quotes
      </h1>
      <div className='flex flex-row justify-between gap-2 sm:gap-4'>
        <Dropdown />
        <Button
          content='Log in'
          isTransparent
          classes='sm:px-6 sm:py-2 px-2 py-1'
          onClick={onShowLoginChange}
        />
        <Button
          content='Sign Up'
          classes='sm:px-6 sm:py-2 px-2 py-1'
          onClick={onShowRegisterChange}
        />
      </div>
    </header>
  );
};
