"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
}

export default function NovaMovimentacaoPage() {
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [produtoId, setProdutoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [motivo, setMotivo] = useState("compra");
  const [quantidade, setQuantidade] = useState(1);

  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get("/produtos");
        console.log("PRODUTOS:", response.data);
        setProdutos(response.data.produtos);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar produtos");
      }
    }

    carregarProdutos();
  }, []);

  async function salvar() {
    try {
      setCarregando(true);

      await api.post("/movimentacoes", {
        produtoId,
        tipo,
        motivo,
        quantidade,
      });

      alert("Movimentação criada com sucesso");
      router.push("/dashboard/estoque");
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message ?? "Erro ao criar movimentação"
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Nova Movimentação
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Registre uma nova entrada ou saída no estoque
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/estoque")}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Voltar
          </button>
        </div>

        {/* Formulário em Card */}
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Produto
            </label>
            <select
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} (Estoque: {produto.quantidade})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Tipo de Movimentação
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Motivo
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              >
                <option value="compra">Compra</option>
                <option value="ajuste">Ajuste</option>
                <option value="perda">Perda</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Quantidade
            </label>
            <input
              type="number"
              min="1"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />
          </div>

          <div className="pt-4">
            <button
              onClick={salvar}
              disabled={carregando}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium p-3 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              {carregando ? "Salvando..." : "Salvar Movimentação"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}