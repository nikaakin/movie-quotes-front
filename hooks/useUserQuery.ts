import { initializeWebsocket } from '@/helpers';
import { fetchNotifications, getCsrf } from '@/services';
import { NotificationType, UserType, loginSchemaType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Echo from 'laravel-echo';
import { useState } from 'react';

type UserQueryType = {
  onSuccess?: () => void;
  onError?: (err?: AxiosError) => void;
  enabled?: boolean;
  queryFn: (
    data?: loginSchemaType
  ) => Promise<AxiosResponse<{ user: UserType }>>;
  enableNotifications?: boolean;
  onNotificationSuccess?: () => void;
};

export const useUserQuery = ({
  onSuccess,
  onError,
  enabled,
  queryFn,
  enableNotifications = false,
  onNotificationSuccess,
}: UserQueryType) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { refetch: getNotifications } = useQuery<{
    notifications: NotificationType[];
    has_more_pages: number;
  }>({
    queryKey: ['notifications'],
    queryFn: () => fetchNotifications(notifications.length),
    onSuccess: (data) => {
      setNotifications([...notifications, ...data.notifications]);
      onNotificationSuccess && onNotificationSuccess();
    },
    enabled: enableNotifications,
  });

  const onNotificationupdate = (seenNotification: NotificationType) =>
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id !== seenNotification.id) return seenNotification;
        return notification;
      })
    );
  const { data, isFetching, refetch } = useQuery<UserType>({
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () =>
      new Promise(async (resolve, reject) => {
        try {
          await getCsrf();
          const data = await queryFn();
          resolve(data.data.user);
        } catch (e) {
          reject(e);
        }
      }),
    onSuccess: () => {
      onSuccess && onSuccess();
      initializeWebsocket();
      (window as Window & typeof globalThis & { Echo: Echo })!
        .Echo!.channel('notifications')
        .listen('NewNotification', (data: NotificationType) =>
          setNotifications((prev) => [data, ...prev])
        );
    },
    onError: () => {
      onError && onError();
    },
    enabled: enabled,
    retry: false,
  });

  return {
    data,
    isFetching,
    refetch,
    notifications,
    getNotifications,
    onNotificationupdate,
  };
};
