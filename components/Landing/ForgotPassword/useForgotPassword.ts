import { forgotPasswordSchema } from '@/schema';
import { setCurrentModal } from '@/store';
import { forgotPasswordSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword, getCsrf } from '@/services';

export const useForgotPassword = () => {
  const { t } = useTranslation('modals');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema(t)),
  });

  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      dispatch(setCurrentModal('forgot-password-notification'));
    },
    onError: (error) => {
      console.log(error);
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
    t,
  };
};
