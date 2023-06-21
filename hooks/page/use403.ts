import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const use403 = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const onClick = () => router.push('/');

  return { t, onClick };
};
