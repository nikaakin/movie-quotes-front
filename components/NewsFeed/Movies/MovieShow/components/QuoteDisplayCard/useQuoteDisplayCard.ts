import { useRouter } from 'next/router';
import { useQuoteDisplayCardArgs } from './type';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '@/state';
import { useOutsideClickDetect } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuote } from '@/services';
import { QuoteType } from '@/types';

export const useQuoteDisplayCard = ({
  quote,
  onSelectQuote,
}: useQuoteDisplayCardArgs) => {
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { isOutside, ref } = useOutsideClickDetect<HTMLDivElement>();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteQuote(quote.id),
    onSuccess: () => {
      queryClient.setQueriesData<{ quotes: QuoteType[] }>(
        ['movie', `${quote.movie_id}`],
        (oldData) => {
          const newQuotes = oldData?.quotes.filter((q) => q.id !== quote.id);
          return { ...oldData, quotes: newQuotes } as { quotes: QuoteType[] };
        }
      );
    },
  });

  const onModalChange = (val: string | null) => {
    dispatch(setCurrentModal(val));
    onSelectQuote(quote.id);
  };
  const quoteText =
    quote.quote[locale as 'en' | 'ka'].length > 100
      ? quote.quote[locale as 'en' | 'ka']
          .slice(0, 100)
          .split(' ')
          .slice(0, -1)
          .join(' ')
          .concat('...')
      : quote.quote[locale as 'en' | 'ka'];

  const onDelete = () => mutate();

  return { quoteText, ref, isOutside, onModalChange, onDelete };
};
