"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import GraficoFaturamento from "@/components/GraficoFaturamento";

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
router.push("/dashboard");
    } catch (error) {
      console.log("ERRO NO LOGIN:");

      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Resposta:", error.response?.data);
      } else {
        console.log(error);
      }

      alert("Erro no login");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h1 className="text-3xl font-bold">
          Estoque SaaS
        </h1>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="bg-black text-white p-2 w-full"
          onClick={entrar}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}