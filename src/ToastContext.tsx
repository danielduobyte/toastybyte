'use client';

import React, { createContext, useCallback, useState } from 'react';
import type { Toast, ToastContextValue, ToastOptions, DesignType } from './types';

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastCounter = 0;

interface ToastProviderProps {
  children: React.ReactNode;
  design?: DesignType;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, design: globalDesign = 'modern' }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    const id = `toast-${++toastCounter}`;
    const newToast: Toast = {
      id,
      message,
      variant: options?.variant || 'info',
      duration: options?.duration !== undefined ? options.duration : 5000,
      position: options?.position || 'top-right',
      transition: options?.transition || 'slide',
      description: options?.description,
      icon: options?.icon,
      showProgressBar: options?.showProgressBar !== undefined ? options.showProgressBar : true,
      showCloseButton: options?.showCloseButton !== undefined ? options.showCloseButton : true,
      pauseOnHover: options?.pauseOnHover !== undefined ? options.pauseOnHover : true,
      theme: options?.theme,
      design: options?.design || globalDesign,
      style: options?.style,
    };

    setToasts((prev) => [...prev, newToast]);
  }, [globalDesign]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
