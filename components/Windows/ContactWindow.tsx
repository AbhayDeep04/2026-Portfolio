'use client';

import React, { useState } from 'react';

const EMAIL = 'abhaydeepsingh.gm@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/abhay-deep-singh-876189246/';
const PHONE = '9294509682';

const ContactWindow: React.FC = () => {
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    showToast('Email copied to clipboard!');
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = PHONE;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    showToast('Phone number copied to clipboard!');
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const subject = encodeURIComponent('Message from Portfolio');
    const body = encodeURIComponent(message);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_self');
    showToast('Message sent!');
    setMessage('');
  };

  return (
    <div className="flex flex-col gap-3 h-full" style={{ fontSize: '11px' }}>
      {/* Contact buttons */}
      <div className="flex gap-2">
        <button
          className="win95-button flex-1"
          onClick={() => window.open(LINKEDIN, '_blank')}
          style={{ padding: '6px 8px' }}
        >
          🔗 LinkedIn
        </button>
        <button
          className="win95-button flex-1"
          onClick={handleCopyEmail}
          style={{ padding: '6px 8px' }}
        >
          📧 Copy Email
        </button>
        <button
          className="win95-button flex-1"
          onClick={handleCopyPhone}
          style={{ padding: '6px 8px' }}
        >
          📞 Copy Phone
        </button>
      </div>

      {/* Message area */}
      <div className="flex-1 flex flex-col">
        <div className="mb-1 font-bold">Write a message to me here:</div>
        <div className="flex-1 flex flex-col">
          <textarea
            className="win95-input flex-1 w-full resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{ minHeight: '80px' }}
          />
          <div className="mt-2 flex justify-end">
            <button
              className="win95-button"
              onClick={handleSend}
              disabled={!message.trim()}
              style={{ padding: '4px 16px' }}
            >
              Send ✉️
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
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
          ✅ {toast}
        </div>
      )}
    </div>
  );
};

export default ContactWindow;
