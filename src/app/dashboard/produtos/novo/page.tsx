"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function NovoProduto() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [estoqueMinimo, setEstoqueMinimo] = useState("");

  async function salvarProduto() {
    try {
      await api.post("/produtos", {
        nome,
        codigoBarras,
        precoCusto: Number(precoCusto),
        precoVenda: Number(precoVenda),
        quantidade: Number(quantidade),
        estoqueMinimo: Number(estoqueMinimo),
      });

      alert("Produto cadastrado com sucesso!");
      router.push("/dashboard/produtos");
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Novo Produto
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Cadastre um novo item no catálogo do sistema
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/produtos")}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Voltar
          </button>
        </div>

        {/* Formulário em Card */}
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Nome do Produto
            </label>
            <input
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              placeholder="Ex: Camiseta Básica Algodão"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Código de Barras
            </label>
            <input
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              placeholder="Ex: 7891029384756"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Preço de Custo (R$)
              </label>
              <input
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={precoCusto}
                onChange={(e) => setPrecoCusto(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Preço de Venda (R$)
              </label>
              <input
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={precoVenda}
                onChange={(e) => setPrecoVenda(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Quantidade em Estoque
              </label>
              <input
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                placeholder="0"
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Estoque Mínimo (Alerta)
              </label>
              <input
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                placeholder="0"
                type="number"
                value={estoqueMinimo}
                onChange={(e) => setEstoqueMinimo(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={salvarProduto}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium p-3 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Salvar Produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}