'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';

export default function InitialLoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem('isFirstVisit');

    if (isFirstVisit === null) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('isFirstVisit', 'false');
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
