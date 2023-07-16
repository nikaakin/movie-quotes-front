import { toggleLike } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type useLikeArgs = {
  current_user_likes: number;
  likes: number;
  onSuccess?: (_: boolean) => void;
};

export const useLike = ({
  current_user_likes,
  likes,
  onSuccess,
}: useLikeArgs) => {
  const [liked, setLiked] = useState(!!current_user_likes);
  const [updatedLikes, setUpdatedLikes] = useState(likes);

  const { mutate: like, isLoading } = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      onSuccess && onSuccess(!liked);
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
    isLoading,
  };
};
