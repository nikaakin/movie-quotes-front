import { ChangeEvent, useState } from 'react';

export const useSearchField = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([
    { title: '', year: '', id: '' },
  ]);

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
  };
};
