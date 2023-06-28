import { Control, FieldValues, UseFormGetFieldState } from 'react-hook-form';

export type SelectProps = {
  name: string;
  getFieldState: UseFormGetFieldState<FieldValues>;
  control: Control<FieldValues, any>;
  placeholder: string;
  options: {
    label: string;
    value: number;
  }[];
};

export type useSelectArgs = {
  getFieldState: UseFormGetFieldState<FieldValues>;
  name: string;
};
