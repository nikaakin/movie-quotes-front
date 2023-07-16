import { commentService, isAuthenticated } from '@/services';
import { useUserQuery } from './useUserQuery';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

type useCommentArgs = {
  notifications: {
    id: number;
    comment: string;
    user: {
      id: number;
      username: string;
      image: string;
      email: string;
    };
  }[];
  onSuccess?: (_: { id: number; comment: string }) => void;
};

export const useComment = ({ notifications, onSuccess }: useCommentArgs) => {
  const [comment, setComment] = useState('');
  const [updatedComments, setUpdatedComments] = useState(notifications);

  const { data: user } = useUserQuery({
    queryFn: () => isAuthenticated(),
    enabled: false,
  });

  const { mutate: submitComment } = useMutation({
    mutationFn: commentService,
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
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

  const onComment = async (e: FormEvent<HTMLFormElement>, quoteId: number) => {
    e.preventDefault();
    comment.trim() &&
      (await submitComment({ quoteId, comment: comment.trim() }));
    setComment('');
  };
  const onCommentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  return {
    updatedComments,
    onCommentChange,
    comment,
    onComment,
  };
};
