import { Fragment } from 'react';
import { useSearchField } from './useSearchField';
import { SearchIcon } from '@/components/Icons';
import { translationType } from '@/types/translationType';


export const SearchField = () => {
  const {
    handleSearch,
    searchResults,
    searchValue,
    placeholderTextForDesktop,
    isSearchBarOn,
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
        className={`text-white peer-checked/search-field:flex-1 cursor-pointer transition-all z-20 
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
        <label htmlFor='search_field'>{placeholderTextForDesktop}</label>

        {searchResults.length > 0 && (
          <div className=' w-full bg-white rounded-md shadow-md z-20'>
            {searchResults.map((result) => (
              <div
                key={result.id}
                className='flex flex-row justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
                <p className='text-sm'>{result.title}</p>
                <p className='text-sm'>{result.year}</p>
              </div>
            ))}
          </div>
        )}
      </label>
    </Fragment>
  );
};
