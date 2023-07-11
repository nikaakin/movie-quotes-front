import { Path, useWatch } from 'react-hook-form';
import { useTextAreaType } from './type';
import { useState } from 'react';

export const useTextArea = <T>({
  getFieldState,
  name,
  control,
}: useTextAreaType<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const { invalid, isDirty, error } = getFieldState(name as Path<T>);
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
