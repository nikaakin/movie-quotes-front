import { SearchField } from '../SearchField';
import { WriteQuoteButton } from '../WriteQuoteButton';

export const HomeHeader = () => {
  return (
    <div className='flex  text-2xl justify-between '>
      <WriteQuoteButton />
      <SearchField />
    </div>
  );
};
