import { useQueryClient } from '@tanstack/react-query';
import { useQuoteCardArgs } from './type';
import { useComment, useLike } from '@/hooks';
import { QuoteType } from '@/types';

export const useQuoteCard = ({
  current_user_likes,
  likes,
  notifications,
  id,
}: useQuoteCardArgs) => {
  const queryClient = useQueryClient();

  const onLikeUpdate = (liked: boolean) => {
    queryClient.setQueryData<{ pages: { quotes: QuoteType[] }[] }>(
      ['quotes'],
      (prev) => {
        if (!prev) return prev;
        const updatedPages = prev.pages.map(({ quotes }) => ({
          quotes: quotes.map((oldQuote) =>
            oldQuote.id === id
              ? {
                  ...oldQuote,
                  current_user_likes: liked ? 1 : 0,
                  likes: liked ? oldQuote.likes + 1 : oldQuote.likes - 1,
                }
              : oldQuote
          ),
        }));
        return {
          ...prev,
          pages: updatedPages,
        };
      }
    );
    queryClient.invalidateQueries(['quotes']);
  };

  const { onLike, isLoading } = useLike({
    current_user_likes,
    likes,
    onSuccess: onLikeUpdate,
  });
  const { comment, onComment, onCommentChange, updatedComments } = useComment({
    notifications,
  });

  return {
    onLike,
    updatedComments,
    onCommentChange,
    comment,
    onComment,
    likeIsLoading: isLoading,
  };
};
