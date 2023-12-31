import { useRouter } from 'next/router';
import { useQuoteDisplayCardArgs } from './type';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '@/state';
import { useOutsideClickDetect } from '@/hooks';

export const useQuoteDisplayCard = ({
  quote,
  onSelectQuote,
  onDeleteQuote,
}: useQuoteDisplayCardArgs) => {
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { isOutside, ref } = useOutsideClickDetect<HTMLDivElement>();

  const onModalChange = (val: string | null) => {
    dispatch(setCurrentModal(val));
    onSelectQuote(quote.id);
  };
  const quoteText =
    quote.quote[locale as 'en' | 'ka'].length > 100
      ? quote.quote[locale as 'en' | 'ka'].slice(0, 70) + '...'
      : quote.quote[locale as 'en' | 'ka'];

  const onDelete = () => {
    onSelectQuote(quote.id);
    onDeleteQuote();
  };

  return { quoteText, ref, isOutside, onModalChange, onDelete };
};
