import { forgotPasswordSchema } from '@/schema';
import { setCurrentModal } from '@/store';
import { forgotPasswordSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const useForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data: forgotPasswordSchemaType) => {
    console.log(data);
    dispatch(setCurrentModal('forgot-password-notification'));
  };

  const onShowLogin = () => dispatch(setCurrentModal('login'));

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onShowLogin,
  };
};
