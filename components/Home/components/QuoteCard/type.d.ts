import { QuoteType } from '@/types';
import { TFunction } from 'next-i18next';

export type QuoteCardProps = {
  quoteData: QuoteType;
  t: TFunction;
  locale: 'en' | 'ka';
};

export type useQuoteCardArgs = {
  current_user_likes: number;
  likes: number;
  id: number;
  notifications: {
    id: number;
    comment: string;
    user: {
      id: number;
      username: string;
      image: string;
      email: string;
    };
  }[];
};
