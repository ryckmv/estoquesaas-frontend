"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function NovoCliente() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  async function salvarCliente() {
    try {
      if (!nome.trim()) {
        alert("O nome é obrigatório.");
        return;
      }

      if (cpf && cpf.replace(/\D/g, "").length !== 11) {
        alert("CPF deve conter 11 números.");
        return;
      }

      await api.post("/clientes", {
        nome,
        telefone,
        cpf: cpf.replace(/\D/g, ""),
      });

      alert("Cliente cadastrado com sucesso!");

      router.push("/dashboard/clientes");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar cliente.");
    }
  }

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-3xl font-bold mb-6">
        Novo Cliente
      </h1>

      <div className="space-y-4">

        <input
          className="border p-2 w-full rounded"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <div className="flex gap-3">

          <button
            onClick={salvarCliente}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex-1"
          >
            Salvar Cliente
          </button>

          <button
            onClick={() => router.push("/dashboard/clientes")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  );
}