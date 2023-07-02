import { toggleLike } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useQuoteCard = ({
  current_user_likes,
  likes,
}: {
  current_user_likes: number;
  likes: number;
}) => {
  const [liked, setLiked] = useState(!!current_user_likes);
  const [updatedLikes, setUpdatedLikes] = useState(likes);

  const { mutate } = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      setLiked((prev) => {
        setUpdatedLikes(prev ? updatedLikes - 1 : updatedLikes + 1);
        return !prev;
      });
    },
  });

  const onLike = async (quoteId: number) => await mutate(quoteId);

  return { onLike, liked, updatedLikes };
};
