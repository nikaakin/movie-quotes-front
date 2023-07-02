import { useRouter } from 'next/router';
import { useQuoteDisplayCardArgs } from './type';

export const useQuoteDisplayCard = ({ quote }: useQuoteDisplayCardArgs) => {
  const { locale } = useRouter();

  const quoteText =
    quote[locale as 'en' | 'ka'].length > 100
      ? quote[locale as 'en' | 'ka']
          .slice(0, 100)
          .split(' ')
          .slice(0, -1)
          .join(' ')
          .concat('...')
      : quote[locale as 'en' | 'ka'];

  return { locale: locale as 'en' | 'ka', quoteText };
};
