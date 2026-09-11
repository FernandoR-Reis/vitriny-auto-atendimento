import type { CartEntry, Product } from './types';

export function formatBRL(cents: number): string {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
}

export function getCartEntries(cart: Record<string, number>, products: Product[]): CartEntry[] {
  return Object.entries(cart).flatMap(([id, qty]) => {
    const product = products.find((item) => item.id === id);
    return product ? [{ product, qty }] : [];
  });
}

export function getCartCount(entries: CartEntry[]): number {
  return entries.reduce((total, entry) => total + entry.qty, 0);
}

export function getCartTotal(entries: CartEntry[]): number {
  return entries.reduce((total, entry) => total + entry.qty * entry.product.priceCents, 0);
}
