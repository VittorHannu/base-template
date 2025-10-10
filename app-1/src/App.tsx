import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/auth/AuthProvider';
import { Login } from '@/auth/Login';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import { TestPage } from '@/pages/TestPage';
import { Page } from '@/layouts/Page';
import NotificationManager from '@/features/notifications/NotificationManager';

function AppContent() {
  const { session } = useAuth();
  const [panelStack, setPanelStack] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    setPanelStack(pathSegments);
  }, [location]);

  const pushPanel = (panelName: string) => {
    const newPath = `/${[...panelStack, panelName].join('/')}`;
    navigate(newPath);
  };

  const popPanel = () => {
    navigate(-1);
  };

  const openNotifications = () => setIsNotificationsOpen(true);
  const closeNotifications = () => setIsNotificationsOpen(false);

  const renderPanel = (panelName: string) => {
    switch (panelName) {
      case 'about':
        return <AboutPage onGoBack={popPanel} />;
      case 'test':
        return <TestPage onGoBack={popPanel} />;
      default:
        return null;
    }
  };

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <HomePage onOpenAbout={() => pushPanel('about')} onOpenTest={() => pushPanel('test')} onOpenNotifications={openNotifications} />

      <AnimatePresence>
        {panelStack.map((panelName) => (
          <Page key={panelName}>
            {renderPanel(panelName)}
          </Page>
        ))}
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
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
