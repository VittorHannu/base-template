import dynamic from 'next/dynamic';

export const panelRegistry = {
  'profile': dynamic(() => import('./_panels/ProfilePanel')),
  // Add other settings panels here in the future
};

export type PanelName = keyof typeof panelRegistry;
