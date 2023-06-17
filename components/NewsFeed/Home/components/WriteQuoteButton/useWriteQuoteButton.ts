import { useTranslation } from 'next-i18next';

export const useWriteQuoteButton = () => {
  const { t } = useTranslation(['common']);

  return {
    t,
  };
};
