import { RootState, setIsSearchBarOn } from '@/state';
import { useDispatch, useSelector } from 'react-redux';

export const useHomeHeader = () => {
  const { isSearchBarOn } = useSelector(
    (state: RootState) => state.isSearchBarOn
  );
  const dispatch = useDispatch();

  const toggleSearchBar = (val: boolean) => dispatch(setIsSearchBarOn(val));
  return {
    isSearchActive: isSearchBarOn,
    toggleSearchBar,
  };
};
