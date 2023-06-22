import { CommentWithQuoteIcon } from '@/components';
import { LocaleStringType, MovieType } from '@/types';
import Link from 'next/link';

export const MovieCard = ({
  movie: { image, title, quotes_count, id, year },
  locale,
}: {
  locale: LocaleStringType;
  movie: MovieType;
}) => {
  return (
    <Link href={`/news-feed/movies/${id}`} className='w-fit'>
      <div className='w-87 sm:w-96 h-auto max-h-96 mb-4'>
        <img
          src={image}
          alt={title[locale]}
          className='w-full h-full object-fill rounded-xl'
        />
      </div>
      <h1 className='text-2xl font-medium mb-4'>
        {title[locale]} ({year})
      </h1>
      <h3 className='text-xl flex gap-2'>
        {quotes_count}
        <CommentWithQuoteIcon />
      </h3>
    </Link>
  );
};
