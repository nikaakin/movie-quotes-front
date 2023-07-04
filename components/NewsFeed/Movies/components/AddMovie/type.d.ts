import { movieFormType } from '@/types/movieFormType';
import { TFunction } from 'next-i18next';
import { ZodObject } from 'zod';

export type addMovieProps<T> = {
  t: TFunction;
  defaultValues?: movieFormType;
  schema: (t: TFunction) => ZodObject<T>;
};
