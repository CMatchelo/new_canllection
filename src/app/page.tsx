"use client";

import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {

  /* const router = useRouter(); */
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if(!user) {
    redirect("/login");
  }

  redirect(`/profile/${user.uid}`);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main>
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Canllection!</h1>
        <h2 className="text-2xl font-bold text-center mb-8">Hi {user?.email}</h2>
      </main>
    </div>
  );
}
