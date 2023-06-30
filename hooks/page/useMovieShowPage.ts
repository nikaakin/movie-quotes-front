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
  const { data } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => showMovie(movieId as string),
    enabled: !!movieId,
  });

  return { isFetching, movie: data, isFallback };
};
