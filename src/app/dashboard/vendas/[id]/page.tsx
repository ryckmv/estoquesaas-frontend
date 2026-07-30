"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import { Loader2, ArrowLeft, Receipt, User, Calendar, Tag } from "lucide-react";

interface Venda {
  id: string;
  cliente: {
    id: string;
    nome: string;
  } | null;
  valorTotal: number;
  status: string;
  criadoEm: string;
  itens: {
    produto: string;
    quantidade: number;
    precoVendaUnitario: number;
  }[];
}

export default function DetalhesVenda() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [venda, setVenda] = useState<Venda | null>(null);
  const [carregando, setCarregando] = useState(true);

  async function carregarVenda() {
    try {
      const resposta = await api.get(`/vendas/${id}`);
      setVenda(resposta.data.venda);
    } catch (erro) {
      console.error("Erro ao buscar venda", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarVenda();
  }, []);

  if (carregando) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen text-slate-500 font-medium animate-pulse">
        <Loader2 className="animate-spin text-blue-600 mr-2" size={24} />
        Carregando detalhes da venda...
      </div>
    );
  }

  if (!venda) {
    return (
      <div className="p-8 min-h-screen bg-slate-100 flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 text-center border border-slate-200 max-w-md w-full">
          <p className="text-slate-700 font-medium mb-4">Venda não encontrada.</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Receipt size={28} className="text-blue-600" />
            Venda #{venda.id.slice(0, 8)}...
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Informações detalhadas sobre a transação
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      </div>

      {/* Card de Informações Gerais */}
      <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
            <User size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
              Cliente
            </span>
            <span className="text-slate-900 font-medium">
              {venda.cliente?.nome ?? "Sem cliente"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <Tag size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
              Status
            </span>
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-800 rounded-full">
              {venda.status}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
            <Calendar size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
              Data e Hora
            </span>
            <span className="text-slate-900 font-medium text-sm">
              {new Date(venda.criadoEm).toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-200 w-full mb-6">
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Produtos da Venda</h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-50 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
              <tr className="border-b border-slate-200">
                <th className="p-3 sm:p-4 font-semibold">Produto</th>
                <th className="p-3 sm:p-4 font-semibold">Quantidade</th>
                <th className="p-3 sm:p-4 font-semibold">Valor Unitário</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
              {venda.itens.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 sm:p-4 font-medium text-slate-900">
                    {item.produto}
                  </td>
                  <td className="p-3 sm:p-4 text-slate-600 font-mono">
                    {item.quantidade}
                  </td>
                  <td className="p-3 sm:p-4 text-slate-600 font-mono">
                    R$ {Number(item.precoVendaUnitario).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rodapé com Valor Total */}
      <div className="bg-white rounded-xl shadow border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-slate-500 text-sm font-medium">
          Valor total da transação calculada pelo sistema
        </span>
        <div className="text-xl sm:text-2xl font-bold text-slate-900">
          Total: <span className="text-blue-600">R$ {Number(venda.valorTotal).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}