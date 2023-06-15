import { PasswordValidDisplayProps } from './type';

export const PasswordValidDisplay = ({
  title,
  min,
  max,
  isMoreThen = false,
  isLessThen = false,
}: PasswordValidDisplayProps) => {
  return (
    <div className='border border-gray-350 border-opacity-20 rounded p-6 mb-8'>
      <h1 className=' pb-4'>{title}</h1>
      <div>
        <span
          className={`${
            isMoreThen ? 'bg-green-750' : 'bg-neutral-450'
          }  w-1 h-1 inline-block rounded-full mb-1 mr-2`}
        ></span>
        <span className={`${isMoreThen ? 'text-white' : 'text-neutral-450'} `}>
          {min}
        </span>
      </div>
      <div>
        <span
          className={`${
            isLessThen ? 'bg-green-750' : 'bg-neutral-450'
          } w-1 h-1  inline-block rounded-full mb-1 mr-2`}
        ></span>
        <span className={`${isLessThen ? 'text-white' : 'text-neutral-450'} `}>
          {max}
        </span>
      </div>
    </div>
  );
};
