import { Button } from '@/components';

type ConfirmationModalProps = {
  title: string;
  cancel: string;
  confirm: string;
  onClose: () => void;
  onSubmit: () => void;
};

export const ConfirmationModal = ({
  title,
  cancel,
  confirm,
  onClose,
  onSubmit,
}: ConfirmationModalProps) => {
  return (
    <div className='text-white text-base w-90  sm:w-96 h-auto pt-16  mt-36   sm:-mt-72 mx-auto backdrop-blur-xl bg-lg-blur rounded-[10px] bg-opacity-30'>
      <h1 className='text-center mb-11 sm:mb-20'>{title}</h1>
      <div className=' flex justify-between sm:justify-end pr-6  pl-9  sm:gap-8 py-7 border-t border-whire sm:pr-4'>
        <button className='' onClick={onClose}>
          {cancel}
        </button>
        <Button
          onClick={onSubmit}
          content={confirm}
          classes='py-2 px-2 text-base'
        />
      </div>
    </div>
  );
};
