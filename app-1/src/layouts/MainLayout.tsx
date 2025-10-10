import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import { TestPage } from '@/pages/TestPage';
import { Page } from '@/layouts/Page';
import NotificationManager from '@/features/notifications/NotificationManager';

type PageId = 'home' | 'about' | 'test';

const MainLayout: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const openAbout = () => setActivePage('about');
  const openTest = () => setActivePage('test');
  const goBack = () => setActivePage('home');
  const openNotifications = () => setIsNotificationsOpen(true);
  const closeNotifications = () => setIsNotificationsOpen(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {activePage === 'home' && (
          <Page key="home">
            <HomePage onOpenAbout={openAbout} onOpenTest={openTest} onOpenNotifications={openNotifications} />
          </Page>
        )}
        {activePage === 'about' && (
          <Page key="about">
            <AboutPage onGoBack={goBack} />
          </Page>
        )}
        {activePage === 'test' && (
          <Page key="test">
            <TestPage onGoBack={goBack} />
          </Page>
        )}
      </AnimatePresence>
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <NotificationManager />
            <button onClick={closeNotifications} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainLayout;
