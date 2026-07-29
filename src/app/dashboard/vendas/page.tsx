"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";


interface Venda {

  id: string;

  valorTotal: number;

  status: string;

  criadoEm: string;

  cliente: {
  id: string;
  nome: string;
} | null;

  itens: {

    produto: string;

    quantidade: number;

  }[];

}



export default function Vendas() {


  const router = useRouter();


  const [vendas, setVendas] = useState<Venda[]>([]);

  const [carregando, setCarregando] = useState(true);





  async function carregarVendas() {


    try {


      const resposta = await api.get("/vendas");


      setVendas(resposta.data.vendas);



    } catch (erro) {


      console.error(
        "Erro ao buscar vendas",
        erro
      );


    } finally {


      setCarregando(false);


    }


  }


  async function cancelarVenda(id:string) {


    const confirmar =
      confirm(
        "Deseja cancelar esta venda?"
      );


    if (!confirmar) return;



    try {


      await api.delete(
        `/vendas/${id}`
      );


      carregarVendas();



    } catch (erro) {


      console.error(
        "Erro ao cancelar venda",
        erro
      );


    }


  }



  useEffect(() => {


    carregarVendas();


  }, []);



  if (carregando) {


    return (

      <div className="p-6">

        Carregando vendas...

      </div>

    );


  }


  return (


    <div className="p-6">


      <div className="flex justify-between items-center mb-6">


        <h1 className="text-2xl font-bold">

          Vendas

        </h1>



        <button

          onClick={() =>
            router.push(
              "/dashboard/vendas/nova"
            )
          }

          className="bg-blue-600 text-white px-4 py-2 rounded"

        >

          Nova Venda

        </button>



      </div>






      {vendas.length === 0 ? (


        <p>

          Nenhuma venda cadastrada.

        </p>



      ) : (



        <table className="w-full border">


          <thead>


            <tr className="border">


              <th className="p-2">
                ID
              </th>


              <th className="p-2">
                Cliente
              </th>


              <th className="p-2">
                Produtos
              </th>


              <th className="p-2">
                Total
              </th>


              <th className="p-2">
                Status
              </th>


              <th className="p-2">
                Ações
              </th>



            </tr>


          </thead>





          <tbody>


            {vendas.map((venda) => (


              <tr
                key={venda.id}
                className="border"
              >



                <td className="p-2">

                  {venda.id}

                </td>





                <td className="p-2">

                  {venda.cliente?.nome ?? "Sem cliente"}

                </td>





                <td className="p-2">


                  {venda.itens.map(
                    (item,index)=>(
                      <div key={index}>

                        {item.produto}
                        {" "}
                        ({item.quantidade})

                      </div>
                    )
                  )}


                </td>





                <td className="p-2">


                  R$ {Number(
                    venda.valorTotal
                  ).toFixed(2)}



                </td>






                <td className="p-2">


                  {venda.status}


                </td>







                <td className="p-2 space-x-2">



                  <button

                    onClick={() =>
                      router.push(
                        `/dashboard/vendas/${venda.id}`
                      )
                    }

                    className="bg-yellow-500 text-white px-3 py-1 rounded"

                  >

                    Ver

                  </button>






                  {venda.status !== "cancelada" && (


                    <button

                      onClick={() =>
                        cancelarVenda(
                          venda.id
                        )
                      }

                      className="bg-red-600 text-white px-3 py-1 rounded"

                    >

                      Cancelar

                    </button>


                  )}





                </td>



              </tr>



            ))}


          </tbody>



        </table>



      )}



    </div>


  );


}