import { getCsrf, isAuthenticated } from '@/services';
import { RootState, logOut, signIn } from '@/state';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useNewsFeed = () => {
  const {
    push,
    query: { slug },
  } = useRouter();
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector((state: RootState) => state.isSignedin);
  const { mutate, isLoading } = useMutation({
    mutationFn: isAuthenticated,
    onSuccess: (data) => {
      dispatch(signIn(data.data.user));
    },
    onError: () => {
      dispatch(logOut());
      push('/');
    },
  });

  useEffect(() => {
    if (isSignedIn) return;
    getCsrf().then(() => {
      mutate();
    });
  }, [push, dispatch, isSignedIn, mutate]);

  return { isLoading, slug };
};
