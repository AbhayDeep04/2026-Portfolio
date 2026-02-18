'use client';

import React, { useState, useEffect } from 'react';

interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      // Single tap opens on mobile
      onClick();
    } else {
      setIsSelected(true);
      setTimeout(() => setIsSelected(false), 200);
    }
  };

  const handleDoubleClick = () => {
    if (!isMobile) {
      onClick();
    }
  };

  return (
    <div
      className={`win95-desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="win95-desktop-icon-image text-3xl">
        {icon}
      </div>
      <div className="win95-desktop-icon-label">
        {label}
      </div>
    </div>
  );
};

export default DesktopIcon;
