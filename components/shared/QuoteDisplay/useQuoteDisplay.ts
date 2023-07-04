import { useComment, useLike, useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';
import { useQuoteDisplayArgs } from './type';

export const useQuoteDisplay = ({
  current_user_likes,
  likes,
  notifications,
}: useQuoteDisplayArgs) => {
  const { data: user } = useUserQuery({
    enabled: false,
    queryFn: isAuthenticated,
  });

  const { liked, onLike, updatedLikes } = useLike({
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
    userId: parseInt(user?.id as string),
  };
};
