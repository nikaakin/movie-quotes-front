export type NotificationType = {
  id: number;
  isLike?: boolean;
  comment?: string;
  seen: boolean;
  user: {
    id: number;
    username: string;
    image: string;
  };
};
