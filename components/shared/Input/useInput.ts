import { useState } from 'react';

export const useInput = (shouldHide: boolean, type: string) => {
  const [isHidden, setIsHidden] = useState(shouldHide);
  const typeOfInput = shouldHide ? (isHidden ? 'password' : 'text') : type;

  const onEyeClick = () => setIsHidden((prev) => !prev);

  return { typeOfInput, onEyeClick };
};
