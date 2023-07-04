import {
  Control,
  FieldValues,
  Path,
  UseFormGetFieldState,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';

export type MovieInputType<T> = {
  register: UseFormRegisterReturn<FieldValues<T>>;
  name: Path<T>;
  title?: string;
  type?: string;
  classNames?: string;
  setValue?: UseFormSetValue<FieldValues<T>>;
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  control: Control<FieldValues<T>, any>;
  language?: string;
};

export type useMovieInputType<T> = {
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  name: Path<T>;
  control: Control<FieldValues<T>, any>;
};
