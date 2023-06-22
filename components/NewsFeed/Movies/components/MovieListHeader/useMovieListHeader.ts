import { useState } from 'react';

export const useMovieListHeader = () => {
  const [isSeachOpen, setIsSearchOpen] = useState(false);

  return { isSeachOpen, setIsSearchOpen };
};
