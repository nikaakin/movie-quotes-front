import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCurrentModal, setIsSearchBarOn } from '@/state';
import { search } from '@/services';
import { QuoteType } from '@/types';
import { useRouter } from 'next/router';
import { useOutsideClickDetect } from '@/hooks';

export const useSearchField = ({
  isSearchActive,
}: {
  isSearchActive: boolean;
}) => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<QuoteType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const distpatch = useDispatch();
  const { locale } = useRouter();
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );

  const { ref, isOutside } = useOutsideClickDetect();

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

  const handleFocus = (val: boolean) => setIsFocused(val);
  const onClose = (e?: SyntheticEvent<HTMLDivElement | HTMLLabelElement>) => {
    e && e.stopPropagation();
    distpatch(setIsSearchBarOn(false));
    setIsFocused(false);
    setSearchResults([]);
    setSearchValue('');
  };

  const onCloseModal = () => distpatch(setCurrentModal(null));

  const onQuoteView = (quote: QuoteType) => {
    setQuote(quote);
    distpatch(setCurrentModal('quote-view'));
  };

  return {
    searchValue,
    searchResults,
    handleSearch,
    isFocused,
    handleFocus,
    onClose,
    locale: locale as 'en' | 'ka',
    onQuoteView,
    currentModal,
    quote,
    onCloseModal,
    ref,
    isOutside,
    t,
  };
};
