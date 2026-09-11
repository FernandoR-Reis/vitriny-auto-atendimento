import type { AdminProduct, Order, SectionMeta } from './types';

export const ORDERS: Order[] = [
  { id: 1048, date: '11/09/2026', time: '14:32', payment: 'Cartão', status: 'pago', items: [{ name: 'Coca-Cola 350ml', qty: 2, price: 650 }, { name: 'Batata chips', qty: 1, price: 990 }, { name: 'Chocolate ao leite', qty: 1, price: 700 }] },
  { id: 1047, date: '11/09/2026', time: '14:28', payment: 'Pix', status: 'pago', items: [{ name: 'Água sem gás 500ml', qty: 2, price: 400 }, { name: 'Guaraná Antarctica 350ml', qty: 1, price: 600 }] },
  { id: 1046, date: '11/09/2026', time: '14:15', payment: 'Pix', status: 'pago', items: [{ name: 'Coca-Cola 350ml', qty: 1, price: 650 }] },
  { id: 1045, date: '11/09/2026', time: '13:58', payment: 'Cartão', status: 'pago', items: [{ name: 'Energético 250ml', qty: 2, price: 990 }, { name: 'Chocolate ao leite', qty: 2, price: 700 }] },
  { id: 1044, date: '11/09/2026', time: '13:40', payment: 'Cartão', status: 'recusado', items: [{ name: 'Gatorade 500ml', qty: 2, price: 800 }] },
  { id: 1043, date: '11/09/2026', time: '13:22', payment: 'Pix', status: 'aguardando', items: [{ name: 'Salgadinho', qty: 1, price: 650 }] },
];

export const PRODUCTS_ADMIN: AdminProduct[] = [
  { id: 1, name: 'Coca-Cola 350ml', category: 'Bebidas', price: 650, stock: 24, min: 5 }, { id: 2, name: 'Coca-Cola Zero 350ml', category: 'Bebidas', price: 650, stock: 18, min: 5 }, { id: 3, name: 'Guaraná Antarctica 350ml', category: 'Bebidas', price: 600, stock: 14, min: 5 }, { id: 4, name: 'Energético 250ml', category: 'Bebidas', price: 990, stock: 5, min: 5 }, { id: 5, name: 'Água sem gás 500ml', category: 'Águas', price: 400, stock: 32, min: 8 }, { id: 6, name: 'Gatorade 500ml', category: 'Águas', price: 800, stock: 0, min: 5 }, { id: 7, name: 'Chocolate ao leite', category: 'Chocolates', price: 700, stock: 4, min: 6 }, { id: 8, name: 'Batata chips', category: 'Snacks', price: 990, stock: 16, min: 5 }, { id: 9, name: 'Salgadinho', category: 'Snacks', price: 650, stock: 1, min: 5 },
];

export const STATUS_META = { pago: { label: 'Pago', tone: 'success' }, aguardando: { label: 'Aguardando', tone: 'warning' }, recusado: { label: 'Recusado', tone: 'danger' }, cancelado: { label: 'Cancelado', tone: 'neutral' } } as const;
export const SECTION_META: Record<import('./types').AdminSection, SectionMeta> = { dashboard: { title: 'Bom dia, Fernando', subtitle: 'Aqui está um resumo da operação de hoje.' }, pedidos: { title: 'Pedidos', subtitle: 'Acompanhe as vendas realizadas pelos totens.' }, produtos: { title: 'Produtos', subtitle: 'Gerencie o catálogo disponível no totem.' }, categorias: { title: 'Categorias', subtitle: 'Organize os produtos por categoria.' }, estoque: { title: 'Estoque', subtitle: 'Controle e movimentação dos produtos.' }, contagem: { title: 'Contagem', subtitle: 'Confira o estoque físico e compare com o sistema.' }, configuracoes: { title: 'Configurações', subtitle: 'Preferências do estabelecimento e do totem.' } };
