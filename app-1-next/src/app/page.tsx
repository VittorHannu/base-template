'use client';

import React, { useState } from 'react';
import { useAuth } from '@/auth/AuthProvider';
import { Login } from '@/auth/Login';
import NotificationManager from '@/features/notifications/NotificationManager';
import { usePanelStack } from '@/hooks/usePanelStack';
import { AnimatePresence, motion } from 'framer-motion';
import AboutPanel from '@/components/panels/AboutPanel';
import TestPanel from '@/components/panels/TestPanel';

const motionVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
  },
  exit: {
    x: '100%',
    transition: { type: 'tween', ease: 'easeIn', duration: 0.4 },
  },
};

function AppContent() {
  const { stack, push, pop } = usePanelStack();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const openNotifications = () => setIsNotificationsOpen(true);
  const closeNotifications = () => setIsNotificationsOpen(false);

  const renderPanel = (panelName: string) => {
    switch (panelName) {
      case 'about':
        return <AboutPanel onGoBack={pop} />;
      case 'test':
        return <TestPanel onGoBack={pop} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Base Home Page Content */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p className="mt-4">Welcome to App 1.</p>
        <button
          onClick={() => push('about')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          About This App
        </button>
        <button
          onClick={() => push('test')}
          className="mt-6 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Page
        </button>
        <button
          onClick={openNotifications}
          className="mt-6 ml-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Notifications
        </button>
      </div>

      {/* Animated Panel Stack */}
      <AnimatePresence>
        {stack.map((panelName) => (
          <motion.div
            key={panelName}
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full bg-background z-10"
          >
            {renderPanel(panelName)}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Notifications Modal (doesn't animate with the stack) */}
      {isNotificationsOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card p-8 rounded-lg">
            <NotificationManager />
            <button onClick={closeNotifications} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { session } = useAuth();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Login />
      </div>
    );
  }

  return <AppContent />;
}