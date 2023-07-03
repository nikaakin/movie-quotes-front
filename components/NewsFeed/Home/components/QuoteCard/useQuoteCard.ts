import { commentService, isAuthenticated, toggleLike } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useQuoteCardArgs } from './type';
import { useUserQuery } from '@/hooks';

export const useQuoteCard = ({
  current_user_likes,
  likes,
  notifications,
}: useQuoteCardArgs) => {
  const [liked, setLiked] = useState(!!current_user_likes);
  const [updatedLikes, setUpdatedLikes] = useState(likes);
  const [updatedComments, setUpdatedComments] = useState(notifications);
  const [comment, setComment] = useState('');

  const { data: user } = useUserQuery({
    queryFn: () => isAuthenticated(),
    enabled: false,
  });

  const { mutate: like } = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      setLiked((prev) => {
        setUpdatedLikes(prev ? updatedLikes - 1 : updatedLikes + 1);
        return !prev;
      });
    },
  });

  const { mutate: submitComment } = useMutation({
    mutationFn: commentService,
    onSuccess: (data) => {
      setUpdatedComments((prev) => [
        ...prev,
        {
          ...data,
          user: {
            id: parseInt(user?.id as string),
            username: user?.username as string,
            image: user?.image as string,
            email: user?.email as string,
          },
        },
      ]);
    },
  });

  const onLike = async (quoteId: number) => await like(quoteId);

  const onComment = async (e: FormEvent<HTMLFormElement>, quoteId: number) => {
    e.preventDefault();
    comment && (await submitComment({ quoteId, comment }));
  };
  const onCommentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  return {
    onLike,
    liked,
    updatedLikes,
    updatedComments,
    onCommentChange,
    comment,
    onComment,
  };
};
