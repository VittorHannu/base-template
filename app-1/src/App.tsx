import { AuthProvider, useAuth } from '@/auth/AuthProvider';
import { Login } from '@/auth/Login';
import MainLayout from '@/layouts/MainLayout';

function AppContent() {
  const { session } = useAuth();

  if (!session) {
    return <Login />;
  }

  return <MainLayout />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
