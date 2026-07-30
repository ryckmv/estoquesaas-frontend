"use client";

import { Package, Users, ShoppingCart, Boxes } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardFuncionario() {
  const router = useRouter();

  const cards = [
    {
      titulo: "Produtos",
      descricao: "Consultar e gerenciar produtos.",
      icone: Package,
      rota: "/dashboard/produtos",
      cor: "bg-blue-600",
    },
    {
      titulo: "Clientes",
      descricao: "Consultar clientes cadastrados.",
      icone: Users,
      rota: "/dashboard/clientes",
      cor: "bg-green-600",
    },
    {
      titulo: "Vendas",
      descricao: "Registrar e consultar vendas.",
      icone: ShoppingCart,
      rota: "/dashboard/vendas",
      cor: "bg-orange-500",
    },
    {
      titulo: "Estoque",
      descricao: "Movimentações e controle de estoque.",
      icone: Boxes,
      rota: "/dashboard/estoque",
      cor: "bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Dashboard do Funcionário
        </h1>

        <p className="text-slate-500 mt-2">
          Bem-vindo! Escolha uma das opções abaixo para continuar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icone = card.icone;

          return (
            <button
              key={card.titulo}
              onClick={() => router.push(card.rota)}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 p-6 text-left"
            >
              <div
                className={`w-14 h-14 rounded-xl ${card.cor} flex items-center justify-center text-white mb-4`}
              >
                <Icone size={28} />
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                {card.titulo}
              </h2>

              <p className="text-slate-500 mt-2">
                {card.descricao}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}