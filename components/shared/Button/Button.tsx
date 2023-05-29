import { buttonProps } from './type';

export const Button = ({
  content,
  isTransparent = true,
  classes = '',
}: buttonProps) => {
  const background = isTransparent
    ? ' border-white border-solid bg-transparent'
    : 'border-red-650 border-solid bg-red-650';

  return (
    <button
      className={` px-3 py-1  font-normal 
      text-sm sm:text-s border rounded text-white ${background} ${classes}`}
    >
      {content}
    </button>
  );
};
