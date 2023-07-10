import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCurrentModal, setIsSearchBarOn } from '@/state';
import { deleteQuote, search } from '@/services';
import { QuoteType } from '@/types';
import { useRouter } from 'next/router';
import { useOutsideClickDetect } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );
  const queryClient = useQueryClient();
  const { ref, isOutside } = useOutsideClickDetect<HTMLDivElement>();

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

  const handleFocus = (val: boolean) => setIsFocused(val);
  const onClose = (e?: SyntheticEvent<HTMLDivElement | HTMLLabelElement>) => {
    e && e.stopPropagation();
    dispatch(setIsSearchBarOn(false));
    setIsFocused(false);
    setSearchResults([]);
    setSearchValue('');
  };

  const onCloseModal = () => dispatch(setCurrentModal(null));

  const onQuoteView = (quote: QuoteType) => {
    setQuote(quote);
    dispatch(setCurrentModal('quote-view'));
  };

  const onQuoteEdit = () => dispatch(setCurrentModal('edit-quote'));

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
    onDelete,
    onQuoteEdit,
    t,
  };
};
