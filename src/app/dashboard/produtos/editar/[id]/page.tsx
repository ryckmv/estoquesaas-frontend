"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";

export default function EditarProduto() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [nome, setNome] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [estoqueMinimo, setEstoqueMinimo] = useState("");

  const [loading, setLoading] = useState(true);

  async function carregarProduto() {
    try {
      const resposta = await api.get(`/produtos/${id}`);

      const produto = resposta.data.produto;

      setNome(produto.nome);
      setCodigoBarras(produto.codigoBarras ?? "");
      setPrecoCusto(String(produto.precoCusto));
      setPrecoVenda(String(produto.precoVenda));
      setQuantidade(String(produto.quantidade));
      setEstoqueMinimo(String(produto.estoqueMinimo));
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar produto");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarProduto() {
    try {
      await api.put(`/produtos/${id}`, {
        nome,
        codigoBarras,
        precoCusto: Number(precoCusto),
        precoVenda: Number(precoVenda),
        quantidade: Number(quantidade),
        estoqueMinimo: Number(estoqueMinimo),
      });

      alert("Produto atualizado com sucesso!");

      router.push("/dashboard/produtos");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto");
    }
  }

  useEffect(() => {
    if (id) {
      carregarProduto();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        Carregando produto...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Editar Produto
      </h1>

      <div className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Nome"
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

        <div className="flex gap-3">
          <button
            onClick={atualizarProduto}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex-1"
          >
            Salvar Alterações
          </button>

          <button
            onClick={() => router.push("/dashboard/produtos")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}