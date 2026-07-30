"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface GraficoProps {
  dados: {
    dia: string;
    vendas: number;
    faturamento: number;
  }[];
}

export default function GraficoFaturamento({ dados }: GraficoProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-hidden">
      <h2 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5">
        Faturamento dos Últimos 7 Dias
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={dados} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="dia" tick={{ fontSize: 12 }} />

          <YAxis tick={{ fontSize: 12 }} />
<Tooltip
  formatter={(value) => [
    Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    "Faturamento",
  ]}
/>

          <Area
            type="monotone"
            dataKey="faturamento"
            stroke="#16a34a"
            fill="#16a34a"
            fillOpacity={0.25}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}