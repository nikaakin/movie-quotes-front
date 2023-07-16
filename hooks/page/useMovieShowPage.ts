import { useRouter } from 'next/router';
import { useUserQuery } from '../useUserQuery';
import { isAuthenticated, showMovie } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useMovieShowPage = () => {
  const {
    push,
    query: { movieId },
    isFallback,
  } = useRouter();
  const { isFetching } = useUserQuery({
    onError: () => push('/unauthorized'),
    queryFn: isAuthenticated,
    enabled: !isFallback,
  });
  const { isFetched: isMovieFetched, isError: isMovieError } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => showMovie(movieId as string),
    onError: () => {
      push('/404');
    },
    retry: false,
    enabled: !!movieId,
  });
  return { isFetching, isFallback, isMovieFetched, isMovieError };
};
