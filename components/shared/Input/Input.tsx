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
  name,
  title,
  placeholder,
  type = 'text',
  classNames,
  value,
  required = false,
  shouldHide = false,
  disabled = false,
  setValue,
  getFieldState,
  control,
  bigIcons = false,
}: InputType) => {
  const {
    onEyeClick,
    typeOfInput,
    isHidden,
    error,
    invalid,
    isDirty,
    fieldValue,
  } = useInput({
    shouldHide,
    type,
    getFieldState,
    name,
    control,
  });
  return (
    <div className='flex relative flex-col '>
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
          className={`border-[2px] disabled:bg-gray-250 focus:shadow-input px-3 py-2 pr-16 w-full border-gray-350 text-neutral-850 text-base rounded-[4px] placeholder:text-gray-550  bg-gray-350 ${classNames} ${
            shouldHide && 'pr-15'
          }
          ${isDirty && !invalid && 'border-green-750'}
          ${error && 'border-red-650 '}
          `}
          disabled={disabled}
        />
        <div className='absolute top-1/2 right-3  -translate-y-1/2 flex flex-row  gap-1 items-center'>
          {fieldValue !== '' && isDirty && (
            <button
              type='button'
              onClick={setValue?.bind(null, name, '', { shouldValidate: true })}
            >
              <XWithCircleIcon />
            </button>
          )}
          {error && <InvalidIcon />}
          {isDirty && !invalid && <CheckMarkIcon />}
          {shouldHide && (
            <button type='button' onClick={onEyeClick}>
              {isHidden ? (
                <EyeSlashIcon
                  width={bigIcons ? 24 : 16}
                  height={bigIcons ? 24 : 16}
                />
              ) : (
                <EyeIcon
                  width={bigIcons ? 24 : 16}
                  height={bigIcons ? 24 : 16}
                />
              )}
            </button>
          )}
        </div>
      </div>
      <span className='min-h-6 block text-red-550 text-base'>
        {error?.message}
      </span>
    </div>
  );
};
