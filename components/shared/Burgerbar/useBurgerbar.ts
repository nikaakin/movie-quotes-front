import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';

export const useBurgerbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const {
    query: { slug },
    pathname,
  } = useRouter();
  const { t } = useTranslation(['common']);
  const onBurgerBarClick = (val: boolean) => setIsBurgerOpen(val);
  const { data } = useUserQuery({ enabled: false, queryFn: isAuthenticated });
  const username = data?.username;
  const image = data?.image;

  return {
    onBurgerBarClick,
    isBurgerOpen,
    slug,
    image,
    username,
    pathname,
    t,
  };
};
