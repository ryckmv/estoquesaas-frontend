"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";


interface Produto {
  id: string;
  nome: string;
  quantidade: number;
}


export default function NovaMovimentacaoPage() {

  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [produtoId, setProdutoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [motivo, setMotivo] = useState("compra");
  const [quantidade, setQuantidade] = useState(1);

  const [carregando, setCarregando] = useState(false);


  useEffect(() => {

    async function carregarProdutos() {

      try {

       const response = await api.get("/produtos");

console.log("PRODUTOS:", response.data);

setProdutos(response.data.produtos);

      } catch (error) {

        console.error(error);
        alert("Erro ao carregar produtos");

      }

    }


    carregarProdutos();

  }, []);



  async function salvar() {

    try {

      setCarregando(true);


      await api.post("/movimentacoes", {

        produtoId,

        tipo,

        motivo,

        quantidade

      });


      alert("Movimentação criada com sucesso");


      router.push("/dashboard/estoque");


    } catch (error:any) {

      console.error(error);

      alert(
        error.response?.data?.message ??
        "Erro ao criar movimentação"
      );


    } finally {

      setCarregando(false);

    }

  }



  return (

    <div className="p-8 bg-slate-100 min-h-screen">


      <h1 className="text-3xl font-bold mb-8">
        Nova Movimentação
      </h1>



      <div className="bg-white rounded-xl shadow p-6 max-w-xl">


        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Produto
          </label>


          <select
            className="border rounded-lg p-3 w-full"
            value={produtoId}
            onChange={(e)=>setProdutoId(e.target.value)}
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
                (Estoque: {produto.quantidade})

              </option>

            ))}


          </select>

        </div>



        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Tipo
          </label>


          <select
            className="border rounded-lg p-3 w-full"
            value={tipo}
            onChange={(e)=>setTipo(e.target.value)}
          >

            <option value="entrada">
              Entrada
            </option>

            <option value="saida">
              Saída
            </option>


          </select>

        </div>




        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Motivo
          </label>


          <select
            className="border rounded-lg p-3 w-full"
            value={motivo}
            onChange={(e)=>setMotivo(e.target.value)}
          >

            <option value="compra">
              Compra
            </option>

            <option value="ajuste">
              Ajuste
            </option>

            <option value="perda">
              Perda
            </option>


          </select>


        </div>




        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Quantidade
          </label>


          <input

            type="number"

            min="1"

            className="border rounded-lg p-3 w-full"

            value={quantidade}

            onChange={(e)=>
              setQuantidade(Number(e.target.value))
            }

          />


        </div>




        <button

          onClick={salvar}

          disabled={carregando}

          className="bg-blue-600 text-white px-6 py-3 rounded-lg"

        >

          {carregando
            ? "Salvando..."
            : "Salvar Movimentação"
          }


        </button>


      </div>


    </div>

  );

}