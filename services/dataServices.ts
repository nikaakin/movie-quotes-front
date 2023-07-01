import { MovieType, QuoteType, languageType } from '@/types';
import axios from './axios';

export const fetchQuotes = (page: number) =>
  axios()
    .get<{
      quotes: QuoteType[];
      has_more_pages: boolean;
      current_page: number;
    }>(`/api/quotes/${page}`)
    .then((res) => res.data);

export const fetchMovies = () =>
  axios()
    .get<{ movies: MovieType[] }>('/api/movies/')
    .then((res) => res.data.movies);

export const fetchGenres = () =>
  axios()
    .get<{ genres: { id: number; genre: languageType }[] }>('/api/genres')
    .then((res) => res.data.genres);

export const showMovie = (id: string) =>
  axios()
    .get<{ movie: MovieType & { quotes: QuoteType[] } }>(`/api/movies/${id}`)
    .then((res) => res.data.movie);

export const storeMovie = (data: FormData) =>
  axios()
    .post<{ movie: MovieType }>('/api/movies/store', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data.movie);

export const storeQuote = (data: FormData) =>
  axios()
    .post<{ quote: QuoteType }>('/api/quotes/store', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data.quote);

export const search = (search: string) => {
  const searchValue = search.replace('#', '%23');
  return axios()
    .get<{ quotes: QuoteType[] }>(`/api/quotes/search/?search=${searchValue}`)
    .then((res) => res.data.quotes);
};
