import { fetchQuotes } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useHome = () => {
  const [skip, setSkip] = useState(0);
  const { t } = useTranslation('home');
  const { locale } = useRouter();
  const { data } = useQuery({
    queryKey: ['quotes', skip],
    queryFn: () => fetchQuotes.bind(null, 0)(),
    staleTime: Infinity,
  });

  const onSetSkip = () => setSkip(skip + 1);

  return {
    data: data?.data?.quotes,
    locale: locale as 'en' | 'ka',
    onSetSkip,
    t,
  };
};
