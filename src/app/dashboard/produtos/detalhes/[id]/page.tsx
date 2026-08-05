import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Barcode, Boxes, CalendarClock, Tag, Truck } from "lucide-react";
import DemoActionButton from "@/components/demo/DemoActionButton";
import StatusBadge from "@/components/demo/StatusBadge";
import { products, stockMovements } from "@/mocks/data";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  const movements = stockMovements.filter((movement) => movement.productId === id);

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><Link href="/dashboard/produtos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-600"><ArrowLeft size={16} /> Voltar para produtos</Link><div className="mt-3 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{product.name}</h2><StatusBadge status={product.status} /></div><p className="mt-1 text-sm text-slate-500">{product.id} · {product.sku}</p></div>
        <div className="flex gap-2"><DemoActionButton iconName="edit" variant="secondary">Editar</DemoActionButton><DemoActionButton iconName="delete" variant="danger">Excluir</DemoActionButton></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="font-bold text-slate-950">Informações do produto</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <Detail icon={Tag} label="Categoria" value={product.category} />
            <Detail icon={Barcode} label="Código de barras" value={product.barcode} />
            <Detail icon={Truck} label="Fornecedor" value={product.supplier} />
            <Detail icon={CalendarClock} label="Última atualização" value={formatDateTime(product.updatedAt)} />
          </dl>
          <div className="mt-6 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
            <Value label="Preço de custo" value={formatCurrency(product.costPrice)} />
            <Value label="Preço de venda" value={formatCurrency(product.salePrice)} highlight />
            <Value label="Margem estimada" value={`${(((product.salePrice - product.costPrice) / product.salePrice) * 100).toFixed(1)}%`} />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-200">
          <div className="flex items-start justify-between"><div><p className="text-sm text-slate-400">Saldo atual</p><p className="mt-2 text-4xl font-bold">{product.stock} <span className="text-base font-medium text-slate-400">{product.unit.toLowerCase()}.</span></p></div><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><Boxes size={22} /></div></div>
          <div className="mt-8"><div className="flex justify-between text-xs text-slate-400"><span>Nível de estoque</span><span>Mínimo: {product.minimumStock}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${product.stock === 0 ? "bg-red-500" : product.stock <= product.minimumStock ? "bg-amber-400" : "bg-emerald-400"}`} style={{ width: `${Math.min(100, (product.stock / Math.max(product.minimumStock * 3, 1)) * 100)}%` }} /></div></div>
          <p className="mt-6 text-sm leading-6 text-slate-300">Valor de custo imobilizado: <strong className="text-white">{formatCurrency(product.stock * product.costPrice)}</strong></p>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6"><h3 className="font-bold text-slate-950">Movimentações recentes</h3><p className="mt-0.5 text-xs text-slate-500">Histórico relacionado a este produto</p></div>
        {movements.length ? <div className="overflow-x-auto"><table className="data-table w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50"><tr><th>Data</th><th>Tipo</th><th>Motivo</th><th>Responsável</th><th className="text-right">Saldo</th></tr></thead><tbody>{movements.map((movement) => <tr key={movement.id}><td className="text-slate-500">{formatDateTime(movement.date)}</td><td><StatusBadge status={movement.type} /></td><td className="font-medium text-slate-800">{movement.reason}</td><td className="text-slate-600">{movement.responsible}</td><td className="text-right font-semibold">{movement.balanceAfter} un.</td></tr>)}</tbody></table></div> : <p className="p-8 text-center text-sm text-slate-500">Nenhuma movimentação recente para este produto.</p>}
      </section>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof Tag; label: string; value: string }) {
  return <div className="flex gap-3 rounded-xl bg-slate-50 p-4"><Icon className="mt-0.5 shrink-0 text-slate-400" size={18} /><div><dt className="text-xs font-medium text-slate-500">{label}</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{value}</dd></div></div>;
}

function Value({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div><dt className="text-xs font-medium text-slate-500">{label}</dt><dd className={`mt-1 text-xl font-bold ${highlight ? "text-blue-600" : "text-slate-950"}`}>{value}</dd></div>;
}
