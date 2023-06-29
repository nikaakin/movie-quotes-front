import { store } from '@/state';
import '@/styles/globals.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const { locale } = useRouter();

  const dehydratedState = pageProps.dehydratedState;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
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
