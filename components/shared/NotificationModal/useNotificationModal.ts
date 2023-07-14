import { setCurrentModal } from '@/state';
import { useDispatch } from 'react-redux';

export const useNotificationModal = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(setCurrentModal(null));
  return { onClose };
};
