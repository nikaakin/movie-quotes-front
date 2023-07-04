import { useRouter } from 'next/router';
import { useQuoteDisplayCardArgs } from './type';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '@/state';
import { useOutsideClickDetect } from '@/hooks';

export const useQuoteDisplayCard = ({ quote }: useQuoteDisplayCardArgs) => {
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { isOutside, ref } = useOutsideClickDetect<HTMLDivElement>();
  const onClose = () => dispatch(setCurrentModal(null));

  const quoteText =
    quote[locale as 'en' | 'ka'].length > 100
      ? quote[locale as 'en' | 'ka']
          .slice(0, 100)
          .split(' ')
          .slice(0, -1)
          .join(' ')
          .concat('...')
      : quote[locale as 'en' | 'ka'];

  return { quoteText, ref, isOutside, onClose };
};
