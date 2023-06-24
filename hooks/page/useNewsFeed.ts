import { setCurrentModal } from '@/state';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';

export const useNewsFeed = () => {
  const {
    push,
    query: { slug },
  } = useRouter();
  const dispatch = useDispatch();
  const { isFetching } = useUserQuery({
    onError: () => push('/'),
    queryFn: isAuthenticated,
  });

  useEffect(() => {
    dispatch(setCurrentModal(null));
  }, [dispatch]);

  return { isFetching, slug };
};
