export type StockStatus = "Disponível" | "Estoque baixo" | "Sem estoque";

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  unit: string;
  salePrice: number;
  costPrice: number;
  stock: number;
  minimumStock: number;
  supplier: string;
  description: string;
  updatedAt: string;
  status: StockStatus;
}

export interface Customer {
  id: string;
  name: string;
  type: "Pessoa física" | "Pessoa jurídica";
  document: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  totalSpent: number;
  purchases: number;
  lastPurchase: string;
  joinedAt: string;
  status: "Ativo" | "Inativo";
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  status: "Concluída" | "Pendente" | "Cancelada";
  paymentMethod: string;
  channel: string;
  seller: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: "Entrada" | "Saída" | "Ajuste";
  quantity: number;
  reason: string;
  responsible: string;
  date: string;
  balanceAfter: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export const products: Product[] = [
  { id: "PRD-001", sku: "CAB-USBC-2M", barcode: "7898502451001", name: "Cabo USB-C Reforçado 2m", category: "Acessórios", unit: "UN", salePrice: 49.9, costPrice: 22.4, stock: 84, minimumStock: 15, supplier: "Connect Brasil", description: "Cabo de dados e carregamento rápido com revestimento trançado e conectores reforçados.", updatedAt: "2026-08-04T14:20:00", status: "Disponível" },
  { id: "PRD-002", sku: "SUP-NBK-ALU", barcode: "7898502451002", name: "Suporte para Notebook Alumínio", category: "Escritório", unit: "UN", salePrice: 189.9, costPrice: 98.5, stock: 12, minimumStock: 15, supplier: "Ergo Office", description: "Suporte ergonômico ajustável em alumínio para notebooks de até 17 polegadas.", updatedAt: "2026-08-04T11:10:00", status: "Estoque baixo" },
  { id: "PRD-003", sku: "MOU-WLS-ERG", barcode: "7898502451003", name: "Mouse Sem Fio Ergonômico", category: "Periféricos", unit: "UN", salePrice: 129.9, costPrice: 61.9, stock: 36, minimumStock: 12, supplier: "Tech Input", description: "Mouse sem fio silencioso com formato ergonômico, seis botões e bateria de longa duração.", updatedAt: "2026-08-03T16:45:00", status: "Disponível" },
  { id: "PRD-004", sku: "TEC-MEC-RGB", barcode: "7898502451004", name: "Teclado Mecânico Compacto", category: "Periféricos", unit: "UN", salePrice: 349.9, costPrice: 205, stock: 18, minimumStock: 8, supplier: "Tech Input", description: "Teclado mecânico ABNT2 compacto, switches táteis e iluminação ajustável.", updatedAt: "2026-08-03T10:30:00", status: "Disponível" },
  { id: "PRD-005", sku: "HUB-USBC-7P", barcode: "7898502451005", name: "Hub USB-C 7 em 1", category: "Acessórios", unit: "UN", salePrice: 279.9, costPrice: 149.9, stock: 7, minimumStock: 10, supplier: "Connect Brasil", description: "Hub USB-C com HDMI, USB 3.0, leitor de cartões e Power Delivery.", updatedAt: "2026-08-02T15:00:00", status: "Estoque baixo" },
  { id: "PRD-006", sku: "FON-BT-PRO", barcode: "7898502451006", name: "Headset Bluetooth Pro", category: "Áudio", unit: "UN", salePrice: 429.9, costPrice: 238, stock: 0, minimumStock: 6, supplier: "AudioWave", description: "Headset com cancelamento de ruído, microfone removível e conexão multiponto.", updatedAt: "2026-08-02T09:18:00", status: "Sem estoque" },
  { id: "PRD-007", sku: "WEBCAM-FHD", barcode: "7898502451007", name: "Webcam Full HD 1080p", category: "Periféricos", unit: "UN", salePrice: 239.9, costPrice: 126, stock: 23, minimumStock: 8, supplier: "Vision Tech", description: "Webcam Full HD com foco automático, microfone duplo e tampa de privacidade.", updatedAt: "2026-08-01T17:40:00", status: "Disponível" },
  { id: "PRD-008", sku: "SSD-EXT-1TB", barcode: "7898502451008", name: "SSD Externo Portátil 1TB", category: "Armazenamento", unit: "UN", salePrice: 699.9, costPrice: 485, stock: 9, minimumStock: 5, supplier: "DataStore", description: "SSD externo compacto com conexão USB-C e leitura de até 1.050 MB/s.", updatedAt: "2026-08-01T13:25:00", status: "Disponível" },
];

export const productCategories = [...new Set(products.map((product) => product.category))];

export const customers: Customer[] = [
  { id: "CLI-001", name: "Mariana Alves", type: "Pessoa física", document: "***.482.***-09", email: "mariana.alves@exemplo.com", phone: "(11) 98742-1160", city: "São Paulo", state: "SP", totalSpent: 2869.4, purchases: 9, lastPurchase: "2026-08-04T10:32:00", joinedAt: "2025-09-12", status: "Ativo" },
  { id: "CLI-002", name: "Norte Digital Ltda.", type: "Pessoa jurídica", document: "48.***.***/0001-20", email: "compras@nortedigital.com.br", phone: "(21) 3321-8040", city: "Rio de Janeiro", state: "RJ", totalSpent: 12489.7, purchases: 18, lastPurchase: "2026-08-04T09:18:00", joinedAt: "2024-11-04", status: "Ativo" },
  { id: "CLI-003", name: "Carlos Eduardo Lima", type: "Pessoa física", document: "***.196.***-41", email: "carlos.lima@exemplo.com", phone: "(31) 99812-4407", city: "Belo Horizonte", state: "MG", totalSpent: 1749.2, purchases: 6, lastPurchase: "2026-08-03T15:44:00", joinedAt: "2025-12-18", status: "Ativo" },
  { id: "CLI-004", name: "Estúdio Horizonte", type: "Pessoa jurídica", document: "32.***.***/0001-61", email: "financeiro@estudiohorizonte.com", phone: "(41) 3094-5521", city: "Curitiba", state: "PR", totalSpent: 8930.6, purchases: 12, lastPurchase: "2026-08-02T14:25:00", joinedAt: "2025-03-08", status: "Ativo" },
  { id: "CLI-005", name: "Fernanda Rocha", type: "Pessoa física", document: "***.025.***-77", email: "fernanda.rocha@exemplo.com", phone: "(51) 99106-3382", city: "Porto Alegre", state: "RS", totalSpent: 980.3, purchases: 4, lastPurchase: "2026-07-29T11:06:00", joinedAt: "2026-01-22", status: "Ativo" },
  { id: "CLI-006", name: "Café & Código Coworking", type: "Pessoa jurídica", document: "51.***.***/0001-13", email: "operacoes@cafecodigo.com.br", phone: "(19) 3512-9088", city: "Campinas", state: "SP", totalSpent: 15642.8, purchases: 23, lastPurchase: "2026-08-01T16:50:00", joinedAt: "2024-08-19", status: "Ativo" },
];

export const sales: Sale[] = [
  { id: "VND-1048", customerId: "CLI-001", customerName: "Mariana Alves", date: "2026-08-04T10:32:00", status: "Concluída", paymentMethod: "Cartão de crédito", channel: "Balcão", seller: "Ana Souza", items: [{ productId: "PRD-004", productName: "Teclado Mecânico Compacto", quantity: 1, unitPrice: 349.9, subtotal: 349.9 }, { productId: "PRD-003", productName: "Mouse Sem Fio Ergonômico", quantity: 1, unitPrice: 129.9, subtotal: 129.9 }], subtotal: 479.8, discount: 20, total: 459.8 },
  { id: "VND-1047", customerId: "CLI-002", customerName: "Norte Digital Ltda.", date: "2026-08-04T09:18:00", status: "Concluída", paymentMethod: "PIX", channel: "WhatsApp", seller: "Ricardo Cruz", items: [{ productId: "PRD-002", productName: "Suporte para Notebook Alumínio", quantity: 4, unitPrice: 189.9, subtotal: 759.6 }, { productId: "PRD-003", productName: "Mouse Sem Fio Ergonômico", quantity: 4, unitPrice: 129.9, subtotal: 519.6 }], subtotal: 1279.2, discount: 64, total: 1215.2 },
  { id: "VND-1046", customerId: "CLI-003", customerName: "Carlos Eduardo Lima", date: "2026-08-03T15:44:00", status: "Pendente", paymentMethod: "Boleto", channel: "Loja online", seller: "Ana Souza", items: [{ productId: "PRD-008", productName: "SSD Externo Portátil 1TB", quantity: 1, unitPrice: 699.9, subtotal: 699.9 }], subtotal: 699.9, discount: 0, total: 699.9 },
  { id: "VND-1045", customerId: "CLI-004", customerName: "Estúdio Horizonte", date: "2026-08-02T14:25:00", status: "Concluída", paymentMethod: "PIX", channel: "Representante", seller: "Ricardo Cruz", items: [{ productId: "PRD-007", productName: "Webcam Full HD 1080p", quantity: 3, unitPrice: 239.9, subtotal: 719.7 }, { productId: "PRD-001", productName: "Cabo USB-C Reforçado 2m", quantity: 3, unitPrice: 49.9, subtotal: 149.7 }], subtotal: 869.4, discount: 43.5, total: 825.9 },
  { id: "VND-1044", customerId: "CLI-006", customerName: "Café & Código Coworking", date: "2026-08-01T16:50:00", status: "Concluída", paymentMethod: "Transferência", channel: "Representante", seller: "Beatriz Lima", items: [{ productId: "PRD-005", productName: "Hub USB-C 7 em 1", quantity: 3, unitPrice: 279.9, subtotal: 839.7 }], subtotal: 839.7, discount: 40, total: 799.7 },
  { id: "VND-1043", customerId: "CLI-005", customerName: "Fernanda Rocha", date: "2026-07-29T11:06:00", status: "Cancelada", paymentMethod: "Cartão de crédito", channel: "Loja online", seller: "Beatriz Lima", items: [{ productId: "PRD-006", productName: "Headset Bluetooth Pro", quantity: 1, unitPrice: 429.9, subtotal: 429.9 }], subtotal: 429.9, discount: 0, total: 429.9 },
];

export const stockMovements: StockMovement[] = [
  { id: "MOV-2081", productId: "PRD-001", productName: "Cabo USB-C Reforçado 2m", type: "Entrada", quantity: 60, reason: "Compra de fornecedor", responsible: "Ricardo Cruz", date: "2026-08-04T14:20:00", balanceAfter: 84 },
  { id: "MOV-2080", productId: "PRD-004", productName: "Teclado Mecânico Compacto", type: "Saída", quantity: 1, reason: "Venda VND-1048", responsible: "Ana Souza", date: "2026-08-04T10:32:00", balanceAfter: 18 },
  { id: "MOV-2079", productId: "PRD-002", productName: "Suporte para Notebook Alumínio", type: "Saída", quantity: 4, reason: "Venda VND-1047", responsible: "Ricardo Cruz", date: "2026-08-04T09:18:00", balanceAfter: 12 },
  { id: "MOV-2078", productId: "PRD-003", productName: "Mouse Sem Fio Ergonômico", type: "Saída", quantity: 4, reason: "Venda VND-1047", responsible: "Ricardo Cruz", date: "2026-08-04T09:18:00", balanceAfter: 36 },
  { id: "MOV-2077", productId: "PRD-005", productName: "Hub USB-C 7 em 1", type: "Ajuste", quantity: 2, reason: "Inventário periódico", responsible: "Beatriz Lima", date: "2026-08-03T17:05:00", balanceAfter: 7 },
  { id: "MOV-2076", productId: "PRD-008", productName: "SSD Externo Portátil 1TB", type: "Entrada", quantity: 10, reason: "Compra de fornecedor", responsible: "Ricardo Cruz", date: "2026-08-03T13:20:00", balanceAfter: 9 },
  { id: "MOV-2075", productId: "PRD-006", productName: "Headset Bluetooth Pro", type: "Saída", quantity: 2, reason: "Amostra comercial", responsible: "Beatriz Lima", date: "2026-08-02T16:35:00", balanceAfter: 0 },
  { id: "MOV-2074", productId: "PRD-007", productName: "Webcam Full HD 1080p", type: "Saída", quantity: 3, reason: "Venda VND-1045", responsible: "Ricardo Cruz", date: "2026-08-02T14:25:00", balanceAfter: 23 },
];

export const revenueByDay: ChartPoint[] = [
  { label: "29 jul", value: 3980 }, { label: "30 jul", value: 5240 }, { label: "31 jul", value: 4720 },
  { label: "01 ago", value: 6180 }, { label: "02 ago", value: 4890 }, { label: "03 ago", value: 7340 }, { label: "04 ago", value: 8120 },
];

export const salesByMonth: ChartPoint[] = [
  { label: "Mar", value: 68 }, { label: "Abr", value: 82 }, { label: "Mai", value: 91 },
  { label: "Jun", value: 87 }, { label: "Jul", value: 104 }, { label: "Ago", value: 112 },
];

export const topProducts = [
  { name: "Cabo USB-C 2m", quantity: 148, revenue: 7385.2 },
  { name: "Mouse Sem Fio", quantity: 96, revenue: 12470.4 },
  { name: "Suporte Notebook", quantity: 73, revenue: 13862.7 },
  { name: "Hub USB-C 7 em 1", quantity: 54, revenue: 15114.6 },
  { name: "Webcam Full HD", quantity: 42, revenue: 10075.8 },
];

export const reportCategories = [
  { name: "Acessórios", revenue: 18420, share: 32 }, { name: "Periféricos", revenue: 16280, share: 28 },
  { name: "Escritório", revenue: 11520, share: 20 }, { name: "Armazenamento", revenue: 6920, share: 12 }, { name: "Áudio", revenue: 4580, share: 8 },
];

export const reportSummary = { monthRevenue: 57720, previousMonthRevenue: 49680, averageTicket: 515.36, grossMargin: 46.8, inventoryTurnover: 3.4 };
