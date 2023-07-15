import { PlusIcon, SearchIcon } from '@/components';
import { MovieListHeaderProps } from './type';
import { useMovieListHeader } from './useMovieListHeader';

export const MovieListHeader = ({
  t,
  numberOfMovies,
  handleSearch,
  searchValue,
  onAddMovieClick,
}: MovieListHeaderProps) => {
  const { isSeachOpen, setIsSearchOpen } = useMovieListHeader();

  return (
    <div className='flex justify-between items-start mb-8 gap-4'>
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center'>
        <h1 className='text-xl sm:text-2xl font-medium '>
          {t('home:movie_list.title')}
        </h1>
        <h3 className='text-base sm:text-2xl font-normal sm:font-medium'>
          ({t('home:movie_list.total')} {numberOfMovies})
        </h3>
      </div>
      <div className='flex items-center sm:gap-8 flex-1 justify-end '>
        <label
          className={`text-gray-350 hidden sm:flex justify-center gap-2 items-center text-xl cursor-pointer ${
            isSeachOpen &&
            'flex-1  border-b border-white border-opacity-30 pb-2'
          } `}
          htmlFor='search_field'
          onClick={setIsSearchOpen.bind(null, !isSeachOpen)}
        >
          <SearchIcon />
          {isSeachOpen ? (
            <input
              name='search_field'
              id='search_field'
              type='text'
              className='bg-transparent w-full focus:outline-none text-white sm:inline-block  '
              value={searchValue}
              onChange={handleSearch}
              onClick={(e) => e.stopPropagation()}
              placeholder='Search'
            />
          ) : (
            t('home:movie_list.search')
          )}
        </label>
        <button
          onClick={onAddMovieClick}
          className='font-normal px-3 py-2 text-sm sm:text-xl border rounded text-white border-red-650 border-solid bg-red-650'
        >
          <span className='flex justify-center gap-2 items-center'>
            <PlusIcon />
            {t('home:movie_list.add')}
          </span>
        </button>
      </div>
    </div>
  );
};
