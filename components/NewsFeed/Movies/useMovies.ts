import { useUserQuery } from '@/hooks';
import { fetchMovies, isAuthenticated } from '@/services';
import { LocaleStringType, MovieType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useMovies = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const { t } = useTranslation();
  const { locale, push } = useRouter();
  const { data } = useUserQuery({
    queryFn: isAuthenticated,
    onError: () => push('/'),
  });
  const { data: moviesData } = useQuery<MovieType[]>({
    queryKey: ['movies'],
    queryFn: async () =>
      new Promise(async (resolve, reject) => {
        try {
          const moviesResponse = await fetchMovies(data?.username as string);
          resolve(moviesResponse.data.movies);
        } catch (e) {
          reject(e);
        }
      }),
    onSuccess: (data) => setFilteredMovies(data),
    enabled: !!data?.username,
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value === '') return setFilteredMovies(moviesData as MovieType[]);
    const filteredMoviesInEnglish =
      moviesData?.filter((movie) =>
        movie.title['en'].toLowerCase().includes(value.toLowerCase())
      ) || [];
    const filteredMoviesInGeorgian =
      moviesData?.filter((movie) => movie.title['ka'].includes(value)) || [];

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
