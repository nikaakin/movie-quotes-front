import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormSetValue,
} from 'react-hook-form';

export type TextAreaType = {
  name: string;
  title?: string;
  setValue?: UseFormSetValue<FieldValues>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  control: Control<FieldValues, any>;
  language?: string;
  defaultValue?: string;
};

export type useTextAreaType = {
  getFieldState: UseFormGetFieldState<FieldValues>;
  name: string;
  control: Control<FieldValues, any>;
};
