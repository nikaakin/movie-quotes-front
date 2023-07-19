import { deleteMovie, deleteQuote, showMovie } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { RootState, setCurrentModal } from '@/state';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { QuoteType } from '@/types';

export const useMovieShow = () => {
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const {
    query: { movieId },
    locale,
    replace,
  } = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation(['common', 'modals']);
  const dispatch = useDispatch();
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );

  const { mutate: deleteQuoteMutation } = useMutation({
    mutationFn: (id: number) => deleteQuote(id),
    onSuccess: () => {
      dispatch(setCurrentModal(null));
      queryClient.setQueriesData<{ quotes: QuoteType[] }>(
        ['movie', `${movieId}`],
        (oldData) => {
          const newQuotes = oldData?.quotes.filter(
            (q) => q.id !== selectedQuoteId
          );
          return { ...oldData, quotes: newQuotes } as { quotes: QuoteType[] };
        }
      );
      queryClient.setQueriesData<{ pages: { quotes: QuoteType[] }[] }>(
        ['quotes'],
        (oldData) => {
          const newQuotes = oldData?.pages.map((q) => {
            const filtered = q.quotes.filter(
              (qq) => qq.id !== selectedQuote?.id
            );
            return { ...q, quotes: filtered };
          });
          return { ...oldData, pages: newQuotes } as {
            pages: { quotes: QuoteType[] }[];
          };
        }
      );
    },
  });

  const { mutate: deleteMovieMutation } = useMutation({
    mutationFn: () => deleteMovie(parseInt(movieId as string)),
    onSuccess: () => {
      queryClient.setQueriesData<{ pages: { quotes: QuoteType[] }[] }>(
        ['quotes'],
        (oldData) => {
          const newQuotes = oldData?.pages.map((q) => {
            const filtered = q.quotes.filter(
              (qq) => qq.movie_id !== parseInt(movieId as string)
            );
            return { ...q, quotes: filtered };
          });
          return { ...oldData, pages: newQuotes } as {
            pages: { quotes: QuoteType[] }[];
          };
        }
      );
      replace('/news-feed/movies');
    },
  });

  const onModalChange = (modal: string | null) =>
    dispatch(setCurrentModal(modal));

  const { data: movie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => showMovie(movieId as string),
    enabled: false,
  });

  const onSelectedIdChange = (id: number) => setSelectedQuoteId(id);
  const selectedQuote = movie?.quotes.find(
    (quote) => quote.id === selectedQuoteId
  );
  const onDeleteMovie = () => deleteMovieMutation();

  return {
    locale: locale as 'en' | 'ka',
    movie,
    onModalChange,
    currentModal,
    onSelectedIdChange,
    selectedQuote,
    t,
    onDeleteMovie,
    deleteQuoteMutation,
  };
};
