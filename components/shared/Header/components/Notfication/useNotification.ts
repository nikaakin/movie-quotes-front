import { useOutsideClickDetect, useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';
import { useState } from 'react';

export const useNotification = () => {
  const [rootMargin, setRootMargin] = useState(1);
  const { isOutside, ref } = useOutsideClickDetect<HTMLDivElement>();

  const { onNotificationupdate, notifications } = useUserQuery({
    enabled: false,
    queryFn: isAuthenticated,
    enableNotifications: true,
    onNotificationSuccess: () => setRootMargin(rootMargin === 1 ? 0 : 1),
  });

  return {
    isOutside,
    ref,
    onNotificationupdate,
    notifications: notifications || [],
  };
};
