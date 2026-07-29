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


  const [dados, setDados] =
    useState<DashboardData | null>(null);


  const [carregando, setCarregando] =
    useState(true);



  useEffect(() => {


    async function carregar() {

      try {

        const response = await api.get("/dashboard");

        console.log("DASHBOARD:", response.data);

        setDados(response.data);


      } catch(error) {

        console.error(error);

        alert("Erro ao carregar dashboard");


      } finally {

        setCarregando(false);

      }

    }


    carregar();


  }, []);



  if(carregando){

    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );

  }



  if(!dados){

    return (
      <div className="flex items-center justify-center h-screen">
        Nenhum dado encontrado.
      </div>
    );

  }



  const faturamento =
    dados.financeiro?.faturamentoMes ??
    dados.financeiro?.faturamentoTotal ??
    0;



  return (

    <div className="min-h-screen bg-slate-100 p-8">


      <h1 className="text-4xl font-bold mb-2">
        Dashboard
      </h1>


      <p className="text-gray-500 mb-8">
        Bem-vindo ao Estoque SaaS
      </p>



      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        <Card
          titulo="Produtos"
          valor={dados.resumo?.produtos ?? 0}
          icon={<Package />}
        />


        <Card
          titulo="Clientes"
          valor={dados.resumo?.clientes ?? 0}
          icon={<Users />}
        />


        <Card
          titulo="Vendas"
          valor={dados.resumo?.vendas ?? 0}
          icon={<ShoppingCart />}
        />


        <Card
          titulo="Faturamento"
          valor={formatarMoeda(faturamento)}
          icon={<DollarSign />}
        />


      </div>




      <div className="grid lg:grid-cols-2 gap-6 mt-8">



        <Box titulo="Financeiro" icon={<TrendingUp />}>

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




        <Box titulo="Estoque" icon={<AlertTriangle />}>



          <Linha
            titulo="Valor Estoque"
            valor={formatarMoeda(
              dados.estoque?.valorEstoque ?? 0
            )}
          />


          <Linha
            titulo="Estoque Baixo"
            valor={
              dados.estoque?.estoqueBaixo ?? 0
            }
          />


          <Linha
            titulo="Sem Estoque"
            valor={
              dados.estoque?.semEstoque ?? 0
            }
          />



        </Box>


      </div>




      <div className="grid xl:grid-cols-2 gap-6 mt-8">


        <GraficoFaturamento
          dados={dados.graficoVendas ?? []}
        />


        <GraficoVendas
          dados={dados.graficoVendas ?? []}
        />


      </div>




      <div className="mt-8">


        <AlertaEstoque
          produtos={
            dados.estoque?.produtosBaixoEstoque ?? []
          }
        />


      </div>




      <div className="mt-8">


        <GraficoProdutosMaisVendidos
          dados={
            dados.produtosMaisVendidos ?? []
          }
        />


      </div>




    </div>

  );

}





function formatarMoeda(valor:number){

  return valor.toLocaleString(
    "pt-BR",
    {
      style:"currency",
      currency:"BRL"
    }
  );

}




function Card({
  titulo,
  valor,
  icon
}:{
  titulo:string;
  valor:any;
  icon:React.ReactNode;
}){


return (

<div className="bg-white rounded-xl shadow p-6">

<p className="text-gray-500">
{titulo}
</p>


<h2 className="text-3xl font-bold mt-2">
{valor}
</h2>


<div className="mt-3">
{icon}
</div>


</div>

);


}





function Box({
titulo,
icon,
children
}:{
titulo:string;
icon:React.ReactNode;
children:React.ReactNode;
}){


return (

<div className="bg-white rounded-xl shadow p-6">


<h2 className="font-bold text-xl mb-5 flex gap-2 items-center">
{icon}
{titulo}
</h2>


{children}


</div>

);


}





function Linha({
titulo,
valor
}:{
titulo:string;
valor:any;
}){


return (

<div className="flex justify-between border-b py-2">


<span>
{titulo}
</span>


<span className="font-bold">
{valor}
</span>


</div>

);


}