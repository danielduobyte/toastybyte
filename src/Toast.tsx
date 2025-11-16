'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import type { Toast as ToastType, ToastSize } from './types';
import { designs } from './designs';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

interface SizeConfig {
  padding: string;
  gap: string;
  iconSize: string;
  iconInnerSize: string;
  closeButtonSize: string;
  closeButtonIconSize: string;
  progressBarHeight: string;
  minWidth: string;
  maxWidth: string;
  borderRadius: string;
  contentGap: string;
  titleFontSize: string;
  descriptionFontSize: string;
  contentMinHeight: string;
}

const sizeConfigs: Record<ToastSize, SizeConfig> = {
  sm: {
    padding: '0.75rem',
    gap: '0.625rem',
    iconSize: '2rem',
    iconInnerSize: '1rem',
    closeButtonSize: '1.5rem',
    closeButtonIconSize: '0.75rem',
    progressBarHeight: '0.1875rem',
    minWidth: '280px',
    maxWidth: '24rem',
    borderRadius: '0.625rem',
    contentGap: '0.15rem',
    titleFontSize: 'var(--toastybyte-font-sm)',
    descriptionFontSize: 'var(--toastybyte-font-xs)',
    contentMinHeight: '2rem',
  },
  md: {
    padding: '1rem',
    gap: '0.75rem',
    iconSize: '2.5rem',
    iconInnerSize: '1.25rem',
    closeButtonSize: '1.75rem',
    closeButtonIconSize: '1rem',
    progressBarHeight: '0.25rem',
    minWidth: '340px',
    maxWidth: '28rem',
    borderRadius: '0.75rem',
    contentGap: '0.2rem',
    titleFontSize: 'var(--toastybyte-font-md)',
    descriptionFontSize: 'var(--toastybyte-font-sm)',
    contentMinHeight: '2.5rem',
  },
  lg: {
    padding: '1.25rem',
    gap: '1rem',
    iconSize: '3rem',
    iconInnerSize: '1.5rem',
    closeButtonSize: '2rem',
    closeButtonIconSize: '1.25rem',
    progressBarHeight: '0.3125rem',
    minWidth: '400px',
    maxWidth: '32rem',
    borderRadius: '1rem',
    contentGap: '0.25rem',
    titleFontSize: 'var(--toastybyte-font-lg)',
    descriptionFontSize: 'var(--toastybyte-font-md)',
    contentMinHeight: '3rem',
  },
};

const detectTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const variant = toast.variant || 'info';
  const transition = toast.transition || 'slide';
  const designType = toast.design || 'modern';
  const design = designs[designType];
  const size = toast.size || 'md';
  const sizeConfig = sizeConfigs[size];

  const DefaultIcon = design.icons?.[variant] || (() => null);

  const resolvedSize = {
    padding: toast.style?.padding || sizeConfig.padding,
    gap: toast.style?.gap || sizeConfig.gap,
    iconSize: toast.style?.iconSize || sizeConfig.iconSize,
    iconInnerSize: toast.style?.iconInnerSize || sizeConfig.iconInnerSize,
    closeButtonSize: toast.style?.closeButtonSize || sizeConfig.closeButtonSize,
    closeButtonIconSize: toast.style?.closeButtonIconSize || sizeConfig.closeButtonIconSize,
    progressBarHeight: toast.style?.progressBarHeight || sizeConfig.progressBarHeight,
    minWidth: toast.style?.minWidth || design.config?.dimensions?.minWidth || sizeConfig.minWidth,
    maxWidth: toast.style?.maxWidth || design.config?.dimensions?.maxWidth || sizeConfig.maxWidth,
  };

  const [progress, setProgress] = useState(100);
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting'>('entering');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => {
    if (toast.theme && toast.theme !== 'auto') {
      return toast.theme;
    }
    return detectTheme();
  });
  const isPausedRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(toast.duration || 5000);
  const animationFrameRef = useRef<number>();
  const elementRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldCenter, setShouldCenter] = useState(false);

  // Detect theme
  useEffect(() => {
    if (toast.theme === 'auto' || !toast.theme) {
      const theme = detectTheme();
      setCurrentTheme(theme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setCurrentTheme(toast.theme);
    }
  }, [toast.theme]);

  useLayoutEffect(() => {
    const isSingleContent = (toast.message && !toast.description) || (!toast.message && toast.description);

    if (isSingleContent && contentRef.current) {
      const rafId = requestAnimationFrame(() => {
        if (!contentRef.current) return;

        const contentElement = contentRef.current;
        const textElement = contentElement.querySelector('.toastybyte-message, .toastybyte-description');

        if (textElement) {
          const height = textElement.scrollHeight;
          const isSingleLine = height <= 28;
          setShouldCenter(isSingleLine);
        }
      });

      return () => cancelAnimationFrame(rafId);
    } else {
      setShouldCenter(false);
    }
  }, [toast.message, toast.description]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState('entered');
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast.duration || toast.duration === 0) return;

    isPausedRef.current = false;
    startTimeRef.current = Date.now();
    remainingTimeRef.current = toast.duration;

    setProgress(100);

    const animate = () => {
      if (isPausedRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.max(0, 100 - (elapsed / (toast.duration || 5000)) * 100);

      setProgress(newProgress);

      if (newProgress > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setAnimationState('exiting');
        setTimeout(() => {
          onRemove(toast.id);
        }, 250);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [toast.id, toast.duration, onRemove]);

  const handleMouseEnter = () => {
    if (toast.pauseOnHover && toast.duration !== 0) {
      isPausedRef.current = true;
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = (toast.duration || 5000) - elapsed;
    }
  };

  const handleMouseLeave = () => {
    if (toast.pauseOnHover && toast.duration !== 0) {
      isPausedRef.current = false;
      const elapsedBeforePause = (toast.duration || 5000) - remainingTimeRef.current;
      startTimeRef.current = Date.now() - elapsedBeforePause;
    }
  };

  const handleClose = () => {
    setAnimationState('exiting');
    setTimeout(() => {
      onRemove(toast.id);
    }, 200);
  };

  const customColors = toast.style?.colors;
  const customFont = toast.style?.font;
  const borderRadius = toast.style?.borderRadius || design.config?.borderRadius || sizeConfig.borderRadius;

  // Helper function to map predefined font sizes to CSS variables
  const getFontSize = (size: string | undefined, defaultSize: string): string => {
    if (!size) return defaultSize;

    const sizeMap: Record<string, string> = {
      'xs': 'var(--toastybyte-font-xs)',
      'sm': 'var(--toastybyte-font-sm)',
      'md': 'var(--toastybyte-font-md)',
      'lg': 'var(--toastybyte-font-lg)',
      'xl': 'var(--toastybyte-font-xl)',
      'xxl': 'var(--toastybyte-font-xxl)',
    };

    return sizeMap[size] || size;
  };

  const backdropBlur = toast.style?.backdropBlur !== undefined
    ? toast.style.backdropBlur
    : (design.config?.backdropBlur?.[currentTheme] || false);

  const isCustomBlur = backdropBlur && !['sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(backdropBlur as string);

  const customStyle: React.CSSProperties = {
    borderRadius,
    padding: resolvedSize.padding,
    gap: resolvedSize.gap,
    minWidth: resolvedSize.minWidth,
    maxWidth: resolvedSize.maxWidth,
    ...(design.config?.shadows && {
      boxShadow: currentTheme === 'light' ? design.config.shadows.light : design.config.shadows.dark,
    }),
    ...(customColors?.background && { background: customColors.background }),
    ...(customColors?.border && { borderColor: customColors.border }),
    ...(customFont?.family && { fontFamily: customFont.family }),
    ...(isCustomBlur && { backdropFilter: `blur(${backdropBlur})` }),
  };

  const toastClasses = [
    'toastybyte-toast',
    `design-${designType}`,
    `theme-${currentTheme}`,
    `variant-${variant}`,
    `transition-${transition}`,
    animationState,
    backdropBlur && !isCustomBlur ? `backdrop-blur-${backdropBlur}` : '',
  ].filter(Boolean).join(' ');

  const iconClasses = [
    'toastybyte-icon-container',
    `design-${designType}`,
    `variant-${variant}`,
  ].join(' ');

  const contentClasses = [
    'toastybyte-content',
    `variant-${variant}`,
    shouldCenter ? 'center-title' : '',
  ].filter(Boolean).join(' ');

  const closeButtonClasses = [
    'toastybyte-close-button',
    `theme-${currentTheme}`,
  ].join(' ');

  const progressTrackClasses = [
    'toastybyte-progress-track',
    `theme-${currentTheme}`,
  ].join(' ');

  const progressBarClasses = [
    'toastybyte-progress-bar',
    `design-${designType}`,
    `variant-${variant}`,
  ].join(' ');

  return (
    <div
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={toastClasses}
      style={customStyle}
    >
      {/* Icon Container */}
      <div
        className={iconClasses}
        style={{
          width: resolvedSize.iconSize,
          height: resolvedSize.iconSize,
          borderRadius: `calc(${borderRadius} * 0.6)`,
          ...(customColors?.iconBackground && { background: customColors.iconBackground }),
          ...(customColors?.iconColor && { color: customColors.iconColor }),
        }}
      >
        <div style={{ width: resolvedSize.iconInnerSize, height: resolvedSize.iconInnerSize }}>
          {toast.icon || <DefaultIcon />}
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className={contentClasses} style={{ minHeight: sizeConfig.contentMinHeight }}>
        {toast.message && (
          <p
            className="toastybyte-message"
            style={{
              fontSize: getFontSize(customFont?.titleSize || customFont?.size, sizeConfig.titleFontSize),
              fontWeight: customFont?.weight || 600,
              ...(customColors?.text && { color: customColors.text }),
              ...(customFont?.strokeWidth && {
                WebkitTextStroke: `${customFont.strokeWidth} ${customFont.strokeColor || '#000'}`,
                textStroke: `${customFont.strokeWidth} ${customFont.strokeColor || '#000'}`,
              }),
            }}
          >
            {toast.message}
          </p>
        )}
        {toast.description && (
          <p
            className="toastybyte-description"
            style={{
              fontSize: getFontSize(customFont?.descriptionSize || customFont?.size, sizeConfig.descriptionFontSize),
              fontWeight: customFont?.weight || 400,
              marginTop: sizeConfig.contentGap,
              ...(customColors?.text && { color: customColors.text }),
              ...(customFont?.strokeWidth && {
                WebkitTextStroke: `${customFont.strokeWidth} ${customFont.strokeColor || '#000'}`,
                textStroke: `${customFont.strokeWidth} ${customFont.strokeColor || '#000'}`,
              }),
            }}
          >
            {toast.description}
          </p>
        )}
      </div>

      {/* Close Button */}
      {toast.showCloseButton && (
        <button
          onClick={handleClose}
          className={closeButtonClasses}
          style={{
            width: resolvedSize.closeButtonSize,
            height: resolvedSize.closeButtonSize,
            borderRadius: `calc(${borderRadius} * 0.5)`,
            ...(customColors?.closeButton && { color: customColors.closeButton }),
          }}
          aria-label="Close"
        >
          <svg style={{ width: resolvedSize.closeButtonIconSize, height: resolvedSize.closeButtonIconSize }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Progress Bar */}
      {toast.showProgressBar && toast.duration !== 0 && (
        <div className={progressTrackClasses} style={{ height: resolvedSize.progressBarHeight }}>
          <div
            className={progressBarClasses}
            style={{
              width: `${progress}%`,
              borderTopRightRadius: `calc(${borderRadius} * 0.3)`,
              borderBottomRightRadius: `calc(${borderRadius} * 0.3)`,
              ...(customColors?.progressBar && { background: customColors.progressBar }),
            }}
          />
        </div>
      )}
    </div>
  );
};
