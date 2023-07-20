import { CheckMarkIcon, InvalidIcon, XWithCircleIcon } from '@/components';
import { TextAreaType } from './type';
import { useTextArea } from './useTextArea';
import { Controller } from 'react-hook-form';

export const TextArea = <T,>({
  name,
  title,
  setValue,
  getFieldState,
  control,
  language,
  defaultValue = '',
  labelShouldStay = false,
  isEnglishFont = false,
}: TextAreaType<T>) => {
  const { error, invalid, isDirty, fieldValue, isFocused, setIsFocused } =
    useTextArea<T>({
      getFieldState,
      name,
      control,
    });
  return (
    <div
      className={`flex flex-col ${
        isEnglishFont ? 'font-helvetica-neue' : 'font-helvetica-georgian'
      }`}
    >
      <div
        className={`flex relative  border-gray-550  border focus:shadow-input rounded-[4px] cursor-pointer 
    ${isDirty && !invalid && 'border-green-750 '}
    ${labelShouldStay && (fieldValue || isFocused) && 'text-gray-550 text-base'}
    ${error && 'border-red-650 '}`}
      >
        <label
          htmlFor={name as string}
          className='font-normal text-base sm:text-xl  pt-2  pl-3 italic'
        >
          {!labelShouldStay
            ? !isFocused && !fieldValue && title
            : `${title} ${fieldValue || isFocused ? ':' : ''}`}
        </label>

        <div className='relative text-white inline-block flex-1 py-1'>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <textarea
                {...field}
                name={name as string}
                id={name as string}
                className={`pr-20 sm:pr-24 border w-full   focus:outline-none -mb-2
                text-base  bg-transparent px-3 py-2 min-h-22 sm:text-xl
                border-transparent focus:border-transparent ${
                  !labelShouldStay && 'px-0'
                }`}
                onFocus={setIsFocused.bind(null, true)}
                onBlur={setIsFocused.bind(null, false)}
              ></textarea>
            )}
          />

          <div className='absolute top-2 sm:right-4 right-2   flex flex-row  gap-1 items-center'>
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
              <span className='text-gray-550 text-base'>{language}</span>
            )}
          </div>
        </div>
      </div>
      <span className=' min-h-6 text-red-550 text-base'>{error?.message}</span>
    </div>
  );
};
