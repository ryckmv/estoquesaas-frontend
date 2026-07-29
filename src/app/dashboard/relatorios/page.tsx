"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Relatorio {
  resumo: {
    produtos: number;
    clientes: number;
    usuarios: number;
    vendas: number;
  };

  financeiro: {
    vendasHoje: number;
    vendasMes: number;
    faturamentoHoje: number;
    faturamentoMes: number;
  };

  estoque: {
    valorEstoque: number;
    estoqueBaixo: number;
    semEstoque: number;

    produtosBaixoEstoque: {
      nome: string;
      quantidade: number;
      estoqueMinimo: number;
    }[];
  };

  ultimasVendas: {
    id: string;
    cliente: string;
    usuario: string;
    valor: number;
    status: string;
    criadoEm: string;
  }[];

  produtosMaisVendidos: {
    produto: string;
    quantidade: number;
  }[];
}

export default function RelatoriosPage() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    try {
      const response = await api.get("/dashboard");
      setDados(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar relatórios");
    } finally {
      setCarregando(false);
    }
  }

  // Função para baixar o PDF do backend
  async function baixarPDF() {
    try {
      const response = await api.get("/relatorios/pdf", {
        responseType: "blob", // Essencial para lidar com arquivos binários
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio-geral.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error: any) {

  console.error("ERRO PDF:", error);

  if (error.response) {
    console.log("STATUS:", error.response.status);
    console.log("DATA:", error.response.data);
  }

  alert(
    "Erro PDF: " + 
    (error.response?.status ?? "desconhecido")
  );

}
  }

  // Função para baixar a Planilha (Excel) do backend
  async function baixarExcel() {
    try {
      const response = await api.get("/relatorios/excel", {
        responseType: "blob", // Essencial para lidar com arquivos binários
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio-geral.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar a planilha.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (carregando) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen text-gray-500">
        Carregando relatórios...
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="p-8 text-center text-gray-500">
        Nenhum dado encontrado.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-slate-100 min-h-screen">
      {/* Cabeçalho com os Botões de Ação */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Relatórios</h1>
          <p className="text-gray-500 mt-1">Visão geral e estatísticas do sistema</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={baixarPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            📄 Baixar PDF
          </button>

          <button
            onClick={baixarExcel}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            📊 Baixar Planilha
          </button>
        </div>
      </div>

      {/* Cards do Resumo - Layout Responsivo Ajustado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card titulo="Total de Produtos" valor={dados.resumo.produtos} />
        <Card titulo="Total de Clientes" valor={dados.resumo.clientes} />
        <Card titulo="Total de Usuários" valor={dados.resumo.usuarios} />
        <Card titulo="Total de Vendas" valor={dados.resumo.vendas} />
        
        <Card 
          titulo="Valor em Estoque" 
          valor={dados.estoque.valorEstoque.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} 
        />
        <Card 
          titulo="Faturamento Hoje" 
          valor={dados.financeiro.faturamentoHoje.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} 
        />
        <Card 
          titulo="Faturamento do Mês" 
          valor={dados.financeiro.faturamentoMes.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} 
          spanCol={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bloco Estoque */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📦 Estoque</h2>

          <div className="flex gap-6 mb-5 text-sm">
            <p className="text-gray-600">
              Estoque Baixo: <strong className="text-amber-600 ml-1">{dados.estoque.estoqueBaixo}</strong>
            </p>
            <p className="text-gray-600">
              Sem Estoque: <strong className="text-red-600 ml-1">{dados.estoque.semEstoque}</strong>
            </p>
          </div>

          <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">
            Produtos com estoque baixo
          </h3>

          {dados.estoque.produtosBaixoEstoque.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum produto com estoque baixo.</p>
          ) : (
            <div className="space-y-3">
              {dados.estoque.produtosBaixoEstoque.map((produto, index) => (
                <div key={index} className="flex justify-between items-center border-b border-slate-100 pb-2 text-sm">
                  <span className="font-medium text-slate-800">{produto.nome}</span>
                  <span className="text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-md text-xs">
                    {produto.quantidade} / mín: {produto.estoqueMinimo}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bloco Financeiro */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">💰 Financeiro</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-gray-600">Vendas hoje:</span>
              <strong className="text-slate-800">{dados.financeiro.vendasHoje}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-gray-600">Vendas no mês:</span>
              <strong className="text-slate-800">{dados.financeiro.vendasMes}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-gray-600">Faturamento hoje:</span>
              <strong className="text-green-600 font-bold">
                {dados.financeiro.faturamentoHoje.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </strong>
            </div>

            <div className="flex justify-between pb-1">
              <span className="text-gray-600">Faturamento do mês:</span>
              <strong className="text-green-600 font-bold">
                {dados.financeiro.faturamentoMes.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Grid inferior: Últimas Vendas e Produtos Mais Vendidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimas Vendas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🛒 Últimas Vendas</h2>

          {dados.ultimasVendas.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma venda encontrada.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase">
                    <th className="text-left py-2 px-2">Cliente</th>
                    <th className="text-left py-2 px-2">Valor</th>
                    <th className="text-left py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dados.ultimasVendas.map((venda) => (
                    <tr key={venda.id} className="hover:bg-slate-50">
                      <td className="py-3 px-2 font-medium text-slate-800">{venda.cliente}</td>
                      <td className="py-3 px-2 text-slate-600">
                        {venda.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </td>
                      <td className="py-3 px-2 capitalize">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          venda.status === "concluida" || venda.status === "confirmada"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {venda.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Produtos mais vendidos */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📈 Produtos Mais Vendidos</h2>

          {dados.produtosMaisVendidos.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma venda registrada.</p>
          ) : (
            <div className="space-y-3">
              {dados.produtosMaisVendidos.map((produto, index) => (
                <div key={index} className="flex justify-between items-center border-b border-slate-100 pb-3 text-sm">
                  <span className="font-medium text-slate-800">
                    <span className="text-blue-600 font-bold mr-2">{index + 1}º</span> {produto.produto}
                  </span>
                  <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-md text-xs">
                    {produto.quantidade} un.
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  titulo,
  valor,
  spanCol = false,
}: {
  titulo: string;
  valor: any;
  spanCol?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-5 ${spanCol ? "sm:col-span-2 lg:col-span-1" : ""}`}>
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{titulo}</p>
      <h2 className="text-2xl font-bold text-slate-800 mt-2">{valor}</h2>
    </div>
  );
}