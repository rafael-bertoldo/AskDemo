import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../providers/AuthProvider";
import { SignInCredentials, SignInData, User } from "../../types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";

const signInSchema = yup.object().shape({
  email: yup.string().required("email obrigatório").email("email inválido"),
  password: yup.string().required("senha obrigatória"),
});

export const Home = () => {
  const { signIn, user } = useAuth();
  const history = useHistory();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({ resolver: yupResolver(signInSchema) });

  const handleSignIn = async (data: SignInData) => {
    await signIn(data);
  };

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <>
      <Navbar userName="Rafael" />
      <main className="w-screen h-screen bg-white flex items-center justify-center flex-col">
        <div className="mb-8 flex flex-col text-center">
          <h1 className="font-bold text-darkBlue text-5xl mb-8">Ask.demo</h1>
          <h3 className="text-mediumBlue font-bold text-xl">
            Faça perguntas para o instrutor
          </h3>
        </div>
        <form
          className="w-9/12 shadow-3xl rounded-xl h-96 flex flex-col justify-center items-center"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <h2 className="mt-8 font-bold text-3xl mb-8">Bem vindo de volta</h2>
          <div className="  h-auto flex flex-col items-center w-96 p-4">
            <div className="flex items-center mb-2">
              <label className="mr-4 ">Email: </label>
              <input
                type="text"
                className="w-full bg-lightGray p-1 rounded"
                {...register("email")}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>
          <div className="  h-auto flex flex-col items-center w-96 p-4">
            <div className="flex items-center mb-2">
              <label className="mr-4 ">Senha: </label>
              <input
                type="text"
                className="w-full bg-lightGray p-1 rounded"
                {...register("password")}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue p-3 rounded w-40 font-bold text-white hover:bg-mediumBlue transition-colors mt-4"
          >
            ENTRAR
          </button>
        </form>
      </main>
    </>
  );
};
