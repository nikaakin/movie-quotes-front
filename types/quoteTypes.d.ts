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
  comments: {
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
