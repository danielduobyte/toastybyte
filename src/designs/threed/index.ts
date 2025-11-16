import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const threedDesign: DesignPreset = {
  name: '3D',
  icons,
  config: {
    borderRadius: '1rem',
    backdropBlur: {
      light: 'lg',
      dark: 'lg',
    },
    shadows: {
      light: '0 20px 50px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      dark: '0 20px 50px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    },
    spacing: {
      padding: '1.25rem',
      gap: '1rem',
    },
    dimensions: {
      minWidth: '350px',
      maxWidth: '28rem',
    },
  },
};
