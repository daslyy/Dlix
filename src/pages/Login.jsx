import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }

      navigate("/");
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
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
          <span className="font-display text-5xl tracking-wide text-ember">
            DLIX
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-charcoal/90 backdrop-blur border border-charcoal-light rounded-lg p-8"
        >
          <h1 className="font-display text-3xl tracking-wide mb-6">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h1>

          {error && (
            <p className="text-ember text-sm mb-4 bg-ember/10 border border-ember/30 rounded px-3 py-2">
              {error}
            </p>
          )}

          {mode === "signup" && (
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
            disabled={loading}
            className="w-full bg-ember hover:bg-ember-deep transition-colors font-semibold py-3 rounded"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Sign Up"}
          </button>

          {mode === "login" && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="h-px bg-charcoal-light flex-1" />
                <span className="text-fog text-xs">OR</span>
                <div className="h-px bg-charcoal-light flex-1" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-paper text-void font-semibold py-3 rounded hover:bg-fog transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </>
          )}

          <p className="text-fog text-sm mt-6 text-center">
            {mode === "login" ? "New to Dlix? " : "Already have an account? "}

            <button
              type="button"
              onClick={() => {
                setError("");
                setMode(mode === "login" ? "signup" : "login");
              }}
              className="text-paper hover:underline"
            >
              {mode === "login" ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function getFirebaseErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/user-not-found":
      return "No account was found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup.";

    default:
      return error.message || "Something went wrong. Please try again.";
  }
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.86A5.86 5.86 0 0 1 6.24 12c0-.65.11-1.28.3-1.86V7.62H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.38l3.24-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.11c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.16 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.37l3.24 2.52C7.31 7.83 9.46 6.11 12 6.11Z"
      />
    </svg>
  );
}
