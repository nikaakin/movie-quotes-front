import { RootState } from '@/state';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

export const useMovies = () => {
  const { t } = useTranslation();
  const { movies } = useSelector((state: RootState) => state.user);

  return {
    t,
    movies,
  };
};
