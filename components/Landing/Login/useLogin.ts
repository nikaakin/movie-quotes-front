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

  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(signIn(data.data.user));
      router.push('/news-feed');
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
