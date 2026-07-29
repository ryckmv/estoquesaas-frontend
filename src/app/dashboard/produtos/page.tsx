"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

interface Produto {
  id: string;
  nome: string;
  codigoBarras: string | null;
  precoVenda: string;
  quantidade: number;
}

export default function Produtos() {
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarProdutos() {
    try {
      const resposta = await api.get("/produtos");

      setProdutos(resposta.data.produtos);

    } catch (error) {
      console.log(error);
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  async function excluirProduto(id: string) {

    const confirmar = confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) return;

    try {

      await api.delete(`/produtos/${id}`);

      alert("Produto excluído com sucesso!");

      carregarProdutos();

    } catch (error) {

      console.log(error);

      alert("Erro ao excluir produto");

    }

  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Carregando produtos...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Produtos
        </h1>

        <button
          onClick={() => router.push("/dashboard/produtos/novo")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Novo Produto
        </button>

      </div>

      {produtos.length === 0 ? (

        <p>Nenhum produto cadastrado.</p>

      ) : (

        <table className="w-full border border-gray-300">

          <thead>

            <tr className="bg-gray-200">

              <th className="border p-2">Nome</th>
              <th className="border p-2">Código</th>
              <th className="border p-2">Quantidade</th>
              <th className="border p-2">Venda</th>
              <th className="border p-2 text-center">Ações</th>

            </tr>

          </thead>

          <tbody>

            {produtos.map((produto) => (

              <tr key={produto.id}>

                <td className="border p-2">
                  {produto.nome}
                </td>

                <td className="border p-2">
                  {produto.codigoBarras ?? "-"}
                </td>

                <td className="border p-2">
                  {produto.quantidade}
                </td>

                <td className="border p-2">
                  R$ {Number(produto.precoVenda).toFixed(2)}
                </td>

                <td className="border p-2">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        router.push(`/dashboard/produtos/editar/${produto.id}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluirProduto(produto.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Excluir
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}