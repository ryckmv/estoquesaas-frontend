"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { usePermissao } from "@/hooks/usePermissao";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  telefone: string | null;
  cpf: string | null;
}

export default function Clientes() {
  const router = useRouter();
  const { isAdmin, isGerente, isFuncionario } = usePermissao();

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
    const confirmar = confirm("Deseja realmente excluir este cliente?");

    if (!confirmar) return;

    try {
      await api.delete(`/clientes/${id}`);
      alert("Cliente removido com sucesso!");
      carregarClientes();
    } catch (erro: any) {
      if (erro.response?.status === 403) {
        alert(
          erro.response.data.mensagem || "Acesso negado para este perfil."
        );
        return;
      }
      console.error(erro);
      alert("Erro ao excluir cliente.");
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen text-slate-500 font-medium animate-pulse">
        <Loader2 className="animate-spin text-emerald-600 mr-2" size={24} />
        Carregando clientes...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Clientes
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Gerencie os clientes cadastrados no sistema
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/clientes/novo")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>

      {/* Conteúdo / Tabela */}
      {clientes.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500 border border-slate-200">
          Nenhum cliente cadastrado.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-200 w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead className="bg-slate-50 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4 font-semibold">Nome</th>
                  <th className="p-3 sm:p-4 font-semibold">Telefone</th>
                  <th className="p-3 sm:p-4 font-semibold">CPF</th>
                  <th className="p-3 sm:p-4 font-semibold text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                {clientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                      {cliente.nome}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 font-mono whitespace-nowrap">
                      {cliente.telefone ?? "-"}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 font-mono whitespace-nowrap">
                      {cliente.cpf ?? "-"}
                    </td>

                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/clientes/editar/${cliente.id}`
                            )
                          }
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        >
                          <Pencil size={14} />
                          Editar
                        </button>

                        {isAdmin && (
                          <button
                            onClick={() => excluirCliente(cliente.id)}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                            Excluir
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}