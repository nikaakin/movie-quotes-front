import React, { Fragment } from 'react';

import { Dropdown } from './components';
import { Burgerbar, Button, SearchIcon, Notification } from '@/components';
import { useHeader } from './useHeader';
import Link from 'next/link';

export const Header = ({ shouldhavelinks = false }) => {
  const {
    t,
    onShowLogin,
    onShowRegister,
    username,
    onLogout,
    slug,
    onSearchBarClick,
  } = useHeader();

  return (
    <header
      className={`py-6  sm:px-16  flex justify-between w-full text-white max-h-22 items-center ${
        shouldhavelinks ? 'px-8' : 'px-4'
      } ${username && 'bg-zinc-850 bg-opacity-80'}`}
    >
      <Link
        href='/'
        className={`hidden sm:block ${!shouldhavelinks && '!block'}`}
      >
        <h1 className='uppercase text-orange-250 text-base font-medium '>
          movie quotes
        </h1>
      </Link>
      <Burgerbar shouldShowLinks={shouldhavelinks} onLogout={onLogout} />
      <div className='flex flex-row justify-between gap-2 sm:gap-4'>
        {username ? (
          <Fragment>
            {slug === 'home' && (
              <button
                onClick={onSearchBarClick}
                className='block sm:hidden mr-4'
              >
                <SearchIcon />
              </button>
            )}
            <Notification />
          </Fragment>
        ) : null}
        <Dropdown />
        {username ? (
          <Fragment>
            <Button
              content={t('button.logout_text')}
              classes='sm:px-6 py-1 px-3 hidden sm:block'
              onClick={onLogout}
              isTransparent
            />
          </Fragment>
        ) : (
          <div className='flex gap-2 sm:gap-4'>
            <Button
              content={t('button.login_text')}
              isTransparent
              classes='sm:px-6 py-1 px-3 sm:order-1'
              onClick={onShowLogin}
            />
            <Button
              content={t('button.register_text')}
              classes='sm:px-6 py-1 px-3'
              onClick={onShowRegister}
            />
          </div>
        )}
      </div>
    </header>
  );
};
