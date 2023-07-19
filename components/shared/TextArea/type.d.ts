import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormSetValue,
} from 'react-hook-form';

export type TextAreaType<T> = {
  name: string;
  title?: string;
  setValue?: UseFormSetValue<FieldValues<T>>;
  getFieldState: UseFormGetFieldState<T>;
  control: Control<FieldValues<T>, any>;
  language?: string;
  defaultValue?: string;
  labelShouldStay?: boolean;
  isEnglishFont?: boolean;
};

export type useTextAreaType<T> = {
  getFieldState: UseFormGetFieldState<T>;
  name: string;
  control: Control<FieldValues<T>, any>;
};
