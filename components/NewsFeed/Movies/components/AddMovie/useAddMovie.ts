import { useUserQuery } from '@/hooks';
import { createMovieSchema } from '@/schema';
import { fetchGenres, isAuthenticated } from '@/services';
import { createMovieSchemaType, languageType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { TFunction } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const useAddMovie = (t: TFunction) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(createMovieSchema(t)),
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

  const onSubmit = (data: createMovieSchemaType) => console.log(data);

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
    onSubmit,
  };
};
