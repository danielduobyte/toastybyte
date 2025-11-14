import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const minimalDesign: DesignPreset = {
  name: 'Minimal',
  icons,
  config: {
    borderRadius: '0.5rem',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '0 1px 3px rgba(0, 0, 0, 0.1)',
      dark: '0 1px 3px rgba(0, 0, 0, 0.3)',
    },
    spacing: {
      padding: '0.875rem',
      gap: '0.625rem',
    },
    dimensions: {
      minWidth: '320px',
      maxWidth: '24rem',
    },
  },
};
