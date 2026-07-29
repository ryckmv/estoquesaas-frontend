"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";


interface Venda {

  id: string;

  cliente: {
    id: string;
    nome: string;
  } | null;

  valorTotal: number;

  status: string;

  criadoEm: string;

  itens: {

    produto: string;

    quantidade: number;

    precoVendaUnitario: number;

  }[];

}



export default function DetalhesVenda() {


  const params = useParams();

  const router = useRouter();

  const id = params.id as string;


  const [venda, setVenda] = useState<Venda | null>(null);

  const [carregando, setCarregando] = useState(true);




  async function carregarVenda() {

    try {

      const resposta =
        await api.get(`/vendas/${id}`);


      setVenda(
        resposta.data.venda
      );


    } catch (erro) {

      console.error(
        "Erro ao buscar venda",
        erro
      );

    } finally {

      setCarregando(false);

    }

  }





  useEffect(() => {

    carregarVenda();

  }, []);





  if (carregando) {

    return (
      <div className="p-6">
        Carregando...
      </div>
    );

  }





  if (!venda) {

    return (
      <div className="p-6">
        Venda não encontrada.
      </div>
    );

  }






  return (

    <div className="p-6">


      <button

        onClick={() =>
          router.back()
        }

        className="mb-5 bg-gray-600 text-white px-4 py-2 rounded"

      >

        Voltar

      </button>





      <h1 className="text-2xl font-bold mb-6">

        Venda #{venda.id}

      </h1>





      <div className="border p-4 rounded mb-5">


        <p>

          <strong>Cliente:</strong>{" "}

          {venda.cliente?.nome ?? "Sem cliente"}

        </p>


        <p>

          <strong>Status:</strong>{" "}

          {venda.status}

        </p>


        <p>

          <strong>Data:</strong>{" "}

          {new Date(venda.criadoEm)
            .toLocaleString()}

        </p>


      </div>






      <h2 className="font-bold mb-3">

        Produtos

      </h2>




      <table className="w-full border">


        <thead>

          <tr className="border">

            <th className="p-2">
              Produto
            </th>

            <th className="p-2">
              Quantidade
            </th>

            <th className="p-2">
              Valor
            </th>

          </tr>

        </thead>



        <tbody>


          {venda.itens.map(
            (item,index)=>(


              <tr
                key={index}
                className="border"
              >

                <td className="p-2">

                  {item.produto}

                </td>


                <td className="p-2">

                  {item.quantidade}

                </td>


                <td className="p-2">

                  R$ {Number(
                    item.precoVendaUnitario
                  ).toFixed(2)}

                </td>


              </tr>


            )

          )}


        </tbody>


      </table>





      <div className="mt-5 text-xl font-bold">

        Total: R$ {Number(
          venda.valorTotal
        ).toFixed(2)}

      </div>



    </div>

  );


}