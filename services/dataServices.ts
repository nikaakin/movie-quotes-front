import { MovieType, QuoteType } from '@/types';
import axios from './axios';

export const fetchQuotes = (skip: number) =>
  axios().get<{ quotes: QuoteType[] }>(`/api/movies/quotes/${skip}`);

export const fetchMovies = () =>
  axios()
    .get<{ movies: MovieType[] }>('/api/movies/user')
    .then((res) => res.data.movies);
