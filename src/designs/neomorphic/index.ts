import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const neomorphicDesign: DesignPreset = {
  name: 'Neomorphic',
  icons,
  config: {
    borderRadius: '1.5rem',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      dark: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
    },
    spacing: {
      padding: '1.125rem',
      gap: '0.875rem',
    },
    dimensions: {
      minWidth: '340px',
      maxWidth: '26rem',
    },
  },
};
