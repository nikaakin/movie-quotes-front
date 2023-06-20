import { HomePageProps } from '@/types';
import axios from './axios';

export const fetchQuotes = (skip: number) =>
  axios().get<HomePageProps>(`/api/movies/quotes/${skip}`);
