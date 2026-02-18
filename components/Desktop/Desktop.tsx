'use client';

import React, { useEffect } from 'react';
import { useWindowManager } from '@/contexts/WindowManager';
import DesktopIcon from './DesktopIcon';
import AboutWindow from '@/components/Windows/AboutWindow';
import ResumeWindow from '@/components/Windows/ResumeWindow';
import ContactWindow from '@/components/Windows/ContactWindow';
import WindowContainer from '@/components/Window/WindowContainer';
import BouncingLogo from './BouncingLogo';

const Desktop: React.FC = () => {
  const { openWindow } = useWindowManager();

  // Auto-open About Me window on page load
  useEffect(() => {
    openWindow({
      id: 'about',
      title: 'About Me',
      component: <AboutWindow />,
      defaultPosition: { x: 150, y: 80 },
      defaultSize: { width: 700, height: 480 },
    });
  }, [openWindow]);

  // Desktop icons configuration
  const desktopIcons = [
    {
      id: 'about',
      label: 'About Me',
      icon: '💻',
      onClick: () => openWindow({
        id: 'about',
        title: 'About Me',
        component: <AboutWindow />,
        defaultPosition: { x: 150, y: 80 },
        defaultSize: { width: 700, height: 480 },
      }),
    },
    {
      id: 'resume',
      label: 'Resume',
      icon: '📄',
      onClick: () => openWindow({
        id: 'resume',
        title: 'Resume.pdf',
        component: <ResumeWindow />,
        defaultPosition: { x: 120, y: 60 },
        defaultSize: { width: 750, height: 520 },
      }),
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: '💼',
      onClick: () => openWindow({
        id: 'projects',
        title: 'Projects',
        component: <div className="p-4">Projects content coming soon...</div>,
        defaultPosition: { x: 140, y: 140 },
        defaultSize: { width: 500, height: 400 },
      }),
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: '🏢',
      onClick: () => openWindow({
        id: 'experience',
        title: 'Work Experience',
        component: <div className="p-4">Experience content coming soon...</div>,
        defaultPosition: { x: 160, y: 160 },
        defaultSize: { width: 500, height: 400 },
      }),
    },
    {
      id: 'education',
      label: 'Education',
      icon: '🎓',
      onClick: () => openWindow({
        id: 'education',
        title: 'Education',
        component: <div className="p-4">Education content coming soon...</div>,
        defaultPosition: { x: 180, y: 180 },
        defaultSize: { width: 450, height: 350 },
      }),
    },
    {
      id: 'contact',
      label: 'Contact Me',
      icon: '📧',
      onClick: () => openWindow({
        id: 'contact',
        title: 'Contact Me',
        component: <ContactWindow />,
        defaultPosition: { x: 200, y: 120 },
        defaultSize: { width: 380, height: 280 },
      }),
    },
  ];

  return (
    <div className="win95-desktop">
      <div className="absolute top-4 left-4 flex flex-row flex-wrap gap-3 md:flex-col" style={{ zIndex: 50 }}>
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            onClick={icon.onClick}
          />
        ))}
      </div>
      {/* Bouncing DVD logo */}
      <BouncingLogo />
      {/* Windows rendered inside Desktop */}
      <WindowContainer />
    </div>
  );
};

export default Desktop;
