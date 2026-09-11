import type { LucideIcon } from 'lucide-react';

export type AdminSection = 'dashboard' | 'pedidos' | 'produtos' | 'categorias' | 'estoque' | 'contagem' | 'configuracoes';
export type OrderStatus = 'pago' | 'aguardando' | 'recusado' | 'cancelado';
export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface OrderItem { name: string; qty: number; price: number; }
export interface Order { id: number; date: string; time: string; payment: string; status: OrderStatus; items: OrderItem[]; }
export interface ComputedOrder extends Order { itemCount: number; total: number; }
export interface AdminProduct { id: number; name: string; category: string; price: number; stock: number; min: number; }
export interface SectionMeta { title: string; subtitle: string; }
export interface NavItem { id: AdminSection; label: string; icon: LucideIcon; }
