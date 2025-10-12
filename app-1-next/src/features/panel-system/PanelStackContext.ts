import { createContext, useContext } from 'react';

interface PanelStackContextType {
  push: (panel: string) => void;
  pop: () => void;
}

export const PanelStackContext = createContext<PanelStackContextType | undefined>(undefined);

export const usePanelActions = () => {
  const context = useContext(PanelStackContext);
  if (!context) {
    throw new Error('usePanelActions must be used within a PanelStackProvider');
  }
  return context;
};
