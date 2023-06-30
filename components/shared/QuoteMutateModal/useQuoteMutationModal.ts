import { useUserQuery } from '@/hooks';
import { fetchMovies, isAuthenticated } from '@/services';
import { setCurrentModal } from '@/state';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuoteSchema } from '@/schema/quoteSchema';

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
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createQuoteSchema(t)),
  });
  console.log(errors);

  movieId && register('movie', { value: { value: movieId, label: '' } });

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

  const onSubmit = (data: any) => console.log(data);
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
    t,
  };
};
