import { PencilWithBorderIcon } from '@/components';
import { useWriteQuoteButton } from './useWriteQuoteButton';

export const WriteQuoteButton = ({
  isSearchActive,
}: {
  isSearchActive: boolean;
}) => {
  const { t, onAddQuote } = useWriteQuoteButton();
  return (
    <div
      className='cursor-pointer text-white sm sm:gap-4 gap-3
        flex text-base sm:text-xl rounded-[10px] sm:bg-zinc-870 px-9 sm:py-3 sm:px-4  '
      onClick={onAddQuote}
    >
      <PencilWithBorderIcon />
      <span>{t('home.write_quote')}</span>
    </div>
  );
};
