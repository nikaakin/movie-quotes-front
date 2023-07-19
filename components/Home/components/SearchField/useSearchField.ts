import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCurrentModal, setIsSearchBarOn } from '@/state';
import { deleteQuote, search } from '@/services';
import { QuoteType } from '@/types';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSearchField = ({
  isSearchActive,
}: {
  isSearchActive: boolean;
}) => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const [searchValBigScreen, setSearchValBigScreen] = useState('');
  const [searchResults, setSearchResults] = useState<QuoteType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const dispatch = useDispatch();
  const { locale, push } = useRouter();
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let debouncedSearch: NodeJS.Timeout;
    if (!isSearchActive) {
      onClose();
    }
    setSearchResults([]);
    if (!isFocused) {
      setSearchValue('');
    } else {
      debouncedSearch = setTimeout(() => {
        if (searchValue.startsWith('#') || searchValue.startsWith('@')) {
          searchValue.length > 1 &&
            search(searchValue).then((data) => setSearchResults(data));
        }
      }, 500);
    }
    return () => clearTimeout(debouncedSearch);
  }, [isSearchActive, searchValue, isFocused]);

  const { mutate } = useMutation({
    mutationFn: () => deleteQuote(quote?.id || 0),
    onSuccess: () => {
      dispatch(setCurrentModal(null));
      queryClient.setQueriesData<{ pages: { quotes: QuoteType[] }[] }>(
        ['quotes'],
        (oldData) => {
          const newQuotes = oldData?.pages.map((q) => {
            const filtered = q.quotes.filter((qq) => qq.id !== quote?.id);
            return { ...q, quotes: filtered };
          });
          return { ...oldData, pages: newQuotes } as {
            pages: { quotes: QuoteType[] }[];
          };
        }
      );
    },
  });

  const onDelete = () => mutate();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const handleSearchBigScreen = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValBigScreen(e.target.value);

  const handleFocus = (val: boolean) => {
    setIsFocused(val);
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  const onClose = (e?: SyntheticEvent<HTMLDivElement | HTMLLabelElement>) => {
    e && e.stopPropagation();
    dispatch(setIsSearchBarOn(false));
    setIsFocused(false);
    setSearchResults([]);
    setSearchValue('');
    setSearchValBigScreen('');
  };

  const onCloseModal = () => dispatch(setCurrentModal(null));

  const onQuoteView = (quote: QuoteType) => {
    setQuote(quote);
    dispatch(setCurrentModal('quote-view'));
  };

  const onQuoteEdit = () => dispatch(setCurrentModal('edit-quote'));

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(
      `/news-feed/home?search=${
        searchValBigScreen.includes('#')
          ? `%23${searchValBigScreen.slice(1)}`
          : searchValBigScreen
      }`
    );
    setSearchValBigScreen('');
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
    onDelete,
    onQuoteEdit,
    t,
    inputRef,
    searchValBigScreen,
    onSearchSubmit,
    handleSearchBigScreen,
  };
};
