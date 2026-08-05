"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowDownToLine, ArrowUpFromLine, Boxes, Plus, Search, SlidersHorizontal } from "lucide-react";
import { products, stockMovements } from "@/mocks/data";
import { formatCurrency, formatDateTime } from "@/lib/formatters";
import DemoActionButton from "./DemoActionButton";
import EmptyState from "./EmptyState";
import MetricCard from "./MetricCard";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

export default function StockView() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Todos");
  const critical = products.filter((product) => product.status !== "Disponível");
  const inventoryValue = products.reduce((total, product) => total + product.stock * product.costPrice, 0);
  const totalUnits = products.reduce((total, product) => total + product.stock, 0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return stockMovements.filter((movement) => (!normalized || [movement.productName, movement.reason, movement.id].some((value) => value.toLocaleLowerCase("pt-BR").includes(normalized))) && (type === "Todos" || movement.type === type));
  }, [query, type]);

  return (
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Controle operacional" title="Estoque" description="Acompanhe saldos, alertas e todo o histórico de movimentações." actions={<DemoActionButton icon={Plus}>Nova Movimentação</DemoActionButton>} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Unidades em estoque" value={totalUnits} icon={Boxes} tone="blue" />
        <MetricCard label="Valor de custo" value={formatCurrency(inventoryValue)} icon={Boxes} tone="violet" trend="5,4%" />
        <MetricCard label="Entradas recentes" value={stockMovements.filter((item) => item.type === "Entrada").length} icon={ArrowDownToLine} tone="emerald" />
        <MetricCard label="Saídas recentes" value={stockMovements.filter((item) => item.type === "Saída").length} icon={ArrowUpFromLine} tone="red" />
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div className="flex items-start gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700"><AlertTriangle size={20} /></div><div><h3 className="font-bold text-slate-950">{critical.length} produtos precisam de atenção</h3><p className="mt-1 text-sm text-slate-600">Revise os itens abaixo para evitar rupturas nas próximas vendas.</p></div></div><span className="text-xs font-semibold text-amber-700">Atualizado agora</span></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{critical.map((product) => <Link key={product.id} href={`/dashboard/produtos/detalhes/${product.id}`} className="rounded-xl border border-amber-200/80 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"><div className="flex items-start justify-between gap-2"><p className="text-sm font-semibold leading-5 text-slate-850">{product.name}</p><StatusBadge status={product.status} /></div><div className="mt-4 flex items-end justify-between"><div><p className="text-[11px] text-slate-400">Saldo atual</p><p className="text-lg font-bold text-slate-950">{product.stock} un.</p></div><p className="text-xs text-slate-500">mín. {product.minimumStock}</p></div></Link>)}</div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row">
          <label className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produto, motivo ou código..." className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50" /></label>
          <label className="relative"><SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><select value={type} onChange={(event) => setType(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium text-slate-700 outline-none md:w-44"><option>Todos</option><option>Entrada</option><option>Saída</option><option>Ajuste</option></select></label>
        </div>
        <div className="border-b border-slate-100 px-5 py-3"><p className="text-xs text-slate-500"><strong className="text-slate-700">{filtered.length}</strong> movimentações no histórico</p></div>
        {filtered.length === 0 ? <EmptyState /> : <div className="overflow-x-auto"><table className="data-table w-full min-w-[950px] text-left text-sm"><thead className="bg-slate-50/80"><tr><th>Data e hora</th><th>Produto</th><th>Tipo</th><th>Quantidade</th><th>Motivo</th><th>Responsável</th><th className="text-right">Saldo</th></tr></thead><tbody>{filtered.map((movement) => <tr key={movement.id}><td><p className="font-medium text-slate-700">{formatDateTime(movement.date)}</p><p className="mt-0.5 text-xs text-slate-400">{movement.id}</p></td><td><Link href={`/dashboard/produtos/detalhes/${movement.productId}`} className="font-semibold text-slate-900 hover:text-blue-600">{movement.productName}</Link></td><td><StatusBadge status={movement.type} /></td><td className={`font-bold ${movement.type === "Entrada" ? "text-emerald-600" : movement.type === "Saída" ? "text-red-600" : "text-blue-600"}`}>{movement.type === "Entrada" ? "+" : movement.type === "Saída" ? "−" : "±"}{movement.quantity}</td><td className="text-slate-600">{movement.reason}</td><td className="text-slate-600">{movement.responsible}</td><td className="text-right font-semibold text-slate-900">{movement.balanceAfter} un.</td></tr>)}</tbody></table></div>}
      </section>
    </div>
  );
}
