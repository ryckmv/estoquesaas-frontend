"use client";

import { useEffect, useState } from "react";
import { Building2, Users, Package, ShoppingCart } from "lucide-react";
import api from "@/services/api";

export default function MasterDashboard() {

  const [dados, setDados] = useState({
    empresas: 0,
    usuarios: 0,
    produtos: 0,
    vendas: 0,
  });


  useEffect(() => {

    async function carregar() {

      try {

        const resposta = await api.get("/master/dashboard");

        console.log("MASTER DASHBOARD:", resposta.data);

        setDados(resposta.data);

      } catch (erro) {

        console.error(
          "Erro dashboard master:",
          erro
        );

      }

    }


    carregar();

  }, []);



  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 w-full">

      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Dashboard Master
        </h1>

        <p className="text-gray-500 mt-2">
          Administração geral do Estoque SaaS
        </p>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">


        <Card
          titulo="Empresas"
          valor={String(dados.empresas)}
          icon={<Building2 size={28}/>}
        />


        <Card
          titulo="Usuários"
          valor={String(dados.usuarios)}
          icon={<Users size={28}/>}
        />


        <Card
          titulo="Produtos"
          valor={String(dados.produtos)}
          icon={<Package size={28}/>}
        />


        <Card
          titulo="Vendas"
          valor={String(dados.vendas)}
          icon={<ShoppingCart size={28}/>}
        />


      </div>


      <div className="mt-6 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-3">
          Área administrativa
        </h2>

        <p className="text-gray-600">
          Aqui o administrador do SaaS poderá controlar
          empresas, usuários, planos e configurações globais.
        </p>

      </div>


    </div>
  );
}



function Card({
  titulo,
  valor,
  icon,
}: {
  titulo:string;
  valor:string;
  icon:React.ReactNode;
}) {


  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500">
            {titulo}
          </p>


          <h2 className="text-3xl font-bold mt-2">
            {valor}
          </h2>

        </div>


        <div className="bg-blue-600 text-white p-4 rounded-xl">
          {icon}
        </div>


      </div>

    </div>

  );

}