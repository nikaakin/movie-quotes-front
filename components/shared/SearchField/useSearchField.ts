import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/state';

export const useSearchField = () => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([
    { title: '', year: '', id: '' },
  ]);
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
  const placeholderTextForDesktop =
    t('home.enter')! +
    ' @ ' +
    t('home.enter_movies')! +
    ', ' +
    t('home.enter')! +
    ' # ' +
    t('home.enter_quotes')!;
  return {
    searchValue,
    searchResults,
    handleSearch,
    placeholderTextForDesktop,
    isSearchBarOn,
    t,
  };
};
