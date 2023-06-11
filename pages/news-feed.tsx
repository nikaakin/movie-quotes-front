import { Header } from '@/components';
import { getCsrf, isAuthenticated } from '@/services';
import { logOut, signIn } from '@/state';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function NewsFeed() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    getCsrf().then(() => {
      isAuthenticated()
        .then((data) => {
          dispatch(signIn(data.data.user));
        })
        .catch(() => {
          dispatch(logOut());
          push('/');
        });
    });
  }, [push, dispatch]);

  return (
    <div className='bg-lg-main min-h-screen'>
      <Header />
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
