"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";

export default function EditarCliente() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const [loading, setLoading] = useState(true);

  async function carregarCliente() {
    try {
      const resposta = await api.get(`/clientes/${id}`);

      const cliente = resposta.data.cliente;

      setNome(cliente.nome);
      setTelefone(cliente.telefone ?? "");
      setCpf(cliente.cpf ?? "");
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar cliente.");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarCliente() {
    try {
      if (!nome.trim()) {
        alert("O nome é obrigatório.");
        return;
      }

      if (cpf && cpf.replace(/\D/g, "").length !== 11) {
        alert("CPF deve conter 11 números.");
        return;
      }

      await api.put(`/clientes/${id}`, {
        nome,
        telefone,
        cpf: cpf.replace(/\D/g, ""),
      });

      alert("Cliente atualizado com sucesso!");

      router.push("/dashboard/clientes");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar cliente.");
    }
  }

  useEffect(() => {
    if (id) {
      carregarCliente();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        Carregando cliente...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-3xl font-bold mb-6">
        Editar Cliente
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
            onClick={atualizarCliente}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex-1"
          >
            Salvar Alterações
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