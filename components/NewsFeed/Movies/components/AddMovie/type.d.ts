import { movieFormType } from '@/types/movieFormType';
import { TFunction } from 'next-i18next';

export type addMovieProps = {
  t: TFunction;
  defaultValues?: movieFormType;
};
