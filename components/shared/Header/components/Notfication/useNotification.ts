import {
  useIntersectionObserver,
  useOutsideClickDetect,
  useUserQuery,
} from '@/hooks';
import { isAuthenticated } from '@/services';
import { useRef, useState } from 'react';

export const useNotification = () => {
  const [rootMargin, setRootMargin] = useState(1);
  const { isOutside, ref } = useOutsideClickDetect<HTMLDivElement>();
  const nofiticationRef = useRef<HTMLDivElement>(null);

  const { getNotifications, onNotificationupdate, notifications } =
    useUserQuery({
      enabled: false,
      queryFn: isAuthenticated,
      enableNotifications: true,
      onNotificationSuccess: () => setRootMargin(rootMargin === 1 ? 0 : 1),
    });
  useIntersectionObserver(
    {
      threshold: 0.4,
      rootMargin: `-${rootMargin}px`,
      isIntersectingFn: getNotifications,
    },
    nofiticationRef
  );

  return {
    isOutside,
    ref,
    onNotificationupdate,
    nofiticationRef,
    notifications,
  };
};
