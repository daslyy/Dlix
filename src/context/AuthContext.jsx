import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Keep track of Firebase's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Email + password signup
  async function signup(name, email, password) {
    if (!name.trim()) {
      throw new Error("Enter your name.");
    }

    if (!email.includes("@") || password.length < 6) {
      throw new Error(
        "Enter a valid email and a password of at least 6 characters."
      );
    }

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: name,
    });

    setUser(result.user);

    return result.user;
  }

  // Email + password login
  async function login(email, password) {
    if (!email.includes("@") || password.length < 6) {
      throw new Error(
        "Enter a valid email and a password of at least 6 characters."
      );
    }

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    setUser(result.user);

    return result.user;
  }

  // Google login
  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);

    setUser(result.user);

    return result.user;
  }

  // Logout
  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}