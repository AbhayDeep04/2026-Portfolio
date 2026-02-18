'use client';

import React, { useState, useEffect } from 'react';

const RESUME_PDF = '/ABHAY DEEP SINGH RESUME 2026.pdf';
const SHARE_LINK = 'https://drive.google.com/file/d/10NFSjxUpqiktVWOHgSo-60xLprlzvkzU/view?usp=sharing';

const ResumeWindow: React.FC = () => {
  const [toast, setToast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_LINK);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = SHARE_LINK;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_PDF;
    link.download = 'Abhay_Deep_Singh_Resume.pdf';
    link.click();
  };

  const actionButtons = (
    <div
      className="flex flex-col gap-3"
      style={{ fontSize: '11px' }}
    >
      <div
        className="border-2 p-3 bg-gray-100"
        style={{
          borderStyle: 'outset',
          borderColor: '#ffffff #808080 #808080 #ffffff',
        }}
      >
        <div className="font-bold mb-3 pb-1 border-b border-gray-400" style={{ fontSize: '12px' }}>
          Actions
        </div>

        <button
          className="win95-button w-full mb-2"
          onClick={handleDownload}
          style={{ padding: '6px 8px', fontSize: '11px' }}
        >
          📥 Download Resume
        </button>

        <button
          className="win95-button w-full mb-2"
          onClick={handleShare}
          style={{ padding: '6px 8px', fontSize: '11px' }}
        >
          🔗 Share Resume
        </button>

        <button
          className="win95-button w-full"
          onClick={() => window.open(RESUME_PDF, '_blank')}
          style={{ padding: '6px 8px', fontSize: '11px' }}
        >
          🔎 Open in New Tab
        </button>
      </div>

      <div
        className="border-2 p-3 bg-gray-100"
        style={{
          borderStyle: 'outset',
          borderColor: '#ffffff #808080 #808080 #ffffff',
          fontSize: '10px',
        }}
      >
        <div className="font-bold mb-2">File Info</div>
        <div className="space-y-1">
          <div>Type: PDF Document</div>
          <div>Author: Abhay Deep Singh</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-3 h-full overflow-hidden">
      {/* Mobile: buttons on top */}
      {isMobile && (
        <div className="shrink-0 px-1">
          <div className="flex gap-2">
            <button
              className="win95-button flex-1"
              onClick={handleDownload}
              style={{ padding: '6px 8px', fontSize: '11px' }}
            >
              📥 Download
            </button>
            <button
              className="win95-button flex-1"
              onClick={handleShare}
              style={{ padding: '6px 8px', fontSize: '11px' }}
            >
              🔗 Share
            </button>
            <button
              className="win95-button flex-1"
              onClick={() => window.open(RESUME_PDF, '_blank')}
              style={{ padding: '6px 8px', fontSize: '11px' }}
            >
              🔎 Open in New Tab
            </button>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div
        className="flex-1 border-2 bg-white overflow-hidden"
        style={{
          borderStyle: 'inset',
          borderColor: '#808080 #ffffff #ffffff #808080',
          minHeight: isMobile ? '70vh' : undefined,
        }}
      >
        <embed
          src={RESUME_PDF}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        />
      </div>

      {/* Desktop: action panel on right */}
      {!isMobile && (
        <div className="shrink-0" style={{ width: '160px' }}>
          {actionButtons}
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '12px',
            zIndex: 99999,
            backgroundColor: '#c0c0c0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff',
            padding: '8px 14px',
            fontSize: '11px',
            fontFamily: "'MS Sans Serif', Tahoma, Arial, sans-serif",
            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.2s ease-in',
          }}
        >
          ✅ Resume link copied to clipboard for sharing!
        </div>
      )}
    </div>
  );
};

export default ResumeWindow;
