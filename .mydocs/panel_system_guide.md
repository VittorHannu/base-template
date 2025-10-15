# Panel System Guide

This guide explains how to create pages and panels using the app's navigation system.

## Core Concept

The system uses a **Panel Stack** to create animated, app-like navigation within a major page or feature. Instead of navigating to a new URL for every screen, we `push` and `pop` panels on a stack. This is handled by a combination of special Next.js `layout.tsx` files and our custom `<PanelLayout>` component.

Navigation is handled declaratively using the `<PanelLink>` component.

## File Structure for a Feature

Each feature that uses panels will have this structure:

```
app/
└── my-feature/
    ├── _panels/
    │   └── MyFirstPanel.tsx
    ├── layout.tsx
    ├── page.tsx
    └── panels.config.ts
```

- **`page.tsx`**: The "real" page content visible at the `/my-feature` URL.
- **`_panels/`**: A private folder holding the components for your "pseudo-pages" (the panels).
- **`panels.config.ts`**: A list that registers all panels available to this feature.
- **`layout.tsx`**: The setup file that provides the `<PanelLayout>` to the page.

---

## Workflow: Creating a New Page with Panels

Here’s how to create a new `/reports` page that can open a `report-detail` panel.

### Step 1: Create the Files

Create the following new files:

1.  `app/reports/page.tsx`
2.  `app/reports/layout.tsx`
3.  `app/reports/panels.config.ts`
4.  `app/reports/_panels/ReportDetailPanel.tsx`

### Step 2: Code the Page (`page.tsx`)

This is the main page content. Use `<PanelLink>` to create a button that opens your panel.

*File: `app/reports/page.tsx`*
```tsx
"use client";
import { PanelLink } from "@/shared/panel-system/PanelLink";
import { Button } from "@/shared/components/ui/button";

export default function ReportsPage() {
  return (
    <div>
      <h1>Reports</h1>
      <PanelLink to="report-detail">
        <Button>View Details</Button>
      </PanelLink>
    </div>
  );
}
```

### Step 3: Code the Panel (`_panels/ReportDetailPanel.tsx`)

This is the content of your "pseudo-page". Use the `usePanelActions` hook to get the `pop` function for a back button.

*File: `app/reports/_panels/ReportDetailPanel.tsx`*
```tsx
"use client";
import { usePanelActions } from "@/shared/panel-system/PanelStackContext";
import { Button } from "@/shared/components/ui/button";

export default function ReportDetailPanel() {
  const panelActions = usePanelActions();
  return (
    <div>
      <h2>Report Details</h2>
      <Button onClick={() => panelActions?.pop()}>Go Back</Button>
    </div>
  );
}
```

### Step 4: Configure the Panel (`panels.config.ts`)

Register your new panel. The key (`"report-detail"`) must match the `to` prop in `<PanelLink>`.

*File: `app/reports/panels.config.ts`*
```tsx
import React from "react";

export const panelRegistry = {
  "report-detail": React.lazy(() => import("./_panels/ReportDetailPanel")),
};
```

### Step 5: Create the Layout (`layout.tsx`)

This is the boilerplate setup file. You create it once per feature section.

*File: `app/reports/layout.tsx`*
```tsx
"use client";
import { PanelLayout } from "@/shared/panel-system/PanelLayout";
import { panelRegistry } from "./panels.config";

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <PanelLayout panelRegistry={panelRegistry}>{children}</PanelLayout>;
}
```

That's it. The `/reports` page will now correctly open the `report-detail` panel.
