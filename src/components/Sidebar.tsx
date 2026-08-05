"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Menu,
  Package,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Produtos", href: "/dashboard/produtos", icon: Package },
  { label: "Estoque", href: "/dashboard/estoque", icon: Boxes },
  { label: "Clientes", href: "/dashboard/clientes", icon: Users },
  { label: "Vendas", href: "/dashboard/vendas", icon: ShoppingCart },
  { label: "Relatórios", href: "/dashboard/relatorios", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-hidden bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:static lg:w-64 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="relative border-b border-white/10 px-6 pb-6 pt-7">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 font-bold shadow-lg shadow-blue-600/25">
              ES
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">EstoqueSaaS</p>
              <p className="text-xs text-slate-400">Gestão inteligente</p>
            </div>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-amber-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
            DEMONSTRAÇÃO
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5" aria-label="Navegação principal">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-950/35" : "text-slate-300 hover:bg-white/7 hover:text-white"}`}
              >
                <Icon size={19} className={active ? "text-white" : "text-slate-400 group-hover:text-blue-300"} />
                {item.label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs font-semibold text-slate-200">Ambiente seguro</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">Dados fictícios. Nenhuma alteração é salva.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
