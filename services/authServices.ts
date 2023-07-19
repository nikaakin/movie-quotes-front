import {
  UserType,
  forgotPasswordSchemaType,
  loginSchemaType,
  registrationSchemaType,
} from '@/types';
import axios from './axios';
import { resetPasswordArgs } from './type';
import { ParsedUrlQuery } from 'querystring';
import { AuthorizerCallback } from 'pusher-js';
import { SocketIoChannel } from 'laravel-echo/dist/channel';

export const login = (data: loginSchemaType) =>
  axios()
    .post<{ user: UserType }>('/api/login', data)
    .then((res) => res.data.user);

export const logout = () => axios().get('/api/logout');

export const register = (data: registrationSchemaType) =>
  axios().post('/api/register', data);

export const edit = (data: registrationSchemaType) =>
  axios().post('/api/update?_method=patch', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const forgotPassword = (data: forgotPasswordSchemaType) =>
  axios().post('/api/forgot-password', data);

export const resetPassword = ({ token, email, password }: resetPasswordArgs) =>
  axios().post('/api/reset-password', { token, email, password });

export const verifyEmail = (
  id: string,
  hash: string,
  expires: string,
  signature: string
) =>
  axios().get(`/api/email/verify/${id}/${hash}`, {
    params: { expires, signature },
  });

export const googleLogin = (query: ParsedUrlQuery) =>
  axios().get('/api/auth/google/callback', { params: query });

export const getCsrf = () => axios().get('/sanctum/csrf-cookie');

export const isAuthenticated = () => axios().get('/api/user');

export const broadcastAuth = (
  socketId: number,
  callback: AuthorizerCallback,
  channel: SocketIoChannel
) =>
  axios()
    .post('/api/broadcasting/auth', {
      socket_id: socketId,
      channel_name: channel.name,
    })
    .then((res) => callback(null, res.data))
    .catch((err) => callback(err, null));
