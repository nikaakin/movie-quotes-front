import { RootState, setCurrentModal } from '@/state';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';

export const useWriteQuoteButton = () => {
  const { t } = useTranslation(['common']);
  const {
    currentModal: { currentModal },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const toggleSearchBar = () => dispatch(setCurrentModal('add-quote'));
  const onClose = () => dispatch(setCurrentModal(null));

  return {
    t,
    toggleSearchBar,
    onClose,
    currentModal,
  };
};
