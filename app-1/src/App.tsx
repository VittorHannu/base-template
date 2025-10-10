import { AuthProvider, useAuth } from './auth/AuthProvider';
import { Login } from './components/Login';
import NotificationManager from './components/NotificationManager';
import { TestPage } from './components/TestPage';

function AppContent() {
  const { session } = useAuth();

  if (!session) {
    return <Login />;
  }

  return (
    <div>
      <h1>Supabase Connection Test</h1>
      <hr className="my-4" />
      <NotificationManager />
      <hr className="my-4" />
      <TestPage />
    </div>
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
