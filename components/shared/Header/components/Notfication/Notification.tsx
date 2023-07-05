import { BellIcon } from '@/components';
import { useNotification } from './useNotification';

export const Notification = () => {
  const { isOutside, ref } = useNotification();
  return (
    <div className='flex items-center' ref={ref}>
      <button className=''>
        <BellIcon />
      </button>

      {!isOutside && <div>hello</div>}
    </div>
  );
};
