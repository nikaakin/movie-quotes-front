import { useRouter } from 'next/router';
import { useQuoteDisplayCardArgs } from './type';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '@/state';
import { useOutsideClickDetect } from '@/hooks';

export const useQuoteDisplayCard = ({
  quote,
  onSelectQuote,
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
      ? quote.quote[locale as 'en' | 'ka']
          .slice(0, 100)
          .split(' ')
          .slice(0, -1)
          .join(' ')
          .concat('...')
      : quote.quote[locale as 'en' | 'ka'];

  return { quoteText, ref, isOutside, onModalChange };
};
