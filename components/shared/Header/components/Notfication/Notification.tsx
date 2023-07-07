import { BellIcon } from '@/components';
import { useNotification } from './useNotification';

export const Notification = () => {
  const { isOutside, ref, notifications } = useNotification();
  return (
    <div className='flex items-center relative' ref={ref}>
      <button className='relative'>
        <BellIcon />
        <span className='absolute top-0 right-0 translate-x-1/2  text-white font-medium text-base w-6 h-6 rounded-full bg-red-650'>
          {notifications.length}
        </span>
      </button>

      {!isOutside && (
        <div className='absolute bottom-0  before:w-0 before:h-0 before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[10px] before:border-b-black'>
          hello
        </div>
      )}
    </div>
  );
};
