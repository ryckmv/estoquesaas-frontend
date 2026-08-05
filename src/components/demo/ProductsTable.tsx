"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Filter, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { products, productCategories } from "@/mocks/data";
import { formatCurrency } from "@/lib/formatters";
import DemoActionButton from "./DemoActionButton";
import EmptyState from "./EmptyState";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

export default function ProductsTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [status, setStatus] = useState("Todos");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return products.filter((product) => {
      const matchesQuery = !normalizedQuery || [product.name, product.sku, product.barcode].some((value) => value.toLocaleLowerCase("pt-BR").includes(normalizedQuery));
      return matchesQuery && (category === "Todas" || product.category === category) && (status === "Todos" || product.status === status);
    });
  }, [category, query, status]);

  return (
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Catálogo" title="Produtos" description="Consulte preços, categorias e disponibilidade de todo o catálogo." actions={<DemoActionButton icon={Plus}>Novo Produto</DemoActionButton>} />

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, SKU ou código de barras..." className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50" />
          </label>
          <div className="grid grid-cols-2 gap-3 lg:flex">
            <label className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 lg:w-44"><option>Todas</option>{productCategories.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 lg:w-40"><option>Todos</option><option>Disponível</option><option>Estoque baixo</option><option>Sem estoque</option></select>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-500 sm:px-5">
          <span><strong className="text-slate-700">{filtered.length}</strong> produtos encontrados</span>
          <span className="hidden sm:inline">Dados atualizados em 04 ago. 2026</span>
        </div>

        {filtered.length === 0 ? <EmptyState /> : (
          <div className="overflow-x-auto">
            <table className="data-table w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-50/80"><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Status</th><th className="text-right">Ações</th></tr></thead>
              <tbody>{filtered.map((product) => (
                <tr key={product.id}>
                  <td><div className="flex items-center gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">{product.name.split(" ").slice(0, 2).map((word) => word[0]).join("")}</div><div><Link href={`/dashboard/produtos/detalhes/${product.id}`} className="font-semibold text-slate-900 hover:text-blue-600">{product.name}</Link><p className="mt-0.5 text-xs text-slate-400">{product.sku}</p></div></div></td>
                  <td className="text-slate-600">{product.category}</td>
                  <td className="font-semibold text-slate-900">{formatCurrency(product.salePrice)}</td>
                  <td><p className="font-semibold text-slate-800">{product.stock} {product.unit.toLowerCase()}.</p><p className="text-xs text-slate-400">mín. {product.minimumStock}</p></td>
                  <td><StatusBadge status={product.status} /></td>
                  <td><div className="flex justify-end gap-1"><Link href={`/dashboard/produtos/detalhes/${product.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600" aria-label={`Ver ${product.name}`}><Eye size={17} /></Link><DemoActionButton icon={Pencil} variant="ghost" className="h-9 w-9 px-0 [&>svg]:shrink-0"><span className="sr-only">Editar</span></DemoActionButton><DemoActionButton icon={Trash2} variant="ghost" className="h-9 w-9 px-0 text-red-500 hover:bg-red-50 hover:text-red-600"><span className="sr-only">Excluir</span></DemoActionButton></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
