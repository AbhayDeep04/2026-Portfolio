'use client';

import React from 'react';

interface TitleBarProps {
  title: string;
  onClose: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ title, onClose }) => {
  return (
    <div className="win95-title-bar">
      <span className="win95-title-bar-text">{title}</span>
      <div className="win95-title-bar-controls">
        <button
          className="win95-title-button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
        >
          <span style={{ fontSize: '9px' }}>✕</span>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
