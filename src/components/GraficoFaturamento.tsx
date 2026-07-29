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
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-5">
        Faturamento dos Últimos 7 Dias
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="dia" />

          <YAxis />
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