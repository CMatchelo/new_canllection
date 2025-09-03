"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebase";
import React from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  registerAcc: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  registerAcc: async () => {},
  login: async () => {},
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const registerAcc = async (email: string, password: string) => {
    try {
      const temp = await createUserWithEmailAndPassword(auth, email, password);
      setUser(temp.user);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const temp = await signInWithEmailAndPassword(auth, email, password);
      setUser(temp.user);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, registerAcc, login, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
