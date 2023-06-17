import { Fragment } from 'react';
import { SearchFieldProps } from './type';
import { useSearchField } from './useSearchField';

export const SearchField = ({
  shouldAppearOnMobile = false,
}: SearchFieldProps) => {
  const {
    handleSearch,
    searchResults,
    searchValue,
    placeholderTextForDesktop,
    t,
  } = useSearchField();

  return (
    <Fragment>
      <input
        type='radio'
        name='home_header'
        id='search_field'
        className='peer/search-field'
        hidden
      />
      <label
        htmlFor='search_field'
        className={`text-white peer-checked/search-field:flex-1 cursor-pointer transition-all z-[500] ${
          shouldAppearOnMobile
            ? 'sm:hidden peer-checked/search-field:w-full'
            : 'hidden sm:block'
        }`}
      >
        {shouldAppearOnMobile ? (
          <input
            type='text'
            placeholder={t('home.search')!}
            className='w-full'
          />
        ) : (
          <input
            type='text'
            placeholder={placeholderTextForDesktop}
            className=''
          />
        )}
      </label>
    </Fragment>
  );
};
