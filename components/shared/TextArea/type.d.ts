import {
  Control,
  FieldValues,
  Path,
  UseFormGetFieldState,
  UseFormSetValue,
} from 'react-hook-form';

export type TextAreaType<T> = {
  name: Path<T>;
  title?: string;
  setValue?: UseFormSetValue<FieldValues<T>>;
  getFieldState: UseFormGetFieldState<T>;
  control: Control<FieldValues<T>, any>;
  language?: string;
  defaultValue?: string;
};

export type useTextAreaType<T> = {
  getFieldState: UseFormGetFieldState<T>;
  name: Path<T>;
  control: Control<FieldValues<T>, any>;
};
