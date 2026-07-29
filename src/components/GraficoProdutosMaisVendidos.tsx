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
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-bold text-xl mb-5">
        Produtos Mais Vendidos
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={dados}
          margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="produto"
          />

          <YAxis />

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