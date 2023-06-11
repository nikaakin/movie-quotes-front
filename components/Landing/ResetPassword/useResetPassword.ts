import { resetPasswordSchema } from '@/schema';
import { getCsrf, resetPassword } from '@/services';
import { setCurrentModal } from '@/state';
import { ResetPasswordSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ResetPasswordProps } from './type';

export const useResetPassword = ({ email, token }: ResetPasswordProps) => {
  const { t } = useTranslation(['modals']);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema(t)),
  });
  const dispatch = useDispatch();

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

  return {
    t,
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowLogin,
    dirtyFields,
    setValue,
    isValid,
    isLoading,
  };
};
