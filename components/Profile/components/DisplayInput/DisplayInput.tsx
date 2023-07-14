import { DisplayInputProps } from './type';

export const DisplayInput = ({
  button,
  placeholder,
  title,
}: DisplayInputProps) => {
  return (
    <div className='sm:flex relative sm:flex-col mb-5'>
      <label
        htmlFor='username_display'
        className='font-normal text-base sm:mb-2'
      >
        {title}
      </label>
      <div className='relative flex gap-8  '>
        <input
          className='sm:text-xl text-lg  w-full disabled:sm:bg-gray-250 
            focus:shadow-input sm:px-3 sm:py-2 sm:pr-14 pb-4 pt-0 border-b sm:border border-opacity-50 border-gray-350 text-neutral-850 sm:rounded-[4px]
             placeholder:text-white sm:placeholder:text-gray-550  sm:bg-gray-350 bg-transparent  '
          placeholder={placeholder}
          disabled
        />
        {button}
      </div>
    </div>
  );
};
