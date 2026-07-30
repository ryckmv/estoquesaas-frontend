"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ProdutoVendido {
  produto: string;
  quantidade: number;
}

interface Props {
  dados: ProdutoVendido[];
}

export default function GraficoProdutosMaisVendidos({
  dados,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-hidden">

      <h2 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5">
        Produtos Mais Vendidos
      </h2>

      <ResponsiveContainer
        width="100%"
        height={280}
      >

        <BarChart
          data={dados}
          margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="produto"
            tick={{ fontSize: 12 }}
          />

          <YAxis tick={{ fontSize: 12 }} />

          <Tooltip />

          <Bar
            dataKey="quantidade"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            barSize={60}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}