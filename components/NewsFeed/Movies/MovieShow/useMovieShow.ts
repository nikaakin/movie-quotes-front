import { showMovie } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { RootState, setCurrentModal } from '@/state';
import { useDispatch, useSelector } from 'react-redux';

export const useMovieShow = () => {
  const {
    query: { movieId },
    locale,
  } = useRouter();
  const { t } = useTranslation(['common', 'modals']);
  const dispatch = useDispatch();
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );

  const onModalChange = (modal: string | null) =>
    dispatch(setCurrentModal(modal));

  const { data: movie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => showMovie(movieId as string),
    enabled: false,
  });

  return {
    locale: locale as 'en' | 'ka',
    movie,
    onModalChange,
    currentModal,
    t,
  };
};
