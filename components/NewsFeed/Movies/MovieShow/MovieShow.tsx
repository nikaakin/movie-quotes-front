import { PencilIcon, PlusIcon, TrashBinIcon } from '@/components';
import { useMovieShow } from './useMovieShow';

export const MovieShow = () => {
  const { movie, t, locale } = useMovieShow();
  return (
    <div className='flex-1 px-8 sm:pl-0 sm:pr-16 pt-4 sm:pt-8 pb-52 text-white'>
      <h1 className='text-2xl font-medium hidden sm:block mb-8'>
        {t('common:movie_show.title')}
      </h1>
      <div className='flex sm:gap-5 gap-6 flex-col sm:flex-row sm:pt-0 pt-5 sm:mb-10 mb-8'>
        <div className='w-full sm:w-200 sm:h-107 h-72  '>
          <img
            src={movie?.image}
            alt='movie'
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div>
          <div className='flex sm:justify-between sm:flex-row flex-col mb-6 gap-3'>
            <h3 className='text-2xl text-orange-250 font-medium '>
              {movie?.title[locale]} ({movie?.year})
            </h3>
            <div className='bg-zinc-870 bg-opacity-60 rounded-[10px] px-7 py-3 w-fit flex'>
              <button className='pr-6 border-r-gray-350 border-r flex items-center '>
                <PencilIcon />
              </button>
              <button className='pl-6 flex items-center'>
                <TrashBinIcon />
              </button>
            </div>
          </div>
          <div className='text-lg font-bold flex gap-2 flex-wrap mb-5'>
            {movie?.genres.map((genre) => (
              <span
                key={genre.id}
                className='bg-gray-550 px-3 py-1 rounded-[4px]'
              >
                {genre.genre[locale]}
              </span>
            ))}
          </div>
          <div className='mb-5'>
            <span className='text-gray-350 text-lg font-bold'>
              {t('common:movie_show.director')}
            </span>
            :
            <span className='text-lg font-medium pl-3'>
              {movie?.director[locale]}
            </span>
          </div>
          <p className='text-gray-350 text-lg'>{movie?.description[locale]}</p>
        </div>
      </div>
      <div className='flex sm:gap-4 gap-9 flex-col sm:flex-row relative sm:items-center'>
        <h3 className='text-2xl  order-2 sm:-order-1 '>
          {t('common:movie_show.quotes')}{' '}
          <span className='text-base sm:text-2xl block sm:inline'>
            ({t('common:movie_show.total')} {movie?.quotes.length})
          </span>
        </h3>
        <hr className='bg-zinc-650 sm:bg-gray-550 sm:w-[1px] order-1 sm:h-7 w-full h-[1px]  border-none' />
        <button
          // onClick={onAddMovieClick}
          className='w-fit -order-1 sm:order-2 font-normal px-3 py-2 text-base sm:text-xl border rounded text-white border-red-650 border-solid bg-red-650'
        >
          <span className='flex justify-center gap-2 items-center'>
            <PlusIcon />
            {t('common:movie_show.add_movie')}
          </span>
        </button>
      </div>
    </div>
  );
};
