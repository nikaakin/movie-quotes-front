import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormSetValue,
} from 'react-hook-form';

export type MovieTextAreaType = {
  name: string;
  title?: string;
  setValue?: UseFormSetValue<FieldValues>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  control: Control<FieldValues, any>;
  language?: string;
};

export type useMovieTextAreaType = {
  getFieldState: UseFormGetFieldState<FieldValues>;
  name: string;
  control: Control<FieldValues, any>;
};
