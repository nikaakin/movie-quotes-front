import { useWatch } from 'react-hook-form';
import { useMovieInputType } from './type';

export const useMovieInput = ({
  getFieldState,
  name,
  control,
}: useMovieInputType) => {
  const { invalid, isDirty, error } = getFieldState(name);
  const fieldValue = useWatch({ name, control });

  return {
    fieldValue,
    invalid,
    isDirty,
    error,
  };
};
