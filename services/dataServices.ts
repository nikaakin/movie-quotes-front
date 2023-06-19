import { QuoteType } from '@/types';
import axios from './axios';

export const fetchQuotes = (skip: number) =>
  axios().get<QuoteType[]>(`/api/movies/quotes/${skip}`);
