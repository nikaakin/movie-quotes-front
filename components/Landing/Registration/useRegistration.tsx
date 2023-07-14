import { registrationSchema } from '@/schema';
import { setCurrentModal } from '@/state';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { getCsrf, register as registerService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChangeEvent } from 'react';

export const useRegistration = () => {
  const { t } = useTranslation('modals');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    getFieldState,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema(t)),
  });

  const passwordRepeat = useWatch({
    control,
    name: 'passwordRepeat',
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      dispatch(setCurrentModal('register-notification'));
    },
    onError: (error: AxiosError<registrationSchemaType>) => {
      const errors = error.response?.data.details || {};
      Object.keys(errors).map((key) => setError(key, { message: errors[key] }));
    },
  });

  const onSubmit = async (data: registrationSchemaType) => {
    await getCsrf().then(async () => {
      await mutate(data);
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
    passwordRepeat,
    onPasswordChange,
    t,
  };
};
