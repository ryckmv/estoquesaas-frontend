"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import GraficoFaturamento from "@/components/GraficoFaturamento";
import GraficoVendas from "@/components/GraficoVendas";
import GraficoProdutosMaisVendidos from "@/components/GraficoProdutosMaisVendidos";
import AlertaEstoque from "@/components/AlertaEstoque";

import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface Venda {
  id: string;
  cliente: string;
  usuario: string;
  valor: number;
  status: string;
  criadoEm: string;
}

interface DashboardData {
  resumo?: {
    empresas?: number;
    produtos?: number;
    clientes?: number;
    usuarios?: number;
    vendas?: number;
  };

  financeiro?: {
    vendasHoje?: number;
    vendasMes?: number;
    faturamentoHoje?: number;
    faturamentoMes?: number;
    faturamentoTotal?: number;
  };

  estoque?: {
    valorEstoque?: number;
    estoqueBaixo?: number;
    semEstoque?: number;

    produtosBaixoEstoque?: {
      nome: string;
      quantidade: number;
      estoqueMinimo: number;
    }[];
  };

  ultimasVendas?: Venda[];

  graficoVendas?: {
    dia: string;
    vendas: number;
    faturamento: number;
  }[];

  produtosMaisVendidos?: {
    produto: string;
    quantidade: number;
  }[];
}

export default function Dashboard() {
  const [dados, setDados] = useState<DashboardData | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/dashboard");
        console.log("DASHBOARD:", response.data);
        setDados(response.data);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar dashboard");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-600 font-medium animate-pulse">
        Carregando...
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-600 font-medium">
        Nenhum dado encontrado.
      </div>
    );
  }

  const faturamento =
    dados.financeiro?.faturamentoMes ??
    dados.financeiro?.faturamentoTotal ??
    0;

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-2">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm sm:text-base">
          Bem-vindo ao Estoque SaaS
        </p>
      </div>

      {/* Grid de Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <Card
          titulo="Produtos"
          valor={dados.resumo?.produtos ?? 0}
          icon={<Package className="w-6 h-6 text-slate-500" />}
        />

        <Card
          titulo="Clientes"
          valor={dados.resumo?.clientes ?? 0}
          icon={<Users className="w-6 h-6 text-slate-500" />}
        />

        <Card
          titulo="Vendas"
          valor={dados.resumo?.vendas ?? 0}
          icon={<ShoppingCart className="w-6 h-6 text-slate-500" />}
        />

        <Card
          titulo="Faturamento"
          valor={formatarMoeda(faturamento)}
          icon={<DollarSign className="w-6 h-6 text-slate-500" />}
        />
      </div>

      {/* Grid Financeiro e Estoque */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
        <Box titulo="Financeiro" icon={<TrendingUp className="w-5 h-5 text-blue-600" />}>
          <Linha
            titulo="Vendas Hoje"
            valor={dados.financeiro?.vendasHoje ?? 0}
          />

          <Linha
            titulo="Vendas do Mês"
            valor={dados.financeiro?.vendasMes ?? 0}
          />

          <Linha
            titulo="Faturamento"
            valor={formatarMoeda(faturamento)}
          />
        </Box>

        <Box titulo="Estoque" icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}>
          <Linha
            titulo="Valor Estoque"
            valor={formatarMoeda(dados.estoque?.valorEstoque ?? 0)}
          />

          <Linha
            titulo="Estoque Baixo"
            valor={dados.estoque?.estoqueBaixo ?? 0}
          />

          <Linha
            titulo="Sem Estoque"
            valor={dados.estoque?.semEstoque ?? 0}
          />
        </Box>
      </div>

      {/* Gráficos de Faturamento e Vendas */}
      <div className="grid xl:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-hidden">
          <GraficoFaturamento dados={dados.graficoVendas ?? []} />
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-hidden">
          <GraficoVendas dados={dados.graficoVendas ?? []} />
        </div>
      </div>

      {/* Alerta de Estoque */}
      <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow p-4 sm:p-6 overflow-hidden">
        <AlertaEstoque produtos={dados.estoque?.produtosBaixoEstoque ?? []} />
      </div>

      {/* Gráfico de Produtos Mais Vendidos */}
      <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow p-4 sm:p-6 overflow-hidden">
        <GraficoProdutosMaisVendidos dados={dados.produtosMaisVendidos ?? []} />
      </div>
    </div>
  );
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Card({
  titulo,
  valor,
  icon,
}: {
  titulo: string;
  valor: any;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <p className="text-gray-500 text-sm sm:text-base font-medium">
          {titulo}
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-slate-900 truncate">
          {valor}
        </h2>
      </div>

      <div className="mt-3 sm:mt-4">
        {icon}
      </div>
    </div>
  );
}

function Box({
  titulo,
  icon,
  children,
}: {
  titulo: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 sm:p-6">
      <h2 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 flex gap-2 items-center text-slate-900">
        {icon}
        {titulo}
      </h2>

      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function Linha({
  titulo,
  valor,
}: {
  titulo: string;
  valor: any;
}) {
  return (
    <div className="flex justify-between items-center border-b border-slate-100 py-3 text-sm sm:text-base">
      <span className="text-slate-600">
        {titulo}
      </span>

      <span className="font-bold text-slate-900">
        {valor}
      </span>
    </div>
  );
}