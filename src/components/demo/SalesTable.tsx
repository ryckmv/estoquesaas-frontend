"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CircleDollarSign, Eye, Plus, Search, ShoppingBag, TrendingUp } from "lucide-react";
import { sales } from "@/mocks/data";
import { formatCurrency, formatDateTime } from "@/lib/formatters";
import DemoActionButton from "./DemoActionButton";
import EmptyState from "./EmptyState";
import MetricCard from "./MetricCard";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

export default function SalesTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Todos");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return sales.filter((sale) => (!normalized || [sale.id, sale.customerName, sale.paymentMethod].some((value) => value.toLocaleLowerCase("pt-BR").includes(normalized))) && (status === "Todos" || sale.status === status));
  }, [query, status]);
  const completed = sales.filter((sale) => sale.status === "Concluída");
  const revenue = completed.reduce((total, sale) => total + sale.total, 0);
  const averageTicket = revenue / completed.length;

  return (
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Comercial" title="Vendas" description="Acompanhe pedidos, pagamentos, itens vendidos e status de cada negociação." actions={<DemoActionButton icon={Plus}>Nova Venda</DemoActionButton>} />
      <section className="grid gap-4 sm:grid-cols-3"><MetricCard label="Vendas no período" value={sales.length} icon={ShoppingBag} tone="blue" trend="12,5%" /><MetricCard label="Receita confirmada" value={formatCurrency(revenue)} icon={CircleDollarSign} tone="emerald" trend="16,2%" /><MetricCard label="Ticket médio" value={formatCurrency(averageTicket)} icon={TrendingUp} tone="violet" trend="3,8%" /></section>
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row"><label className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por venda, cliente ou pagamento..." className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50" /></label><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none md:w-44"><option>Todos</option><option>Concluída</option><option>Pendente</option><option>Cancelada</option></select></div>
        <div className="border-b border-slate-100 px-5 py-3"><p className="text-xs text-slate-500"><strong className="text-slate-700">{filtered.length}</strong> vendas encontradas</p></div>
        {filtered.length === 0 ? <EmptyState /> : <div className="overflow-x-auto"><table className="data-table w-full min-w-[1000px] text-left text-sm"><thead className="bg-slate-50/80"><tr><th>Venda</th><th>Cliente</th><th>Data</th><th>Itens</th><th>Pagamento</th><th>Status</th><th className="text-right">Total</th><th className="text-right">Detalhes</th></tr></thead><tbody>{filtered.map((sale) => <tr key={sale.id}><td><Link href={`/dashboard/vendas/${sale.id}`} className="font-semibold text-blue-600 hover:text-blue-700">{sale.id}</Link><p className="mt-0.5 text-xs text-slate-400">{sale.channel}</p></td><td className="font-medium text-slate-800">{sale.customerName}</td><td className="text-slate-600">{formatDateTime(sale.date)}</td><td><p className="font-medium text-slate-700">{sale.items.reduce((total, item) => total + item.quantity, 0)} unidades</p><p className="text-xs text-slate-400">{sale.items.length} produtos</p></td><td className="text-slate-600">{sale.paymentMethod}</td><td><StatusBadge status={sale.status} /></td><td className="text-right font-bold text-slate-900">{formatCurrency(sale.total)}</td><td><div className="flex justify-end"><Link href={`/dashboard/vendas/${sale.id}`} className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"><Eye size={16} /> Ver venda</Link></div></td></tr>)}</tbody></table></div>}
      </section>
    </div>
  );
}
