import { buttonProps } from './type';

export const Button = ({
  content,
  isTransparent = false,
  classes = '',
  onClick,
  type = 'button',
  icon,
  isLink = false,
  isDisabled = false,
}: buttonProps) => {
  const background = isTransparent
    ? ' border-white border-solid bg-transparent'
    : 'border-red-650 border-solid bg-red-650';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={` font-normal 
      text-base sm:text-xl border rounded text-white ${background} ${classes} ${
        isDisabled ? 'opacity-60' : ''
      }`}
    >
      {isLink ? (
        <a
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google/redirect`}
        >
          <span className='flex  justify-center gap-2 items-center'>
            {icon ? icon : ''}
            {content}
          </span>
        </a>
      ) : (
        <span className='flex  justify-center gap-2 items-center'>
          {icon ? icon : ''}
          {content}
        </span>
      )}
    </button>
  );
};
