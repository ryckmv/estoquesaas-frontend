"use client";

import { Building2, Users, Package, ShoppingCart } from "lucide-react";

export default function MasterDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Dashboard Master
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">
          Administração geral do Estoque SaaS
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
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

      <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Área administrativa
        </h2>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-gray-500 text-sm sm:text-base truncate">
            {titulo}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 truncate">
            {valor}
          </h2>
        </div>

        <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-xl shrink-0 shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}