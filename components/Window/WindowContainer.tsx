'use client';

import React from 'react';
import { useWindowManager } from '@/contexts/WindowManager';
import Window from './Window';

const WindowContainer: React.FC = () => {
  const { windows } = useWindowManager();

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          defaultPosition={window.defaultPosition}
          defaultSize={window.defaultSize}
          zIndex={window.zIndex}
          isMinimized={window.isMinimized}
        >
          {window.component}
        </Window>
      ))}
    </>
  );
};

export default WindowContainer;
