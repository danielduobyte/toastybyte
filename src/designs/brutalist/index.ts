import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const brutalistDesign: DesignPreset = {
  name: 'Brutalist',
  icons,
  config: {
    borderRadius: '0px',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '12px 12px 0px rgba(0, 0, 0, 1)',
      dark: '12px 12px 0px rgba(255, 255, 255, 1)',
    },
    spacing: {
      padding: '1rem',
      gap: '0.75rem',
    },
    dimensions: {
      minWidth: '320px',
      maxWidth: '26rem',
    },
  },
};
