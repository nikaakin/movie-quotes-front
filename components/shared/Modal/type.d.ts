import { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  background?: string;
  shouldHaveX?: boolean;
}
