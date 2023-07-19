import React from 'react';
import { CheckMarkIcon, InvalidIcon, XWithCircleIcon } from '@/components';
import { MovieInputType } from './type';
import { useMovieInput } from './useMovieInput';

export const MovieInput = <T,>({
  register,
  name,
  title,
  type = 'text',
  classNames,
  setValue,
  getFieldState,
  control,
  language,
}: MovieInputType<T>) => {
  const { error, invalid, isDirty, fieldValue, isFocused, setIsFocused } =
    useMovieInput<T>({
      getFieldState,
      name,
      control,
    });
  return (
    <div className='relative '>
      <label
        htmlFor={name}
        className={` px-3 py-2 font-normal rounded-[4px] cursor-pointer text-base  sm:text-xl flex items-center gap-2 border-gray-550  border focus:shadow-input     
        ${isDirty && !invalid && 'border-green-750 border-[2px]'}
        ${(fieldValue || isFocused) && 'text-gray-550 text-base'}
        ${error && 'border-red-650 '}`}
      >
        {title} {(fieldValue || isFocused) && ':'}
        <div className='relative text-white inline-block flex-1'>
          <input
            type={type}
            id={name}
            {...register}
            className={` pr-24 border w-full   focus:outline-none
            text-base  bg-transparent ${classNames}
            border-transparent focus:border-transparent
          `}
            onFocus={setIsFocused.bind(null, true)}
            onBlur={setIsFocused.bind(null, false)}
          />
          <div className='absolute top-1/2 right-2  -translate-y-1/2 flex flex-row  gap-1 items-center'>
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
      </label>
      <span className='min-h-6 block text-red-550 text-base'>
        {error?.message}
      </span>
    </div>
  );
};
