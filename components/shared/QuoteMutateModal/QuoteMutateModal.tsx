import { XIcon } from '@/components/Icons';
import { Button } from '../Button';
import { CustomSelect } from '../CustomSelect';
import { ProfileCard } from '../ProfileCard';
import { TextArea } from '../TextArea';
import { UploadImage } from '../UploadImage';
import { QuoteMutateModalProps } from './type';
import { useQuoteMutationModal } from './useQuoteMutationModal';
import { QuoteMutationSelectStyles } from '@/styles';
import { Fragment } from 'react';

export const QuoteMutateModal = ({
  defaultImage = '',
  defaultQuoteEng = '',
  defaultQuoteGeo = '',
  movieId,
  quoteId,
  movieDirector,
  movieTitle,
  movieGenres,
  movieImage,
  movieYear,
  fromSearch = false,
}: QuoteMutateModalProps) => {
  const {
    options,
    user,
    control,
    getFieldState,
    register,
    handleSubmit,
    onClose,
    onSubmit,
    setValue,
    locale,
    t,
  } = useQuoteMutationModal({
    movieId,
    defaultImage,
    defaultQuoteEng,
    defaultQuoteGeo,
    quoteId,
    fromSearch,
  });
  return (
    <Fragment>
      <div
        className='fixed top-0 left-0 w-full h-full opacity-50  sm:hidden'
        onClick={onClose}
      ></div>
      <div className='h-full  sm:max-h-[90vh] rounded-[12px]  relative w-full  sm:w-250 hide-scrollbar  pt-8 pb-16 sm:pb-12 bg-neutral-950 text-white overflow-auto '>
        <button className='absolute right-6 top-8 ' onClick={onClose}>
          <XIcon />
        </button>
        <h1 className=' capitalize sm:text-2xl text-xl font-medium pb-6 mb-10 px-8  border-b border-zinc-150 border-opacity-20 text-center '>
          {defaultQuoteEng
            ? t('modals:form.add_quote.edit')
            : movieId
            ? t('modals:form.add_quote.title')
            : t('modals:form.add_quote.new')}
        </h1>
        <form className='px-8 ' onSubmit={handleSubmit(onSubmit)}>
          <div className='sm:mb-7 mb-9'>
            <ProfileCard
              image={
                <div className='bg-white rounded-[50%] w-10 h-10 sm:w-14 sm:h-14 overflow-hidden  '>
                  <img
                    src={user?.image}
                    alt='avatar'
                    className='object-fill w-full h-full '
                  />
                </div>
              }
              username={user?.username || ''}
            />
          </div>
          {movieImage && (
            <div className='flex mb-8 sm:gap-8 gap-3'>
              <div className='sm:w-72 sm:h-40 w-28 h-20 rounded-[10px] '>
                <img
                  src={movieImage}
                  alt='movie'
                  className='w-full h-full object-cover rounded-[12px]'
                />
              </div>
              <div className='flex-1'>
                <div className='flex sm:justify-between sm:flex-row flex-col sm:mb-6 gap-3'>
                  <h3 className='sm:text-2xl text-orange-250 font-medium  text-base flex items-center gap-2'>
                    <span className='sm:max-w-68 max-w-32  inline-block text-ellipsis whitespace-nowrap overflow-hidden'>
                      {movieTitle}
                    </span>
                    <span> ({movieYear})</span>
                  </h3>
                </div>
                <div className='sm:text-lg text-xs font-bold flex gap-2 flex-wrap sm:mb-5'>
                  {movieGenres?.map((genre) => (
                    <span
                      key={genre.id}
                      className='bg-gray-550 px-3 py-1 rounded-[4px]'
                    >
                      {genre.genre[locale]}
                    </span>
                  ))}
                </div>
                <div className='sm:mb-5'>
                  <span className='text-gray-350 sm:text-lg text-base font-bold'>
                    {t('common:movie_show.director')}
                  </span>
                  :
                  <span className='sm:text-lg text-base font-medium pl-3'>
                    {movieDirector}
                  </span>
                </div>
              </div>
            </div>
          )}

          <TextArea
            control={control}
            getFieldState={getFieldState}
            name='quote_en'
            setValue={setValue}
            title='Start create new quote'
            language='Eng'
          />
          <TextArea
            control={control}
            getFieldState={getFieldState}
            name='quote_ka'
            setValue={setValue}
            title='ახალი ციტატა'
            language='ქარ'
          />

          <UploadImage
            control={control}
            getFieldState={getFieldState}
            register={register}
            setValue={setValue}
            image={defaultImage}
            t={t}
            isCameraBig
          />

          {!movieId && (
            <div className='mb-6'>
              <CustomSelect
                control={control}
                getFieldState={getFieldState}
                name='movie'
                options={options!}
                placeholder={t('modals:form.add_quote.choose')}
                styles={QuoteMutationSelectStyles}
                shouldHaveIndicator
              />
            </div>
          )}

          <Button
            content={
              defaultQuoteEng
                ? t('modals:form.add_quote.edit_submit')
                : t('modals:form.add_quote.title')
            }
            classes=' w-full py-2 text-xl'
            type='submit'
          />
        </form>
      </div>
    </Fragment>
  );
};
