export type QuoteType = {
  id: number;
  user: {
    id: number;
    username: string;
    image: string;
    email: string;
  };
  movie_id: number;
  likes: number;
  quote: { en: string; ka: string };
  image: string;
  updated_at: string;
  current_user_likes: number;
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
  movie: {
    id: number;
    title: { en: string; ka: string };
    year: number;
  };
};

export type HomePageProps = { quotes: QuoteType[] | null };

export type QuoteFormTypes = {
  quote_en: string;
  quote_ka: string;
  image: FileList | string;
  movie: { value: number; label: string };
};
