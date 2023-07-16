import { useComment, useLike, useUserQuery } from '@/hooks';
import { isAuthenticated } from '@/services';
import { useQuoteDisplayArgs } from './type';
import { useQueryClient } from '@tanstack/react-query';
import { QuoteType } from '@/types';

export const useQuoteDisplay = ({
  current_user_likes,
  likes,
  notifications,
  movieId,
  quote,
}: useQuoteDisplayArgs) => {
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery({
    enabled: false,
    queryFn: isAuthenticated,
  });

  const onLikeChange = (liked: boolean) => {
    if (movieId) {
      queryClient.setQueryData<{ quotes: QuoteType[] }>(
        ['movie', `${movieId}`],
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            quotes: prev.quotes.map((oldQuote) =>
              oldQuote.id === quote.id
                ? {
                    ...oldQuote,
                    current_user_likes: liked ? 1 : 0,
                    likes: liked ? oldQuote.likes + 1 : oldQuote.likes - 1,
                  }
                : oldQuote
            ),
          };
        }
      );
    } else {
      queryClient.setQueryData<{ pages: { quotes: QuoteType[] }[] }>(
        ['quotes'],
        (prev) => {
          if (!prev) return prev;
          const updatedPages = prev.pages.map(({ quotes }) => ({
            quotes: quotes.map((oldQuote) =>
              oldQuote.id === quote.id
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
    }
  };

  const onCommentUpdate = (commentData: { id: number; comment: string }) => {
    if (movieId) {
      queryClient.setQueryData<{ quotes: QuoteType[] }>(
        ['movie', `${movieId}`],
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            quotes: prev.quotes.map((oldQuote) =>
              oldQuote.id === quote.id
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
          };
        }
      );
    } else {
      queryClient.setQueryData<{ pages: { quotes: QuoteType[] }[] }>(
        ['quotes'],
        (prev) => {
          if (!prev) return prev;
          const updatedPages = prev.pages.map(({ quotes }) => ({
            quotes: quotes.map((oldQuote) =>
              oldQuote.id === quote.id
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
    }
  };

  const { onLike, liked, updatedLikes } = useLike({
    current_user_likes,
    likes,
    onSuccess: onLikeChange,
  });
  const { comment, onComment, onCommentChange, updatedComments } = useComment({
    notifications,
    onSuccess: onCommentUpdate,
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
