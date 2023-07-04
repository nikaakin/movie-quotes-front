import { QuoteType } from '@/types';
import { TFunction } from 'next-i18next';

export type QuoteDisplayCardProps = {
  quote: QuoteType;
  t: TFunction;
};

export type useQuoteDisplayCardArgs = {
  quote: {
    en: string;
    ka: string;
  };
};
