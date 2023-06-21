import { PlusIcon, SearchIcon } from '@/components';
import { MovieListHeaderProps } from './type';

export const MovieListHeader = ({
  t,
  numberOfMovies,
}: MovieListHeaderProps) => {
  return (
    <div className='flex justify-between items-start mb-8'>
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center'>
        <h1 className='text-2xl font-medium '>{t('home:movie_list.title')}</h1>
        <h3 className='text-base sm:text-2xl font-normal sm:font-medium'>
          ({t('home:movie_list.total')} {numberOfMovies})
        </h3>
      </div>
      <div className='flex items-center sm:gap-8'>
        <button className='hidden sm:flex justify-center gap-2 items-center text-xl'>
          <SearchIcon />
          {t('home:movie_list.search')}
        </button>
        <button className='font-normal px-3 py-2 text-base sm:text-xl border rounded text-white border-red-650 border-solid bg-red-650'>
          <span className='flex justify-center gap-2 items-center'>
            <PlusIcon />
            {t('home:movie_list.add')}
          </span>
        </button>
      </div>
    </div>
  );
};
