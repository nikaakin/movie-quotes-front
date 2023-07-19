import {
  CommentIcon,
  HeartIcon,
  PencilIcon,
  TrashBinIcon,
  XIcon,
} from '@/components/Icons';
import { QuoteDisplayProps } from './type';
import { useQuoteDisplay } from './useQuoteDisplay';
import { ProfileCard } from '../ProfileCard';

export const QuotesDisplay = ({
  quote,
  title,
  onClose,
  commentPlaceholder,
  onQuoteDelete,
  onQuoteEdit,
  movieId = false,
}: QuoteDisplayProps) => {
  const {
    userId,
    comment,
    liked,
    onComment,
    onCommentChange,
    onLike,
    updatedComments,
    updatedLikes,
  } = useQuoteDisplay({
    current_user_likes: quote?.current_user_likes,
    likes: quote?.likes,
    notifications: quote?.notifications,
    movieId,
    quote,
  });
  return (
    <div className='max-h-screen sm:max-h-[90vh] rounded-[12px] relative w-full  sm:w-250 hide-scrollbar h-full pt-8 pb-16 sm:pb-12 bg-neutral-950 text-white overflow-auto'>
      <div
        className={`flex items-center px-8 border-b border-zinc-150 border-opacity-20 pb-6 
      ${userId === quote.user?.id ? 'justify-between' : 'justify-end'}`}
      >
        {userId === quote.user?.id && (
          <div className='w-fit flex'>
            <div className='sm:pr-6 pr-3  border-r-gray-350 border-r border-opacity-40 '>
              <button className=' flex items-center ' onClick={onQuoteEdit}>
                <PencilIcon />
              </button>
            </div>
            <div className='sm:pl-6 pl-3 '>
              <button className='flex items-center' onClick={onQuoteDelete}>
                <TrashBinIcon />
              </button>
            </div>
          </div>
        )}
        <h1 className=' absolute top-6 left-1/2 -translate-x-1/2 sm:text-2xl text-xl font-medium hidden sm:block  '>
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
            value={quote?.quote['en']}
          ></textarea>

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
            value={quote?.quote['ka']}
          ></textarea>

          <div className='absolute top-2 right-2   flex flex-row  gap-1 items-center'>
            <span className='text-gray-550 sm:text-xl text-base'>ქართ</span>
          </div>
        </div>
      </div>
      <div className=' mx-8 '>
        <img
          src={quote.image}
          alt={quote.quote['en']}
          className='w-full h-72 sm:h-125 object-cover rounded-[12px] '
        />
      </div>
      <div className='flex gap-6 text-base sm:text-xl mb-6 px-8  sm:pt-8 pt-6'>
        <div className='flex gap-3'>
          {updatedComments.length}
          <CommentIcon />
        </div>
        <div
          className='flex gap-3 cursor-pointer'
          onClick={onLike.bind(null, quote.id)}
        >
          {updatedLikes}
          <HeartIcon shouldFill={liked} />
        </div>
      </div>
      <div className='mx-8'>
        <hr className='w-full border-white border-opacity-30 mb-6 sm:hidden relative  ' />
      </div>

      <div className='max-h-80 overflow-y-auto px-8'>
        {updatedComments.length > 0 &&
          updatedComments.map((comment) => (
            <div className='mt-6' key={comment.id}>
              <ProfileCard
                image={
                  <div className='bg-white rounded-[50%] w-10 h-10 sm:w-14 sm:h-14 overflow-hidden mb-3 sm:mb-0 sm:mr-6 '>
                    <img
                      src={comment.user.image}
                      alt='avatar'
                      className='object-fill w-full h-full'
                    />
                  </div>
                }
                username={comment.user.username}
              />

              <p className='sm:ml-25 text-base sm:text-xl'>{comment.comment}</p>
              <div className='sm:ml-25'>
                <hr className='w-full border-white border-opacity-30 mt-6' />
              </div>
            </div>
          ))}
      </div>
      <form className='flex mt-6 px-8' onSubmit={(e) => onComment(e, quote.id)}>
        <div className='bg-white rounded-[50%] w-11 h-10 sm:w-16 sm:h-14 overflow-hidden mr-3 mt-1 sm:mt-0 sm:mr-12'>
          <img
            src={quote.user.image}
            alt='avatar'
            className='object-fill w-full h-full'
          />
        </div>
        <input
          value={comment}
          onChange={onCommentChange}
          type='text'
          className='focus:shadow-input w-full h-12 rounded-[10px] bg-zinc-870 text-gray-350  text-base sm:text-xl px-4 placeholder-gray-350'
          placeholder={commentPlaceholder}
        />
      </form>
    </div>
  );
};
