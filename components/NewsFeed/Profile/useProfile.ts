import { editSchema } from '@/schema';
import { edit, getCsrf } from '@/services';
import { RootState, setCurrentModal, signIn } from '@/state';
import { editSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export const useProfile = () => {
  const {
    user: { email, google_id, username, image },
    currentModal: { currentModal },
  } = useSelector((state: RootState) => state);
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editData, setEditData] = useState({
    email,
    google_id,
    image,
    username: '',
    password: '',
  });
  const [isMorethen, setIsMorethen] = useState(false);
  const [isLessThen, setIsLessThen] = useState(false);
  const { t } = useTranslation(['common', 'modals']);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getFieldState,
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(editSchema(t)),
    shouldUnregister: true,
  });

  const imageError = errors?.image?.message;
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: edit,
    onSuccess: (data) => {
      dispatch(setCurrentModal('edit-notification'));
      dispatch(signIn(data.data.user));
      setTimeout(onClose, 2000);
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
      image: editData.image,
    });
  };
  const onSaveChanges = () => {
    handleSubmit(onHandleSubmit)();
    dispatch(setCurrentModal('confirmation-notification'));
  };
  const onSubmit = async () => {
    const formData = new FormData();
    editData.username && formData.append('username', editData.username);
    editData.password && formData.append('password', editData.password);
    formData.append('google_id', editData.google_id || '');
    editData.image !== image &&
      editData.image &&
      formData.append('image', editData.image);
    formData.append('email', editData.email);
    await getCsrf();
    await mutate(formData);
  };
  const resetState = () => {
    setEditUsername(false);
    setEditPassword(false);
  };
  const onClose = () => dispatch(setCurrentModal(null));
  const onPasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsMorethen(false);
    setIsLessThen(false);
    if (value.length >= 8) {
      setIsMorethen(true);
    }
    if (value.length === 15 && /^[a-z0-9]+$/.test(value)) {
      setIsLessThen(true);
    }
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];

    const reader = new FileReader();
    reader.readAsDataURL(img || new Blob());

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      setEditData({ ...editData, image: (ev.target?.result as string) || '' });
    };
  };

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
    isMorethen,
    isLessThen,
    onPasswordInputChange,
    errors,
    avatar: editData.image,
    onImageChange,
    imageError,
  };
};
