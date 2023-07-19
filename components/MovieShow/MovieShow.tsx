import {
  Modal,
  MovieMutation,
  PencilIcon,
  PlusIcon,
  QuoteDisplayCard,
  QuoteMutateModal,
  QuotesDisplay,
  TrashBinIcon,
} from '@/components';
import { useMovieShow } from './useMovieShow';

export const MovieShow = () => {
  const {
    movie,
    t,
    locale,
    onModalChange,
    currentModal,
    onSelectedIdChange,
    selectedQuote,
    onDeleteMovie,
    deleteQuoteMutation,
  } = useMovieShow();
  return (
    <div className='flex-1  sm:pl-0 sm:pr-16 pt-4 sm:pt-8 pb-52 text-white'>
      {currentModal && !currentModal.includes('notification') && (
        <Modal
          onClose={onModalChange.bind(null, null)}
          shouldHaveX={false}
          background='lg-modals opacity-70 backdrop-blur-sm'
        >
          {currentModal === 'add-quote' ? (
            <QuoteMutateModal
              movieId={movie?.id}
              movieDirector={movie?.director[locale]}
              movieGenres={movie?.genres}
              movieTitle={movie?.title[locale]}
              movieImage={movie?.image}
              movieYear={movie?.year}
            />
          ) : currentModal === 'edit-movie' ? (
            <MovieMutation
              t={t}
              defaultValues={{
                description_en: movie?.description.en,
                description_ka: movie?.description.ka,
                director_en: movie?.director.en,
                director_ka: movie?.director.ka,
                genres: movie?.genres,
                image: movie?.image,
                title_en: movie?.title.en,
                title_ka: movie?.title.ka,
                year: movie?.year,
              }}
            />
          ) : currentModal === 'edit-quote' ? (
            <QuoteMutateModal
              defaultImage={selectedQuote?.image || ''}
              defaultQuoteEng={selectedQuote?.quote['en']}
              defaultQuoteGeo={selectedQuote?.quote['ka']}
              movieId={selectedQuote?.movie_id + ''}
              quoteId={selectedQuote?.id}
            />
          ) : currentModal === 'quote-view' ? (
            <QuotesDisplay
              onClose={onModalChange.bind(null, null)}
              quote={selectedQuote!}
              title={t('common:movie_show.view_quote')}
              onQuoteDelete={() => deleteQuoteMutation(selectedQuote!.id)}
              onQuoteEdit={onModalChange.bind(null, 'edit-quote')}
              commentPlaceholder={t('common:movie_show.comment')!}
              movieId={movie?.id}
            />
          ) : null}
        </Modal>
      )}
      <h1 className='text-2xl font-medium hidden sm:block mb-8 px-8'>
        {t('common:movie_show.title')}
      </h1>
      <div className='flex sm:gap-5 gap-6 flex-col sm:flex-row sm:pt-0 pt-5 sm:mb-10 mb-8 px-8'>
        <div className='w-full sm:w-200 sm:h-107 h-72  '>
          <img
            src={movie?.image}
            alt='movie'
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div className='flex-1 sm:max-w-lg max-w-[80vw] relative'>
          <div className='flex sm:justify-between sm:flex-row flex-col mb-6 gap-3 items-start'>
            <h3 className='text-2xl text-orange-250 font-medium  flex items-center gap-2'>
              <span className='sm:max-w-68 max-w-56 inline-block text-ellipsis whitespace-nowrap overflow-hidden '>
                {movie?.title[locale]}
              </span>
              <span> ({movie?.year})</span>
            </h3>
            <div className='bg-zinc-870 bg-opacity-60 rounded-[10px] px-5 py-3 sm:px-7 sm:py-3 w-fit flex justify-between'>
              <div className='sm:pr-6 pr-4  border-r-gray-350 border-r border-opacity-40 '>
                <button
                  className=' flex items-center '
                  onClick={onModalChange.bind(null, 'edit-movie')}
                >
                  <PencilIcon />
                </button>
              </div>
              <div className='sm:pl-6 pl-4 '>
                <button className='flex items-center' onClick={onDeleteMovie}>
                  <TrashBinIcon />
                </button>
              </div>
            </div>
          </div>
          <div className='text-lg font-bold flex gap-2 flex-wrap mb-5'>
            {movie?.genres.map((genre) => (
              <span
                key={genre.genre['en']}
                className='bg-gray-550 px-3 py-1 rounded-[4px]'
              >
                {genre.genre[locale]}
              </span>
            ))}
          </div>
          <div className='mb-5'>
            <span className='text-gray-350 text-lg font-bold'>
              {t('common:movie_show.director')}
            </span>
            :
            <span className='text-lg font-medium pl-3 break-all'>
              {movie?.director[locale]}
            </span>
          </div>
          <p className='text-gray-350 text-lg break-words sm:absolute '>
            {movie?.description[locale]}
          </p>
        </div>
      </div>
      <div className='flex sm:gap-4 gap-9 flex-col sm:flex-row relative sm:items-center px-8 mb-9 sm:mb-16'>
        <h3 className='text-2xl  order-2 sm:-order-1 '>
          {t('common:movie_show.quotes')}{' '}
          <span className='text-base sm:text-2xl block sm:inline'>
            ({t('common:movie_show.total')} {movie?.quotes.length})
          </span>
        </h3>
        <hr className='bg-zinc-650 sm:bg-gray-550 sm:w-[1px] order-1 sm:h-7 w-full h-[1px]  border-none' />
        <button
          onClick={onModalChange.bind(null, 'add-quote')}
          className='w-fit -order-1 sm:order-2 font-normal px-3 py-2 text-base sm:text-xl border rounded text-white border-red-650 border-solid bg-red-650'
        >
          <span className='flex justify-center gap-2 items-center'>
            <PlusIcon />
            {t('common:movie_show.add_quote')}
          </span>
        </button>
      </div>

      <div className='flex gap-10 flex-col sm:ml-6'>
        {movie?.quotes &&
          movie?.quotes.map((quote) => (
            <QuoteDisplayCard
              quote={quote}
              key={quote.id}
              t={t}
              onSelectQuote={onSelectedIdChange}
              onDeleteQuote={deleteQuoteMutation.bind(null, quote.id)}
            />
          ))}
      </div>
    </div>
  );
};
