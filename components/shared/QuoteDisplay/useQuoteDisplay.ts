import { useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';

export const useQuoteDisplay = () => {
  const { data: user } = useUserQuery({
    enabled: false,
    queryFn: isAuthenticated,
  });

  return {
    userId: parseInt(user?.id as string),
  };
};
