'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const LOGO_WIDTH = 120;
const LOGO_HEIGHT = 60;
const SPEED = 1.5; // pixels per frame

// Classic DVD screensaver colors
const COLORS = [
  '#ff0000', '#ff8800', '#ffff00', '#00ff00',
  '#00ffff', '#0088ff', '#8800ff', '#ff00ff',
  '#ff4444', '#44ff44', '#4444ff', '#ffaa00',
];

const BouncingLogo: React.FC = () => {
  const posRef = useRef({ x: 80, y: 120 });
  const velRef = useRef({ x: SPEED, y: SPEED });
  const [pos, setPos] = useState({ x: 80, y: 120 });
  const [color, setColor] = useState(COLORS[0]);
  const colorIndexRef = useRef(0);
  const animRef = useRef<number>(0);

  const getNextColor = useCallback(() => {
    colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length;
    return COLORS[colorIndexRef.current];
  }, []);

  useEffect(() => {
    const animate = () => {
      const maxX = window.innerWidth - LOGO_WIDTH;
      const maxY = window.innerHeight - 28 - LOGO_HEIGHT; // 28px taskbar

      let { x, y } = posRef.current;
      let { x: vx, y: vy } = velRef.current;

      x += vx;
      y += vy;

      let bounced = false;

      if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
        bounced = true;
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
        bounced = true;
      }

      if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
        bounced = true;
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
        bounced = true;
      }

      posRef.current = { x, y };
      velRef.current = { x: vx, y: vy };

      if (bounced) {
        setColor(getNextColor());
      }

      setPos({ x, y });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [getNextColor]);

  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        zIndex: 1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.3s ease',
      }}
    >
      <svg
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* DVD text */}
        <text
          x="60"
          y="28"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill={color}
          style={{ transition: 'fill 0.3s ease' }}
        >
          DVD
        </text>
        {/* Disc shape under text */}
        <ellipse
          cx="60"
          cy="44"
          rx="30"
          ry="8"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          style={{ transition: 'stroke 0.3s ease' }}
        />
        {/* Inner disc detail */}
        <ellipse
          cx="60"
          cy="44"
          rx="12"
          ry="3.5"
          fill={color}
          opacity="0.4"
          style={{ transition: 'fill 0.3s ease' }}
        />
        {/* VIDEO subtitle */}
        <text
          x="60"
          y="60"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="6"
          fontWeight="bold"
          letterSpacing="4"
          fill={color}
          opacity="0.7"
          style={{ transition: 'fill 0.3s ease' }}
        >
          VIDEO
        </text>
      </svg>
    </div>
  );
};

export default BouncingLogo;
