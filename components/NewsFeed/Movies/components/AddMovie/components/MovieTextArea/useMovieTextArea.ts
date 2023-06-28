import { useWatch } from 'react-hook-form';
import { useMovieTextAreaType } from './type';
import { useState } from 'react';

export const useMovieTextArea = ({
  getFieldState,
  name,
  control,
}: useMovieTextAreaType) => {
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