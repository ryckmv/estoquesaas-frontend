"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";


export default function NovoProduto() {

  const router = useRouter();


  const [nome, setNome] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [estoqueMinimo, setEstoqueMinimo] = useState("");


  async function salvarProduto() {

    try {

      await api.post("/produtos", {

        nome,

        codigoBarras,

        precoCusto: Number(precoCusto),

        precoVenda: Number(precoVenda),

        quantidade: Number(quantidade),

        estoqueMinimo: Number(estoqueMinimo)

      });


      alert("Produto cadastrado com sucesso!");


      router.push("/dashboard/produtos");


    } catch (error) {

      console.log(error);

      alert("Erro ao cadastrar produto");

    }

  }



  return (

    <div className="p-8 max-w-xl">

      <h1 className="text-3xl font-bold mb-6">
        Novo Produto
      </h1>


      <div className="space-y-4">


        <input
          className="border p-2 w-full"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />


        <input
          className="border p-2 w-full"
          placeholder="Código de barras"
          value={codigoBarras}
          onChange={(e) => setCodigoBarras(e.target.value)}
        />


        <input
          className="border p-2 w-full"
          placeholder="Preço de custo"
          type="number"
          value={precoCusto}
          onChange={(e) => setPrecoCusto(e.target.value)}
        />


        <input
          className="border p-2 w-full"
          placeholder="Preço de venda"
          type="number"
          value={precoVenda}
          onChange={(e) => setPrecoVenda(e.target.value)}
        />


        <input
          className="border p-2 w-full"
          placeholder="Quantidade"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />


        <input
          className="border p-2 w-full"
          placeholder="Estoque mínimo"
          type="number"
          value={estoqueMinimo}
          onChange={(e) => setEstoqueMinimo(e.target.value)}
        />


        <button
          onClick={salvarProduto}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Salvar Produto
        </button>


      </div>

    </div>

  );
}