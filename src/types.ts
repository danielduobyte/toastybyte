export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastTransition =
  | 'slide'
  | 'fade'
  | 'scale'
  | 'bounce'
  | 'flip'
  | 'zoom'
  | 'blur'
  | 'swing'
  | 'rotate'
  | 'elastic'
  | 'drop'
  | 'roll';

export type ToastTheme = 'light' | 'dark' | 'auto';

export type DesignType =
  | 'modern'
  | 'minimal'
  | 'neomorphic'
  | 'playful'
  | 'brutalist'
  | 'premium'
  | 'gradient'
  | 'outlined'
  | 'terminal'
  | 'threed'
  | 'cyberpunk'
  | 'oldschool'
  | 'steampunk'
  | 'pastel';

export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ToastSize = 'sm' | 'md' | 'lg';

export interface ToastColors {
  background?: string;
  border?: string;
  text?: string;
  iconBackground?: string;
  iconColor?: string;
  progressBar?: string;
  closeButton?: string;
}

export interface ToastFont {
  family?: string;
  size?: string;
  weight?: string | number;
  titleSize?: FontSize | string;
  descriptionSize?: FontSize | string;
  strokeWidth?: string;
  strokeColor?: string;
}

export interface ToastStyle {
  borderRadius?: string;
  backdropBlur?: string | false;
  colors?: ToastColors;
  font?: ToastFont;
  padding?: string;
  gap?: string;
  iconSize?: string;
  iconInnerSize?: string;
  closeButtonSize?: string;
  closeButtonIconSize?: string;
  progressBarHeight?: string;
  minWidth?: string;
  maxWidth?: string;
}

export interface Toast {
  id: string;
  message: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  transition?: ToastTransition;
  icon?: React.ReactNode;
  showProgressBar?: boolean;
  showCloseButton?: boolean;
  pauseOnHover?: boolean;
  theme?: ToastTheme;
  design?: DesignType;
  size?: ToastSize;
  style?: ToastStyle;
}

export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  transition?: ToastTransition;
  description?: string;
  icon?: React.ReactNode;
  showProgressBar?: boolean;
  showCloseButton?: boolean;
  pauseOnHover?: boolean;
  theme?: ToastTheme;
  design?: DesignType;
  size?: ToastSize;
  style?: ToastStyle;
}

export interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}
