import { useUserQuery } from '@/hooks';
import { fetchMovies, getCsrf, isAuthenticated, storeQuote } from '@/services';
import { setCurrentModal } from '@/state';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuoteSchema } from '@/schema/quoteSchema';
import { AxiosError } from 'axios';
import { createMovieSchemaType, createQuoteSchemaType } from '@/types';

export const useQuoteMutationModal = ({ movieId }: { movieId?: string }) => {
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('modals');
  const {
    register,
    control,
    getFieldState,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createQuoteSchema(t)),
  });

  movieId && register('movie', { value: { value: movieId, label: '' } });

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => storeQuote(data),
    onSuccess: (data) => {
      dispatch(setCurrentModal(null));
    },
    onError: (error: AxiosError<createMovieSchemaType>) => {
      const errors = error.response?.data.details || {};
      Object.keys(errors).forEach((key) => {
        if (key.includes('.')) {
          let newKey = key.replace('.', '_');
          return setError(newKey, { message: errors[key] });
        }
        if (key === 'movie_id') {
          return setError('movie', { message: errors[key] });
        }
        setError(key, { message: errors[key] });
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
    console.log(data);
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
    t,
  };
};
