"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import type { ChartPoint } from "@/mocks/data";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: { name?: string } }>;
  label?: string;
  currency?: boolean;
}

function ChartTooltip({ active, payload, label, currency }: ChartTooltipProps) {
  const value = payload?.[0]?.value;
  if (!active || value === undefined) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-slate-500">{label ?? payload?.[0]?.payload?.name}</p>
      <p className="mt-0.5 text-sm font-bold text-slate-950">{currency ? formatCurrency(value) : value.toLocaleString("pt-BR")}</p>
    </div>
  );
}

export function RevenueAreaChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="h-72 w-full" aria-label="Gráfico de faturamento dos últimos sete dias">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} dy={10} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(value: number) => `${Math.round(value / 1000)}k`} />
          <Tooltip content={<ChartTooltip currency />} cursor={{ stroke: "#93c5fd", strokeDasharray: "4 4" }} />
          <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fill="url(#revenueGradient)" activeDot={{ r: 5, strokeWidth: 3, stroke: "#fff", fill: "#2563eb" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SalesBarChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="h-72 w-full" aria-label="Gráfico de vendas por mês">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} dy={10} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f1f5f9" }} />
          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 2, 2]} maxBarSize={38} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const pieColors = ["#2563eb", "#14b8a6", "#8b5cf6", "#f59e0b", "#64748b"];

export function CategoryPieChart({ data }: { data: Array<{ name: string; revenue: number; share: number }> }) {
  return (
    <div className="h-72 w-full" aria-label="Distribuição do faturamento por categoria">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="revenue" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3} stroke="transparent">
            {data.map((entry, index) => <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />)}
          </Pie>
          <Tooltip content={<ChartTooltip currency />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export { pieColors };
