import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { setIsSearchBarOn } from '@/state';
import { search } from '@/services';
import { QuoteType } from '@/types';
import { useRouter } from 'next/router';

export const useSearchField = ({
  isSearchActive,
}: {
  isSearchActive: boolean;
}) => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<QuoteType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const distpatch = useDispatch();
  const { locale } = useRouter();

  useEffect(() => {
    if (!isSearchActive) {
      onClose();
    }
    const debouncedSearch = setTimeout(() => {
      setSearchResults([]);
      if (searchValue.startsWith('#') || searchValue.startsWith('@')) {
        searchValue.length > 1 &&
          search(searchValue).then((data) => setSearchResults(data));
      }
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [isSearchActive, searchValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const handleFocus = () => setIsFocused(true);
  const onClose = (e?: SyntheticEvent<HTMLDivElement | HTMLLabelElement>) => {
    e && e.stopPropagation();
    distpatch(setIsSearchBarOn(false));
    setIsFocused(false);
    setSearchResults([]);
    setSearchValue('');
  };

  return {
    searchValue,
    searchResults,
    handleSearch,
    isFocused,
    handleFocus,
    onClose,
    locale: locale as 'en' | 'ka',
    t,
  };
};
