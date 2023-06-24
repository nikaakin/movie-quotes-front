import { getCsrf } from '@/services';
import { UserType, loginSchemaType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

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
    },
    onError: () => {
      onError && onError();
    },
    enabled: enabled,
    retry: false,
  });

  return { data, isFetching, refetch };
};
