import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const gradientDesign: DesignPreset = {
  name: 'Gradient',
  icons,
  config: {
    borderRadius: '1rem',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '0 10px 30px rgba(0, 0, 0, 0.15), 0 3px 8px rgba(0, 0, 0, 0.1)',
      dark: '0 10px 30px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.3)',
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
