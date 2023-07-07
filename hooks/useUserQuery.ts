import { initializeWebsocket } from '@/helpers';
import { fetchNotifications, getCsrf } from '@/services';
import { NotificationType, UserType, loginSchemaType } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Echo from 'laravel-echo';

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
}: UserQueryType) => {
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery<NotificationType[]>({
    queryKey: ['notifications'],
    queryFn: () => fetchNotifications(),
    enabled: enableNotifications,
    staleTime: Infinity,
  });

  const onNotificationupdate = (seenNotification: NotificationType) =>
    queryClient.setQueryData<NotificationType[]>(['notifications'], (prev) => {
      if (!prev) return prev;
      const notifications = prev?.map((notification) => {
        if (notification.id !== seenNotification.id) return seenNotification;
        return notification;
      });

      return notifications;
    });

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
        .listen('NewNotification', (data: { notification: NotificationType }) =>
          queryClient.setQueryData<NotificationType[]>(
            ['notifications'],
            (prev) => {
              if (!prev) return prev;
              return [data.notification, ...prev];
            }
          )
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
    onNotificationupdate,
  };
};
