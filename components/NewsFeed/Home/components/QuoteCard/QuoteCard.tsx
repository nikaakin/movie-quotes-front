import { QuoteCardProps } from './type';
import { CommentIcon, HeartIcon } from '@/components';
import { useQuoteCard } from './useQuoteCard';

export const QuoteCard = ({
  quoteData: {
    id,
    image,
    user,
    likes,
    quote,
    notifications,
    movie,
    current_user_likes,
  },
  t,
  locale,
}: QuoteCardProps) => {
  const {
    likeIsLoading,
    liked,
    onLike,
    updatedLikes,
    comment,
    onComment,
    onCommentChange,
    updatedComments,
  } = useQuoteCard({
    current_user_likes,
    likes,
    notifications,
  });

  return (
    <div className='sm:w-250 w-full p-9 sm:p-6 bg-neutral-950 rounded-[12px] backdrop-blur-xl mb-10'>
      <div className='mb-4'>
        <div className='flex flex-row  items-center gap-5'>
          <div className='bg-white rounded-[50%] w-10 h-10 sm:w-12 sm:h-12 overflow-hidden'>
            <img
              src={user.image}
              alt='avatar'
              className='object-fill w-full h-full'
            />
          </div>
          <div className='flex justify-center flex-col'>
            <h3 className='text-base sm:text-2xl'>{user.username}</h3>
          </div>
        </div>
      </div>

      <h3 className='text-base sm:text-xl pb-7 break-all'>
        “{quote[locale]}” {t('home:movie')} -{' '}
        <span className='text-orange-250'>{movie.title[locale]}</span> (
        {movie.year})
      </h3>

      <img
        src={image}
        alt='quote'
        className='w-full sm:h-125 h-52 mb-6 object-cover rounded-[10px]'
      />

      <div className='flex gap-6 text-base sm:text-xl mb-6'>
        <button className='flex gap-3'>
          {updatedComments.length}
          <CommentIcon />
        </button>
        <button
          className='flex gap-3'
          onClick={onLike.bind(null, id)}
          disabled={likeIsLoading}
        >
          {updatedLikes}
          <HeartIcon shouldFill={liked} />
        </button>
      </div>

      <hr className='w-full border-zinc-150 border-opacity-20 ' />

      <div className='max-h-80 overflow-y-auto'>
        {updatedComments.length > 0 &&
          updatedComments.map((comment) => (
            <div className='mt-6' key={comment.id}>
              <div className='flex flex-row  items-center  gap-5 mb-3 sm:mb-0'>
                <div className='bg-white rounded-[50%] w-10 h-10 sm:w-14 sm:h-14 overflow-hidden  sm:mr-6 '>
                  <img
                    src={comment.user.image}
                    alt='avatar'
                    className='object-fill w-full h-full'
                  />
                </div>
                <div className='flex justify-center flex-col'>
                  <h3 className='text-base sm:text-2xl'>
                    {comment.user.username}
                  </h3>
                </div>
              </div>

              <p className='sm:ml-25 text-base sm:text-xl'>{comment.comment}</p>
              <div className='sm:ml-25'>
                <hr className='w-full bg-zinc-150 bg-opacity-30 mt-6 border-none h-[1px] ' />
              </div>
            </div>
          ))}
      </div>

      <form className='flex mt-6' onSubmit={(e) => onComment(e, id)}>
        <div className='bg-white rounded-[50%] w-11 h-10 sm:w-16 sm:h-14 overflow-hidden mr-3 mt-1 sm:mt-0 sm:mr-12'>
          <img
            src={user.image}
            alt='avatar'
            className='object-fill w-full h-full'
          />
        </div>
        <input
          value={comment}
          onChange={onCommentChange}
          type='text'
          className='focus:shadow-input w-full h-12 bg-opacity-60 rounded-[10px] bg-zinc-870 text-gray-350  text-base sm:text-xl px-4 placeholder-gray-350'
          placeholder={t('home:comment')!}
        />
      </form>
    </div>
  );
};
