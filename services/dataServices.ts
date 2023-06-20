import { QuoteType } from '@/types';
import axios from './axios';

export const fetchQuotes = (skip: number) =>
  axios().get<{ quotes: QuoteType[] }>(`/api/movies/quotes/${skip}`);
