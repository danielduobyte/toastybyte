'use client';

import { useContext } from 'react';
import { ToastContext } from './ToastContext';
import type { ToastOptions } from './types';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  const { showToast } = context;

  return {
    toast: showToast,
    success: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
      showToast(message, { ...options, variant: 'success' }),
    error: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
      showToast(message, { ...options, variant: 'error' }),
    warning: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
      showToast(message, { ...options, variant: 'warning' }),
    info: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
      showToast(message, { ...options, variant: 'info' }),
  };
};
