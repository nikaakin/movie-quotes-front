import { QueryClient } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export const useApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const { locale, query } = useRouter();

  const dehydratedState = pageProps.dehydratedState;
  let title = 'Movie Quotes';
  if (query.slug) {
    title = `${query.slug[0].toUpperCase()}${query.slug.slice(1)} | ${title}`;
  }

  return {
    queryClient,
    locale,
    dehydratedState,
    Component: Component,
    pageProps: pageProps,
    title,
  };
};
