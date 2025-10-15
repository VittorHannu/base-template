import React from "react";

export const panelRegistry = {
  profile: React.lazy(() => import("./_panels/ProfilePanel")),
  // Add other settings panels here in the future
};

export type PanelName = keyof typeof panelRegistry;
