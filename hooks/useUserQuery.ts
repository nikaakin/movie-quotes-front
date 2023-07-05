import { initializeWebsocket } from '@/helpers';
import { getCsrf } from '@/services';
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
};

export const useUserQuery = ({
  onSuccess,
  onError,
  enabled,
  queryFn,
}: UserQueryType) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

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

  return { data, isFetching, refetch, notifications };
};
