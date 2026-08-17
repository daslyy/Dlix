import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        login(email, password);
      } else {
        signup(name, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 grain">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-void/80" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-display text-5xl tracking-wide text-ember">DLIX</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-charcoal/90 backdrop-blur border border-charcoal-light rounded-lg p-8"
        >
          <h1 className="font-display text-3xl tracking-wide mb-6">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>

          {error && (
            <p className="text-ember text-sm mb-4 bg-ember/10 border border-ember/30 rounded px-3 py-2">
              {error}
            </p>
          )}

          {mode === 'signup' && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full mb-3 bg-charcoal-light text-paper placeholder:text-fog rounded px-4 py-3 outline-none focus:ring-2 focus:ring-ember"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-3 bg-charcoal-light text-paper placeholder:text-fog rounded px-4 py-3 outline-none focus:ring-2 focus:ring-ember"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (6+ characters)"
            className="w-full mb-5 bg-charcoal-light text-paper placeholder:text-fog rounded px-4 py-3 outline-none focus:ring-2 focus:ring-ember"
          />

          <button
            type="submit"
            className="w-full bg-ember hover:bg-ember-deep transition-colors font-semibold py-3 rounded"
          >
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>

          <p className="text-fog text-sm mt-6 text-center">
            {mode === 'login' ? "New to Dlix? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setError('');
                setMode(mode === 'login' ? 'signup' : 'login');
              }}
              className="text-paper hover:underline"
            >
              {mode === 'login' ? 'Sign up now' : 'Sign in'}
            </button>
          </p>
          <p className="text-fog/60 text-xs mt-4 text-center">
            Demo auth only — no real account is created.
          </p>
        </form>
      </div>
    </div>
  );
}
