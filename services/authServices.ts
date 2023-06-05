import { registrationSchemaType } from '@/types';
import instance from './axios';

export const login = () => instance.post('/api/login');
export const logout = () => instance.get('/api/logout');
export const register = (data: registrationSchemaType) =>
  instance.post('/api/register', data);
export const forgotPassword = () => instance.post('/api/forgot-password');
export const resetPassword = () => instance.post('/api/reset-password');
export const getCsrf = () => instance.get('/sanctum/csrf-cookie');
