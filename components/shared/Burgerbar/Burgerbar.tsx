import { HomeIcon, MovieCameraIcon, ProfileCard } from '@/components';
import Link from 'next/link';
import { BurgerbarProps } from './type';
import { Fragment } from 'react';
import { BurgerIcon } from '@/components';
import { useBurgerbar } from './useBurgerbar';

export const Burgerbar = ({
  shouldShowLinks = false,
  onLogout,
}: BurgerbarProps) => {
  const { isBurgerOpen, onBurgerBarClick, slug, image, username, pathname, t } =
    useBurgerbar();
  return (
    <div className={`${!shouldShowLinks && 'invisible -z-10'}`}>
      <button
        onClick={onBurgerBarClick.bind(null, true)}
        className='sm:hidden block'
      >
        <BurgerIcon />
      </button>

      <div
        className={` bg-transparent ${
          isBurgerOpen
            ? '!fixed block top-0 left-0 z-10  h-screen w-screen'
            : ''
        }`}
        onClick={onBurgerBarClick.bind(null, false)}
      ></div>
      <div
        className={`hidden sm:block  text-xl sm:text-2xl font-normal  sm:w-125  overflow-hidden ${
          isBurgerOpen
            ? '!flex fixed top-0 left-0 w-[90%] h-[90%] bg-neutral-950 z-20 '
            : ''
        }`}
      >
        <div className='absolute flex flex-col sm:top-32 top-11 left-0 w-96 gap-5'>
          {shouldShowLinks && (
            <Fragment>
              <div className='pl-11'>
                <ProfileCard
                  username={username!}
                  image={
                    <div
                      className={`bg-white rounded-[50%] w-10 h-10 sm:w-16 sm:h-16 shrink-0 overflow-hidden  border sm:border-[2px] ${
                        slug === 'profile'
                          ? 'border-red-650 '
                          : 'border-transparent '
                      }`}
                    >
                      <img
                        src={image}
                        alt='avatar'
                        className='object-fill w-full h-full'
                      />
                    </div>
                  }
                >
                  <Link
                    href={'/news-feed/profile'}
                    className='text-sm sm:text-base text-gray-350'
                    onClick={onBurgerBarClick.bind(null, false)}
                  >
                    {t('profile.edit')}
                  </Link>
                </ProfileCard>
              </div>
              <Link
                href='/news-feed/home'
                className='py-2 my-3 sm:my-0 sm:py-5  hover:bg-zinc-870 hover:bg-opacity-60 flex items-center gap-8 sm:gap-6 pl-11'
                onClick={onBurgerBarClick.bind(null, false)}
              >
                <HomeIcon isSelected={slug === 'home'} />
                <span>{t('header.news')}</span>
              </Link>
              <Link
                href='/news-feed/movies'
                className='py-3 sm:my-0 sm:py-5 hover:bg-zinc-870 hover:bg-opacity-60 flex items-center gap-8 sm:gap-6 pl-11'
                onClick={onBurgerBarClick.bind(null, false)}
              >
                <MovieCameraIcon
                  isSelected={slug === 'movies' || pathname.includes('movies')}
                />
                <span>{t('header.movies')}</span>
              </Link>
            </Fragment>
          )}
          <div className='block sm:hidden'>
            {username && (
              <button
                className='py-5 w-full text-start mb-2 hover:bg-zinc-870 hover:bg-opacity-60 pl-11 text-red-550'
                onClick={onLogout}
              >
                {t('button.logout_text')}
              </button>
            )}
            <div className='display flex flex-col gap-2'>
              <h1 className='mb-2 pl-11'>{t('header.language')}:</h1>
              <Link
                href='#'
                locale='en'
                className=' hover:bg-zinc-870 hover:bg-opacity-60 pl-11 py-2'
                onClick={onBurgerBarClick.bind(null, false)}
              >
                {t('locale.en')}
              </Link>
              <Link
                href='#'
                locale='ka'
                className=' hover:bg-zinc-870 hover:bg-opacity-60 pl-11 py-2'
                onClick={onBurgerBarClick.bind(null, false)}
              >
                {t('locale.ka')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
