import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const useBurgerbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslation(['common']);
  const onBurgerBarClick = (val: boolean) => setIsBurgerOpen(val);

  return {
    onBurgerBarClick,
    isBurgerOpen,
    slug,
    t,
  };
};
