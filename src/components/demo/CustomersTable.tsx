"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, Eye, Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { customers } from "@/mocks/data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import DemoActionButton from "./DemoActionButton";
import EmptyState from "./EmptyState";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

export default function CustomersTable() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Todos");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return customers.filter((customer) => (!normalized || [customer.name, customer.email, customer.document, customer.city].some((value) => value.toLocaleLowerCase("pt-BR").includes(normalized))) && (type === "Todos" || customer.type === type));
  }, [query, type]);

  return (
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Relacionamento" title="Clientes" description="Consulte contatos, perfil e histórico de relacionamento com seus clientes." actions={<DemoActionButton icon={UserPlus}>Novo Cliente</DemoActionButton>} />
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row">
          <label className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, e-mail, documento ou cidade..." className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50" /></label>
          <select value={type} onChange={(event) => setType(event.target.value)} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none md:w-48"><option>Todos</option><option>Pessoa física</option><option>Pessoa jurídica</option></select>
        </div>
        <div className="border-b border-slate-100 px-5 py-3"><p className="text-xs text-slate-500"><strong className="text-slate-700">{filtered.length}</strong> clientes encontrados</p></div>
        {filtered.length === 0 ? <EmptyState /> : <div className="overflow-x-auto"><table className="data-table w-full min-w-[1000px] text-left text-sm"><thead className="bg-slate-50/80"><tr><th>Cliente</th><th>Tipo</th><th>Localização</th><th>Compras</th><th>Última compra</th><th>Status</th><th className="text-right">Ações</th></tr></thead><tbody>{filtered.map((customer) => <tr key={customer.id}><td><div className="flex items-center gap-3"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${customer.type === "Pessoa jurídica" ? "bg-violet-50 text-violet-600" : "bg-blue-50 text-blue-600"}`}>{customer.type === "Pessoa jurídica" ? <Building2 size={18} /> : <span className="text-xs font-bold">{customer.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</span>}</div><div><Link href={`/dashboard/clientes/detalhes/${customer.id}`} className="font-semibold text-slate-900 hover:text-blue-600">{customer.name}</Link><p className="mt-0.5 text-xs text-slate-400">{customer.email}</p></div></div></td><td className="text-slate-600">{customer.type}</td><td><p className="font-medium text-slate-700">{customer.city}</p><p className="text-xs text-slate-400">{customer.state}</p></td><td><p className="font-semibold text-slate-900">{formatCurrency(customer.totalSpent)}</p><p className="text-xs text-slate-400">{customer.purchases} pedidos</p></td><td className="text-slate-600">{formatDate(customer.lastPurchase)}</td><td><StatusBadge status={customer.status} /></td><td><div className="flex justify-end gap-1"><Link href={`/dashboard/clientes/detalhes/${customer.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600" aria-label={`Ver ${customer.name}`}><Eye size={17} /></Link><DemoActionButton icon={Pencil} variant="ghost" className="h-9 w-9 px-0"><span className="sr-only">Editar</span></DemoActionButton><DemoActionButton icon={Trash2} variant="ghost" className="h-9 w-9 px-0 text-red-500 hover:bg-red-50 hover:text-red-600"><span className="sr-only">Excluir</span></DemoActionButton></div></td></tr>)}</tbody></table></div>}
      </section>
    </div>
  );
}
