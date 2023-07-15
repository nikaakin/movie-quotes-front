import { Button } from '@/components';
import { NotificationModalProps } from './type';
import { useNotificationModal } from './useNotificationModal';

export const NotificationModal = ({
  image,
  title,
  text,
  buttonText,
  skip = false,
  onClick = () => {},
}: NotificationModalProps) => {
  const { onClose } = useNotificationModal();
  return (
    <div
      className='bg-lg-modals sm:bg-zinc-850 sm:bg-none  w-full h-full py-16 sm:py-0  
    sm:px-0 text-white sm:rounded-[10px]  flex-col  '
      onClick={onClose}
    >
      <div
        className='flex flex-col items-center mx-8 bg-lg-blur px-8 sm:px-16 sm:mx-0 py-10 sm:pb-14 rounded sm:bg-none backdrop-blur-xl sm:backdrop-blur-none'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-8'>
          {typeof image === 'string' ? <img alt={title} src={image} /> : image}
        </div>
        <h1 className='text-white sm:text-3xl text-2xl font-medium mb-8 text-center'>
          {title}
        </h1>
        <p className='font-normal text-base text-center mb-8 w-64 sm:w-96 '>
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
