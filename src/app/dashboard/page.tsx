import Link from "next/link";
import { AlertTriangle, ArrowRight, Boxes, CircleDollarSign, Package, ShoppingCart, TrendingUp, Warehouse } from "lucide-react";
import ChartCard from "@/components/demo/ChartCard";
import { RevenueAreaChart, SalesBarChart } from "@/components/demo/Charts";
import MetricCard from "@/components/demo/MetricCard";
import StatusBadge from "@/components/demo/StatusBadge";
import { products, revenueByDay, sales, salesByMonth, topProducts } from "@/mocks/data";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

export default function DashboardPage() {
  const lowStock = products.filter((product) => product.status === "Estoque baixo");
  const outOfStock = products.filter((product) => product.status === "Sem estoque");
  const inventoryValue = products.reduce((total, product) => total + product.stock * product.costPrice, 0);

  return (
    <div className="page-enter space-y-6">
      <section className="overflow-hidden rounded-2xl bg-slate-950 px-6 py-6 text-white shadow-xl shadow-slate-200 sm:px-8 sm:py-7">
        <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Operação atualizada agora
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Bom dia! Sua operação está no ritmo certo.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Veja os destaques de hoje e identifique rapidamente onde sua atenção pode gerar mais resultado.</p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-400">Meta mensal</p>
              <p className="mt-1 font-bold">82% atingida</p>
            </div>
            <div className="rounded-xl bg-blue-500/15 px-4 py-3 ring-1 ring-blue-400/20">
              <p className="text-xs text-blue-200">Crescimento</p>
              <p className="mt-1 font-bold text-blue-100">+16,2%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard label="Produtos cadastrados" value={products.length} icon={Package} tone="blue" trend="8,3%" />
        <MetricCard label="Estoque baixo" value={lowStock.length} icon={AlertTriangle} tone="amber" />
        <MetricCard label="Sem estoque" value={outOfStock.length} icon={Boxes} tone="red" />
        <MetricCard label="Valor do estoque" value={formatCurrency(inventoryValue)} icon={Warehouse} tone="violet" trend="5,4%" />
        <MetricCard label="Faturamento do mês" value={formatCurrency(57720)} icon={CircleDollarSign} tone="emerald" trend="16,2%" />
        <MetricCard label="Vendas do dia" value={sales.filter((sale) => sale.date.startsWith("2026-08-04")).length} icon={ShoppingCart} tone="blue" trend="12,5%" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <ChartCard title="Faturamento nos últimos 7 dias" description="Receita confirmada por dia" insight="+14,8% na semana">
          <RevenueAreaChart data={revenueByDay} />
        </ChartCard>
        <ChartCard title="Volume de vendas" description="Evolução dos últimos 6 meses">
          <SalesBarChart data={salesByMonth} />
        </ChartCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <div><h3 className="font-bold text-slate-950">Últimas vendas</h3><p className="mt-0.5 text-xs text-slate-500">Movimentações comerciais recentes</p></div>
            <Link href="/dashboard/vendas" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">Ver todas <ArrowRight size={14} /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50/80"><tr><th>Venda</th><th>Cliente</th><th>Data</th><th>Status</th><th className="text-right">Total</th></tr></thead>
              <tbody>{sales.slice(0, 5).map((sale) => <tr key={sale.id}><td><Link href={`/dashboard/vendas/${sale.id}`} className="font-semibold text-blue-600 hover:text-blue-700">{sale.id}</Link></td><td className="font-medium text-slate-800">{sale.customerName}</td><td className="text-slate-500">{formatDateTime(sale.date)}</td><td><StatusBadge status={sale.status} /></td><td className="text-right font-semibold text-slate-900">{formatCurrency(sale.total)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between"><div><h3 className="font-bold text-slate-950">Produtos mais vendidos</h3><p className="mt-0.5 text-xs text-slate-500">Ranking do mês atual</p></div><TrendingUp className="text-emerald-500" size={20} /></div>
          <div className="mt-5 space-y-4">{topProducts.map((product, index) => <div key={product.name} className="flex items-center gap-3"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${index === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>{index + 1}</span><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><p className="truncate text-sm font-semibold text-slate-800">{product.name}</p><p className="text-xs font-bold text-slate-900">{product.quantity} un.</p></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${(product.quantity / topProducts[0].quantity) * 100}%` }} /></div></div></div>)}</div>
        </div>
      </section>
    </div>
  );
}
