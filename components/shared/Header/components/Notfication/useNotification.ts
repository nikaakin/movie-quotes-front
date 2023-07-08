import { useOutsideClickDetect, useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useNotification = () => {
  const { t } = useTranslation('common');
  const [rootMargin, setRootMargin] = useState(1);
  const { isOutside, ref } = useOutsideClickDetect<HTMLDivElement>();

  const { onNotificationupdate, notifications } = useUserQuery({
    enabled: false,
    queryFn: isAuthenticated,
    enableNotifications: true,
    onNotificationSuccess: () => setRootMargin(rootMargin === 1 ? 0 : 1),
  });

  const dateCalc = (data: string) => {
    const time = Date.now() - new Date(data).getTime();
    console.log(Math.floor(time / 86400000));
    if (time < 60000) return t('just_now');
    if (time < 3600000)
      return Math.floor(time / 60000) <= 1
        ? t('common:time.minute_ago')
        : `${Math.floor(time / 60000)} ${t('common:time.minutes_ago')}`;
    if (time < 86400000)
      return Math.floor(time / 360000) <= 1
        ? t('common:time.hour_ago')
        : `${Math.floor(time / 3600000)} ${t('common:time.hours_ago')}`;
    if (time < 604800000)
      return Math.floor(time / 86400000) <= 1
        ? t('common:time.day_ago')
        : `${Math.floor(time / 86400000)} ${t('common:time.days_ago')}`;
    if (time < 2592000000)
      return Math.floor(time / 604800000) <= 1
        ? t('common:time.week_ago')
        : `${Math.floor(time / 604800000)} ${t('common:time.weeks_ago')}`;
    if (time < 31536000000)
      return Math.floor(time / 2592000000) <= 1
        ? t('common:time.month_ago')
        : `${Math.floor(time / 2592000000)} ${t('common:time.months_ago')}`;
  };

  return {
    isOutside,
    ref,
    onNotificationupdate,
    notifications: notifications || [],
    t,
    dateCalc,
  };
};
