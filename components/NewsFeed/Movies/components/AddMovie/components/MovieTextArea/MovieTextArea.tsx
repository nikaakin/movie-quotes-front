import {
  CheckMarkIcon,
  InvalidIcon,
  XWithCircleIcon,
} from '@/components/Icons';
import { MovieTextAreaType } from './type';
import { useMovieTextArea } from './useMovieTextArea';
import { Controller } from 'react-hook-form';

export const MovieTextArea = ({
  name,
  title,
  setValue,
  getFieldState,
  control,
  language,
}: MovieTextAreaType) => {
  const { error, invalid, isDirty, fieldValue, isFocused, setIsFocused } =
    useMovieTextArea({
      getFieldState,
      name,
      control,
    });
  return (
    <div
      className={`flex relative mb-5 border-gray-550  border focus:shadow-input rounded-[4px] cursor-pointer 
    ${isDirty && !invalid && 'border-green-750 border-[2px]'}
    ${(fieldValue || isFocused) && 'text-gray-550 text-base'}
    ${error && 'border-red-650 '}`}
    >
      <label
        htmlFor={name}
        className='font-normal text-base sm:text-xl  pt-2  pl-3'
      >
        {title} {(fieldValue || isFocused) && ':'}
      </label>

      <div className='relative text-white inline-block flex-1'>
        <Controller
          name={name}
          control={control}
          defaultValue=''
          render={({ field }) => (
            <textarea
              {...field}
              name={name}
              id={name}
              className='pr-24 border w-full   focus:outline-none 
                text-base  bg-transparent px-3 py-2 min-h-22 sm:text-xl
                border-transparent focus:border-transparent '
              onFocus={setIsFocused.bind(null, true)}
              onBlur={setIsFocused.bind(null, false)}
            ></textarea>
          )}
        />

        <div className='absolute top-2 right-2   flex flex-row  gap-1 items-center'>
          {fieldValue !== '' && isDirty && (
            <button
              type='button'
              onClick={setValue?.bind(null, name, '', {
                shouldValidate: true,
              })}
            >
              <XWithCircleIcon />
            </button>
          )}
          {error && <InvalidIcon />}
          {isDirty && !invalid && <CheckMarkIcon />}
          {language && (
            <span className='text-gray-550 sm:text-xl text-base'>
              {language}
            </span>
          )}
        </div>
      </div>
      <span className='absolute left-2 bottom-0 translate-y-full text-red-550 text-base'>
        {error?.message}
      </span>
    </div>
  );
};
