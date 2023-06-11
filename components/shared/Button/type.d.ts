export type buttonProps = {
  content: string;
  isTransparent?: boolean;
  classes: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  isLink?: boolean;
  isDisabled?: boolean;
};
