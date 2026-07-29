"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
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

export default function GraficoVendas({ dados }: GraficoProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-5">
        Vendas dos Últimos 7 Dias
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="dia" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="vendas"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}