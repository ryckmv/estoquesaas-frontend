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

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);


  useEffect(() => {

    async function carregar() {

      setCarregando(true);
      setErro(false);

      try {

        const resposta = await api.get("/master/dashboard");

        setDados(resposta.data);

      } catch (erro) {

        console.error(
          "Erro dashboard master:",
          erro
        );

        setErro(true);

      } finally {

        setCarregando(false);

      }

    }


    carregar();

  }, []);



  return (
    <div className="w-full">

      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Dashboard Master
        </h1>

        <p className="text-gray-500 mt-2">
          Administração geral do Estoque SaaS
        </p>

      </div>


      {erro && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">


        <Card
          titulo="Empresas"
          valor={String(dados.empresas)}
          icon={<Building2 size={28}/>}
          carregando={carregando}
        />


        <Card
          titulo="Usuários"
          valor={String(dados.usuarios)}
          icon={<Users size={28}/>}
          carregando={carregando}
        />


        <Card
          titulo="Produtos"
          valor={String(dados.produtos)}
          icon={<Package size={28}/>}
          carregando={carregando}
        />


        <Card
          titulo="Vendas"
          valor={String(dados.vendas)}
          icon={<ShoppingCart size={28}/>}
          carregando={carregando}
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
  carregando,
}: {
  titulo:string;
  valor:string;
  icon:React.ReactNode;
  carregando?: boolean;
}) {


  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500">
            {titulo}
          </p>


          {carregando ? (
            <div className="h-9 w-12 mt-2 bg-slate-200 rounded animate-pulse" />
          ) : (
            <h2 className="text-3xl font-bold mt-2">
              {valor}
            </h2>
          )}

        </div>


        <div className="bg-blue-600 text-white p-4 rounded-xl">
          {icon}
        </div>


      </div>

    </div>

  );

}