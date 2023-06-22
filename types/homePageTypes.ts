import { QuoteType } from './quoteTypes';
import { languageType } from './translationType';

export type HomePageProps = { quotes: QuoteType[] | null };

export type MovieType = {
  id: string;
  title: languageType;
  director: languageType;
  description: languageType;
  image: string;
  year: number;
  quotes_count: number;
};
