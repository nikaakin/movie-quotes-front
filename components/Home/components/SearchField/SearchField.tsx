import { Fragment } from 'react';
import { useSearchField } from './useSearchField';
import {
  ArrowIcon,
  Modal,
  QuoteMutateModal,
  QuotesDisplay,
  SearchIcon,
} from '@/components';

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
    onDelete,
    onQuoteEdit,
    t,
    inputRef,
    searchValBigScreen,
    handleSearchBigScreen,
    onSearchSubmit,
    ref,
  } = useSearchField({ isSearchActive });

  return (
    <Fragment>
      <div
        className={`sm:hidden hidden ${
          isSearchActive && '!block sm:!hidden'
        } fixed top-0 left-0 w-full h-full blur-0.75 bg-lg-main opacity-50 z-40 `}
        onClick={onClose}
      ></div>
      {currentModal && !currentModal.includes('notification') && (
        <div onClick={(e) => e.stopPropagation()}>
          <Modal
            onClose={onCloseModal}
            shouldHaveX={false}
            background='lg-modals opacity-70 backdrop-blur-sm'
          >
            {currentModal === 'quote-view' ? (
              <QuotesDisplay
                onClose={onCloseModal}
                quote={quote!}
                title={t('common:movie_show.view_quote')}
                commentPlaceholder={t('common:movie_show.comment')!}
                onQuoteDelete={onDelete}
                onQuoteEdit={onQuoteEdit}
              />
            ) : currentModal === 'edit-quote' ? (
              <QuoteMutateModal
                defaultImage={quote?.image || ''}
                defaultQuoteEng={quote?.quote['en']}
                defaultQuoteGeo={quote?.quote['ka']}
                movieId={quote?.movie_id + ''}
                quoteId={quote?.id}
              />
            ) : currentModal === 'add-quote' ? (
              <QuoteMutateModal />
            ) : null}
          </Modal>
        </div>
      )}
      <div
        className={`sm:relative w-full sm:h-full fixed top-0 left-0  h-[80vh] ${
          isSearchActive ? 'z-50' : '-z-10 sm:z-0'
        }`}
        ref={ref}
      >
        <label
          htmlFor='search_field'
          className={`text-white   cursor-pointer w-full text-base h-full sm:text-xl  sm:h-fit transition-all  block  sm:relative bg-neutral-920 sm:bg-transparent
             ${!isSearchActive && 'hidden sm:block'}
             `}
        >
          <div className='sm:flex sm:items-center sm:gap-4 relative w-full '>
            <div
              className='hidden sm:block'
              onClick={handleFocus.bind(null, true)}
            >
              <SearchIcon />
            </div>
            <div className='flex gap-6 sm:hidden cursor-pointer  items-center border-b border-white border-opacity-30 px-8 sm:px-0 sm:py-0 '>
              <div onClick={onClose} className='h-6 flex items-center'>
                <ArrowIcon />
              </div>
              {!isFocused ? (
                <Fragment>
                  <span
                    className='sm:hidden inline flex-1 text-left  py-6 sm:py-0'
                    onClick={handleFocus.bind(null, true)}
                  >
                    {t('home.search')}
                  </span>
                </Fragment>
              ) : (
                <input
                  name='search_field'
                  id='search_field'
                  type='text'
                  className=' bg-transparent  focus:outline-none text-white  w-full py-6 sm:py-0'
                  value={searchValue}
                  onChange={handleSearch}
                />
              )}
            </div>
            {!isFocused && (
              <div
                onClick={handleFocus.bind(null, true)}
                className='sm:hidden flex text-gray-550 px-16 py-6  flex-col items-start gap-6 text-left'
              >
                <span className='block '>
                  {t('home.enter')!}
                  <span className='text-white'> @ </span>
                  {t('home.enter_movies')!}
                </span>
                <span className='block'>
                  {t('home.enter')!}
                  <span className='text-white'> # </span>
                  {t('home.enter_quotes')!}
                </span>
              </div>
            )}
            {isSearchActive ? (
              <form onSubmit={onSearchSubmit}>
                <input
                  name='search_field'
                  id='search_field'
                  type='text'
                  className='z-50 absolute top-0 left-8 bg-transparent  focus:outline-none text-white  w-full  hidden sm:!block search '
                  value={searchValBigScreen}
                  onChange={handleSearchBigScreen}
                  ref={inputRef}
                  placeholder={t('home.placeholder')!}
                />
              </form>
            ) : (
              <span className=' whitespace-nowrap'>{t('home.search_by')}</span>
            )}
          </div>
        </label>

        {searchResults.length > 0 && (
          <label
            htmlFor='search_field'
            className='absolute z-10 top-7 left-0 translate-y-12 bg-lg-main w-full max-h-full  overflow-auto  py-3  rounded-b-sm sm:hidden'
          >
            {searchResults.map((quote) => (
              <div
                key={quote.id}
                className='flex items-center gap-4 hover:bg-white hover:bg-opacity-5 w-full px-4 py-2 text-left break-all'
                onClick={onQuoteView.bind(null, quote)}
              >
                <h3>
                  {quote?.quote[locale].length > 100
                    ? quote?.quote[locale].slice(0, 100) + '...'
                    : quote?.quote[locale]}
                </h3>
              </div>
            ))}
          </label>
        )}
      </div>
    </Fragment>
  );
};
