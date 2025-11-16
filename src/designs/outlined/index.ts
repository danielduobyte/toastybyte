import type { DesignPreset } from '../types';
import { icons } from '../shared/icons';

export const outlinedDesign: DesignPreset = {
  name: 'Outlined',
  icons,
  config: {
    borderRadius: '0.75rem',
    backdropBlur: {
      light: 'md',
      dark: 'md',
    },
    shadows: {
      light: '0 4px 12px rgba(0, 0, 0, 0.05)',
      dark: '0 4px 12px rgba(0, 0, 0, 0.3)',
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
