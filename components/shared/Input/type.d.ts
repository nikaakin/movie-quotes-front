import {
  Control,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';

export type InputType = {
  register: UseFormRegisterReturn<string>;
  name: string;
  title?: string;
  placeholder: string;
  type?: string;
  classNames?: string;
  value?: string;
  required?: boolean;
  shouldHide?: boolean;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  control: Control<FieldValues, any>;
};

export type useInputType = {
  shouldHide: boolean;
  type: string;
  getFieldState: UseFormGetFieldState<FieldValues>;
  name: string;
  control: Control<FieldValues, any>;
};
