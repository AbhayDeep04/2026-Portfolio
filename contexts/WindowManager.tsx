'use client';

import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  component: ReactNode;
  isMinimized: boolean;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

interface WindowManagerContextType {
  windows: WindowState[];
  openWindow: (window: Omit<WindowState, 'isMinimized' | 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  bringToFront: (id: string) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
};

export const WindowManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zIndexCounter = useRef(100);

  const getNextZIndex = useCallback(() => {
    zIndexCounter.current += 1;
    return zIndexCounter.current;
  }, []);

  const openWindow = useCallback((window: Omit<WindowState, 'isMinimized' | 'zIndex'>) => {
    setWindows((prev) => {
      // Check if window is already open
      const existingWindow = prev.find((w) => w.id === window.id);
      if (existingWindow) {
        const newZIndex = getNextZIndex();
        // If already open, just bring it to front and restore if minimized
        return prev.map((w) =>
          w.id === window.id
            ? { ...w, isMinimized: false, zIndex: newZIndex }
            : w
        );
      }
      // Open new window
      const newZIndex = getNextZIndex();
      return [...prev, { ...window, isMinimized: false, zIndex: newZIndex }];
    });
  }, [getNextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const newZIndex = getNextZIndex();
      return prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
      );
    });
  }, [getNextZIndex]);

  const bringToFront = useCallback((id: string) => {
    setWindows((prev) => {
      const newZIndex = getNextZIndex();
      return prev.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w));
    });
  }, [getNextZIndex]);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        bringToFront,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};
