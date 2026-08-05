"use client";

import { Bell, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { CRUZ_SYSTEMS_DEMO_URL } from "@/lib/constants";

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Visão geral", subtitle: "Acompanhe os principais números da sua operação" },
  "/dashboard/produtos": { title: "Produtos", subtitle: "Catálogo, preços e disponibilidade" },
  "/dashboard/estoque": { title: "Estoque", subtitle: "Movimentações, saldos e alertas" },
  "/dashboard/clientes": { title: "Clientes", subtitle: "Relacionamento e histórico de compras" },
  "/dashboard/vendas": { title: "Vendas", subtitle: "Pedidos, itens e recebimentos" },
  "/dashboard/relatorios": { title: "Relatórios", subtitle: "Indicadores para decisões mais rápidas" },
};

export default function Header() {
  const pathname = usePathname();
  const baseRoute = Object.keys(routeTitles)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(`${route}/`));
  const current = routeTitles[baseRoute ?? "/dashboard"];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-h-12 items-center justify-between gap-4 pl-12 lg:pl-0">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{current.title}</h1>
          <p className="hidden truncate text-xs text-slate-500 sm:block">{current.subtitle}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-amber-700 md:inline-flex">
            DEMONSTRAÇÃO
          </span>
          <button type="button" className="relative hidden h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 sm:grid" aria-label="Notificações">
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
          </button>
          <a
            href={CRUZ_SYSTEMS_DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md sm:px-4 sm:text-sm"
          >
            <span className="hidden xs:inline">Conhecer a versão completa</span>
            <span className="xs:hidden">Versão completa</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
