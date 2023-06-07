import React from 'react';
import { Dropdown } from './components';
import { Button } from '@/components';
import { useHeader } from './useHeader';

export const Header = () => {
  const { t, onShowLogin, onShowRegister } = useHeader();

  return (
    <header className='py-6 sm:py-8 sm:px-16 px-4 flex justify-between w-full text-white'>
      <h1 className='uppercase text-orange-250 text-base font-medium '>
        movie quotes
      </h1>
      <div className='flex flex-row justify-between gap-2 sm:gap-4'>
        <Dropdown />
        <Button
          content={t('button.login_text')}
          isTransparent
          classes='sm:px-6 sm:py-2 px-2 py-1'
          onClick={onShowLogin}
        />
        <Button
          content={t('button.register_text')}
          classes='sm:px-6 sm:py-2 px-2 py-1'
          onClick={onShowRegister}
        />
      </div>
    </header>
  );
};
