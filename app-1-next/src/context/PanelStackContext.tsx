'use client';

import { createContext, useContext, ReactNode } from 'react';

interface PanelActions {
  push: (panel: string) => void;
  pop: () => void;
}

const PanelStackContext = createContext<PanelActions | undefined>(undefined);

export const usePanelActions = () => {
  const context = useContext(PanelStackContext);
  if (!context) {
    throw new Error('usePanelActions must be used within a PanelStackProvider');
  }
  return context;
};

export const PanelStackProvider = ({ children, value }: { children: ReactNode; value: PanelActions }) => {
  return (
    <PanelStackContext.Provider value={value}>
      {children}
    </PanelStackContext.Provider>
  );
};
