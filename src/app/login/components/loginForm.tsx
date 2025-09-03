"use client";

import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export const LoginForm = () => {
  

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-col justify-center items-stretch gap-4 w-[90%] max-w-md shadow-2xl
        bg-primary1 px-4 py-8 sm:px-8 rounded-lg border-1 border-highlight2"
    >
      <div className="self-center text-2xl font-bold">
        {hasAcc ? (
            <span>Entre na sua conta</span>
        ) : (
            <span>Crie sua conta</span>
        )}
        
        </div>
      <Input id="Email" />
      <Input id="Senha" />
      <Button>Cadastrar</Button>
      <hr></hr>
      <div onClick={toggleHasAcc} className="flex justify-center cursor-pointer self-center">
        {hasAcc ? (
            <span className="text-center">Ainda não tem uma conta? Cadastre aqui.</span>
        ) : (
            <span className="text-center">Já tem uma conta? Entre aqui.</span>
        )}
      </div>
    </div>
  );
};

/*
<div>
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