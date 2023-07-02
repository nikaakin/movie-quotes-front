import { CommentIcon, DotsIcon, HeartIcon } from '@/components/Icons';
import { QuoteDisplayCardProps } from './type';
import { useQuoteDisplayCard } from './useQuoteDisplayCard';

export const QuoteDisplayCard = ({ quote }: QuoteDisplayCardProps) => {
  const { quoteText } = useQuoteDisplayCard(quote);
  return (
    <div className='bg-neutral-950 px-8 w-full sm:w-200 relative'>
      <button className='absolute sm:top-6 sm:right-8 sm:bottom-full bottom-8 right-10 '>
        <DotsIcon />
      </button>
      <div className='flex flex-col sm:items-center sm:flex-row gap-6 sm:gap-8 py-6 mb-4 sm:mb-6 border-b border-b-zinc-150 border-opacity-20'>
        <img
          src={quote.image}
          alt={quote.quote['en']}
          className='w-full sm:w-56 rounded-sm h-36 object-cover'
        />
        <h3 className='text-2xl text-gray-350 italic'>"{quoteText}"</h3>
      </div>
      <div className='flex gap-6 text-base sm:text-xl mb-6 '>
        <div className='flex gap-3'>
          {quote?.notifications.length}
          <CommentIcon />
        </div>
        <div className='flex gap-3'>
          {quote?.likes}
          <HeartIcon />
        </div>
      </div>
    </div>
  );
};
