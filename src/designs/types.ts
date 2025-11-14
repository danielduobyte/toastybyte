import type { ToastVariant } from '../types';

export interface DesignConfig {
  borderRadius?: string;
  backdropBlur?: { light: string | false; dark: string | false };
  shadows?: { light: string; dark: string };
  spacing?: {
    padding?: string;
    gap?: string;
  };
  dimensions?: {
    minWidth?: string;
    maxWidth?: string;
  };
}

export interface DesignPreset {
  name: string;
  icons?: Record<ToastVariant, React.FC>;
  config?: DesignConfig;
}
