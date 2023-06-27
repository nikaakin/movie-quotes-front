import { useUserQuery } from '@/hooks';
import { fetchGenres, isAuthenticated } from '@/services';
import { languageType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const useAddMovie = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const { locale } = useRouter();
  const { data } = useUserQuery({ queryFn: isAuthenticated });
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => fetchGenres(),
  });

  const genreOptions = genres?.map((genre) => ({
    label: genre.genre[locale as keyof languageType],
    value: genre.id,
  }));

  return {
    image: data?.image,
    username: data?.username,
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    errors,
    isValid,
    genres: genreOptions,
  };
};
