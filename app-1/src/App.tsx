import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { TestPage } from "./components/TestPage";
import { AuthProvider, useAuth } from './auth';
import { Login } from './components/Login';
import NotificationManager from './components/NotificationManager';

function AuthStatus() {
  const { session, user, loading, signOut } = useAuth();

  if (loading) {
    return <p>Loading authentication...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Logged in as: {user?.email}</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }

  return <Login />;
}

function AppContent() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth(); // Get session from AuthContext

  useEffect(() => {
    if (!session) return; // Only fetch data if logged in

    async function fetchData() {
      try {
        const { data: fetchedData, error: supabaseError } = await supabase
          .from('test_table')
          .select('*');

        if (supabaseError) {
          throw supabaseError;
        }
        setData(fetchedData);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, [session]); // Re-run effect when session changes

  return (
    <div>
      <h1>Supabase Connection Test</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {data ? (
        <div>
          <p>Data fetched successfully:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data from Supabase...</p>
      )}
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
      <AuthStatus />
      <AppContent />
    </AuthProvider>
  );
}

export default App;