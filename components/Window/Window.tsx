'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import { useWindowManager } from '@/contexts/WindowManager';
import TitleBar from './TitleBar';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
}

const MIN_WIDTH = 250;
const MIN_HEIGHT = 150;
const HANDLE_SIZE = 6;

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 400, height: 300 },
  zIndex,
  isMinimized,
}) => {
  const { closeWindow, bringToFront } = useWindowManager();
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({ width: defaultSize.width, height: defaultSize.height });
  const resizeRef = useRef<{
    isResizing: boolean;
    direction: string;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    bringToFront(id);

    resizeRef.current = {
      isResizing: true,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeRef.current?.isResizing) return;

      const { direction, startX, startY, startWidth, startHeight } = resizeRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = Math.max(MIN_WIDTH, startWidth + dx);
      if (direction.includes('w')) newWidth = Math.max(MIN_WIDTH, startWidth - dx);
      if (direction.includes('s')) newHeight = Math.max(MIN_HEIGHT, startHeight + dy);
      if (direction.includes('n')) newHeight = Math.max(MIN_HEIGHT, startHeight - dy);

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      resizeRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size.width, size.height, bringToFront, id]);

  if (isMinimized) {
    return null;
  }

  const handleMouseDown = () => {
    bringToFront(id);
  };

  // Mobile: full-screen window, no dragging
  if (isMobile) {
    return (
      <div
        className="win95-window"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 28px)',
          zIndex: zIndex,
        }}
        onMouseDown={handleMouseDown}
      >
        <TitleBar
          title={title}
          onClose={() => closeWindow(id)}
        />
        <div
          className="win95-window-content"
          style={{ height: 'calc(100vh - 54px)', overflowY: 'auto' }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Resize handle styles
  const handleBase: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
  };

  const resizeHandles = (
    <>
      {/* Edge handles */}
      <div style={{ ...handleBase, top: 0, left: HANDLE_SIZE, right: HANDLE_SIZE, height: HANDLE_SIZE, cursor: 'n-resize' }} onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div style={{ ...handleBase, bottom: 0, left: HANDLE_SIZE, right: HANDLE_SIZE, height: HANDLE_SIZE, cursor: 's-resize' }} onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div style={{ ...handleBase, left: 0, top: HANDLE_SIZE, bottom: HANDLE_SIZE, width: HANDLE_SIZE, cursor: 'w-resize' }} onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div style={{ ...handleBase, right: 0, top: HANDLE_SIZE, bottom: HANDLE_SIZE, width: HANDLE_SIZE, cursor: 'e-resize' }} onMouseDown={(e) => handleResizeStart(e, 'e')} />

      {/* Corner handles */}
      <div style={{ ...handleBase, top: 0, left: 0, width: HANDLE_SIZE, height: HANDLE_SIZE, cursor: 'nw-resize' }} onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div style={{ ...handleBase, top: 0, right: 0, width: HANDLE_SIZE, height: HANDLE_SIZE, cursor: 'ne-resize' }} onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div style={{ ...handleBase, bottom: 0, left: 0, width: HANDLE_SIZE, height: HANDLE_SIZE, cursor: 'sw-resize' }} onMouseDown={(e) => handleResizeStart(e, 'sw')} />
      <div style={{ ...handleBase, bottom: 0, right: 0, width: HANDLE_SIZE, height: HANDLE_SIZE, cursor: 'se-resize' }} onMouseDown={(e) => handleResizeStart(e, 'se')} />
    </>
  );

  // Desktop: draggable + resizable window
  return (
    <Draggable
      handle=".win95-title-bar"
      defaultPosition={defaultPosition}
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className="win95-window"
        style={{
          width: size.width,
          minHeight: size.height,
          zIndex: zIndex,
        }}
        onMouseDown={handleMouseDown}
      >
        {resizeHandles}
        <div className="win95-resize-grip" />
        <TitleBar
          title={title}
          onClose={() => closeWindow(id)}
        />
        <div className="win95-window-content" style={{ height: size.height - 26 }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
