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


interface ProdutoBaixoEstoque {

  nome: string;
  quantidade: number;
  estoqueMinimo: number;
  precoCusto: number;

}


interface DashboardData {

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

  ultimasVendas: Venda[];


  graficoVendas: {

    dia: string;
    vendas: number;
    faturamento: number;

  }[];


  produtosMaisVendidos: {

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

      <div className="flex items-center justify-center h-screen text-xl">

        Carregando...

      </div>

    );

  }



  if (!dados) {


    return (

      <div className="flex items-center justify-center h-screen">

        Nenhum dado encontrado.

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-slate-100 p-8">


      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>


        <p className="text-gray-500">

          Bem-vindo ao Estoque SaaS

        </p>


      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        <Card

          titulo="Produtos"

          valor={dados.resumo.produtos}

          icon={<Package size={28}/>}

          cor="bg-blue-600"

        />


        <Card

          titulo="Clientes"

          valor={dados.resumo.clientes}

          icon={<Users size={28}/>}

          cor="bg-green-600"

        />


        <Card

          titulo="Vendas"

          valor={dados.resumo.vendas}

          icon={<ShoppingCart size={28}/>}

          cor="bg-orange-500"

        />


        <Card

          titulo="Faturamento do Mês"

          valor={dados.financeiro.faturamentoMes.toLocaleString(

            "pt-BR",

            {

              style:"currency",

              currency:"BRL"

            }

          )}

          icon={<DollarSign size={28}/>}

          cor="bg-emerald-600"

        />


      </div>
            <div className="grid lg:grid-cols-2 gap-6 mt-8">


        <div className="bg-white rounded-xl shadow p-6">


          <h2 className="font-bold text-xl mb-5 flex items-center gap-2">

            <TrendingUp />

            Financeiro

          </h2>



          <div className="space-y-4">


            <Linha
              titulo="Vendas Hoje"
              valor={dados.financeiro.vendasHoje}
            />


            <Linha
              titulo="Vendas do Mês"
              valor={dados.financeiro.vendasMes}
            />


            <Linha
              titulo="Faturamento Hoje"
              valor={dados.financeiro.faturamentoHoje.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            />


            <Linha
              titulo="Faturamento do Mês"
              valor={dados.financeiro.faturamentoMes.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            />


          </div>


        </div>




        <div className="bg-white rounded-xl shadow p-6">


          <h2 className="font-bold text-xl mb-5 flex items-center gap-2">

            <AlertTriangle />

            Estoque

          </h2>



          <div className="space-y-4">


            <Linha
              titulo="Valor em Estoque"
              valor={dados.estoque.valorEstoque.toLocaleString(
                "pt-BR",
                {
                  style:"currency",
                  currency:"BRL"
                }
              )}
            />


            <Linha
              titulo="Produtos com Estoque Baixo"
              valor={dados.estoque.estoqueBaixo}
            />


            <Linha
              titulo="Produtos Sem Estoque"
              valor={dados.estoque.semEstoque}
            />


          </div>


        </div>


      </div>




      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">


        <GraficoFaturamento
          dados={dados.graficoVendas}
        />


        <GraficoVendas
          dados={dados.graficoVendas}
        />


      </div>




      <div className="mt-8">


        <AlertaEstoque

          produtos={dados.estoque.produtosBaixoEstoque ?? []}

        />


      </div>




      <div className="mt-8">


        <GraficoProdutosMaisVendidos

          dados={dados.produtosMaisVendidos ?? []}

        />


      </div>




      <div className="mt-8 bg-white rounded-xl shadow">


        <div className="border-b p-5">


          <h2 className="text-2xl font-bold">

            Últimas Vendas

          </h2>


        </div>



        <div className="overflow-x-auto">


          <table className="w-full">


            <thead className="bg-gray-50">


              <tr>

                <th className="text-left p-4">Cliente</th>
                <th className="text-left p-4">Usuário</th>
                <th className="text-left p-4">Valor</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Data</th>

              </tr>


            </thead>



            <tbody>


              {dados.ultimasVendas.map((venda)=>(


                <tr

                  key={venda.id}

                  className="border-b hover:bg-slate-50"

                >


                  <td className="p-4">

                    {venda.cliente}

                  </td>


                  <td className="p-4">

                    {venda.usuario}

                  </td>


                  <td className="p-4 font-semibold">


                    {venda.valor.toLocaleString(

                      "pt-BR",

                      {

                        style:"currency",

                        currency:"BRL"

                      }

                    )}


                  </td>


                  <td className="p-4">


                    <span

                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        
                        venda.status === "confirmada"

                        ? "bg-green-600"

                        : "bg-red-600"

                      }`}

                    >

                      {venda.status}

                    </span>


                  </td>



                  <td className="p-4">


                    {new Date(

                      venda.criadoEm

                    ).toLocaleDateString("pt-BR")}


                  </td>


                </tr>


              ))}


            </tbody>


          </table>


        </div>


      </div>



    </div>

  );

}




function Card({

  titulo,

  valor,

  icon,

  cor,

}:{

  titulo:string;

  valor:any;

  icon:React.ReactNode;

  cor:string;

}){


  return (

    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">


      <div className="flex justify-between items-center p-6">


        <div>


          <p className="text-gray-500">

            {titulo}

          </p>


          <h2 className="text-3xl font-bold mt-2">

            {valor}

          </h2>


        </div>



        <div className={`${cor} p-4 rounded-xl text-white`}>

          {icon}

        </div>



      </div>


    </div>

  );


}




function Linha({

  titulo,

  valor,

}:{

  titulo:string;

  valor:any;

}){


  return (

    <div className="flex justify-between border-b pb-2">


      <span className="text-gray-600">

        {titulo}

      </span>



      <span className="font-bold">

        {valor}

      </span>



    </div>

  );


}