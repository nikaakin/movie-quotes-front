import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { InputType } from './type';
import {
  CheckMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  InvalidIcon,
  XWithCircleIcon,
} from '@/components';
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
  dirtyFields,
  disabled = false,
  setValue,
}: InputType) => {
  const { onEyeClick, typeOfInput, isHidden } = useInput(shouldHide, type);
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
          className={`  disabled:bg-gray-250 focus:shadow-input px-3 py-2 pr-14 border w-full border-gray-350 text-neutral-850 text-base rounded-[4px] placeholder:text-gray-550  bg-gray-350 ${classNames} ${
            shouldHide ? 'pr-15' : ''
          }
          ${
            name in dirtyFields! && !(name in errors)
              ? 'border-green-750 border-[2px]'
              : ''
          }
          ${name in errors ? 'border-red-650 ' : ''}
          `}
          disabled={disabled}
        />
        <div className='absolute top-1/2 right-2  -translate-y-1/2 flex flex-row  gap-1 items-center'>
          {name in dirtyFields! && (
            <button type='button' onClick={() => setValue!(name, '')}>
              <XWithCircleIcon />
            </button>
          )}
          {name in errors && <InvalidIcon />}
          {name in dirtyFields! && !(name in errors) && <CheckMarkIcon />}
          {shouldHide && (
            <button type='button' onClick={onEyeClick}>
              {isHidden ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
      </div>
      <span className='absolute left-2 bottom-0 translate-y-full text-red-550 text-base'>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};
