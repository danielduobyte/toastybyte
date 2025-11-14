import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const cyberpunkDesign: DesignPreset = {
  name: 'Cyberpunk',
  icons,
  config: {
    borderRadius: '0.5rem',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.15), 0 8px 16px rgba(0, 0, 0, 0.9)',
      dark: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.25), 0 8px 16px rgba(0, 0, 0, 0.9)',
    },
    spacing: {
      padding: '1rem',
      gap: '0.875rem',
    },
    dimensions: {
      minWidth: '360px',
      maxWidth: '28rem',
    },
  },
};
