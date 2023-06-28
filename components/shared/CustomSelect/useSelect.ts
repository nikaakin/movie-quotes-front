import { useSelectArgs } from './type';

export const useSelect = ({ getFieldState, name }: useSelectArgs) => {
  const { isDirty, error, invalid } = getFieldState(name);

  return {
    isDirty,
    error,
    invalid,
  };
};
