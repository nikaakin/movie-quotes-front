import { useUserQuery } from '@/hooks';
import {
  fetchMovies,
  getCsrf,
  isAuthenticated,
  storeQuote,
  updateQuote,
} from '@/services';
import { setCurrentModal } from '@/state';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuoteSchema } from '@/schema/quoteSchema';
import { AxiosError } from 'axios';
import {
  QuoteFormTypes,
  QuoteType,
  createMovieSchemaType,
  createQuoteSchemaType,
} from '@/types';
import { useQuoteMutateModalArgs } from './type';

export const useQuoteMutationModal = ({
  movieId,
  defaultImage,
  defaultQuoteEng,
  defaultQuoteGeo,
  quoteId,
  fromSearch,
}: useQuoteMutateModalArgs) => {
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('modals');
  const queryClient = useQueryClient();
  const {
    register,
    control,
    getFieldState,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<QuoteFormTypes>({
    mode: 'onChange',
    resolver: zodResolver(createQuoteSchema(t)),
    defaultValues: {
      quote_en: defaultQuoteEng,
      quote_ka: defaultQuoteGeo,
      image: defaultImage || '',
      movie: {
        value: parseInt(movieId as string),
        label: movieId ? '' : t('modals:form.add_quote.choose')!,
      },
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: FormData) =>
      defaultQuoteEng ? updateQuote(quoteId!, data) : storeQuote(data),
    onSuccess: (data) => {
      dispatch(setCurrentModal(null));
      if (fromSearch) {
        queryClient.setQueriesData<{ pages: { quotes: QuoteType[] }[] }>(
          ['quotes'],
          (oldData) => {
            const newQuotes = oldData?.pages.map((q) => {
              const filtered = q.quotes.map((qq) => {
                if (qq.id !== data?.id) return qq;
                return { ...qq, ...data };
              });
              return { ...q, quotes: filtered };
            });
            return { ...oldData, pages: newQuotes } as {
              pages: { quotes: QuoteType[] }[];
            };
          }
        );
      } else if (movieId) {
        queryClient.setQueryData(
          ['movie', `${movieId}`],
          (oldData: createMovieSchemaType) => {
            if (defaultImage) {
              const newQuotes = oldData.quotes.map((quote: QuoteType) => {
                if (quote.id === quoteId)
                  return {
                    ...quote,
                    quote: {
                      en: data.quote['en'],
                      ka: data.quote['ka'],
                    },
                    image: data.image,
                  };
                return quote;
              });
              return { ...oldData, quotes: newQuotes };
            } else {
              const newData = {
                ...data,
                likes: 0,
                notifications: [],
              };
              return { ...oldData, quotes: [...oldData.quotes, newData] };
            }
          }
        );
      } else {
        queryClient.setQueryData(
          ['quotes'],
          (oldData: createMovieSchemaType) => ({
            pageParams: oldData.pageParams,
            pages: [
              {
                ...oldData.pages[0],
                quotes: [{ ...data }, ...oldData.pages[0].quotes],
              },
              ...(oldData.pages.slice(1) || []),
            ],
          })
        );
      }
    },
    onError: (error: AxiosError<createMovieSchemaType>) => {
      const errors = error.response?.data.details || {};
      Object.keys(errors).forEach((key) => {
        if (key.includes('.')) {
          let newKey = key.replace('.', '_');
          return setError(newKey as keyof QuoteFormTypes, {
            message: errors[key],
          });
        }
        if (key === 'movie_id') {
          return setError('movie', { message: errors[key] });
        }
        setError(key as keyof QuoteFormTypes, { message: errors[key] });
      });
    },
  });

  const { data: user } = useUserQuery({
    queryFn: isAuthenticated,
    enabled: false,
  });
  const { data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    enabled: !movieId,
  });

  const options = movies?.map((movie) => ({
    label: movie.title[locale as 'en' | 'ka'],
    value: parseInt(movie.id),
  }));

  const onSubmit = async (data: createQuoteSchemaType) => {
    const formData = new FormData();
    Object.keys(data).forEach(async (key) => {
      if (key === 'movie') {
        return formData.append('movie_id', data[key].value);
      }
      if (key.includes('_')) {
        let newkey = key.replace('_', '[').concat(']');
        return formData.append(newkey, data[key]);
      }

      if (key === 'image') {
        if (typeof data[key] !== 'object') return;
        return formData.append(key, data[key][0]);
      }

      formData.append(key, data[key]);
    });
    await getCsrf();
    await mutate(formData);
  };

  const onClose = () => dispatch(setCurrentModal(null));

  return {
    user,
    options,
    control,
    getFieldState,
    register,
    handleSubmit,
    onClose,
    onSubmit,
    setValue,
    errors,
    locale: locale as 'en' | 'ka',
    t,
  };
};
