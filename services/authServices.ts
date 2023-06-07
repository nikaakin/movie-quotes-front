import { registrationSchemaType } from '@/types';
import axios from './axios';

export const login = () => axios.post('/api/login');
export const logout = () => axios.get('/api/logout');
export const register = (data: registrationSchemaType) =>
  axios.post('/api/register', data);
export const forgotPassword = () => axios.post('/api/forgot-password');
export const resetPassword = () => axios.post('/api/reset-password');
export const verifyEmail = (id: string, hash: string, queries: string) =>
  axios.get(`/api/email/verify/${id}/${hash}?${queries}`);
export const getCsrf = () => axios.get('/sanctum/csrf-cookie');
