import { editSchema } from '@/schema';
import { edit, getCsrf } from '@/services';
import { RootState, setCurrentModal } from '@/state';
import { editSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export const useProfile = () => {
  const {
    user: { email, google_id, username },
    currentModal: { currentModal },
  } = useSelector((state: RootState) => state);
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editData, setEditData] = useState({
    email,
    google_id,
    username: '',
    password: '',
  });
  console.log(currentModal);
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
    resolver: zodResolver(editSchema(t)),
    shouldUnregister: true,
  });

  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      dispatch(setCurrentModal('edit-notification'));
    },
    onError: (error: AxiosError<editSchemaType>) => {
      dispatch(setCurrentModal(null));
      const errors = error.response?.data.details || {};
      Object.keys(errors).map((key) => setError(key, { message: errors[key] }));
    },
  });

  const onHandleSubmit = (data: editSchemaType) => {
    setEditData({
      email,
      google_id,
      password: data?.password,
      username: data?.username,
    });
  };
  const onSaveChanges = () => {
    handleSubmit(onHandleSubmit)();
    dispatch(setCurrentModal('confirmation-notification'));
  };
  const onSubmit = async () => {
    await getCsrf();
    await mutate(editData);
  };
  const resetState = () => {
    setEditUsername(false);
    setEditPassword(false);
  };
  const onClose = () => dispatch(setCurrentModal(null));

  return {
    t,
    register,
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
    email,
    google_id,
    username,
    onSaveChanges,
    currentModal,
    onClose,
  };
};
