"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  estoqueMinimo: number;
  precoCusto: number;
  precoVenda: number;
}

export default function DetalhesEstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("maior");

  async function carregar() {
    try {
      const response = await api.get("/produtos");

      if (Array.isArray(response.data)) {
        setProdutos(response.data);
      } else if (Array.isArray(response.data.produtos)) {
        setProdutos(response.data.produtos);
      } else {
        setProdutos([]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar estoque");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const produtosFiltrados = useMemo(() => {
    let lista = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    if (ordenacao === "maior") {
      lista.sort((a, b) => b.quantidade - a.quantidade);
    }

    if (ordenacao === "menor") {
      lista.sort((a, b) => a.quantidade - b.quantidade);
    }

    if (ordenacao === "baixo") {
      lista = lista.filter(
        (produto) =>
          produto.quantidade > 0 && produto.quantidade <= produto.estoqueMinimo
      );
    }

    return lista;
  }, [produtos, busca, ordenacao]);

  const valorTotalEstoque = produtos.reduce(
    (total, produto) => total + produto.precoCusto * produto.quantidade,
    0
  );

  const estoqueBaixo = produtos.filter(
    (produto) =>
      produto.quantidade <= produto.estoqueMinimo && produto.quantidade > 0
  ).length;

  const semEstoque = produtos.filter(
    (produto) => produto.quantidade === 0
  ).length;

  if (carregando) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen text-slate-500 font-medium animate-pulse">
        Carregando estoque...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Detalhes do Estoque
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Visão atual dos produtos armazenados
          </p>
        </div>

        <Link
          href="/dashboard/estoque"
          className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm text-center w-full sm:w-auto"
        >
          Voltar
        </Link>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <Card titulo="Produtos" valor={produtos.length} />
        <Card
          titulo="Valor do Estoque"
          valor={valorTotalEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        />
        <Card titulo="Estoque Baixo" valor={estoqueBaixo} />
        <Card titulo="Sem Estoque" valor={semEstoque} />
      </div>

      {/* Filtros e Ordenação */}
      <div className="bg-white p-4 sm:p-5 rounded-xl shadow border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full md:w-96 bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
        />

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="w-full md:w-auto bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
        >
          <option value="maior">Maior estoque</option>
          <option value="menor">Menor estoque</option>
          <option value="baixo">Estoque baixo</option>
        </select>
      </div>

      {/* Tabela Responsiva */}
      {produtosFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead className="bg-slate-50 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4 font-semibold">Produto</th>
                  <th className="p-3 sm:p-4 font-semibold text-center">Quantidade</th>
                  <th className="p-3 sm:p-4 font-semibold text-center">Mínimo</th>
                  <th className="p-3 sm:p-4 font-semibold text-center">Status</th>
                  <th className="p-3 sm:p-4 font-semibold text-center">Custo</th>
                  <th className="p-3 sm:p-4 font-semibold text-center">Venda</th>
                  <th className="p-3 sm:p-4 font-semibold text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                      {produto.nome}
                    </td>

                    <td className="p-3 sm:p-4 text-center font-mono whitespace-nowrap">
                      {produto.quantidade}
                    </td>

                    <td className="p-3 sm:p-4 text-center font-mono whitespace-nowrap">
                      {produto.estoqueMinimo}
                    </td>

                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                      {produto.quantidade === 0 ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Sem estoque
                        </span>
                      ) : produto.quantidade <= produto.estoqueMinimo ? (
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Estoque baixo
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Normal
                        </span>
                      )}
                    </td>

                    <td className="p-3 sm:p-4 text-center font-mono text-slate-600 whitespace-nowrap">
                      {produto.precoCusto.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="p-3 sm:p-4 text-center font-mono text-slate-600 whitespace-nowrap">
                      {produto.precoVenda.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                      <Link
                        href={`/dashboard/produtos/editar/${produto.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        Editar
                      </Link>
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

function Card({ titulo, valor }: { titulo: string; valor: any }) {
  return (
    <div className="bg-white rounded-xl shadow border border-slate-200 p-5">
      <p className="text-gray-500 text-sm font-medium">{titulo}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-slate-900">{valor}</h2>
    </div>
  );
}