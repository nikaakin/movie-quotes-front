import { Fragment } from 'react';
import { useSearchField } from './useSearchField';
import { SearchIcon } from '@/components/Icons';

export const SearchField = () => {
  const { handleSearch, searchResults, searchValue, isSearchBarOn, t } =
    useSearchField();
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
        className={`text-white peer-checked/search-field:flex-1 cursor-pointer  z-20 
             peer-checked/search-field:w-full 
           sm:block ${isSearchBarOn ? '!block' : 'hidden'}}`}
      >
        <SearchIcon />

        <input
          name='search_field'
          id='search_field'
          type='text'
          placeholder={t('home.search')!}
          className='w-full'
          value={searchValue}
          onChange={handleSearch}
          hidden
        />
        <label htmlFor='search_field'>
          {t('home.enter')!}
          <span> @ </span>
          {t('home.enter_movies')!},{t('home.enter')!}
          <span> # </span>
          {t('home.enter_quotes')!}
        </label>

        {searchResults.length > 0 && (
          <div className='  peer-checked/search-field:text-red-500  '>
            eeee
            {searchResults.map((result) => (
              <div></div>
            ))}
          </div>
        )}
      </label>
    </Fragment>
  );
};
