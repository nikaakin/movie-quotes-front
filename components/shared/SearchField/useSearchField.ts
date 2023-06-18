import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/state';

type searchResultsType = { title: string; year: string; id: string } | [];

export const useSearchField = () => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([]);
  const { isSearchBarOn } = useSelector(
    (state: RootState) => state.isSearchBarOn
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setSearchResults(
      [{ title: '', year: '', id: '' }].filter((item) =>
        item.title.includes(value)
      )
    );
  };
  return {
    searchValue,
    searchResults,
    handleSearch,
    isSearchBarOn,
    t,
  };
};
