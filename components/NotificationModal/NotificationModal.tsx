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
    sm:px-24 text-white sm:rounded-[10px] flex items-center flex-col'
    >
      <div className='mb-8'>
        {typeof image === 'string' ? <img alt={title} src={image} /> : image}
      </div>
      <h1 className='text-white text-3xl font-medium mb-8'>{title}</h1>
      <p className='font-normal text-base text-center mb-8 w-90'>{text}</p>
      <Button classes='w-90 py-2' content={buttonText} onClick={onClick} />
      {skip && <p className='text-gray-550'>Skip, I’ll confirm later</p>}
    </div>
  );
};
