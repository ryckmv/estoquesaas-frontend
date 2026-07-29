export interface Produto {
  id: string;
  empresaId: string;
  nome: string;
  codigoBarras?: string;
  precoCusto: string;
  precoVenda: string;
  quantidade: number;
  estoqueMinimo: number;
}

export interface ProdutosResponse {
  produtos: Produto[];
}