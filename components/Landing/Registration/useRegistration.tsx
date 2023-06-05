import { registrationSchema } from '@/schema';
import { setCurrentModal } from '@/store';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { getCsrf, register as registerService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useRegistration = () => {
  const { t } = useTranslation('modals');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
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
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (data: registrationSchemaType) => {
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
