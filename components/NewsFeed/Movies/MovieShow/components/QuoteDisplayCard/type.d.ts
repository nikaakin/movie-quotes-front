import { QuoteType } from '@/types';
import { TFunction } from 'next-i18next';

export type QuoteDisplayCardProps = {
  quote: QuoteType;
  t: TFunction;
  onSelectQuote: (_: number) => void;
};

export type useQuoteDisplayCardArgs = {
  quote: QuoteType;
  onSelectQuote: (_: number) => void;
};
