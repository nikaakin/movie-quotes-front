import { ProfileCard } from '@/components/shared';
import { addMovieProps } from './type';
import { useAddMovie } from './useAddMovie';
import { MovieInput } from './components/MovieInput';

export const AddMovie = ({ t }: addMovieProps) => {
  const { image, username, control, getFieldState, register, setValue } =
    useAddMovie();
  return (
    <div className='w-250 pt-8 pb-16 sm:pb-12 bg-neutral-950 text-white'>
      <h1 className='sm:text-2xl text-xl font-medium pb-6 mb-10 px-8  border-b border-zinc-150 border-opacity-20 text-center '>
        {t('modals:form.add_movie.title')}
      </h1>
      <div className='px-8 '>
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
        />
      </div>
    </div>
  );
};
