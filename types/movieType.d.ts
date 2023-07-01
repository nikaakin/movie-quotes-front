import { languageType } from './translationType';

export type MovieType = {
  id: string;
  title: languageType;
  director: languageType;
  description: languageType;
  image: string;
  year: number;
  quotes_count: number;
  genres: { id: number; genre: languageType }[];
};
