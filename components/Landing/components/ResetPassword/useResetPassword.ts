import { resetPasswordSchema } from '@/schema';
import { getCsrf, resetPassword } from '@/services';
import { setCurrentModal } from '@/state';
import { ResetPasswordSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { ResetPasswordProps } from './type';
import { ChangeEvent } from 'react';

export const useResetPassword = ({ email, token }: ResetPasswordProps) => {
  const { t } = useTranslation(['modals']);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema(t)),
  });
  const dispatch = useDispatch();
  const passwordRepeat = useWatch({ control, name: 'passwordRepeat' });
  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      dispatch(setCurrentModal('password-changed'));
    },
    onError: (error: AxiosError<ResetPasswordSchemaType>) => {
      dispatch(setCurrentModal('link-expired'));
    },
  });

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    await getCsrf();
    await mutate({
      email,
      token,
      password: data.password,
    });
  };
  const onShowLogin = () => dispatch(setCurrentModal('login'));

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (passwordRepeat !== e.target.value) {
      setError('passwordRepeat', {
        message: t('modals:form.register.errors.confirm_password.match')!,
      });
      return;
    }
    clearErrors('passwordRepeat');
  };

  return {
    t,
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowLogin,
    setValue,
    isValid,
    isLoading,
    control,
    getFieldState,
    onPasswordChange,
  };
};
