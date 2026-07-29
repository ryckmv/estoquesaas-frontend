"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";


interface Cliente {
  id: string;
  nome: string;
}


interface Produto {

  id: string;

  nome: string;

  precoVenda: number;

  quantidade: number;

}



interface ItemVenda {

  produtoId: string;

  nome: string;

  quantidade: number;

}





export default function NovaVenda() {


  const router = useRouter();


  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [produtos, setProdutos] = useState<Produto[]>([]);


  const [clienteId, setClienteId] = useState("");

  const [produtoSelecionado, setProdutoSelecionado] = useState("");

  const [quantidade, setQuantidade] = useState(1);


  const [itens, setItens] = useState<ItemVenda[]>([]);


  const [salvando, setSalvando] = useState(false);






  async function carregarDados() {


    try {


      const clientesResponse =
        await api.get("/clientes");


      const produtosResponse =
        await api.get("/produtos");



      setClientes(
        clientesResponse.data.clientes
      );


      setProdutos(
        produtosResponse.data.produtos
      );



    } catch (erro) {


      console.error(
        "Erro ao carregar dados",
        erro
      );


    }


  }







  function adicionarProduto() {


    if (!produtoSelecionado) {

      alert("Selecione um produto");

      return;

    }



    const produto =
      produtos.find(
        p => p.id === produtoSelecionado
      );



    if (!produto) return;



    if (quantidade <= 0) {

      alert(
        "Quantidade inválida"
      );

      return;

    }



    const novoItem: ItemVenda = {


      produtoId: produto.id,


      nome: produto.nome,


      quantidade


    };



    setItens([

      ...itens,

      novoItem

    ]);



    setProdutoSelecionado("");

    setQuantidade(1);


  }








  function removerItem(index:number) {


    setItens(
      itens.filter(
        (_,i)=> i !== index
      )
    );


  }








  async function salvarVenda(
    e: React.FormEvent
  ) {


    e.preventDefault();



    if (itens.length === 0) {


      alert(
        "Adicione produtos na venda"
      );


      return;

    }






    try {


      setSalvando(true);



      await api.post(
        "/vendas",
        {


          clienteId:
            clienteId || undefined,


          itens:
            itens.map(item=>({

              produtoId:
                item.produtoId,


              quantidade:
                item.quantidade

            }))


        }
      );



      alert(
        "Venda realizada com sucesso!"
      );



      router.push(
        "/dashboard/vendas"
      );



    } catch (erro:any) {


      console.error(
        erro
      );


      alert(
        erro.response?.data?.mensagem ??
        "Erro ao realizar venda"
      );



    } finally {


      setSalvando(false);


    }



  }








  useEffect(()=>{


    carregarDados();


  },[]);








  return (

    <div className="p-6">


      <h1 className="text-2xl font-bold mb-6">

        Nova Venda

      </h1>





      <form
        onSubmit={salvarVenda}
        className="space-y-5"
      >




        <div>


          <label className="block mb-1">

            Cliente

          </label>



          <select

            value={clienteId}

            onChange={(e)=>
              setClienteId(
                e.target.value
              )
            }

            className="border p-2 rounded w-full"

          >


            <option value="">

              Venda sem cliente

            </option>



            {clientes.map(cliente=>(


              <option
                key={cliente.id}
                value={cliente.id}
              >

                {cliente.nome}

              </option>


            ))}



          </select>


        </div>








        <div className="flex gap-3 items-end">


          <div className="flex-1">


            <label className="block mb-1">

              Produto

            </label>


            <select

              value={produtoSelecionado}

              onChange={(e)=>
                setProdutoSelecionado(
                  e.target.value
                )
              }

              className="border p-2 rounded w-full"

            >


              <option value="">

                Selecione

              </option>



              {produtos.map(produto=>(


                <option
                  key={produto.id}
                  value={produto.id}
                >

                  {produto.nome}
                  {" "}
                  (Estoque:
                  {produto.quantidade})

                </option>


              ))}



            </select>


          </div>







          <div>


            <label className="block mb-1">

              Quantidade

            </label>


            <input

              type="number"

              value={quantidade}

              onChange={(e)=>
                setQuantidade(
                  Number(e.target.value)
                )
              }

              className="border p-2 rounded w-24"

            />


          </div>






          <button

            type="button"

            onClick={adicionarProduto}

            className="bg-green-600 text-white px-4 py-2 rounded"

          >

            Adicionar

          </button>



        </div>









        <div>


          <h2 className="font-bold mb-2">

            Produtos da venda

          </h2>




          {itens.map(
            (item,index)=>(


              <div
                key={index}
                className="border p-3 mb-2 flex justify-between"
              >

                <span>

                  {item.nome}
                  {" - "}
                  Quantidade:
                  {item.quantidade}

                </span>



                <button

                  type="button"

                  onClick={()=>
                    removerItem(index)
                  }

                  className="text-red-600"

                >

                  Remover

                </button>



              </div>


            )
          )}



        </div>







        <button

          type="submit"

          disabled={salvando}

          className="bg-blue-600 text-white px-5 py-2 rounded"

        >


          {salvando
            ? "Salvando..."
            : "Finalizar Venda"}



        </button>



      </form>



    </div>


  );


}