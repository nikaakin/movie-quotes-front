import { registrationSchema } from '@/schema';
import { edit, getCsrf } from '@/services';
import { setCurrentModal } from '@/state';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const useProfile = () => {
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const { t } = useTranslation(['common', 'modals']);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getFieldState,
    control,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema(t)),
    shouldUnregister: true,
  });

  const dispatch = useDispatch();
  const { mutate } = useMutation({
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

  const resetState = () => {
    setEditUsername(false);
    setEditPassword(false);
  };

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    editUsername,
    setEditUsername,
    editPassword,
    setEditPassword,
    setValue,
    getFieldState,
    control,
    resetState,
    isValid,
  };
};
