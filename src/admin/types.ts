import type { LucideIcon } from 'lucide-react';

export type AdminSection = 'dashboard' | 'pedidos' | 'produtos' | 'categorias' | 'estoque' | 'contagem' | 'configuracoes';
export type OrderStatus = 'pago' | 'aguardando' | 'recusado' | 'cancelado';
export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral';
export type CategoryStatus = 'ativo' | 'inativo';
export type MovementType = 'entrada' | 'saida' | 'ajuste' | 'venda';

export interface OrderItem { name: string; qty: number; price: number; }
export interface Order { id: number; date: string; time: string; payment: string; status: OrderStatus; items: OrderItem[]; }
export interface ComputedOrder extends Order { itemCount: number; total: number; }
export interface AdminProduct { id: number; name: string; description?: string; category: string; price: number; stock: number; min: number; sku?: string; active: boolean; photo?: string | null; }
export type ProductFormData = Omit<AdminProduct, 'id'> & { id?: number };
export interface CategoryMeta { name: string; status: CategoryStatus; order: number; }
export interface StockMovement { id: number; date: string; time: string; productId: number; type: MovementType; qty: number; prev: number; next: number; origin: string; user: string; }
export interface CountHistory { id: string; date: string; responsible: string; productsCount: number; divergences: number; status: string; }
export interface CountItem { productId: number; name: string; systemQty: number; countedQty: number; }
export interface SectionMeta { title: string; subtitle: string; }
export interface NavItem { id: AdminSection; label: string; icon: LucideIcon; }
