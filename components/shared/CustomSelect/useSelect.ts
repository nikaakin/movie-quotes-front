import { FieldError } from 'react-hook-form';
import { useSelectArgs } from './type';

type FieldErrorWithMessage = FieldError & { value: FieldError };

export const useSelect = <T>({ getFieldState, name }: useSelectArgs<T>) => {
  const { isDirty, error, invalid } = getFieldState(name);

  if (error && (error as FieldErrorWithMessage).value) {
    error['message'] = (error as FieldErrorWithMessage).value.message;
  }
  return {
    isDirty,
    error,
    invalid,
  };
};
