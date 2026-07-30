"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar() {
    try {
      console.log("ENVIANDO LOGIN:");
      console.log({
        email,
        senha,
      });

      const resposta = await api.post("/login", {
        email,
        senha,
      });

      console.log("RESPOSTA DA API:");
      console.log(resposta.data);

      localStorage.setItem("token", resposta.data.token);

      localStorage.setItem(
        "usuario",
        JSON.stringify(resposta.data.usuario)
      );
      console.log(resposta.data);
      if (resposta.data.usuario.role === "master") {
        router.push("/master");
      } else {
        router.push("/dashboard");
      }
    }  catch (error) {
      console.log("ERRO NO LOGIN:");

      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Resposta detalhada:", error.response?.data);
        
        const mensagemErro = error.response?.data?.message || "E-mail ou senha incorretos.";
        alert(mensagemErro);
      } else {
        console.log(error);
        alert("Erro no login");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Estoque SaaS
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Faça login para acessar sua conta
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              E-mail
            </label>
            <input
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Senha
            </label>
            <input
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium p-3 rounded-lg transition-colors shadow-md mt-2 text-sm sm:text-base cursor-pointer"
            onClick={entrar}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}