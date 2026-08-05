import { Boxes, CircleDollarSign, Percent, ReceiptText, RefreshCcw } from "lucide-react";
import ChartCard from "@/components/demo/ChartCard";
import { CategoryPieChart, pieColors, RevenueAreaChart, SalesBarChart } from "@/components/demo/Charts";
import MetricCard from "@/components/demo/MetricCard";
import PageHeader from "@/components/demo/PageHeader";
import { reportCategories, reportSummary, revenueByDay, salesByMonth, topProducts } from "@/mocks/data";
import { formatCurrency } from "@/lib/formatters";

export default function ReportsPage() {
  return (
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Inteligência do negócio" title="Relatórios" description="Uma leitura consolidada do desempenho comercial e da eficiência do estoque." actions={<div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Agosto de 2026</div>} />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Faturamento" value={formatCurrency(reportSummary.monthRevenue)} icon={CircleDollarSign} tone="emerald" trend="16,2%" />
        <MetricCard label="Ticket médio" value={formatCurrency(reportSummary.averageTicket)} icon={ReceiptText} tone="blue" trend="3,8%" />
        <MetricCard label="Margem bruta" value={`${reportSummary.grossMargin}%`} icon={Percent} tone="violet" trend="2,1%" />
        <MetricCard label="Giro de estoque" value={`${reportSummary.inventoryTurnover}x`} icon={RefreshCcw} tone="amber" trend="6,2%" />
        <MetricCard label="Categorias ativas" value={reportCategories.length} icon={Boxes} tone="blue" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <ChartCard title="Evolução do faturamento" description="Receita diária no período selecionado" insight="Melhor dia: 04 ago"><RevenueAreaChart data={revenueByDay} /></ChartCard>
        <ChartCard title="Faturamento por categoria" description="Participação na receita do mês"><div className="grid items-center md:grid-cols-[1fr_0.9fr] xl:grid-cols-1 2xl:grid-cols-[1fr_0.9fr]"><CategoryPieChart data={reportCategories} /><div className="space-y-3">{reportCategories.map((category, index) => <div key={category.name} className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[index] }} /><span className="flex-1 text-sm text-slate-600">{category.name}</span><strong className="text-sm text-slate-900">{category.share}%</strong></div>)}</div></div></ChartCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.35fr]">
        <ChartCard title="Vendas por mês" description="Volume de pedidos confirmados"><SalesBarChart data={salesByMonth} /></ChartCard>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4 sm:px-6"><h3 className="font-bold text-slate-950">Desempenho por produto</h3><p className="mt-0.5 text-xs text-slate-500">Itens com maior volume no mês</p></div><div className="overflow-x-auto"><table className="data-table w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50"><tr><th>Posição</th><th>Produto</th><th className="text-right">Unidades</th><th className="text-right">Receita</th><th className="text-right">Participação</th></tr></thead><tbody>{topProducts.map((product, index) => <tr key={product.name}><td><span className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold ${index === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>{index + 1}</span></td><td className="font-semibold text-slate-800">{product.name}</td><td className="text-right text-slate-600">{product.quantity}</td><td className="text-right font-semibold">{formatCurrency(product.revenue)}</td><td className="text-right text-slate-600">{Math.round((product.revenue / reportSummary.monthRevenue) * 100)}%</td></tr>)}</tbody></table></div></div>
      </section>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-sm text-blue-800"><strong>Leitura rápida:</strong> acessórios e periféricos concentram 60% do faturamento. O crescimento mensal permanece saudável, com aumento simultâneo de receita e ticket médio.</div>
    </div>
  );
}
