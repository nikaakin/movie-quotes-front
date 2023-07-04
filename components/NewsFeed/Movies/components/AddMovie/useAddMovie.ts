import { useUserQuery } from '@/hooks';
import { fetchGenres, getCsrf, isAuthenticated, storeMovie } from '@/services';
import { setCurrentModal } from '@/state';
import { MovieType, createMovieSchemaType, languageType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addMovieProps } from './type';

export const useAddMovie = <T extends FieldValues>({
  defaultValues,
  t,
  schema,
}: addMovieProps<T>) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const { data: user } = useUserQuery({ queryFn: isAuthenticated });
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => fetchGenres(),
  });

  const genreOptions = genres?.map((genre) => ({
    label: genre.genre[locale as keyof languageType],
    value: genre.id,
  }));

  const defaultValueGenres = defaultValues?.genres?.map((genre) => ({
    label: genre.genre[locale as keyof languageType],
    value: genre.id,
  }));
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    setError,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema(t)),
    defaultValues: {
      description_en: defaultValues?.description_en || '',
      description_ka: defaultValues?.description_ka || '',
      director_en: defaultValues?.director_en || '',
      director_ka: defaultValues?.director_ka || '',
      image: defaultValues?.image || '',
      title_en: defaultValues?.title_en || '',
      title_ka: defaultValues?.title_ka || '',
      year: defaultValues?.year || '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => storeMovie(data),
    onSuccess: (data) => {
      dispatch(setCurrentModal(null));
      const oldMovies = queryClient.getQueryData<MovieType[]>(['movies']) || [];
      queryClient.setQueryData(['movies'], [...oldMovies, data]);
      queryClient.invalidateQueries(['movies']);
    },
    onError: (error: AxiosError<T>) => {
      const errors = error.response?.data.details || {};
      Object.keys(errors).forEach((key) => {
        if (key.includes('.')) {
          let newKey = key.replace('.', '_');
          return setError(newKey as FieldValue<T>, {
            message: errors[key],
          });
        }
        setError(key as FieldValue<T>, { message: errors[key] });
      });
    },
  });

  const onSubmit = async (data: createMovieSchemaType) => {
    const formData = new FormData();
    trigger();
    Object.keys(data).forEach(async (key) => {
      if (key === 'genres') {
        return data[key].forEach((genre: { label: string; value: number }) =>
          formData.append('genres[]', genre.value.toString())
        );
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
    formData.append('user_id', user?.id?.toString() || '');

    await getCsrf();
    await mutate(formData);
  };

  return {
    image: user?.image,
    username: user?.username,
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    errors,
    isValid,
    genres: genreOptions,
    onSubmit,
    onClose: () => dispatch(setCurrentModal(null)),
    defaultValueGenres,
  };
};
