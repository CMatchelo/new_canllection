"use client";

import { CanType } from "@/types/can";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { useCanActions } from "@/app/hooks/useCansActions";

interface CanContextType {
  canCollection: CanType[];
  refreshCanCollection: () => Promise<void>;
  setCanCollection: (c: CanType[]) => void;
}

const CanContext = createContext<CanContextType | undefined>(undefined);

export const CanCollectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { getCanCollection } = useCanActions();
  const [canCollection, setCanCollection] = useState<CanType[]>([]);

  const refreshCanCollection = useCallback(async () => {
    const cans = await getCanCollection();
    setCanCollection(cans);
  }, [getCanCollection]);

  // Atualiza assim que o usuário mudar
  useEffect(() => {
    if (user) {
      refreshCanCollection();
    } else {
      setCanCollection([]);
    }
  }, [user, refreshCanCollection]);

  useEffect(() => {
    sessionStorage.setItem(
      `canList_${user?.uid}`,
      JSON.stringify(canCollection)
    );
  }, [user, canCollection]);

  return (
    <CanContext.Provider
      value={{ canCollection, setCanCollection, refreshCanCollection }}
    >
      {children}
    </CanContext.Provider>
  );
};

export const useCanContext = () => {
  const context = useContext(CanContext);
  if (!context) {
    throw new Error("useCanContext deve ser usado dentro de CanProvider");
  }
  return context;
};
