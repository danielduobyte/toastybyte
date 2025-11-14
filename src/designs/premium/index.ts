import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const premiumDesign: DesignPreset = {
  name: 'Premium',
  icons,
  config: {
    borderRadius: '1.25rem',
    backdropBlur: {
      light: 'sm',
      dark: 'xl',
    },
    shadows: {
      light: '0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
      dark: '0 20px 60px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
    },
    spacing: {
      padding: '1.25rem',
      gap: '1rem',
    },
    dimensions: {
      minWidth: '360px',
      maxWidth: '32rem',
    },
  },
};
