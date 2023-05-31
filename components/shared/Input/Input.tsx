import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { InputType } from './type';
import { EyeSlashIcon } from '@/components';
import { useInput } from './useInput';

export const Input = ({
  register,
  errors,
  name,
  title,
  placeholder,
  type = 'text',
  classNames,
  value,
  required = false,
  shouldHide = false,
}: InputType) => {
  const { onEyeClick, typeOfInput } = useInput(shouldHide, type);
  return (
    <div className='flex relative flex-col mb-5'>
      {title && (
        <label htmlFor={name} className='font-normal text-base mb-2'>
          {title}
          {required && <span className='text-red-550'> *</span>}
        </label>
      )}
      <div className='relative '>
        <input
          type={typeOfInput}
          placeholder={placeholder}
          value={value}
          {...register}
          className={`px-3 py-2 border w-full border-gray-350 text-neutral-850 text-base rounded-[4px] placeholder:text-gray-550  bg-gray-350 ${classNames}`}
        />
        {shouldHide && (
          <button
            type='button'
            onClick={onEyeClick}
            className='absolute top-1/2 right-0 -translate-x-full -translate-y-1/2'
          >
            <EyeSlashIcon />
          </button>
        )}
      </div>
      <span className='absolute left-2 bottom-0 translate-y-full text-red-550 text-base'>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};
