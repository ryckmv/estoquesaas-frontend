"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  estoqueMinimo: number;
  precoCusto: number;
  precoVenda: number;
}

export default function DetalhesEstoquePage() {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("maior");


  async function carregar() {

    try {

      const response = await api.get("/produtos");

      if (Array.isArray(response.data)) {
        setProdutos(response.data);
      } else if (Array.isArray(response.data.produtos)) {
        setProdutos(response.data.produtos);
      } else {
        setProdutos([]);
      }


    } catch (error) {

      console.error(error);
      alert("Erro ao carregar estoque");

    } finally {

      setCarregando(false);

    }

  }


  useEffect(() => {

    carregar();

  }, []);



const produtosFiltrados = useMemo(() => {

  let lista = produtos.filter(produto =>
    produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase())
  );


  if (ordenacao === "maior") {

    lista.sort((a,b) =>
      b.quantidade - a.quantidade
    );

  }


  if (ordenacao === "menor") {

    lista.sort((a,b) =>
      a.quantidade - b.quantidade
    );

  }

if (ordenacao === "baixo") {

  lista = lista.filter(produto =>
    produto.quantidade > 0 &&
    produto.quantidade <= produto.estoqueMinimo
  );

}


  return lista;


}, [produtos, busca, ordenacao]);



  const valorTotalEstoque = produtos.reduce(
    (total, produto) =>
      total + produto.precoCusto * produto.quantidade,
    0
  );


  const estoqueBaixo = produtos.filter(produto =>
    produto.quantidade <= produto.estoqueMinimo &&
    produto.quantidade > 0
  ).length;


  const semEstoque = produtos.filter(produto =>
    produto.quantidade === 0
  ).length;



  if (carregando) {

    return (
      <div className="p-8 text-center">
        Carregando estoque...
      </div>
    );

  }



  return (

    <div className="p-6 bg-slate-100 min-h-screen">


      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">


        <div>

          <h1 className="text-3xl font-bold">
            Detalhes do Estoque
          </h1>

          <p className="text-gray-500">
            Visão atual dos produtos armazenados
          </p>

        </div>



        <Link
          href="/dashboard/estoque"
          className="bg-slate-700 text-white px-5 py-3 rounded-lg"
        >
          Voltar
        </Link>


      </div>




      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">


        <Card
          titulo="Produtos"
          valor={produtos.length}
        />


        <Card
          titulo="Valor do Estoque"
          valor={valorTotalEstoque.toLocaleString(
            "pt-BR",
            {
              style:"currency",
              currency:"BRL"
            }
          )}
        />


        <Card
          titulo="Estoque Baixo"
          valor={estoqueBaixo}
        />


        <Card
          titulo="Sem Estoque"
          valor={semEstoque}
        />


      </div>




      <div className="mb-6">

        <input

          type="text"

          placeholder="🔍 Buscar produto..."

          value={busca}

          onChange={(e)=>setBusca(e.target.value)}

          className="w-full md:w-96 px-4 py-3 rounded-lg border"

        />
        <select
  value={ordenacao}
  onChange={(e)=>setOrdenacao(e.target.value)}
  className="mt-3 md:ml-3 px-4 py-3 rounded-lg border"
>

<option value="maior">
  Maior estoque
</option>

<option value="menor">
  Menor estoque
</option>

<option value="baixo">
  Estoque baixo
</option>

</select>

      </div>





      <div className="bg-white rounded-xl shadow overflow-x-auto">


        <table className="w-full">


          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Produto
              </th>


              <th className="p-4 text-center">
                Quantidade
              </th>


              <th className="p-4 text-center">
                Mínimo
              </th>


              <th className="p-4 text-center">
                Status
              </th>
              <th className="p-4 text-center">
              Custo
            </th>

            <th className="p-4 text-center">
              Venda
            </th>

            <th className="p-4 text-center">
              Ações
            </th>


            </tr>

          </thead>



          <tbody>


          {produtosFiltrados.map(produto => (


            <tr
              key={produto.id}
              className="border-t"
            >


              <td className="p-4 font-semibold">

                {produto.nome}

              </td>



              <td className="p-4 text-center">

                {produto.quantidade}

              </td>



              <td className="p-4 text-center">

                {produto.estoqueMinimo}

              </td>



              <td className="p-4 text-center">


                {
                  produto.quantidade === 0

                  ?

                  <span className="text-red-600 font-bold">
                    Sem estoque
                  </span>

                  :

                  produto.quantidade <= produto.estoqueMinimo

                  ?

                  <span className="text-orange-600 font-bold">
                    Estoque baixo
                  </span>

                  :

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Normal
                  </span>

                }


              </td>
              <td className="p-4 text-center">
  {produto.precoCusto.toLocaleString(
    "pt-BR",
    {
      style:"currency",
      currency:"BRL"
    }
  )}
</td>


<td className="p-4 text-center">
  {produto.precoVenda.toLocaleString(
    "pt-BR",
    {
      style:"currency",
      currency:"BRL"
    }
  )}
</td>


<td className="p-4 text-center">

<Link
  href={`/dashboard/produtos/editar/${produto.id}`}
  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
>
  Editar
</Link>

</td>


            </tr>


          ))}


          </tbody>


        </table>


      </div>


    </div>

  );

}



function Card({
  titulo,
  valor
}:{
  titulo:string;
  valor:any;
}) {

  return (

    <div className="bg-white rounded-xl shadow p-5">

      <p className="text-gray-500">
        {titulo}
      </p>


      <h2 className="text-3xl font-bold mt-2">
        {valor}
      </h2>


    </div>

  );

}