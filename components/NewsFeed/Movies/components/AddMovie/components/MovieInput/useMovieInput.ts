import { useWatch } from 'react-hook-form';
import { useMovieInputType } from './type';
import { useState } from 'react';

export const useMovieInput = <T>({
  getFieldState,
  name,
  control,
}: useMovieInputType<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const { invalid, isDirty, error } = getFieldState(name);
  const fieldValue = useWatch({ name, control });

  return {
    fieldValue,
    invalid,
    isDirty,
    error,
    isFocused,
    setIsFocused,
  };
};
