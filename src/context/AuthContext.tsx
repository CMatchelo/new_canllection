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
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";
import { FirebaseError } from "firebase/app";

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
      if (err instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(err.code);
        throw new Error(message);
      }
      throw new Error("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const temp = await signInWithEmailAndPassword(auth, email, password);
      setUser(temp.user);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(err.code);
        throw new Error(message);
      }
      throw new Error("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
      throw new Error("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  const logout = async () => {
    try {
      sessionStorage.removeItem(`canList_${user?.uid}`);
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
