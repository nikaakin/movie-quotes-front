import { TFunction } from 'next-i18next';
import { ChangeEvent } from 'react';

export type MovieListHeaderProps = {
  t: TFunction;
  numberOfMovies: number;
  searchValue: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};
