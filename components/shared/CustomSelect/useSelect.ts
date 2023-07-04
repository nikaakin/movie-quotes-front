import { useSelectArgs } from './type';

export const useSelect = <T>({ getFieldState, name }: useSelectArgs<T>) => {
  const { isDirty, error, invalid } = getFieldState(name);

  return {
    isDirty,
    error,
    invalid,
  };
};
