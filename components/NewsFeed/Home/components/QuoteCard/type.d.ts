import { QuoteType } from '@/types';
import { TFunction } from 'next-i18next';

export type QuoteCardProps = {
  quoteData: QuoteType;
  t: TFunction;
  locale: 'en' | 'ka';
};
