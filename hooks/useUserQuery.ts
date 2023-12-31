import { initializeWebsocket, setCookie } from '@/helpers';
import { fetchNotifications, getCsrf } from '@/services';
import { NotificationType, UserType, loginSchemaType } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

type UserQueryType = {
  onSuccess?: () => void;
  onError?: (err?: AxiosError) => void;
  enabled?: boolean;
  queryFn: (
    data?: loginSchemaType
  ) => Promise<AxiosResponse<{ user: UserType }>>;
  enableNotifications?: boolean;
};

export const useUserQuery = ({
  onSuccess,
  onError,
  enabled,
  queryFn,
  enableNotifications = false,
}: UserQueryType) => {
  const [firstInit, setFirstInit] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery<NotificationType[]>({
    queryKey: ['notifications'],
    queryFn: () => fetchNotifications(),
    enabled: enableNotifications,
    staleTime: Infinity,
  });

  const onNotificationupdate = (id: number) =>
    queryClient.setQueryData<NotificationType[]>(['notifications'], (prev) => {
      if (!prev) return prev;
      const notifications = prev?.map((notification) => {
        if (notification.id === id) return { ...notification, seen: true };
        return notification;
      });

      return notifications;
    });

  const onNotificationSeenAll = () =>
    queryClient.setQueryData<NotificationType[]>(['notifications'], (prev) => {
      if (!prev) return prev;
      const notifications = prev?.map((notification) => ({
        ...notification,
        seen: true,
      }));

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
          resolve(data?.data?.user || null);
        } catch (e) {
          reject(e);
        }
      }),
    onSuccess: (data) => {
      onSuccess && onSuccess();
      if (!firstInit) {
        setCookie('user', 'true');
        setFirstInit(true);
        initializeWebsocket();
        window
          .Echo!.private(`notification.${data.id}`)
          .listen(
            'NewNotification',
            (data: { notification: NotificationType }) =>
              queryClient.setQueryData<NotificationType[]>(
                ['notifications'],
                (prev) => {
                  if (!prev) return prev;
                  return [data.notification, ...prev];
                }
              )
          );
      }
    },
    onError: (error) => {
      setCookie('user', 'false');
      onError && onError(error as AxiosError);
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
    onNotificationSeenAll,
  };
};
