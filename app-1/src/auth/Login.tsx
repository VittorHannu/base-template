import * as React from 'react';
import { supabase } from './supabase';

export const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Error logging in: ' + error.message);
    } else {
      alert('Logged in successfully!');
      // In a real app, you'd redirect or update state here.
      console.log(data.user);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Log In
        </button>
      </form>
    </div>
  );
};