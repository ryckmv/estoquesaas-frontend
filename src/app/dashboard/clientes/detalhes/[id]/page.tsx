import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays, Mail, MapPin, Phone, ShoppingBag, UserRound } from "lucide-react";
import DemoActionButton from "@/components/demo/DemoActionButton";
import StatusBadge from "@/components/demo/StatusBadge";
import { customers, sales } from "@/mocks/data";
import { formatCurrency, formatDate } from "@/lib/formatters";

export function generateStaticParams() {
  return customers.map((customer) => ({ id: customer.id }));
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = customers.find((item) => item.id === id);
  if (!customer) notFound();
  const customerSales = sales.filter((sale) => sale.customerId === id);

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><Link href="/dashboard/clientes" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600"><ArrowLeft size={16} /> Voltar para clientes</Link><div className="mt-3 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">{customer.type === "Pessoa jurídica" ? <Building2 size={22} /> : <UserRound size={22} />}</div><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{customer.name}</h2><StatusBadge status={customer.status} /></div><p className="mt-1 text-sm text-slate-500">{customer.id} · Cliente desde {formatDate(customer.joinedAt)}</p></div></div></div>
        <div className="flex gap-2"><DemoActionButton iconName="edit" variant="secondary">Editar</DemoActionButton><DemoActionButton iconName="delete" variant="danger">Excluir</DemoActionButton></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.35fr]">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="font-bold text-slate-950">Dados cadastrais</h3>
          <dl className="mt-5 space-y-4"><Contact icon={Mail} label="E-mail" value={customer.email} /><Contact icon={Phone} label="Telefone" value={customer.phone} /><Contact icon={MapPin} label="Localização" value={`${customer.city} — ${customer.state}`} /><Contact icon={Building2} label={customer.type === "Pessoa jurídica" ? "CNPJ" : "CPF"} value={customer.document} /></dl>
        </section>
        <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-200">
          <p className="text-sm text-slate-400">Resumo do relacionamento</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3"><CustomerMetric icon={ShoppingBag} label="Total comprado" value={formatCurrency(customer.totalSpent)} /><CustomerMetric icon={CalendarDays} label="Pedidos" value={customer.purchases.toString()} /><CustomerMetric icon={CalendarDays} label="Última compra" value={formatDate(customer.lastPurchase)} /></div>
          <div className="mt-6 rounded-xl bg-white/7 p-4 ring-1 ring-white/10"><div className="flex items-center justify-between text-sm"><span className="text-slate-300">Perfil de recorrência</span><strong className="text-emerald-300">Cliente frequente</strong></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-4/5 rounded-full bg-emerald-400" /></div></div>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6"><h3 className="font-bold text-slate-950">Vendas recentes</h3><p className="mt-0.5 text-xs text-slate-500">Pedidos vinculados a este cliente</p></div>
        {customerSales.length ? <div className="overflow-x-auto"><table className="data-table w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50"><tr><th>Venda</th><th>Data</th><th>Itens</th><th>Pagamento</th><th>Status</th><th className="text-right">Total</th></tr></thead><tbody>{customerSales.map((sale) => <tr key={sale.id}><td><Link href={`/dashboard/vendas/${sale.id}`} className="font-semibold text-blue-600 hover:text-blue-700">{sale.id}</Link></td><td className="text-slate-600">{formatDate(sale.date)}</td><td className="text-slate-600">{sale.items.reduce((total, item) => total + item.quantity, 0)} produtos</td><td className="text-slate-600">{sale.paymentMethod}</td><td><StatusBadge status={sale.status} /></td><td className="text-right font-semibold">{formatCurrency(sale.total)}</td></tr>)}</tbody></table></div> : <p className="p-8 text-center text-sm text-slate-500">Nenhuma venda recente encontrada.</p>}
      </section>
    </div>
  );
}

function Contact({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return <div className="flex items-start gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon size={17} /></div><div><dt className="text-xs font-medium text-slate-500">{label}</dt><dd className="mt-0.5 text-sm font-semibold text-slate-800">{value}</dd></div></div>;
}

function CustomerMetric({ icon: Icon, label, value }: { icon: typeof ShoppingBag; label: string; value: string }) {
  return <div><Icon className="text-blue-300" size={19} /><p className="mt-3 text-xs text-slate-400">{label}</p><p className="mt-1 text-lg font-bold">{value}</p></div>;
}
