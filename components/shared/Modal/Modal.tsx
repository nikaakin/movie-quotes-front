import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './type';
import { XIcon } from '@/components';

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  background = 'black',
  shouldHaveX = true,
}) => {
  const modalLayout = (content: ReactNode) => (
    <div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-${background} z-[500] `}
        onClick={onClose}
      ></div>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[500] h-full sm:h-fit w-full sm:w-fit'>
        {shouldHaveX && (
          <button className='absolute right-6 top-8 ' onClick={onClose}>
            <XIcon />
          </button>
        )}
        {content}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalLayout(children),
    document.getElementById('modal')!
  );
};
