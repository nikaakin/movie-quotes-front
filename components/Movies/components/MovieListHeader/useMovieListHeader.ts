import { useOutsideClickDetect } from '@/hooks';

export const useMovieListHeader = () => {
  const { isOutside, ref } = useOutsideClickDetect<HTMLLabelElement>();

  return { isOutside, ref };
};
