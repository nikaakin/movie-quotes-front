import { CheckMarkWithCircleIcon, XIcon } from '@/components';

type ConfirmationModalProps = {
  title: string;
  onClose: () => void;
};

export const EditNotification = ({
  title,
  onClose,
}: ConfirmationModalProps) => {
  return (
    <div className='flex bg-gray-330 p-4  mt-28 mx-4 sm:-m-72'>
      <div className='flex-1 flex gap-2'>
        <button onClick={onClose}>
          <CheckMarkWithCircleIcon />
        </button>
        <h1 className='text-green-950  inline-block'>{title}</h1>
      </div>
      <button onClick={onClose}>
        <XIcon isBlack />
      </button>
    </div>
  );
};
