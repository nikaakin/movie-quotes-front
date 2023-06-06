import axios from '@/services';
import { store } from '@/store';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  axios.default.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = locale;
    return config;
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
        <div id='modal'></div>
      </QueryClientProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
