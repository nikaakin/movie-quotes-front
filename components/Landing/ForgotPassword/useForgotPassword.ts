import { forgotPasswordSchema } from '@/schema';
import { setCurrentModal } from '@/state';
import { forgotPasswordSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword, getCsrf } from '@/services';
import { AxiosError } from 'axios';

export const useForgotPassword = () => {
  const { t } = useTranslation('modals');
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema(t)),
  });

  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      dispatch(setCurrentModal('forgot-password-notification'));
    },
    onError: (error: AxiosError<forgotPasswordSchemaType>) => {
      const errors = error.response?.data.details || {};
      Object.keys(errors).map((key) => setError(key, { message: errors[key] }));
    },
  });

  const onSubmit = (data: forgotPasswordSchemaType) => {
    getCsrf().then(() => {
      mutate(data);
    });
  };

  const onShowLogin = () => dispatch(setCurrentModal('login'));

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowLogin,
    dirtyFields,
    setValue,
    isValid,
    isLoading,
    t,
  };
};
