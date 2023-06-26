import { Header } from '@/components';
import { useMovieShow } from '@/hooks';
import { showMovie } from '@/services';
import { QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment } from 'react';

export default function MovieShow() {
  const { isFetching, isFallback } = useMovieShow();
  return (
    <div className='bg-lg-main min-h-screen text-white'>
      {!isFetching && !isFallback && (
        <Fragment>
          <Header shouldhavelinks />
        </Fragment>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (params?.movieId) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['quotes', 0], () =>
      showMovie(params.movieId as string)
    );
    queryClient.getQueryData(['movie']);
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
