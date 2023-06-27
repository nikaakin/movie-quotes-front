import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';

export type MovieInputType = {
  register: UseFormRegisterReturn<string>;
  name: string;
  title?: string;
  type?: string;
  classNames?: string;
  setValue?: UseFormSetValue<FieldValues>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  control: Control<FieldValues, any>;
  language?: string;
};

export type useMovieInputType = {
  getFieldState: UseFormGetFieldState<FieldValues>;
  name: string;
  control: Control<FieldValues, any>;
};
