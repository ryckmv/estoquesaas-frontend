"use client";

import { AlertTriangle } from "lucide-react";

interface Produto {
  nome: string;
  quantidade: number;
  estoqueMinimo: number;
}

interface Props {
  produtos: Produto[];
}

export default function AlertaEstoque({
  produtos
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">
      <h2 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 flex items-center gap-2">
        <AlertTriangle className="text-orange-500 shrink-0" />
        <span>Estoque Baixo</span>
      </h2>

      {produtos.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          Nenhum produto com estoque baixo.
        </p>
      ) : (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {produtos.map((produto, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 transition-colors hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  {produto.nome}
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  Mínimo: {produto.estoqueMinimo}
                </p>
              </div>

              <span className="text-red-600 font-bold text-sm sm:text-base shrink-0 self-start sm:self-auto">
                {produto.quantidade} unidades
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}