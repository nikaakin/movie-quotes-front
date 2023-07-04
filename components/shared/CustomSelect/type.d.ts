import { QuoteMutationSelectType, ReactSelectStylesType } from '@/styles';
import { Control, FieldValues, UseFormGetFieldState } from 'react-hook-form';

export type SelectProps<T> = {
  name: string;
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  control: Control<FieldValues<T>, any>;
  placeholder: string;
  options: {
    label: string;
    value: number;
  }[];
  styles: (_: string) => ReactSelectStylesType | QuoteMutationSelectType;
  shouldHaveIndicator?: boolean;
  isMulti?: boolean;
};

export type useSelectArgs<T> = {
  getFieldState: UseFormGetFieldState<FieldValues<T>>;
  name: string;
};
