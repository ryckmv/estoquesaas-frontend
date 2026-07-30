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
      const clientesResponse = await api.get("/clientes");
      const produtosResponse = await api.get("/produtos");

      setClientes(clientesResponse.data.clientes);
      setProdutos(produtosResponse.data.produtos);
    } catch (erro) {
      console.error("Erro ao carregar dados", erro);
    }
  }

  function adicionarProduto() {
    if (!produtoSelecionado) {
      alert("Selecione um produto");
      return;
    }

    const produto = produtos.find(
      (p) => p.id === produtoSelecionado
    );

    if (!produto) return;

    if (quantidade <= 0) {
      alert("Quantidade inválida");
      return;
    }

    const novoItem: ItemVenda = {
      produtoId: produto.id,
      nome: produto.nome,
      quantidade,
    };

    setItens([...itens, novoItem]);
    setProdutoSelecionado("");
    setQuantidade(1);
  }

  function removerItem(index: number) {
    setItens(itens.filter((_, i) => i !== index));
  }

  async function salvarVenda(e: React.FormEvent) {
    e.preventDefault();

    if (itens.length === 0) {
      alert("Adicione produtos na venda");
      return;
    }

    try {
      setSalvando(true);

      await api.post("/vendas", {
        clienteId: clienteId || undefined,
        itens: itens.map((item) => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        })),
      });

      alert("Venda realizada com sucesso!");
      router.push("/dashboard/vendas");
    } catch (erro: any) {
      console.error(erro);
      alert(
        erro.response?.data?.mensagem ?? "Erro ao realizar venda"
      );
    } finally {
      setSalvando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-slate-100">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Nova Venda
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Registre uma nova transação no sistema
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5 sm:p-8 max-w-4xl mx-auto">
        <form onSubmit={salvarVenda} className="space-y-6">
          {/* Seleção de Cliente */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Cliente
            </label>

            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="">Venda sem cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Adição de Produtos: Grid Responsiva */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4 sm:space-y-0 sm:flex sm:gap-3 sm:items-end">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Produto
              </label>

              <select
                value={produtoSelecionado}
                onChange={(e) => setProdutoSelecionado(e.target.value)}
                className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              >
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} (Estoque: {produto.quantidade})
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-32">
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Quantidade
              </label>

              <input
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <button
              type="button"
              onClick={adicionarProduto}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer"
            >
              Adicionar
            </button>
          </div>

          {/* Lista de Produtos da Venda */}
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg mb-3">
              Produtos da venda
            </h2>

            {itens.length === 0 ? (
              <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center text-gray-400 text-sm sm:text-base">
                Nenhum produto adicionado à venda ainda.
              </div>
            ) : (
              <div className="space-y-2">
                {itens.map((item, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 bg-white rounded-lg p-3.5 sm:p-4 flex justify-between items-center shadow-2xs"
                  >
                    <span className="text-slate-800 text-sm sm:text-base font-medium">
                      {item.nome} <span className="text-gray-400 font-normal">({item.quantidade} un)</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => removerItem(index)}
                      className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium px-2.5 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão de Finalizar */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={salvando}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer"
            >
              {salvando ? "Salvando..." : "Finalizar Venda"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}