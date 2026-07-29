"use client";

import { Building2, Users, Package, ShoppingCart } from "lucide-react";

export default function MasterDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard Master
        </h1>

        <p className="text-gray-500 mt-2">
          Administração geral do Estoque SaaS
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        <Card
          titulo="Empresas"
          valor="0"
          icon={<Building2 size={28} />}
        />


        <Card
          titulo="Usuários"
          valor="0"
          icon={<Users size={28} />}
        />


        <Card
          titulo="Produtos"
          valor="0"
          icon={<Package size={28} />}
        />


        <Card
          titulo="Vendas"
          valor="0"
          icon={<ShoppingCart size={28} />}
        />

      </div>


      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
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
  titulo: string;
  valor: string;
  icon: React.ReactNode;
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