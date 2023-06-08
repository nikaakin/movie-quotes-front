import axios from 'axios';
import { i18n } from 'next-i18next';

const instance = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    params: { locale: i18n?.language },
  });

export default instance;
