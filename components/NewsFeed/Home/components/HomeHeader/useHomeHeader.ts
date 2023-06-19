import { useTranslation } from 'next-i18next';

export const useHomeHeader = () => {
  const { t } = useTranslation('common');
  return { t };
};
