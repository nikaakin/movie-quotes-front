import {
  CommentIcon,
  DotsIcon,
  EyeIcon,
  HeartIcon,
  PencilIcon,
  TrashBinIcon,
} from '@/components';
import { QuoteDisplayCardProps } from './type';
import { useQuoteDisplayCard } from './useQuoteDisplayCard';

export const QuoteDisplayCard = ({
  quote,
  t,
  onSelectQuote,
}: QuoteDisplayCardProps) => {
  const { quoteText, isOutside, ref, onModalChange, onDelete } =
    useQuoteDisplayCard({
      quote,
      onSelectQuote,
    });

  return (
    <div className='bg-neutral-950 px-8 w-full sm:w-200 relative'>
      <div
        className='absolute sm:top-6 sm:right-8 sm:bottom-full bottom-8 right-10 cursor-pointer '
        ref={ref}
      >
        {!isOutside && (
          <div className='w-60 h-48 flex bg-zinc-870 rounded-2xl absolute -top-2 right-0 -translate-y-full sm:right-auto sm:left-0 sm:top-auto  sm:-bottom-2 sm:translate-y-full flex-col justify-between py-6 '>
            <button
              className='pl-8 flex gap-5 hover:bg-white hover:bg-opacity-5 transition-all py-2'
              onClick={onModalChange.bind(null, 'quote-view')}
            >
              <EyeIcon color='white' width={20} height={20} />
              {t('common:movie_show.view_quote')}
            </button>
            <button
              className='pl-8 flex gap-5  hover:bg-white hover:bg-opacity-5 transition-all py-2'
              onClick={onModalChange.bind(null, 'edit-quote')}
            >
              <PencilIcon />
              {t('common:movie_show.edit')}
            </button>
            <button
              className='pl-8 flex gap-5  hover:bg-white hover:bg-opacity-5 transition-all py-2 '
              onClick={onDelete}
            >
              <TrashBinIcon />
              {t('common:movie_show.delete')}
            </button>
          </div>
        )}
        <DotsIcon />
      </div>
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
          <HeartIcon shouldFill={!!quote.current_user_likes} disabled />
        </div>
      </div>
    </div>
  );
};
