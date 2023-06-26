import { fetchMovies } from '@/services';
import { RootState, setCurrentModal } from '@/state';
import { LocaleStringType, MovieType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useMovies = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const { t } = useTranslation(['home', 'movies']);
  const { locale } = useRouter();
  const { data: moviesData } = useQuery<MovieType[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    onSuccess: (data) => setFilteredMovies(data),
  });
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );
  const dispatch = useDispatch();

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
  const onAddMovieClick = () => dispatch(setCurrentModal('add-movie'));
  const onModalClose = () => dispatch(setCurrentModal(null));

  return {
    t,
    movies: filteredMovies,
    locale: locale as LocaleStringType,
    searchValue,
    onSearchChange,
    currentModal,
    onAddMovieClick,
    onModalClose,
  };
};
