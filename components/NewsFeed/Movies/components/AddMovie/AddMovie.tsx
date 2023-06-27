import { Button, ProfileCard } from '@/components';
import { addMovieProps } from './type';
import { useAddMovie } from './useAddMovie';
import { MovieInput } from './components/MovieInput';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { reactSelectStyles } from '@/styles';

export const AddMovie = ({ t }: addMovieProps) => {
  const {
    image,
    username,
    control,
    getFieldState,
    register,
    setValue,
    genres,
  } = useAddMovie();
  return (
    <div className='w-full h-full sm:w-250 hide-scrollbar max-h-screen pt-8 pb-16 sm:pb-12 bg-neutral-950 text-white overflow-auto'>
      <h1 className='sm:text-2xl text-xl font-medium pb-6 mb-10 px-8  border-b border-zinc-150 border-opacity-20 text-center '>
        {t('modals:form.add_movie.title')}
      </h1>
      <form className='px-8 '>
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
        <Controller
          name='genres'
          control={control}
          render={({ field: { onChange, ref } }) => (
            <Select
              placeholder={t('modals:form.add_movie.genres')}
              ref={ref}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={reactSelectStyles}
              options={genres}
              isMulti
              onChange={(val) => onChange(val)}
            />
          )}
          shouldUnregister
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

        <Button
          content={t('modals:form.add_movie.submit')}
          type='submit'
          classes=' w-full py-2 text-xl'
        />
      </form>
    </div>
  );
};
