import { registrationSchema } from '@/schema';
import { registrationSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useRegistration = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: registrationSchemaType) => {
    console.log(data);
    setShowNotification(true);
  };

  const onShowLoginChange = () => setShowLogin((prev) => !prev);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showLogin,
    onShowLoginChange,
    showNotification,
  };
};
