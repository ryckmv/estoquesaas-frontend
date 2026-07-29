"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePermissao } from "@/hooks/usePermissao";

import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Paperclip,
  Building2,
  ShieldCheck,
} from "lucide-react";

const menus = [
  {
    nome: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    nome: "Produtos",
    href: "/dashboard/produtos",
    icon: Package,
    permissao: ["admin", "gerente", "funcionario"],
  },
  {
    nome: "Estoque",
    href: "/dashboard/estoque",
    icon: Package,
    permissao: ["admin", "gerente", "funcionario"],
  },
  {
    nome: "Clientes",
    href: "/dashboard/clientes",
    icon: Users,
    permissao: ["admin", "gerente", "funcionario"],
  },
  {
    nome: "Vendas",
    href: "/dashboard/vendas",
    icon: ShoppingCart,
    permissao: ["admin", "gerente", "funcionario"],
  },
  {
    nome: "Usuários",
    href: "/dashboard/usuarios",
    icon: UserCog,
    permissao: ["admin"],
  },
  {
    nome: "Relatórios",
    href: "/dashboard/relatorios",
    icon: BarChart3,
    permissao: ["admin", "gerente"],
  },
  {
    nome: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
    permissao: ["admin", "gerente"],
  },
  {
    nome: "Auditoria",
    href: "/dashboard/auditoria",
    icon: Paperclip,
    permissao: ["admin", "gerente"],
  },
];
const menusMaster = [
  {
    nome: "Dashboard Master",
    href: "/master",
    icon: LayoutDashboard,
  },
  {
    nome: "Empresas",
    href: "/master/empresas",
    icon: Building2,
  },
  {
    nome: "Usuários",
    href: "/master/usuarios",
    icon: Users,
  },
  {
    nome: "Auditoria Sistema",
    href: "/master/auditoria",
    icon: ShieldCheck,
  },
];

export default function Sidebar() {
  const {
    role,
    isAdmin,
    isGerente,
    isFuncionario,
  } = usePermissao();

  const pathname = usePathname();
  const router = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    router.push("/login");
  }

  function podeVer(menu: any) {
    if (!menu.permissao) return true;

    if (isAdmin) return menu.permissao.includes("admin");

    if (isGerente)
      return menu.permissao.includes("gerente");

    if (isFuncionario)
      return menu.permissao.includes("funcionario");

    return false;
  }

  return (
    <>
      {/* Botão Mobile */}

      <button
        onClick={() => setMenuAberto(true)}
        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-50
          bg-slate-900
          text-white
          p-2
          rounded-lg
          shadow-lg
        "
      >
        <Menu size={24} />
      </button>

      {/* Fundo escuro */}

      {menuAberto && (
        <div
          onClick={() => setMenuAberto(false)}
          className="
            lg:hidden
            fixed
            inset-0
            bg-black/40
            z-40
          "
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-slate-900
          text-white
          flex
          flex-col
          z-50
          transition-transform
          duration-300

          ${
            menuAberto
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">

          <div>

            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
              ES
            </div>

            <h1 className="text-xl font-bold mt-4">
              Estoque SaaS
            </h1>

            <p className="text-slate-400 text-sm">
              Sistema de Gestão
            </p>

          </div>

          <button
            onClick={() => setMenuAberto(false)}
            className="lg:hidden"
          >
            <X />
          </button>

        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
               {role === "master"
  ? menusMaster.map((menu) => {
      const Icon = menu.icon;

      const ativo =
        pathname === menu.href ||
        pathname.startsWith(menu.href + "/");

      return (
        <Link
          key={menu.href}
          href={menu.href}
          className={`
            flex
            items-center
            gap-3
            px-6
            py-3
            transition
            ${
              ativo
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <Icon size={20} />
          <span>{menu.nome}</span>
        </Link>
      );
    })
  : menus
      .filter((menu) => podeVer(menu))
      .map((menu) => {
          const Icon = menu.icon;

          const ativo =
            pathname === menu.href ||
            pathname.startsWith(menu.href + "/");

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                flex
                items-center
                gap-3
                px-6
                py-3
                transition
                ${
                  ativo
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <Icon size={20} />
              <span>{menu.nome}</span>
            </Link>
          );
        })
}
        </nav>

        <div className="border-t border-slate-700 p-4">

          <button
            onClick={sair}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-3
              rounded-lg
              text-red-400
              hover:bg-slate-800
              hover:text-red-300
              transition
            "
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>

        </div>

      </aside>
    </>
  );
}