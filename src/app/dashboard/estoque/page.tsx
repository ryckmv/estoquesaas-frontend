"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import Link from "next/link";

interface Movimentacao {
  id: string;
  produto: {
    nome: string;
  };
  usuario?: {
    nome: string;
  };
  tipo: string;
  motivo: string;
  quantidade: number;
  criadoEm: string;
}

export default function EstoquePage() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [motivoFiltro, setMotivoFiltro] = useState("todos");

  async function carregar() {
    try {
      const response = await api.get("/movimentacoes");

      if (Array.isArray(response.data)) {
        setMovimentacoes(response.data);
      } else if (Array.isArray(response.data.movimentacoes)) {
        setMovimentacoes(response.data.movimentacoes);
      } else {
        setMovimentacoes([]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar movimentações");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const movimentacoesFiltradas = useMemo(() => {
    return movimentacoes.filter((mov) => {
      const produto = mov.produto?.nome
        ?.toLowerCase()
        .includes(busca.toLowerCase());

      const tipo = tipoFiltro === "todos" || mov.tipo === tipoFiltro;

      const motivo = motivoFiltro === "todos" || mov.motivo === motivoFiltro;

      return produto && tipo && motivo;
    });
  }, [movimentacoes, busca, tipoFiltro, motivoFiltro]);

  const entradas = movimentacoes.filter((m) => m.tipo === "entrada").length;
  const saidas = movimentacoes.filter((m) => m.tipo === "saida").length;

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
            Estoque
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Histórico geral de movimentações
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Link
            href="/dashboard/estoque/detalhes"
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm text-center flex-1 sm:flex-none"
          >
            Ver Detalhes
          </Link>

          <Link
            href="/dashboard/estoque/nova"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm text-center flex-1 sm:flex-none"
          >
            + Nova Movimentação
          </Link>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6">
        <Card titulo="Total de Entradas" valor={entradas} cor="text-green-600" />
        <Card titulo="Total de Saídas" valor={saidas} cor="text-red-600" />
        <Card
          titulo="Movimentações Totais"
          valor={movimentacoes.length}
          cor="text-blue-600"
        />
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 sm:p-5 rounded-xl shadow border border-slate-200 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            placeholder="🔍 Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />

          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          >
            <option value="todos">Todos os tipos</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <select
            value={motivoFiltro}
            onChange={(e) => setMotivoFiltro(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          >
            <option value="todos">Todos os motivos</option>
            <option value="compra">Compra</option>
            <option value="ajuste">Ajuste</option>
            <option value="perda">Perda</option>
          </select>
        </div>
      </div>

      {/* Tabela Responsiva */}
      {movimentacoesFiltradas.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          Nenhuma movimentação encontrada.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead className="bg-slate-50 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4 font-semibold">Produto</th>
                  <th className="p-3 sm:p-4 font-semibold">Tipo</th>
                  <th className="p-3 sm:p-4 font-semibold">Motivo</th>
                  <th className="p-3 sm:p-4 font-semibold">Quantidade</th>
                  <th className="p-3 sm:p-4 font-semibold">Usuário</th>
                  <th className="p-3 sm:p-4 font-semibold">Data</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                {movimentacoesFiltradas.map((mov) => (
                  <tr key={mov.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                      {mov.produto.nome}
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          mov.tipo === "entrada"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {mov.tipo}
                      </span>
                    </td>

                    <td className="p-3 sm:p-4 capitalize text-slate-600 whitespace-nowrap">
                      {mov.motivo}
                    </td>

                    <td
                      className={`p-3 sm:p-4 whitespace-nowrap font-mono font-bold ${
                        mov.tipo === "entrada"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {mov.tipo === "entrada" ? "+" : "-"}
                      {mov.quantidade}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">
                      {mov.usuario?.nome ?? "Não informado"}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">
                      {new Date(mov.criadoEm).toLocaleDateString("pt-BR")}
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

function Card({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: number;
  cor: string;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
      <p className="text-gray-500 text-sm font-medium">{titulo}</p>
      <h2 className={`text-2xl sm:text-3xl font-bold mt-1 ${cor}`}>{valor}</h2>
    </div>
  );
}