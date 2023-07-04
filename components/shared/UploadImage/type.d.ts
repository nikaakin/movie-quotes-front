import { TFunction } from 'next-i18next';
import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export type UploadImageProps<T> = {
  t: TFunction;
  isSplit?: boolean;
  image?: string;
  register: UseFormRegister<FieldValues<T>>;
  setValue: UseFormSetValue<FieldValues<T>>;
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  control: Control<FieldValues<T>, any>;
};

export type useUploadImageProps<T> = {
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  control: Control<FieldValues<T>, any>;
  setValue: UseFormSetValue<FieldValues<T>>;
};
