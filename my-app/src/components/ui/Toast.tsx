'use client';

import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
          border: '1px solid #444',
        },
        success: {
          style: {
            border: '1px solid #4ade80',
          },
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },
        },
        error: {
          style: {
            border: '1px solid #ef4444',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
        loading: {
          style: {
            border: '1px solid #4461F2',
          },
        },
        duration: 4000,
      }}
    />
  );
} 