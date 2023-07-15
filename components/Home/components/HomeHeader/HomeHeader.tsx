import { SearchField, WriteQuoteButton } from '@/components';
import { useHomeHeader } from './useHomeHeader';

export const HomeHeader = () => {
  const { isSearchActive, toggleSearchBar } = useHomeHeader();
  return (
    <div className='flex justify-between mt-8 sm:mb-6 mb-10 items-center gap-6'>
      <button
        onClick={toggleSearchBar.bind(null, false)}
        className={`${
          !isSearchActive && 'flex-1'
        }  transition-all basis-60 min-w-fit `}
      >
        <WriteQuoteButton isSearchActive={isSearchActive} />
      </button>
      <button
        onClick={toggleSearchBar.bind(null, true)}
        className={`${
          isSearchActive &&
          'flex-1 pb-4 border-b border-white border-opacity-30'
        } sm:basis-32 `}
      >
        <SearchField isSearchActive={isSearchActive} />
      </button>
    </div>
  );
};
