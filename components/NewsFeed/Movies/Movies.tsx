import { MovieListHeader } from '@/components';
import { useMovies } from './useMovies';

export const Movies = () => {
  const { t, movies } = useMovies();

  return (
    <div className='flex-1 px-10 sm:px-16 pt-4 sm:pt-8 pb-52'>
      <MovieListHeader t={t} numberOfMovies={movies?.length} />
    </div>
  );
};
