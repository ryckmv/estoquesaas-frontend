"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

interface Venda {
  id: string;
  valorTotal: number;
  status: string;
  criadoEm: string;
  cliente: {
    id: string;
    nome: string;
  } | null;
  itens: {
    produto: string;
    quantidade: number;
  }[];
}

export default function Vendas() {
  const router = useRouter();

  const [vendas, setVendas] = useState<Venda[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarVendas() {
    try {
      const resposta = await api.get("/vendas");
      setVendas(resposta.data.vendas);
    } catch (erro) {
      console.error("Erro ao buscar vendas", erro);
    } finally {
      setCarregando(false);
    }
  }

  async function cancelarVenda(id: string) {
    const confirmar = confirm("Deseja cancelar esta venda?");

    if (!confirmar) return;

    try {
      await api.delete(`/vendas/${id}`);
      carregarVendas();
    } catch (erro) {
      console.error("Erro ao cancelar venda", erro);
    }
  }

  useEffect(() => {
    carregarVendas();
  }, []);

  if (carregando) {
    return (
      <div className="p-6 text-slate-600 font-medium animate-pulse">
        Carregando vendas...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Vendas
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Gerenciamento e histórico de vendas
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/vendas/nova")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer w-full sm:w-auto"
        >
          Nova Venda
        </button>
      </div>

      {vendas.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          Nenhuma venda cadastrada.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-200 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4 font-semibold">ID</th>
                  <th className="p-3 sm:p-4 font-semibold">Cliente</th>
                  <th className="p-3 sm:p-4 font-semibold">Produtos</th>
                  <th className="p-3 sm:p-4 font-semibold">Total</th>
                  <th className="p-3 sm:p-4 font-semibold">Status</th>
                  <th className="p-3 sm:p-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                {vendas.map((venda) => (
                  <tr key={venda.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 sm:p-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {venda.id}
                    </td>

                    <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                      {venda.cliente?.nome ?? "Sem cliente"}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600">
                      {venda.itens.map((item, index) => (
                        <div key={index} className="whitespace-nowrap">
                          {item.produto} <span className="text-gray-400">({item.quantidade})</span>
                        </div>
                      ))}
                    </td>

                    <td className="p-3 sm:p-4 font-bold text-slate-900 whitespace-nowrap">
                      R$ {Number(venda.valorTotal).toFixed(2)}
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        venda.status === "cancelada" 
                          ? "bg-red-100 text-red-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {venda.status}
                      </span>
                    </td>

                    <td className="p-3 sm:p-4 space-x-2 text-right whitespace-nowrap">
                      <button
                        onClick={() => router.push(`/dashboard/vendas/${venda.id}`)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                      >
                        Ver
                      </button>

                      {venda.status !== "cancelada" && (
                        <button
                          onClick={() => cancelarVenda(venda.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                        >
                          Cancelar
                        </button>
                      )}
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