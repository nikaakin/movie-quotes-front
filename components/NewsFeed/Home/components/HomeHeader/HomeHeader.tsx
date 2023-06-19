import { SearchField } from '../SearchField';
import { WriteQuoteButton } from '../WriteQuoteButton';
import { useHomeHeader } from './useHomeHeader';

export const HomeHeader = () => {
  const { t } = useHomeHeader();
  return (
    <div className='flex justify-between mt-8 sm:mb-6 mb-10 '>
      <WriteQuoteButton t={t} />
      <SearchField t={t} />
    </div>
  );
};
