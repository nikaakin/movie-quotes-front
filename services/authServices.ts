import { loginSchemaType, registrationSchemaType } from '@/types';
import axios from './axios';
import { i18n } from 'next-i18next';

export const login = (data: loginSchemaType) =>
  axios().post('/api/login', data);
export const logout = () => axios().get('/api/logout');
export const register = (data: registrationSchemaType) =>
  axios().post('/api/register', data);
export const forgotPassword = () => axios().post('/api/forgot-password');
export const resetPassword = () => axios().post('/api/reset-password');
export const verifyEmail = (
  id: string,
  hash: string,
  expires: string,
  signature: string
) =>
  axios().get(`/api/email/verify/${id}/${hash}`, {
    params: { locale: i18n?.language, expires, signature },
  });
export const getCsrf = () => axios().get('/sanctum/csrf-cookie');
