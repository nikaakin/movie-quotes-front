import { useQueryClient } from '@tanstack/react-query';
import { useQuoteCardArgs } from './type';
import { useComment, useLike } from '@/hooks';

export const useQuoteCard = ({
  current_user_likes,
  likes,
  notifications,
  id,
}: useQuoteCardArgs) => {
  const { onLike, isLoading } = useLike({
    current_user_likes,
    likes,
  });
  const { comment, onComment, onCommentChange } = useComment({
    notifications,
  });

  return {
    onLike,
    onCommentChange,
    comment,
    onComment,
    likeIsLoading: isLoading,
  };
};
