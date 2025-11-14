import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const oldschoolDesign: DesignPreset = {
  name: 'Oldschool',
  icons,
  config: {
    borderRadius: '0.5rem',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '8px 8px 0px rgba(0, 0, 0, 0.25)',
      dark: '8px 8px 0px rgba(0, 0, 0, 0.5)',
    },
    spacing: {
      padding: '1.25rem',
      gap: '1rem',
    },
    dimensions: {
      minWidth: '360px',
      maxWidth: '28rem',
    },
  },
};
