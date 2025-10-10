import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient'; // Import supabase client
import { TestPage } from "./components/TestPage"; // Keep TestPage for now

function App() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace 'your_table_name' with an actual table in your Supabase project
        const { data: fetchedData, error: supabaseError } = await supabase
          .from('test_table') // You might need to create this table or use an existing one
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
  }, []);

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
      {/* Keep TestPage for now to ensure Shadcn styling is still visible */}
      <TestPage />
    </div>
  );
}

export default App;