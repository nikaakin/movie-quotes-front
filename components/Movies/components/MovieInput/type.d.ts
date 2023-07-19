import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';

export type MovieInputType<T> = {
  register: UseFormRegisterReturn<FieldValues<T>>;
  name: string;
  englishTitle?: string;
  type?: string;
  classNames?: string;
  setValue?: UseFormSetValue<FieldValues<T>>;
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  control: Control<FieldValues<T>, any>;
  language?: string;
  georgianTitle?: string;
  isFontEnglish?: boolean;
};

export type useMovieInputType<T> = {
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  name: string;
  control: Control<FieldValues<T>, any>;
};
