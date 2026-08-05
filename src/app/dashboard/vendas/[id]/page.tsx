import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CreditCard, MapPin, ShoppingCart, UserRound } from "lucide-react";
import DemoActionButton from "@/components/demo/DemoActionButton";
import StatusBadge from "@/components/demo/StatusBadge";
import { sales } from "@/mocks/data";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

export function generateStaticParams() {
  return sales.map((sale) => ({ id: sale.id }));
}

export default async function SaleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sale = sales.find((item) => item.id === id);
  if (!sale) notFound();

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><Link href="/dashboard/vendas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600"><ArrowLeft size={16} /> Voltar para vendas</Link><div className="mt-3 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Venda {sale.id}</h2><StatusBadge status={sale.status} /></div><p className="mt-1 text-sm text-slate-500">Registrada em {formatDateTime(sale.date)} por {sale.seller}</p></div>
        <div className="flex gap-2"><DemoActionButton iconName="edit" variant="secondary">Editar</DemoActionButton><DemoActionButton iconName="cancel" variant="danger">Cancelar venda</DemoActionButton></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6"><h3 className="font-bold text-slate-950">Itens vendidos</h3><p className="mt-0.5 text-xs text-slate-500">{sale.items.reduce((total, item) => total + item.quantity, 0)} unidades em {sale.items.length} produtos</p></div>
          <div className="overflow-x-auto"><table className="data-table w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50"><tr><th>Produto</th><th className="text-center">Qtd.</th><th className="text-right">Preço unitário</th><th className="text-right">Subtotal</th></tr></thead><tbody>{sale.items.map((item) => <tr key={item.productId}><td><Link href={`/dashboard/produtos/detalhes/${item.productId}`} className="font-semibold text-slate-900 hover:text-blue-600">{item.productName}</Link><p className="mt-0.5 text-xs text-slate-400">{item.productId}</p></td><td className="text-center font-medium">{item.quantity}</td><td className="text-right text-slate-600">{formatCurrency(item.unitPrice)}</td><td className="text-right font-semibold">{formatCurrency(item.subtotal)}</td></tr>)}</tbody></table></div>
          <div className="ml-auto max-w-sm space-y-3 border-t border-slate-100 p-5 text-sm sm:p-6"><div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatCurrency(sale.subtotal)}</span></div><div className="flex justify-between text-slate-500"><span>Desconto</span><span>− {formatCurrency(sale.discount)}</span></div><div className="flex justify-between border-t border-slate-100 pt-3 text-lg font-bold text-slate-950"><span>Total</span><span className="text-blue-600">{formatCurrency(sale.total)}</span></div></div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-200"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><UserRound size={20} /></div><div><p className="text-xs text-slate-400">Cliente</p><Link href={`/dashboard/clientes/detalhes/${sale.customerId}`} className="font-bold hover:text-blue-300">{sale.customerName}</Link></div></div><div className="mt-6 space-y-4 border-t border-white/10 pt-5"><Info icon={CreditCard} label="Forma de pagamento" value={sale.paymentMethod} /><Info icon={MapPin} label="Canal de venda" value={sale.channel} /><Info icon={CalendarDays} label="Data e hora" value={formatDateTime(sale.date)} /></div></section>
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-start gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><ShoppingCart size={19} /></div><div><h3 className="font-semibold text-slate-900">Venda registrada</h3><p className="mt-1 text-sm leading-6 text-slate-500">Todos os dados exibidos são fictícios e foram preparados para esta demonstração.</p></div></div></section>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof CreditCard; label: string; value: string }) {
  return <div className="flex gap-3"><Icon className="mt-0.5 shrink-0 text-slate-500" size={17} /><div><p className="text-xs text-slate-500">{label}</p><p className="mt-0.5 text-sm font-semibold text-slate-200">{value}</p></div></div>;
}
