import { loginSchema } from '@/schema';
import { setCurrentModal, signIn } from '@/state';
import { loginSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { getCsrf, login } from '@/services';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const useLogin = () => {
  const { t } = useTranslation('modals');
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(loginSchema(t)),
  });

  const { push, query, replace, locale } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.error) {
      setError('username', { message: query.error as string });
      replace(`/${locale}`);
    }
  }, [replace, setError, locale, query]);
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(signIn(data.data.user));
      push('/news-feed/home');
    },
    onError: (error: AxiosError<loginSchemaType>) => {
      if (error.response?.data.email_not_verified) {
        return dispatch(setCurrentModal('register-notification'));
      }
      const errors = error.response?.data || {};
      Object.keys(errors).map((key) => setError(key, { message: errors[key] }));
    },
  });

  const onSubmit = (data: loginSchemaType) => {
    getCsrf().then(() => {
      mutate(data);
    });
  };

  const onShowPasswordReset = () =>
    dispatch(setCurrentModal('forgot-password'));

  const onShowRegistration = () => dispatch(setCurrentModal('register'));

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowPasswordReset,
    onShowRegistration,
    dirtyFields,
    isValid,
    isLoading,
    setValue,
    t,
  };
};
