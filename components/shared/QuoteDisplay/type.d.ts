import { QuoteType } from '@/types';

export type QuoteDisplayProps = {
  quote: QuoteType;
  title: string;
  onClose: () => void;
  commentPlaceholder?: string;
  onQuoteEdit?: () => void;
  onQuoteDelete?: () => void;
  movieId?: string | boolean;
};

export type useQuoteDisplayArgs = {
  current_user_likes: number;
  likes: number;
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
  movieId: string | boolean;
  quote: QuoteType;
};
