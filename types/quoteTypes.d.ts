export type QuoteType = {
  id: number;
  user: {
    id: number;
    username: string;
    image: string;
    email: string;
  };
  movie_id: number;
  notifications_count: number;
  quote: { en: string; ka: string };
  image: string;
  updated_at: string;
  notifications: {
    id: number;
    isLike: number;
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
