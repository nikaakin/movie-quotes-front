import { MovieType, QuoteType } from '@/types';
import axios from './axios';

export const fetchQuotes = (skip: number) =>
  axios().get<{ quotes: QuoteType[] }>(`/api/movies/quotes/${skip}`);

export const fetchMovies = () =>
  axios()
    .get<{ movies: MovieType[] }>('/api/movies/')
    .then((res) => res.data.movies);

export const showMovie = (id: string) =>
  axios()
    .get<{ movie: MovieType & { quotes: QuoteType[] } }>(`/api/movies/${id}`)
    .then((res) => res.data.movie);
