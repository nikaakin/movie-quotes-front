import { Modal, PencilWithBorderIcon, QuoteMutateModal } from '@/components';
import { useWriteQuoteButton } from './useWriteQuoteButton';
import { Fragment } from 'react';

export const WriteQuoteButton = ({
  isSearchActive,
}: {
  isSearchActive: boolean;
}) => {
  const { t, toggleSearchBar, onClose, currentModal } = useWriteQuoteButton();

  return (
    <Fragment>
      {currentModal && (
        <Modal onClose={onClose} background='lg-main'>
          {currentModal === 'add-quote' ? <QuoteMutateModal /> : null}
        </Modal>
      )}
      <div
        className='cursor-pointer text-white sm sm:gap-4 gap-3
        flex text-base sm:text-xl rounded-[10px] sm:bg-zinc-870 px-9 sm:py-3 sm:px-4  '
        onClick={!isSearchActive ? toggleSearchBar : undefined}
      >
        <PencilWithBorderIcon />
        <span>{t('home.write_quote')}</span>
      </div>
    </Fragment>
  );
};
