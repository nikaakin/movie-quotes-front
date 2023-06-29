import {
  Button,
  TextArea,
  ProfileCard,
  UploadImage,
  XIcon,
} from '@/components';
import { addMovieProps } from './type';
import { useAddMovie } from './useAddMovie';
import { MovieInput } from './components/MovieInput';
import { CustomSelect } from '@/components/';

export const AddMovie = ({ t }: addMovieProps) => {
  const {
    image,
    username,
    control,
    getFieldState,
    register,
    setValue,
    genres,
    handleSubmit,
    onSubmit,
    onClose,
  } = useAddMovie(t);
  return (
    <div className='relative w-full h-full sm:w-250 hide-scrollbar max-h-screen pt-8 pb-16 sm:pb-12 bg-neutral-950 text-white overflow-auto'>
      <button className='absolute right-6 top-8 ' onClick={onClose}>
        <XIcon />
      </button>
      <h1 className='sm:text-2xl text-xl font-medium pb-6 mb-10 px-8  border-b border-zinc-150 border-opacity-20 text-center '>
        {t('modals:form.add_movie.title')}
      </h1>
      <form className='px-8 ' onSubmit={handleSubmit(onSubmit)}>
        <div className='sm:mb-7 mb-9'>
          <ProfileCard
            image={
              <div className='bg-white rounded-[50%] w-10 h-10 sm:w-14 sm:h-14 overflow-hidden  '>
                <img
                  src={image}
                  alt='avatar'
                  className='object-fill w-full h-full '
                />
              </div>
            }
            username={username || ''}
          />
        </div>
        <MovieInput
          control={control}
          getFieldState={getFieldState}
          name='title_en'
          register={register('title_en')}
          setValue={setValue}
          title='Movie name'
          language='Eng'
        />
        <MovieInput
          control={control}
          getFieldState={getFieldState}
          name='title_ka'
          register={register('title_ka')}
          setValue={setValue}
          title='ფილმის სახელი'
          language='ქარ'
        />

        <CustomSelect
          control={control}
          getFieldState={getFieldState}
          name='genres'
          options={genres!}
          placeholder={t('modals:form.add_movie.genres')}
        />

        <MovieInput
          control={control}
          getFieldState={getFieldState}
          name='year'
          type='number'
          register={register('year')}
          setValue={setValue}
          title='წელი/Year'
        />
        <MovieInput
          control={control}
          getFieldState={getFieldState}
          name='director_en'
          register={register('director_en')}
          setValue={setValue}
          title='Director'
          language='Eng'
        />
        <MovieInput
          control={control}
          getFieldState={getFieldState}
          name='director_ka'
          register={register('director_ka')}
          setValue={setValue}
          title='რეჟისორი'
          language='ქარ'
        />

        <TextArea
          control={control}
          getFieldState={getFieldState}
          name='description_en'
          setValue={setValue}
          title='description'
          language='Eng'
        />
        <TextArea
          control={control}
          getFieldState={getFieldState}
          name='description_ka'
          setValue={setValue}
          title='აღწერა'
          language='ქარ'
        />

        <UploadImage
          control={control}
          getFieldState={getFieldState}
          register={register}
          setValue={setValue}
          t={t}
          isSplit
        />

        <Button
          content={t('modals:form.add_movie.submit')}
          type='submit'
          classes=' w-full py-2 text-xl'
        />
      </form>
    </div>
  );
};
