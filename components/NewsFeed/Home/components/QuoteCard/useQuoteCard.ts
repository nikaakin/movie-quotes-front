import { useQuoteCardArgs } from './type';
import { useComment, useLike } from '@/hooks';

export const useQuoteCard = ({
  current_user_likes,
  likes,
  notifications,
}: useQuoteCardArgs) => {
  const { liked, onLike, updatedLikes, isLoading } = useLike({
    current_user_likes,
    likes,
  });
  const { comment, onComment, onCommentChange, updatedComments } = useComment({
    notifications,
  });

  return {
    onLike,
    liked,
    updatedLikes,
    updatedComments,
    onCommentChange,
    comment,
    onComment,
    likeIsLoading: isLoading,
  };
};
