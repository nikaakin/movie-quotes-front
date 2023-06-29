import { useWatch } from 'react-hook-form';
import { useTextAreaType } from './type';
import { useState } from 'react';

export const useTextArea = ({
  getFieldState,
  name,
  control,
}: useTextAreaType) => {
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
