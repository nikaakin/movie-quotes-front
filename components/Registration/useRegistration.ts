import { registrationSchema } from '@/schema';
import { RootState, setCurrentModal } from '@/store';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export const useRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
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
  };
};
