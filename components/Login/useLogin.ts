import { loginSchema } from '@/schema';
import { loginSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useLogin = () => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: loginSchemaType) => {
    console.log(data);
    setShowNotification(true);
  };

  const onShowPasswordReset = () => setShowPasswordReset((prev) => !prev);

  const onShowRegistrationChange = () => setShowRegistration((prev) => !prev);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPasswordReset,
    onShowPasswordReset,
    showNotification,
    showRegistration,
    onShowRegistrationChange,
  };
};
