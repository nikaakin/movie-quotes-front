import { SearchField } from '../../../../shared/SearchField';
import { WriteQuoteButton } from '../WriteQuoteButton';

export const HomeHeader = () => {
  return (
    <div className='flex justify-between mt-8 sm:mb-6 mb-10 items-center '>
      <WriteQuoteButton />
      <SearchField />
    </div>
  );
};
