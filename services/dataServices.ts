import { MovieType, NotificationType, QuoteType, languageType } from '@/types';
import axios from './axios';

export const fetchQuotes = (page: number, query: string) =>
  axios()
    .get<{
      quotes: QuoteType[];
      has_more_pages: boolean;
      current_page: number;
    }>(
      `/api/quotes/${page}/?search=${
        query.includes('#') ? `%23${query.slice(1)}` : query
      }`
    )
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

export const updateMovie = (data: FormData, id: string) =>
  axios()
    .post<{ movie: MovieType }>(
      `/api/movies/update/${id}?_method=patch`,
      data,
      {
        headers: {
          method: 'PATCH',
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => res.data.movie);

export const deleteMovie = (id: number) =>
  axios().delete(`/api/movies/destroy/${id}`);

export const storeQuote = (data: FormData) =>
  axios()
    .post<{ quote: QuoteType }>('/api/quotes/store', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data.quote);

export const showQuote = (id: number) =>
  axios()
    .get<{ quote: QuoteType }>(`/api/quotes/show/${id}`)
    .then((res) => res.data.quote);

export const updateQuote = (id: number, data: FormData) =>
  axios()
    .post<{ quote: QuoteType }>(
      `/api/quotes/update/${id}?_method=patch`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => res.data.quote);

export const deleteQuote = (id: number) =>
  axios().delete(`/api/quotes/destroy/${id}`);

export const search = (search: string) => {
  const searchValue = search.replace('#', '%23');
  return axios()
    .get<{ quotes: QuoteType[] }>(`/api/quotes/search/?search=${searchValue}`)
    .then((res) => res.data.quotes);
};

export const fetchNotifications = () =>
  axios()
    .get<{ notifications: NotificationType[] }>('/api/notifications')
    .then((res) => res.data.notifications);

export const toggleLike = (quoteId: number) =>
  axios().patch(`/api/notifications/like/${quoteId}`);

export const seen = (notificationId: number) =>
  axios()
    .patch<{ id: number }>(`/api/notifications/seen/${notificationId}`)
    .then(() => ({ id: notificationId }));

export const seenAll = () => axios().patch('/api/notifications/seen');

export const commentService = ({
  quoteId,
  comment,
}: {
  quoteId: number;
  comment: string;
}) =>
  axios()
    .patch<{
      comment: {
        id: number;
        comment: string;
      };
    }>(`/api/notifications/comment/${quoteId}`, {
      comment,
    })
    .then((res) => res.data.comment);
