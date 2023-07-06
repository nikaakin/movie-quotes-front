import { languageType } from '@/types';

export type QuoteMutateModalProps = {
  defaultQuoteGeo?: string;
  defaultQuoteEng?: string;
  defaultImage?: string;
  movieId?: string;
  quoteId?: number;
  movieImage?: string;
  movieTitle?: string;
  movieYear?: number;
  movieGenres?: {
    id: number;
    genre: languageType;
  }[];
  movieDirector?: string;
};

export type useQuoteMutateModalArgs = {
  defaultQuoteGeo?: string;
  defaultQuoteEng?: string;
  defaultImage?: string;
  movieId?: string;
  quoteId?: number;
};
