import { movieFormType } from '@/types';
import { TFunction } from 'next-i18next';

export type MovieMutationProps = {
  t: TFunction;
  defaultValues?: movieFormType;
};
