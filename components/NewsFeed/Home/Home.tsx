import { HomeHeader, QuoteCard } from './components';
import { useHome } from './useHome';

export const Home = () => {
  const { data, t, locale } = useHome();
  return (
    <div className='text-white sm:bg-transparent h-full w-250'>
      <HomeHeader />
      {data &&
        data?.map((quote) => (
          <QuoteCard quoteData={quote} t={t} locale={locale} key={quote.id} />
        ))}
    </div>
  );
};
