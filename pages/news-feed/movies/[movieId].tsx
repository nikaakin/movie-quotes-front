import { Header, MovieShow } from '@/components';
import { useMovieShowPage } from '@/hooks';
import { showMovie } from '@/services';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment } from 'react';

export default function MovieShowPage() {
  const { isFetching, isFallback } = useMovieShowPage();
  return (
    <div className='bg-lg-main min-h-screen text-white'>
      {!isFetching && !isFallback && (
        <Fragment>
          <Header shouldhavelinks />
          <MovieShow />
        </Fragment>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const queryClient = new QueryClient();
  if (params?.movieId) {
    await queryClient.prefetchQuery(['quotes', 0], () =>
      showMovie(params.movieId as string)
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'modals',
        'home',
      ])),
    },
  };
};
