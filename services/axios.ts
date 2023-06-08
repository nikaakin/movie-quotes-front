import axios from 'axios';
import { i18n } from 'next-i18next';

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    params: { locale: i18n?.language },
  });
