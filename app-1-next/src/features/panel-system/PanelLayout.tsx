"use client";

import React from "react";
import { usePanelStack } from "./usePanelStack";
import { PanelStackContext } from "./PanelStackContext";
import { AnimatePresence, motion } from "framer-motion";

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

export function PanelLayout({ children, panelRegistry }: { children: React.ReactNode, panelRegistry: Record<string, React.ComponentType> }) {
  const { stack, push, pop } = usePanelStack();

  return (
    <PanelStackContext.Provider value={{ push, pop }}>
      <div className="relative h-screen w-screen overflow-hidden pb-16">
        {children} {/* Base page content */}

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
                className="absolute top-0 left-0 w-full h-full bg-background z-10"
              >
                <PanelComponent />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </PanelStackContext.Provider>
  );
}
