import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form';

export type InputType = {
  register: UseFormRegisterReturn<string>;
  errors: FieldErrors<FieldValues>;
  name: string;
  title?: string;
  placeholder: string;
  type?: string;
  classNames?: string;
  value?: string;
  required?: boolean;
  shouldHide?: boolean;
};
