import { RootState } from '@/state';
import { LocaleStringType } from '@/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useMovies = () => {
  const { t } = useTranslation();
  const { movies } = useSelector((state: RootState) => state.user);
  const { locale } = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value === '') return setFilteredMovies(movies);
    const filteredMoviesInEnglish = movies.filter((movie) =>
      movie.title['en'].toLowerCase().includes(value.toLowerCase())
    );
    const filteredMoviesInGeorgian = movies.filter((movie) =>
      movie.title['ka'].includes(value)
    );

    setFilteredMovies([
      ...filteredMoviesInEnglish,
      ...filteredMoviesInGeorgian,
    ]);
  };

  return {
    t,
    movies: filteredMovies,
    locale: locale as LocaleStringType,
    searchValue,
    onSearchChange,
  };
};
