import { Candy, Cookie, CupSoda, Droplet, LayoutGrid, Package, Refrigerator, Zap } from 'lucide-react';
import type { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: 'geladeira', name: 'Geladeira', icon: Refrigerator },
  { id: 'prateleira', name: 'Prateleira', icon: LayoutGrid },
];

export const PRODUCTS: Product[] = [
  { id: 'coca', name: 'Coca-Cola 350ml', priceCents: 650, categoryId: 'geladeira', icon: CupSoda, stock: 12 },
  { id: 'coca-zero', name: 'Coca-Cola Zero 350ml', priceCents: 650, categoryId: 'geladeira', icon: CupSoda, stock: 9 },
  { id: 'guarana', name: 'Guaraná Antarctica 350ml', priceCents: 600, categoryId: 'geladeira', icon: CupSoda, stock: 7 },
  { id: 'energetico', name: 'Energético 250ml', priceCents: 990, categoryId: 'geladeira', icon: Zap, stock: 5 },
  { id: 'agua-sem-gas', name: 'Água sem gás 500ml', priceCents: 400, categoryId: 'geladeira', icon: Droplet, stock: 20 },
  { id: 'agua-com-gas', name: 'Água com gás 500ml', priceCents: 450, categoryId: 'geladeira', icon: Droplet, stock: 14 },
  { id: 'gatorade', name: 'Gatorade 500ml', priceCents: 800, categoryId: 'geladeira', icon: Droplet, stock: 0 },
  { id: 'chocolate', name: 'Chocolate ao leite', priceCents: 700, categoryId: 'prateleira', icon: Candy, stock: 10 },
  { id: 'batata', name: 'Batata chips', priceCents: 990, categoryId: 'prateleira', icon: Package, stock: 8 },
  { id: 'barra-cereal', name: 'Barra de cereal', priceCents: 550, categoryId: 'prateleira', icon: Package, stock: 11 },
  { id: 'salgadinho', name: 'Salgadinho', priceCents: 650, categoryId: 'prateleira', icon: Package, stock: 1 },
  { id: 'biscoito', name: 'Biscoito', priceCents: 500, categoryId: 'prateleira', icon: Cookie, stock: 13 },
];
