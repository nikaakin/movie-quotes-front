import { useState } from 'react';

export const useDropdown = () => {
  const [show, setShow] = useState(false);

  return { show, setShow };
};
