import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'dlix_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  // This is a mock auth flow for demo purposes — no real backend.
  // Any email/password combination that passes basic validation succeeds.
  function login(email, password) {
    if (!email.includes('@') || password.length < 6) {
      throw new Error('Enter a valid email and a password of at least 6 characters.');
    }
    const account = { email, name: email.split('@')[0] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    setUser(account);
    return account;
  }

  function signup(name, email, password) {
    if (!name.trim()) throw new Error('Enter your name.');
    if (!email.includes('@') || password.length < 6) {
      throw new Error('Enter a valid email and a password of at least 6 characters.');
    }
    const account = { email, name };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    setUser(account);
    return account;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
