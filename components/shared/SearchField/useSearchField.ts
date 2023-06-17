import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useSearchField = () => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {};
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
    t,
  };
};
