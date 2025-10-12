import dynamic from "next/dynamic";

// This is the central registry for the homepage panels.
// The key is the string identifier for the panel, and the value is the dynamically imported component.
export const panelRegistry = {
  "about": dynamic(() => import("./_panels/AboutPanel")),
  "test": dynamic(() => import("./_panels/TestPanel")),
  // To add a new panel:
  // 1. Create the component in the `_panels` directory.
  // 2. Add a new entry here.
};

// This creates a TypeScript type that represents all possible panel names.
// It's derived from the keys of the panelRegistry object.
export type PanelName = keyof typeof panelRegistry;
