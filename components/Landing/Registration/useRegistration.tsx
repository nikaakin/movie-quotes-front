import { registrationSchema } from '@/schema';
import { setCurrentModal } from '@/state';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { getCsrf, register as registerService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRegistration = () => {
  const { t } = useTranslation('modals');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema(t)),
  });

  const { mutate } = useMutation({
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

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowLogin,
    t,
  };
};
