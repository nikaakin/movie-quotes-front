import { HomeHeader } from './components';
import { useHome } from './useHome';

export const Home = () => {
  const { data, t, locale } = useHome();
  return (
    <div className='text-white bg-neutral-950 sm:bg-transparent h-full w-250'>
      <HomeHeader />
      {data &&
        data?.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center h-full'
          >
            <div className='flex flex-col items-center justify-center'>
              <div className='text-xl'>{t(item.quote[locale])}</div>
            </div>
          </div>
        ))}
    </div>
  );
};
