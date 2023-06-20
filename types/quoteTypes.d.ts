export type QuoteType = {
  id: number;
  movie_id: number;
  quote: { en: string; ka: string };
  image: string;
  updated_at: string;
  notification: {
    id: number;
    isLike: number;
    comment?: string;
  };
};
