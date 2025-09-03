"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function PageLogin() {
  const router = useRouter();
  const { user, loading, login, registerAcc, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [hasAcc, setHasAcc] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const toggleHasAcc = () => {
    setHasAcc(!hasAcc);
  };

  useEffect(() => {
    if (!loading && user) {
      router.push(`/profile/${user.uid}`); // redireciona se não estiver logado
    }
  }, [user, loading, router]);

  if (loading && !user) {
    return <div>Carregando...</div>; // evita renderizar a página antes do check
  }

  const onLogin = async (data: LoginFormInputs) => {
    setErrorMsg("");
    if (hasAcc) {
      try {
        await login?.(data.email, data.password);
        router.push("/");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Ocorreu um erro inesperado. Tente novamente.");
        }
      }
    } else {
      try {
        await registerAcc?.(data.email, data.password);
        router.push("/");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Ocorreu um erro inesperado. Tente novamente.");
        }
      }
    }
  };

  const onGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div>
      <div className="absolute w-full h-full bg-black/70"></div>
      <div
        className="h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cansbg.jpg')" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            flex flex-col justify-center items-stretch gap-4 w-[90%] max-w-md shadow-2xl
            bg-primary1 px-4 py-8 sm:px-8 rounded-lg border-1 border-highlight2"
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onLogin)}
          >
            <div className="self-center text-2xl font-bold">
              {hasAcc ? (
                <span>Entre na sua conta</span>
              ) : (
                <span>Crie sua conta</span>
              )}
            </div>

            <Input
              id="Email"
              classname="text-secondary1"
              {...register("email", { required: "Digite o email" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <Input
              id="Senha"
              classname="text-secondary1"
              {...register("password", { required: "Digite a senha" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            {hasAcc ? (
              <Button type="submit">Entrar</Button>
            ) : (
              <Button type="submit">Cadastrar</Button>
            )}
            {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
          </form>

          <hr></hr>

          <div
            onClick={toggleHasAcc}
            className="flex justify-center cursor-pointer self-center"
          >
            {hasAcc ? (
              <span className="text-center">
                Ainda não tem uma conta? Cadastre aqui.
              </span>
            ) : (
              <span className="text-center">Já tem uma conta? Entre aqui.</span>
            )}
          </div>
          <Button
            className="bg-red-600 hover:bg-red-500 active:bg-red-700"
            onSubmit={onGoogleLogin}
          >
            Use sua conta google
          </Button>
        </div>
      </div>
    </div>
  );
}
