import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useDropdown = () => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  return { show, setShow, t, locale };
};
