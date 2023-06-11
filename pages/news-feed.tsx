import { Header } from '@/components';
import { getCsrf, isAuthenticated } from '@/services';
import { RootState, logOut, signIn } from '@/state';
import { useMutation } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NewsFeed() {
  const { push } = useRouter();
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

  return (
    <div className='bg-lg-main min-h-screen'>
      {isLoading ? null : <Header />}
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}
