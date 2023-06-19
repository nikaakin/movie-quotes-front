import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { setIsSearchBarOn } from '@/state';

type searchResultsType = { title: string; year: string; id: string } | [];

export const useSearchField = ({
  isSearchActive,
}: {
  isSearchActive: boolean;
}) => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const distpatch = useDispatch();

  useEffect(() => {
    if (!isSearchActive || !searchValue) {
      setIsFocused(false);
    }
  }, [isSearchActive, searchValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setSearchResults(
      [{ title: 'test', year: '1000', id: '1' }].filter(
        (item) => value && item.title.includes(value)
      )
    );
  };
  const handleFocus = () => setIsFocused(true);
  const onClose = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    distpatch(setIsSearchBarOn(false));
  };

  return {
    searchValue,
    searchResults,
    handleSearch,
    isFocused,
    handleFocus,
    onClose,
    t,
  };
};
