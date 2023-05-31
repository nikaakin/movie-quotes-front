import { forgotPasswordSchema } from '@/schema';
import { forgotPasswordSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useForgotPassword = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: forgotPasswordSchemaType) => {
    console.log(data);
    setShowNotification(true);
  };

  const onShowLoginChange = () => setShowLogin(!showLogin);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showNotification,
    showLogin,
    onShowLoginChange,
  };
};
