import { useOutsideClickDetect, useUserQuery } from '@/hooks';
import {
  deleteQuote,
  isAuthenticated,
  seen,
  seenAll,
  showQuote,
} from '@/services';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCurrentModal } from '@/state';
import { QuoteType } from '@/types';

export const useNotification = () => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const { isOutside, ref } = useOutsideClickDetect<HTMLDivElement>();
  const dispatch = useDispatch();
  const { currentModal } = useSelector(
    (state: RootState) => state.currentModal
  );

  const { onNotificationupdate, notifications, onNotificationSeenAll } =
    useUserQuery({
      enabled: false,
      queryFn: isAuthenticated,
      enableNotifications: true,
    });

  const dateCalc = (data: string) => {
    const time = Date.now() - new Date(data).getTime();
    if (time < 60000) return t('common:time.just_now');
    if (time < 3600000)
      return Math.floor(time / 60000) <= 1
        ? t('common:time.minute_ago')
        : `${Math.floor(time / 60000)} ${t('common:time.minutes_ago')}`;
    if (time < 86400000)
      return Math.floor(time / 360000) <= 1
        ? t('common:time.hour_ago')
        : `${Math.floor(time / 3600000)} ${t('common:time.hours_ago')}`;
    if (time < 604800000)
      return Math.floor(time / 86400000) <= 1
        ? t('common:time.day_ago')
        : `${Math.floor(time / 86400000)} ${t('common:time.days_ago')}`;
    if (time < 2592000000)
      return Math.floor(time / 604800000) <= 1
        ? t('common:time.week_ago')
        : `${Math.floor(time / 604800000)} ${t('common:time.weeks_ago')}`;
    if (time < 31536000000)
      return Math.floor(time / 2592000000) <= 1
        ? t('common:time.month_ago')
        : `${Math.floor(time / 2592000000)} ${t('common:time.months_ago')}`;
  };

  const { mutate: onNotificationSeen } = useMutation({
    mutationFn: seen,
    onSuccess: (data) => onNotificationupdate(data.id),
  });

  const { mutate: onNotificationMarkAll } = useMutation({
    mutationFn: seenAll,
    onSuccess: () => onNotificationSeenAll(),
  });

  const { data: selectedQuote, mutate: fetchQuote } = useMutation({
    mutationFn: (id: number) => showQuote(id),
    mutationKey: ['selectedQuote'],
  });

  const onNotificationClick = async (
    notificationId: number,
    quoteId: number,
    seen: boolean,
    current_user_likes: boolean
  ) => {
    !seen && onNotificationSeen(notificationId);
    fetchQuote(quoteId);

    dispatch(setCurrentModal('quote-view-from-notification'));
  };
  const { mutate } = useMutation({
    mutationFn: () => deleteQuote(selectedQuote?.id || 0),
    onSuccess: () => {
      dispatch(setCurrentModal(null));
      queryClient.setQueriesData<{ pages: { quotes: QuoteType[] }[] }>(
        ['quotes'],
        (oldData) => {
          const newQuotes = oldData?.pages.map((q) => {
            const filtered = q.quotes.filter(
              (qq) => qq.id !== selectedQuote?.id
            );
            return { ...q, quotes: filtered };
          });
          return { ...oldData, pages: newQuotes } as {
            pages: { quotes: QuoteType[] }[];
          };
        }
      );
    },
  });

  const onModalClose = () => dispatch(setCurrentModal(null));
  const onEdit = () =>
    dispatch(setCurrentModal('quote-edit-from-notification'));
  const onDelete = () => mutate();

  return {
    isOutside,
    ref,
    notifications: notifications || [],
    dateCalc,
    onNotificationMarkAll,
    newNotifications: notifications?.reduce(
      (acc, curr) => (curr.seen ? acc : acc + 1),
      0
    ),
    t,
    onNotificationClick,
    onModalClose,
    selectedQuote,
    currentModal,
    onEdit,
    onDelete,
  };
};
