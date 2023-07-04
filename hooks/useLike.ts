import { toggleLike } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type useLikeArgs = {
  current_user_likes: number;
  likes: number;
};

export const useLike = ({ current_user_likes, likes }: useLikeArgs) => {
  const [liked, setLiked] = useState(!!current_user_likes);
  const [updatedLikes, setUpdatedLikes] = useState(likes);

  const { mutate: like } = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      setLiked((prev) => {
        setUpdatedLikes(prev ? updatedLikes - 1 : updatedLikes + 1);
        return !prev;
      });
    },
  });

  const onLike = async (quoteId: number) => await like(quoteId);

  return {
    onLike,
    liked,
    updatedLikes,
  };
};
