export type NotificationType = {
  notification: {
    id: number;
    isLike?: boolean;
    comment?: string;
  };
  sender: {
    id: number;
    username: string;
    image: string;
  };
};
