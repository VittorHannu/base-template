'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface AboutPanelProps {
  onGoBack: () => void;
}

const AboutPanel: React.FC<AboutPanelProps> = ({ onGoBack }) => {
  return (
    <div className="p-4 bg-background h-full">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p className="mt-4">This is App 1.</p>
      <Button onClick={onGoBack} className="mt-6">
        Go Back
      </Button>
    </div>
  );
};

export default AboutPanel;
