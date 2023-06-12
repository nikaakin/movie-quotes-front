import { Header, Movies, Profile, Sidebar, Home } from '@/components';
import { useNewsFeed } from '@/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function NewsFeed() {
  const { isLoading, slug } = useNewsFeed();

  return (
    <div className='bg-lg-main min-h-screen text-white'>
      {isLoading ? null : (
        <div>
          <Header />
          <main className=' flex flex-row'>
            <Sidebar />
            {slug === 'home' ? (
              <Home />
            ) : slug === 'profile' ? (
              <Profile />
            ) : slug === 'movies' ? (
              <Movies />
            ) : null}
          </main>
        </div>
      )}
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

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths = locales.map((locale) => [
    { params: { slug: 'home' }, locale },
    { params: { slug: 'profile' }, locale },
    { params: { slug: 'movies' }, locale },
  ]);

  return {
    paths: [...paths[0], ...paths[1]],
    fallback: false,
  };
}
