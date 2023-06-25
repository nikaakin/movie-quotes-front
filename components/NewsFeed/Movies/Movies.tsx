import { MovieCard, MovieListHeader } from '@/components';
import { useMovies } from './useMovies';

export const Movies = () => {
  const { t, movies, locale, onSearchChange, searchValue } = useMovies();
  return (
    <div className='flex-1 px-8 sm:pl-0 sm:pr-16 pt-4 sm:pt-8 pb-52 '>
      <MovieListHeader
        t={t}
        numberOfMovies={movies?.length || 0}
        searchValue={searchValue}
        handleSearch={onSearchChange}
      />
      <div className='grid sm:grid-cols-3 gap-y-12'>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} locale={locale} />
        ))}
      </div>
    </div>
  );
};
