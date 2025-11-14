import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const steampunkDesign: DesignPreset = {
  name: 'Steampunk',
  icons,
  config: {
    borderRadius: '0.375rem',
    backdropBlur: {
      light: false,
      dark: false,
    },
    shadows: {
      light: '0 4px 6px rgba(120, 53, 15, 0.3), 0 2px 4px rgba(120, 53, 15, 0.2), inset 0 1px 0 rgba(217, 119, 6, 0.1)',
      dark: '0 4px 6px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(217, 119, 6, 0.15)',
    },
    spacing: {
      padding: '1.125rem',
      gap: '0.875rem',
    },
    dimensions: {
      minWidth: '360px',
      maxWidth: '28rem',
    },
  },
};
