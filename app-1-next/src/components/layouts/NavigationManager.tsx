'use client';

import { useEffect } from 'react';

export function NavigationManager() {
  useEffect(() => {
    const handlePopState = () => {
      document.documentElement.dataset.direction = 'back';
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null; // This component renders nothing.
}
