import { useApp } from '@/hooks';
import { store } from '@/state';
import '@/styles/globals.css';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

function App(props: AppProps) {
  const { queryClient, dehydratedState, locale, Component, pageProps, title } =
    useApp(props);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Head>
            <title>{title}</title>
          </Head>
          <div
            className={`${
              locale === 'en'
                ? 'font-helvetica-neue'
                : 'font-helvetica-georgian'
            }`}
          >
            <Component {...pageProps} />
          </div>
          <div id='modal'></div>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
