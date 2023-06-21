import { Header, Movies, Profile, Home } from '@/components';
import { useNewsFeed } from '@/hooks';
import { fetchQuotes } from '@/services';
import { QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function NewsFeed() {
  const { isLoading, slug } = useNewsFeed();
  return (
    <div className='bg-lg-main min-h-screen text-white'>
      {isLoading ? null : (
        <div>
          <Header shouldhavelinks />
          <main className=' flex flex-row sm:ml-125'>
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (params?.slug === 'home') {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['quotes', 0], () => fetchQuotes(0));
    queryClient.getQueryData(['quotes', 0]);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'modals',
        'home',
      ])),
    },
  };
};

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