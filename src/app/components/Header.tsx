"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./Button";
import { redirect } from "next/navigation";
import { ExitIcon } from "@/utils/icons";

export const Header = () => {
  const { user, logout } = useAuth();

  if (!user) {
    redirect("/login");
  }

  const onLogout = async () => {
    await logout();
  };

  return (
    <div
      className="bg-primary1 text-gray-100
    p-4 flex flex-row items-center"
    >
      <div>
        <span className="text-xl">Bem vindo {user?.email}</span>
      </div>
      <div className="ml-auto flex flex-row items-center">
        <Button onSubmit={onLogout}>
          <span className="hidden sm:block">Sair</span>
          <ExitIcon size={20} />
        </Button>
      </div>
    </div>
  );
};
