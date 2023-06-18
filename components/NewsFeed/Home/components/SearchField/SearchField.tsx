import { Fragment } from 'react';
import { useSearchField } from './useSearchField';
import { SearchIcon } from '@/components/Icons';
import { translationType } from '@/types/translationType';

export const SearchField = ({ t }: translationType) => {
  const { handleSearch, searchResults, searchValue } = useSearchField();

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
        className='text-white peer-checked/search-field:flex-1 cursor-pointer transition-all z-[500] 
             peer-checked/search-field:w-full
             hidden sm:block'
      >
        <SearchIcon />

        <input
          type='text'
          placeholder={t('home.search')!}
          className='w-full'
          value={searchValue}
          onChange={handleSearch}
        />

        {searchResults.length > 0 && (
          <div className='absolute top-14 w-full bg-white rounded-md shadow-md z-[500]'>
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
