"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function PageLogin() {
  const router = useRouter();
  const { user, loading, login, registerAcc, signInWithGoogle } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  useEffect(() => {
    console.log("Mudou algum");
    if (!loading && user) {
      router.push(`/profile/${user.uid}`); // redireciona se não estiver logado
    }

  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Carregando...</div>; // evita renderizar a página antes do check
  }

  const onLogin = async (data: LoginFormInputs) => {
    try {
      console.log(data);
      await login?.(data.email, data.password);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onRegister = async (data: LoginFormInputs) => {
    console.log(data);
    await registerAcc?.(data.email, data.password);
  };

  const onGoogleLogin = async () => {
    console.log("Oi");
    await signInWithGoogle();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onLogin)}>
        <input
          {...register("email")}
          className="bg-amber-100 border-1 border-black p-2"
          type="text"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="bg-amber-100 border-1 border-black p-2"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-amber-300 p-2 cursor-pointer hover:bg-amber-200 transition"
        >
          Login
        </button>
      </form>

      <h1>Register Page</h1>
      <form onSubmit={handleSubmit(onRegister)}>
        <input
          {...register("email")}
          className="bg-amber-100 border-1 border-black p-2"
          type="text"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="bg-amber-100 border-1 border-black p-2"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-amber-300 p-2 cursor-pointer hover:bg-amber-200 transition"
        >
          Login
        </button>
      </form>
      <button onClick={onGoogleLogin}>Sign in with Google</button>
    </div>
  );
}
