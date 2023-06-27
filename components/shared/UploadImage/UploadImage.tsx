import { CameraIcon } from '@/components/Icons';
import { UploadImageProps } from './type';
import { useUploadImage } from './useUploadImage';

export const UploadImage = ({
  t,
  image,
  register,
  setValue,
  getFieldState,
  control,
  isSplit = false,
}: UploadImageProps) => {
  const { error, fieldValue, invalid, isDirty, onDrop, onChange } =
    useUploadImage({
      setValue,
      control,
      getFieldState,
    });
  return (
    <div
      className={` border-gray-550  border focus:shadow-input mb-10 sm:mb-8 rounded-[4px] 
    ${isDirty && !invalid && 'border-green-750 border-[2px]'}
    ${error && 'border-red-650 '}`}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type='file'
        hidden
        id='image'
        {...register('image', {
          onChange: (event) => onChange(event.target.files[0]),
        })}
      />
      {!image && !fieldValue && (
        <div className='flex py-7 px-4 gap-4 items-center'>
          <div className='flex flex-row sm:justify-center justify-start flex-1 sm:flex-none  gap-2'>
            <CameraIcon />
            <span className='hidden sm:inline text-xl'>
              {t('modals:form.add_movie.image_upload')}
            </span>
            <span className='sm:hidden inline text-base'>
              {t('modals:form.add_movie.upload')}
            </span>
          </div>
          <label
            htmlFor='image'
            className=' cursor-pointer bg-purple-550 bg-opacity-40 rounded-[2px] p-2 text-base sm:text-lg'
          >
            {t('modals:form.add_movie.image_upload_button')}
          </label>
        </div>
      )}
      {(image || fieldValue) && !isSplit && (
        <div className=' relative'>
          <img
            src={fieldValue || image}
            alt='uploaded'
            className='w-full h-auto object-fill '
          />
          <label
            htmlFor='image'
            className='flex flex-col items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            cursor-pointer rounded-[10px] text-base sm:text-lg p-4 bg-gray-950  bg-opacity-80 '
          >
            <CameraIcon />
            <span className='text-base capitalize'>
              {' '}
              {t('modals:form.add_movie.change')}
            </span>
          </label>
        </div>
      )}

      {(image || fieldValue) && isSplit && (
        <div className='px-6 py-5 relative flex'>
          <div className='w-1/2'>
            <img
              src={fieldValue || image}
              alt='uploaded'
              className='w-full h-auto object-fill '
            />
          </div>
          <div className='flex flex-col items-start sm:items-center justify-center mx-auto'>
            <h3 className='text-orange-250 sm:text-base text-xs font-bold mb-5 uppercase'>
              {t('modals:form.add_movie.replace')}
            </h3>
            <div className='hidden sm:flex mb-4 text-xl'>
              <CameraIcon />
              <span className='ml-2'>
                {t('modals:form.add_movie.image_upload')}
              </span>
            </div>
            <label
              htmlFor='image'
              className='bg-purple-550 bg-opacity-40 rounded-[2px] p-2 text-base sm:text-lg cursor-pointer'
            >
              {t('modals:form.add_movie.image_upload_button')}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
