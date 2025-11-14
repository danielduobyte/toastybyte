import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const playfulDesign: DesignPreset = {
  name: 'Playful',
  icons,
  config: {
    borderRadius: '2rem',
    backdropBlur: {
      light: false,
      dark: 'md',
    },
    shadows: {
      light: '0 10px 25px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05)',
      dark: '0 10px 25px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)',
    },
    spacing: {
      padding: '1.25rem',
      gap: '1rem',
    },
    dimensions: {
      minWidth: '350px',
      maxWidth: '30rem',
    },
  },
};
