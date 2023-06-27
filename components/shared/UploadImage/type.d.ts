import { TFunction } from 'next-i18next';
import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export type UploadImageProps = {
  t: TFunction;
  isSplit?: boolean;
  image?: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  control: Control<FieldValues, any>;
};

export type useUploadImageProps = {
  getFieldState: UseFormGetFieldState<FieldValues>;
  control: Control<FieldValues, any>;
  setValue: UseFormSetValue<FieldValues>;
};
