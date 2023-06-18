import React, { Fragment } from 'react';
import { Dropdown } from './components';
import { BellIcon, Burgerbar, Button, SearchIcon } from '@/components';
import { useHeader } from './useHeader';
import Link from 'next/link';

export const Header = ({ shouldhavelinks = false }) => {
  const {
    t,
    onShowLogin,
    onShowRegister,
    isSignedIn,
    onLogout,
    slug,
    onSearchBarClick,
  } = useHeader();
  return (
    <header
      className={`py-6  sm:px-16 px-9 flex justify-between w-full text-white max-h-22 items-center ${
        isSignedIn ? 'bg-zinc-850 bg-opacity-80' : ''
      }`}
    >
      <Link href='/' className='hidden sm:block'>
        <h1 className='uppercase text-orange-250 text-base font-medium '>
          movie quotes
        </h1>
      </Link>
      <Burgerbar shouldShowLinks={shouldhavelinks} onLogout={onLogout} />
      <div className='flex flex-row justify-between gap-2 sm:gap-4'>
        {isSignedIn ? (
          <Fragment>
            {slug === 'home' && (
              <button onClick={onSearchBarClick}>
                <SearchIcon />
              </button>
            )}
            <button>
              <BellIcon />
            </button>
          </Fragment>
        ) : null}
        <Dropdown />
        {isSignedIn ? (
          <Fragment>
            <Button
              content={t('button.logout_text')}
              classes='sm:px-6 py-1 px-3 hidden sm:block'
              onClick={onLogout}
              isTransparent
            />
          </Fragment>
        ) : (
          <Fragment>
            <Button
              content={t('button.login_text')}
              isTransparent
              classes='sm:px-6 py-1 px-3'
              onClick={onShowLogin}
            />
            <Button
              content={t('button.register_text')}
              classes='sm:px-6 py-1 px-3'
              onClick={onShowRegister}
            />
          </Fragment>
        )}
      </div>
    </header>
  );
};
