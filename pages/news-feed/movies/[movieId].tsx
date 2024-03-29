import { Header, MovieShow } from '@/components';
import { useMovieShowPage } from '@/hooks';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment } from 'react';

export default function MovieShowPage() {
  const { isFetching, isFallback, isMovieFetched, isMovieError, currentModal } =
    useMovieShowPage();
  return (
    <div
      className={`bg-lg-main min-h-screen text-white ${
        currentModal && 'overflow-hidden h-screen sm:h-auto sm:overflow-auto'
      }`}
    >
      {!isFetching && !isFallback && isMovieFetched && !isMovieError && (
        <Fragment>
          <Header shouldhavelinks />
          <main className='flex flex-row sm:ml-80 xl:ml-125'>
            <MovieShow />
          </main>
        </Fragment>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'modals'])),
    },
  };
};
