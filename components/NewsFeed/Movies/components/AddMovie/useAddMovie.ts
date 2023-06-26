import { useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';
import { useForm } from 'react-hook-form';

export const useAddMovie = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const { data } = useUserQuery({ queryFn: isAuthenticated });
  return {
    image: data?.image,
    username: data?.username,
    register,
    handleSubmit,
    setValue,
    control,
    getFieldState,
    errors,
    isValid,
  };
};
