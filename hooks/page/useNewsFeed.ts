import { RootState, setCurrentModal } from '@/state';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';

export const useNewsFeed = () => {
  const {
    push,
    query: { slug },
  } = useRouter();
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );
  const dispatch = useDispatch();
  const { isFetching } = useUserQuery({
    onError: () => push('/'),
    queryFn: isAuthenticated,
  });

  useEffect(() => {
    dispatch(setCurrentModal(null));
  }, [dispatch]);

  return { isFetching, slug, currentModal };
};
