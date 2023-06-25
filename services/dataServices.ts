import { MovieType, QuoteType } from '@/types';
import axios from './axios';

export const fetchQuotes = (skip: number) =>
  axios().get<{ quotes: QuoteType[] }>(`/api/movies/quotes/${skip}`);

export const fetchMovies = (username: string) =>
  axios().get<{ movies: MovieType[] }>(`/api/movies/user/${username}`);
