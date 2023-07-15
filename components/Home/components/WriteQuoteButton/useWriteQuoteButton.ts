import { setCurrentModal } from '@/state';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

export const useWriteQuoteButton = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useDispatch();
  const onAddQuote = () => dispatch(setCurrentModal('add-quote'));

  return {
    t,
    onAddQuote,
  };
};
