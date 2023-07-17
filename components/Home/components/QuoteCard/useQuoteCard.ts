import { useQueryClient } from '@tanstack/react-query';
import { useQuoteCardArgs } from './type';
import { useComment, useLike } from '@/hooks';
import { QuoteType, UserType } from '@/types';

export const useQuoteCard = ({
  current_user_likes,
  likes,
  notifications,
  id,
}: useQuoteCardArgs) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserType>(['user']);

  const onLikeChange = (liked: boolean) => {
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

  const onCommentUpdate = (commentData: { id: number; comment: string }) => {
    queryClient.setQueryData<{ pages: { quotes: QuoteType[] }[] }>(
      ['quotes'],
      (prev) => {
        if (!prev) return prev;
        const updatedPages = prev.pages.map(({ quotes }) => ({
          quotes: quotes.map((oldQuote) =>
            oldQuote.id === id
              ? {
                  ...oldQuote,
                  notifications: [
                    ...oldQuote.notifications,
                    {
                      id: commentData.id,
                      comment: commentData.comment,
                      user: {
                        id: parseInt(user?.id as string),
                        username: user?.username as string,
                        image: user?.image as string,
                        email: user?.email as string,
                      },
                    },
                  ],
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
    onSuccess: onLikeChange,
  });
  const { comment, onComment, onCommentChange } = useComment({
    notifications,
    onSuccess: onCommentUpdate,
  });

  return {
    onLike,
    onCommentChange,
    comment,
    onComment,
    likeIsLoading: isLoading,
  };
};
