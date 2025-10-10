'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { usePanelActions } from '@/context/PanelStackContext';

const AboutPanel: React.FC = () => {
  const { push, pop } = usePanelActions();

  return (
    <div className="p-4 bg-background h-full">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p className="mt-4">This is App 1.</p>
      <Button onClick={pop} className="mt-6">
        Go Back
      </Button>
      <Button onClick={() => push('test')} className="mt-6 ml-4" variant="secondary">
        Open Test Panel
      </Button>
    </div>
  );
};

export default AboutPanel;
