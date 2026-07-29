"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, User, Shield, Palette, Settings } from "lucide-react";
import type { ReactNode } from "react";

export default function ConfiguracoesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const menus = [
    { nome: "Empresa", href: "/dashboard/configuracoes", icon: Building2 },
    { nome: "Conta", href: "/dashboard/configuracoes/conta", icon: User },
    { nome: "Segurança", href: "/dashboard/configuracoes/seguranca", icon: Shield },
    { nome: "Aparência", href: "/dashboard/configuracoes/aparencia", icon: Palette },
    { nome: "Sistema", href: "/dashboard/configuracoes/sistema", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gerencie as configurações do sistema
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
          {/* Abas com a linha alinhada exatamente como na referência */}
          <div className="flex border-b border-gray-200 px-6 gap-8">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const ativo = pathname === menu.href;

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition -mb-[1px] ${
                    ativo
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  {menu.nome}
                </Link>
              );
            })}
          </div>

          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}