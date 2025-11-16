import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const pastelDesign: DesignPreset = {
  name: 'Pastel',
  icons,
  config: {
    borderRadius: '1.25rem',
    backdropBlur: {
      light: 'md',
      dark: 'md',
    },
    shadows: {
      light: '0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
      dark: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
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
