import { HomeHeader, QuoteCard } from './components';
import { useHome } from './useHome';

export const Home = () => {
  const { data, t, locale, lastQuoteRef } = useHome();
  return (
    <div className='text-white sm:bg-transparent h-full w-250'>
      <HomeHeader />
      {data &&
        data?.map((quote, i) => (
          <div ref={i === data.length - 1 ? lastQuoteRef : null} key={quote.id}>
            <QuoteCard quoteData={quote} t={t} locale={locale} />
          </div>
        ))}
    </div>
  );
};
