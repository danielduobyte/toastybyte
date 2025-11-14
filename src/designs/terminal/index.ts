import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const terminalDesign: DesignPreset = {
  name: 'Terminal',
  icons,
  config: {
    borderRadius: '0.25rem',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '0 2px 8px rgba(0, 0, 0, 0.1)',
      dark: '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    },
    spacing: {
      padding: '1rem',
      gap: '0.75rem',
    },
    dimensions: {
      minWidth: '360px',
      maxWidth: '32rem',
    },
  },
};
