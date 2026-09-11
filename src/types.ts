import type { LucideIcon } from 'lucide-react';

export type Screen = 'home' | 'catalog' | 'cart' | 'checkout' | 'payment' | 'success';
export type PaymentStatus = 'idle' | 'pendente' | 'processando' | 'aprovado';
export type Cart = Record<string, number>;

export interface Product {
  id: string;
  name: string;
  priceCents: number;
  categoryId: CategoryId;
  icon: LucideIcon;
  stock: number;
}

export type CategoryId = 'geladeira' | 'prateleira';

export interface Category {
  id: CategoryId;
  name: string;
  icon: LucideIcon;
}

export interface CartEntry {
  product: Product;
  qty: number;
}
