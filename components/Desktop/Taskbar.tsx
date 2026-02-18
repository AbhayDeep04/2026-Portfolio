'use client';

import React, { useState, useEffect } from 'react';
import { useWindowManager } from '@/contexts/WindowManager';

const Taskbar: React.FC = () => {
  const { windows, restoreWindow, closeWindow } = useWindowManager();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="win95-taskbar">
      <button className="win95-button win95-start-button">
        <span style={{ fontSize: '14px', marginRight: '2px' }}>⊞</span>
        Start
      </button>

      <div className="win95-taskbar-divider" />

      <div className="flex gap-2 flex-1 overflow-visible" style={{ paddingTop: '4px' }}>
        {windows.map((window) => (
          <div key={window.id} style={{ position: 'relative' }}>
            <button
              className="win95-button"
              onClick={() => {
                if (window.isMinimized) {
                  restoreWindow(window.id);
                }
              }}
              style={{
                minWidth: '60px',
                maxWidth: '160px',
                padding: '2px 16px 2px 6px',
                fontSize: '11px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: window.isMinimized ? 'normal' : 'bold',
              }}
            >
              {window.title}
            </button>
            <span
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#c42b1c',
                color: '#fff',
                fontSize: '8px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                lineHeight: 1,
                border: '1px solid #a01a0e',
                zIndex: 1,
              }}
              title="Close window"
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      <div className="win95-taskbar-clock">{time}</div>
    </div>
  );
};

export default Taskbar;
