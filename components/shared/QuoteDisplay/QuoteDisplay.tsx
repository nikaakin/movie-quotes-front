import { PencilIcon, TrashBinIcon, XIcon } from '@/components/Icons';
import { QuoteDisplayProps } from './type';
import { useQuoteDisplay } from './useQuoteDisplay';
import { ProfileCard } from '../ProfileCard';

export const QuotesDisplay = ({ quote, title, onClose }: QuoteDisplayProps) => {
  const {} = useQuoteDisplay();
  return (
    <div className='rounded-[12px] relative w-full h-full sm:w-250 hide-scrollbar max-h-screen pt-8 pb-16 sm:pb-12 bg-neutral-950 text-white overflow-auto'>
      <div className='flex justify-between items-center px-8 border-b border-zinc-150 border-opacity-20 pb-6'>
        <div className='w-fit flex'>
          <button className='sm:pr-6 pr-3 border-r-gray-350 border-r border-opacity-60 flex items-center '>
            <PencilIcon />
          </button>
          <button className='sm:pl-6 pl-3 flex items-center'>
            <TrashBinIcon />
          </button>
        </div>
        <h1 className='sm:text-2xl text-xl font-medium hidden mb:block  '>
          {title}
        </h1>
        <button onClick={onClose}>
          <XIcon />
        </button>
      </div>

      <div className='sm:mb-7 mb-9 p-8 pb-0'>
        <ProfileCard
          image={
            <div className='bg-white rounded-[50%] w-10 h-10 sm:w-14 sm:h-14 overflow-hidden  '>
              <img
                src={quote.user?.image}
                alt='avatar'
                className='object-fill w-full h-full '
              />
            </div>
          }
          username={quote.user?.username || ''}
        />
      </div>
      <div className='sm:mb-7 mb-9 px-8 '>
        <div className='flex relative mb-5 border-gray-550  border focus:shadow-input rounded-[4px]  '>
          <textarea
            className='pr-24 border w-full   focus:outline-none 
          text-base  bg-transparent px-3 py-2 h-fit sm:text-xl
          border-transparent focus:border-transparent '
            placeholder='quote in english'
            disabled
          >
            {quote?.quote['en']}
          </textarea>

          <div className='absolute top-2 right-2   flex flex-row  gap-1 items-center'>
            <span className='text-gray-550 sm:text-xl text-base'>Eng</span>
          </div>
        </div>
        <div className='flex relative mb-5 border-gray-550  border focus:shadow-input rounded-[4px]  '>
          <textarea
            className='pr-24 border w-full   focus:outline-none 
          text-base  bg-transparent px-3 py-2 h-fit sm:text-xl
          border-transparent focus:border-transparent '
            placeholder='ციტატა ქართულად'
            disabled
          >
            {quote?.quote['ka']}
          </textarea>

          <div className='absolute top-2 right-2   flex flex-row  gap-1 items-center'>
            <span className='text-gray-550 sm:text-xl text-base'>Eng</span>
          </div>
        </div>
      </div>
      <img
        src={quote.image}
        alt={quote.quote['en']}
        className='w-full h-auto object-fill px-8  rounded-[12px]'
      />
    </div>
  );
};
