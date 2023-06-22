import { RootState } from '@/state';
import { LocaleStringType } from '@/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const useMovies = () => {
  const { t } = useTranslation();
  const { movies } = useSelector((state: RootState) => state.user);
  const { locale } = useRouter();

  return {
    t,
    movies,
    locale: locale as LocaleStringType,
  };
};
