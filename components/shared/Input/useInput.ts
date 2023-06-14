import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useInputType } from './type';

export const useInput = ({
  getFieldState,
  name,
  shouldHide,
  type,
  control,
}: useInputType) => {
  const [isHidden, setIsHidden] = useState(shouldHide);
  const typeOfInput = shouldHide ? (isHidden ? 'password' : 'text') : type;
  const { invalid, isDirty, error } = getFieldState(name);
  const fieldValue = useWatch({ name, control });

  const onEyeClick = () => setIsHidden((prev) => !prev);

  return {
    typeOfInput,
    onEyeClick,
    isHidden,
    fieldValue,
    invalid,
    isDirty,
    error,
  };
};
