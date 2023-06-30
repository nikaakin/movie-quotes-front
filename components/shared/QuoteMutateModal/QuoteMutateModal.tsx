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
    t,
  } = useQuoteMutationModal({ movieId });
  return (
    <Fragment>
      <div
        className='fixed top-0 left-0 w-full h-full opacity-50  sm:hidden'
        onClick={onClose}
      ></div>
      <div className='relative w-full h-fit sm:w-250 hide-scrollbar max-h-screen pt-8 pb-16 sm:pb-12 bg-neutral-950 text-white overflow-auto'>
        <button className='absolute right-6 top-8 ' onClick={onClose}>
          <XIcon />
        </button>
        <h1 className='sm:text-2xl text-xl font-medium pb-6 mb-10 px-8  border-b border-zinc-150 border-opacity-20 text-center '>
          {t('modals:form.add_quote.title')}
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

          <TextArea
            control={control}
            getFieldState={getFieldState}
            name='quote_en'
            setValue={setValue}
            title='Start create new quote'
            language='Eng'
            defaultValue={defaultQuoteEng}
          />
          <TextArea
            control={control}
            getFieldState={getFieldState}
            name='quote_ka'
            setValue={setValue}
            title='ახალი ციტატა'
            language='ქარ'
            defaultValue={defaultQuoteGeo}
          />

          <UploadImage
            control={control}
            getFieldState={getFieldState}
            register={register}
            setValue={setValue}
            image={defaultImage}
            t={t}
          />

          {!movieId && (
            <div className='mb-6'>
              <CustomSelect
                control={control}
                getFieldState={getFieldState}
                name='movie'
                options={options!}
                placeholder={t('modals:attributes.movie')}
                styles={QuoteMutationSelectStyles}
              />
            </div>
          )}

          <Button
            content={t('modals:form.add_quote.submit')}
            classes=' w-full py-2 text-xl'
            type='submit'
          />
        </form>
      </div>
    </Fragment>
  );
};
