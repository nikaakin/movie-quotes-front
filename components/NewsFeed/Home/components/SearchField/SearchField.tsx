import { Fragment } from 'react';
import { useSearchField } from './useSearchField';
import { ArrowIcon, Modal, QuotesDisplay, SearchIcon } from '@/components';

export const SearchField = ({
  isSearchActive,
}: {
  isSearchActive: boolean;
}) => {
  const {
    handleSearch,
    searchResults,
    searchValue,
    isFocused,
    handleFocus,
    onClose,
    locale,
    onQuoteView,
    currentModal,
    quote,
    onCloseModal,
    ref,
    isOutside,
    t,
  } = useSearchField({ isSearchActive });

  return (
    <Fragment>
      <div
        className={`sm:hidden hidden ${
          isSearchActive && '!block sm:!hidden'
        } fixed top-0 left-0 w-full h-full blur-0.75 bg-transparent opacity-50 z-40 `}
        onClick={onClose}
      ></div>
      {currentModal === 'quote-view' && quote && (
        <Modal onClose={onCloseModal} shouldHaveX={false} background='lg-main'>
          <QuotesDisplay
            onClose={onCloseModal}
            quote={quote}
            title={t('common:movie_show.view_quote')}
            commentPlaceholder={t('common:movie_show.comment')!}
          />
        </Modal>
      )}
      <div
        className='sm:relative w-full sm:h-full fixed  top-0 left-0  z-50 h-[80vh]'
        ref={ref}
      >
        <label
          htmlFor='search_field'
          className={`text-white  cursor-pointer w-full text-base h-full sm:text-xl  sm:h-fit transition-all  block  sm:relative bg-neutral-920 sm:bg-transparent
             ${!isSearchActive && 'hidden sm:block'}
             `}
        >
          <div className='sm:flex sm:items-center sm:gap-4 relative '>
            <div className='hidden sm:block'>
              <SearchIcon />
            </div>
            <div className='flex gap-6 sm:hidden cursor-pointer  items-center border-b border-white border-opacity-30 px-8 py-6 sm:px-0 sm:py-0'>
              <div onClick={onClose} className='h-6 flex items-center'>
                <ArrowIcon />
              </div>
              {!isFocused ? (
                <span
                  className='sm:hidden inline flex-1 text-left'
                  onClick={handleFocus.bind(null, true)}
                >
                  {t('home.search')}
                </span>
              ) : (
                <input
                  name='search_field'
                  id='search_field'
                  type='text'
                  className=' bg-transparent  focus:outline-none text-white  w-full '
                  value={searchValue}
                  onChange={handleSearch}
                />
              )}
            </div>
            {isSearchActive ? (
              isFocused ? (
                <input
                  name='search_field'
                  id='search_field'
                  type='text'
                  className='z-50 absolute top-0 left-8 bg-transparent  focus:outline-none text-white  w-full  hidden sm:!block pr-10 search'
                  value={searchValue}
                  onChange={handleSearch}
                  ref={(input) => input && input.focus()}
                />
              ) : (
                <div
                  className='text-gray-550 px-8 py-6 sm:px-0 sm:py-0 flex flex-col items-start gap-6 sm:block'
                  onClick={handleFocus.bind(null, true)}
                >
                  <span className='block sm:inline-block '>
                    {t('home.enter')!}
                    <span className='text-white'> @ </span>
                    {t('home.enter_movies')!}
                  </span>
                  <span className='hidden sm:inline'>,</span>
                  <span className='block sm:inline-block'>
                    {t('home.enter')!}
                    <span className='text-white'> # </span>
                    {t('home.enter_quotes')!}
                  </span>
                </div>
              )
            ) : (
              <span className=' whitespace-nowrap'>{t('home.search_by')}</span>
            )}
          </div>
        </label>

        {searchResults.length > 0 && (
          <label
            htmlFor='search_field'
            className={`absolute z-10 top-0 left-0  translate-y-12 bg-lg-main w-full max-h-full sm:max-h-60 overflow-auto  py-3  rounded-b-sm  ${
              isOutside && 'sm:hidden'
            }`}
          >
            {searchResults.map((quote) => (
              <div
                key={quote.id}
                className='flex items-center gap-4 hover:bg-white hover:bg-opacity-5 w-full pl-12 py-2 '
                onClick={onQuoteView.bind(null, quote)}
              >
                <h3>{quote?.quote[locale]}</h3>
              </div>
            ))}
          </label>
        )}
      </div>
    </Fragment>
  );
};
