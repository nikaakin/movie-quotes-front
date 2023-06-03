import { registrationSchema } from '@/schema';
import { setCurrentModal } from '@/store';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

export const useRegistration = () => {
  const { t } = useTranslation('modals');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema(t)),
  });

  const disaptch = useDispatch();

  const onSubmit = (data: registrationSchemaType) => {
    console.log(data);
    disaptch(setCurrentModal('register-notification'));
  };

  const onShowLogin = () => disaptch(setCurrentModal('login'));

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowLogin,
    t,
  };
};
