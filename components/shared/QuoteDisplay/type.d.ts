import { QuoteType } from '@/types';

export type QuoteDisplayProps = {
  quote: QuoteType;
  title: string;
  onClose: () => void;
};
