"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { usePermissao } from "@/hooks/usePermissao";

interface Cliente {
  id: string;
  nome: string;
  telefone: string | null;
  cpf: string | null;
}

export default function Clientes() {
  const router = useRouter();
    const {
  isAdmin,
  isGerente,
  isFuncionario
} = usePermissao();


  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarClientes() {
    try {
      const resposta = await api.get("/clientes");

      setClientes(resposta.data.clientes);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }

  async function excluirCliente(id: string) {
    const confirmar = confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) return;

    try {
      await api.delete(`/clientes/${id}`);

      alert("Cliente removido com sucesso!");

      carregarClientes();
    } catch (erro: any) {


      if (erro.response?.status === 403) {

        alert(
          erro.response.data.mensagem ||
          "Acesso negado para este perfil."
        );

        return;

      }
      }


  }

  useEffect(() => {
    carregarClientes();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Carregando clientes...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Clientes
        </h1>

        <button
          onClick={() => router.push("/dashboard/clientes/novo")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Novo Cliente
        </button>

      </div>

      {clientes.length === 0 ? (

        <p>Nenhum cliente cadastrado.</p>

      ) : (

        <table className="w-full border border-gray-300">

          <thead>

            <tr className="bg-gray-200">

              <th className="border p-2 text-left">
                Nome
              </th>

              <th className="border p-2 text-left">
                Telefone
              </th>

              <th className="border p-2 text-left">
                CPF
              </th>

              <th className="border p-2 text-center">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {clientes.map((cliente) => (

              <tr key={cliente.id}>

                <td className="border p-2">
                  {cliente.nome}
                </td>

                <td className="border p-2">
                  {cliente.telefone ?? "-"}
                </td>

                <td className="border p-2">
                  {cliente.cpf ?? "-"}
                </td>

                <td className="border p-2">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/clientes/editar/${cliente.id}`
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>

                          {isAdmin && (
                    <button
                      onClick={() =>
                        excluirCliente(cliente.id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}