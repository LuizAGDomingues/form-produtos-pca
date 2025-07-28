"use client";

import { useState } from 'react';

interface NotificationStatusProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function NotificationStatus({ isVisible, onClose }: NotificationStatusProps) {
  const [status, setStatus] = useState<'sending' | 'success' | 'error'>('sending');

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Enviando Notificação
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Email</span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          Notificação por email sendo enviada...
        </div>
      </div>
    </div>
  );
} 