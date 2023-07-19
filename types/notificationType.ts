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
  created_at: string;
  user_id: number;
  quote_id: number;
};
