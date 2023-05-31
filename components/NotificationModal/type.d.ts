import { ReactNode } from 'react';

export type NotificationModalProps = {
  image: ReactNode | string;
  title: string;
  text: string;
  buttonText: string;
  skip?: boolean;
};
