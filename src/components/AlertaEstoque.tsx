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

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-bold text-xl mb-5 flex items-center gap-2">

        <AlertTriangle className="text-orange-500"/>

        Estoque Baixo

      </h2>


      {produtos.length === 0 ? (

        <p className="text-gray-500">
          Nenhum produto com estoque baixo.
        </p>

      ) : (

        <div className="space-y-3">

          {produtos.map((produto, index)=>(

            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between"
            >

              <div>

                <p className="font-semibold">
                  {produto.nome}
                </p>

                <p className="text-sm text-gray-500">
                  Mínimo: {produto.estoqueMinimo}
                </p>

              </div>


              <span className="text-red-600 font-bold">

                {produto.quantidade} unidades

              </span>


            </div>

          ))}

        </div>

      )}

    </div>

  );
}