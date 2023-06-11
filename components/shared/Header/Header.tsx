import React, { Fragment } from 'react';
import { Dropdown } from './components';
import { BellIcon, Button } from '@/components';
import { useHeader } from './useHeader';
import Link from 'next/link';

export const Header = () => {
  const { t, onShowLogin, onShowRegister, isSignedIn, onLogout } = useHeader();

  return (
    <header
      className={`py-6  sm:px-16 px-4 flex justify-between w-full text-white max-h-22 items-center ${
        isSignedIn ? 'bg-zinc-850 bg-opacity-80' : ''
      }`}
    >
      <Link href='/'>
        <h1 className='uppercase text-orange-250 text-base font-medium '>
          movie quotes
        </h1>
      </Link>
      <div className='flex flex-row justify-between gap-2 sm:gap-4'>
        {isSignedIn ? (
          <button>
            <BellIcon />
          </button>
        ) : null}
        <Dropdown />
        {isSignedIn ? (
          <Fragment>
            <Button
              content={t('button.logout_text')}
              classes='sm:px-6 '
              onClick={onLogout}
              isTransparent
            />
          </Fragment>
        ) : (
          <Fragment>
            <Button
              content={t('button.login_text')}
              isTransparent
              classes='sm:px-6 '
              onClick={onShowLogin}
            />
            <Button
              content={t('button.register_text')}
              classes='sm:px-6 '
              onClick={onShowRegister}
            />
          </Fragment>
        )}
      </div>
    </header>
  );
};
