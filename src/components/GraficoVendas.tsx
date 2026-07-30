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
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-hidden">
      <h2 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5">
        Vendas dos Últimos 7 Dias
      </h2>

      <div className="w-full h-[280px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={dados}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis 
              dataKey="dia" 
              tick={{ fontSize: 12 }} 
              stroke="#64748b" 
            />

            <YAxis 
              tick={{ fontSize: 12 }} 
              stroke="#64748b" 
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="vendas"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}