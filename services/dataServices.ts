import { MovieType, QuoteType, languageType } from '@/types';
import axios from './axios';

export const fetchQuotes = (skip: number) =>
  axios().get<{ quotes: QuoteType[] }>(`/api/movies/quotes/${skip}`);

export const fetchMovies = () =>
  axios()
    .get<{ movies: MovieType[] }>('/api/movies/')
    .then((res) => res.data.movies);

export const fetchGenres = () =>
  axios()
    .get<{ genres: { id: number; genre: languageType }[] }>('/api/genres')
    .then((res) => res.data.genres);
