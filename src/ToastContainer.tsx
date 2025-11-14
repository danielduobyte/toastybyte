'use client';

import React, { useContext } from 'react';
import { ToastContext } from './ToastContext';
import { Toast } from './Toast';
import type { ToastPosition } from './types';

export const ToastContainer: React.FC = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastContainer must be used within ToastProvider');
  }

  const { toasts, removeToast } = context;

  const toastsByPosition: Record<ToastPosition, typeof toasts> = {
    'top-left': [],
    'top-center': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-center': [],
    'bottom-right': [],
  };

  toasts.forEach((toast) => {
    const position = toast.position || 'top-right';
    toastsByPosition[position].push(toast);
  });

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`toastybyte-container ${position}`}
        >
          {positionToasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      ))}
    </>
  );
};
