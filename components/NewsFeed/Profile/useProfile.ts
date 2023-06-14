import { registrationSchema } from '@/schema';
import { edit, getCsrf } from '@/services';
import { setCurrentModal } from '@/state';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const useProfile = () => {
  const { t } = useTranslation(['common']);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema(t)),
  });
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      dispatch(setCurrentModal('edit-notification'));
    },
    onError: (error: AxiosError<registrationSchemaType>) => {
      const errors = error.response?.data.details || {};
      Object.keys(errors).map((key) => setError(key, { message: errors[key] }));
    },
  });

  const onSubmit = async (data: registrationSchemaType) => {
    await getCsrf();
    await mutate(data);
  };

  return {
    t,
    register,
    errors,
    dirtyFields,
    handleSubmit,
    onSubmit,
  };
};
