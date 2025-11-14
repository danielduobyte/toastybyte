import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const modernDesign: DesignPreset = {
  name: 'Modern',
  icons,
  config: {
    borderRadius: '1rem',
    backdropBlur: {
      light: 'xl',
      dark: 'xl',
    },
    shadows: {
      light: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      dark: '0 20px 50px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    spacing: {
      padding: '1rem',
      gap: '0.75rem',
    },
    dimensions: {
      minWidth: '340px',
      maxWidth: '28rem',
    },
  },
};
