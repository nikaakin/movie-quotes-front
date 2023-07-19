import { useIntersectionObserver } from '@/hooks';
import { fetchQuotes } from '@/services';
import { QuoteType } from '@/types';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export const useHome = () => {
  const lastQuoteRef = useRef<HTMLDivElement>(null);
  const [rootMargin, setRootMargin] = useState(10);
  const [oldQuery, setOldQuery] = useState<string>('');
  const { query } = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('query.search', query.search, oldQuery);
    if (oldQuery !== (query.search || '')) {
      queryClient.removeQueries(['quotes']);
    }
  }, [query]);

  const { data: infiniteQuotes, fetchNextPage } = useInfiniteQuery({
    queryKey: ['quotes'],
    queryFn: ({ pageParam = 0 }) =>
      fetchQuotes(pageParam, (query.search || '') as string),
    getNextPageParam: (lastPage) => {
      if (lastPage.has_more_pages) {
        return lastPage.current_page + 1;
      }

      return undefined;
    },
    onSuccess: () => {
      setRootMargin(rootMargin === 10 ? 9 : 10);
      setOldQuery(query.search as string);
    },
    staleTime: Infinity,
  });

  useIntersectionObserver(
    {
      threshold: 0.4,
      rootMargin: `-${rootMargin}px`,
      isIntersectingFn: infiniteQuotes?.pages?.[
        infiniteQuotes.pages?.length - 1
      ].has_more_pages
        ? fetchNextPage
        : undefined,
    },
    lastQuoteRef
  );

  const { t } = useTranslation('home');
  const { locale } = useRouter();

  return {
    data: infiniteQuotes?.pages
      ?.map((page) => page.quotes)
      .flat() as QuoteType[],
    locale: locale as 'en' | 'ka',
    t,
    lastQuoteRef,
  };
};
