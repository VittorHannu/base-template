"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense } from "react";

import { PanelStackContext } from "./PanelStackContext";
import { usePanelStack } from "./usePanelStack";

const transition = {
  type: "tween",
  ease: [0.32, 0.72, 0, 1],
  duration: 0.4,
};

const motionVariants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: transition },
  exit: { x: "100%", transition: transition },
};

const Spinner = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-primary" />
  </div>
);

export function PanelLayout({
  children,
  panelRegistry,
}: {
  children: React.ReactNode;
  panelRegistry: Record<string, React.ComponentType>;
}) {
  const { stack, push, pop } = usePanelStack();

  return (
    <PanelStackContext.Provider value={{ push, pop }}>
      <div className="relative flex h-screen w-screen flex-col overflow-hidden">
        <main
          id="main-scroll-container"
          className="flex-grow"
          style={{ overflowY: "auto", overscrollBehavior: "contain" }}
        >
          <div className="pb-16">{children}</div>
        </main>
        <AnimatePresence>
          {stack.map((panelName) => {
            const PanelComponent = panelRegistry[panelName];
            if (!PanelComponent) return null;

            return (
              <motion.div
                key={panelName}
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-0 left-0 h-full w-full bg-background z-10"
              >
                <div
                  data-panel-scroll-container
                  className="h-full w-full pb-16"
                  style={{ overflowY: "auto", overscrollBehavior: "contain" }}
                >
                  <Suspense fallback={<Spinner />}>
                    <PanelComponent />
                  </Suspense>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </PanelStackContext.Provider>
  );
}
