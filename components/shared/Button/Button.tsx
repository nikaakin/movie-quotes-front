import { buttonProps } from './type';

export const Button = ({
  content,
  isTransparent = false,
  classes = '',
  onClick,
  type = 'button',
  icon,
}: buttonProps) => {
  const background = isTransparent
    ? ' border-white border-solid bg-transparent'
    : 'border-red-650 border-solid bg-red-650';

  return (
    <button
      type={type}
      onClick={onClick}
      className={` font-normal 
      text-base sm:text-xl border rounded text-white ${background} ${classes}`}
    >
      <span className='flex  justify-center gap-2 items-center'>
        {icon ? icon : ''}
        {content}
      </span>
    </button>
  );
};
