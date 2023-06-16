import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/state';

export const useBurgerbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslation(['common']);
  const onBurgerBarClick = (val: boolean) => setIsBurgerOpen(val);
  const { image, username } = useSelector((state: RootState) => state.user);

  return {
    onBurgerBarClick,
    isBurgerOpen,
    slug,
    image,
    username,
    t,
  };
};
