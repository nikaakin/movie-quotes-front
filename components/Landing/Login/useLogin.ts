import { loginSchema } from '@/schema';
import { setCurrentModal } from '@/store';
import { loginSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const disaptch = useDispatch();

  const onSubmit = (data: loginSchemaType) => {
    console.log(data);
    router.push('/news-feed');
  };

  const onShowPasswordReset = () =>
    disaptch(setCurrentModal('forgot-password'));

  const onShowRegistration = () => disaptch(setCurrentModal('register'));

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowPasswordReset,
    onShowRegistration,
  };
};
