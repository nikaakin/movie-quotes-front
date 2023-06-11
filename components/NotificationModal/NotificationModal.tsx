import { Button } from '@/components';
import { NotificationModalProps } from './type';

export const NotificationModal = ({
  image,
  title,
  text,
  buttonText,
  skip = false,
  onClick = () => {},
}: NotificationModalProps) => {
  return (
    <div
      className='bg-zinc-850 w-full h-full py-16 sm:py-14  
    sm:px-8 text-white sm:rounded-[10px]  flex-col  '
    >
      <div className='flex flex-col items-center mx-8 bg-lg-blur px-8 py-10 rounded sm:bg-none backdrop-blur-xl'>
        <div className='mb-8'>
          {typeof image === 'string' ? <img alt={title} src={image} /> : image}
        </div>
        <h1 className='text-white text-3xl font-medium mb-8 text-center'>
          {title}
        </h1>
        <p className='font-normal text-base text-center mb-8 w-64 sm:w-90 '>
          {text}
        </p>
        <Button
          classes='sm:w-90 py-2 w-72'
          content={buttonText}
          onClick={onClick}
        />
        {skip && (
          <span className='text-gray-550 pt-2' onClick={onClick}>
            {skip}
          </span>
        )}
      </div>
    </div>
  );
};
