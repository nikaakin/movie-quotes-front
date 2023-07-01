import { showMovie } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const useMovieShow = () => {
  const {
    query: { movieId },
    locale,
  } = useRouter();
  const { t } = useTranslation(['common', 'modals']);

  const { data: movie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => showMovie(movieId as string),
    enabled: false,
  });

  return {
    locale: locale as 'en' | 'ka',
    movie,
    t,
  };
};
