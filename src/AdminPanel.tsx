import { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { CategoriesView, CountView, DashboardView, NotificationsPanel, OrderDrawer, OrdersView, ProductFormModal, ProductsView, SettingsView, Sidebar, StockMovementModal, StockView } from './admin/components';
import { CATEGORIES_ADMIN, MOVEMENTS_ADMIN, ORDERS, PRODUCTS_ADMIN, SECTION_META } from './admin/data';
import { adminTheme as c } from './admin/theme';
import type { AdminProduct, AdminSection, CategoryMeta, ComputedOrder, MovementType, ProductFormData, StockMovement } from './admin/types';

export default function AdminPanel() {
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ComputedOrder | null>(null);
  const [products, setProducts] = useState<AdminProduct[]>(PRODUCTS_ADMIN);
  const [categories, setCategories] = useState<CategoryMeta[]>(CATEGORIES_ADMIN);
  const [movements, setMovements] = useState<StockMovement[]>(MOVEMENTS_ADMIN);
  const [movementProduct, setMovementProduct] = useState<AdminProduct | null>(null);
  const [productForm, setProductForm] = useState<AdminProduct | 'new' | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const meta = SECTION_META[section];
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(null), 2600); };
  const notifications = [
    `${products.filter((product) => product.active && product.stock > 0 && product.stock <= product.min).length} produtos estão com estoque baixo.`,
    `${products.filter((product) => product.active && product.stock === 0).length} produtos estão sem estoque.`,
    ...ORDERS.filter((order) => order.status === 'recusado').map((order) => `Pagamento recusado no pedido #${order.id}.`),
  ].filter((note) => !note.startsWith('0 '));
  const confirmMovement = ({ product, type, qty, reason }: { product: AdminProduct; type: MovementType; qty: number; reason: string }) => {
    const next = type === 'entrada' ? product.stock + qty : type === 'saida' ? Math.max(0, product.stock - qty) : qty;
    setProducts((current) => current.map((item) => item.id === product.id ? { ...item, stock: next } : item));
    setMovements((current) => [...current, { id: current.length + 1, date: '11/09/2026', time: 'agora', productId: product.id, type, qty: next - product.stock, prev: product.stock, next, origin: reason || 'Ajuste manual', user: 'Fernando' }]);
    setMovementProduct(null); notify('Estoque atualizado.');
  };
  const saveProduct = (data: ProductFormData) => {
    if (data.id !== undefined) {
      setProducts((current) => current.map((product) => product.id === data.id ? { ...product, ...data } as AdminProduct : product));
      notify('Produto atualizado.');
    } else {
      const id = Math.max(0, ...products.map((product) => product.id)) + 1;
      setProducts((current) => [...current, { ...data, id }]);
      notify('Produto salvo com sucesso.');
    }
    setProductForm(null);
  };

  return <div className="flex min-h-screen" style={{ background: c.bg, fontFamily: 'Poppins, system-ui, sans-serif' }}><Sidebar section={section} setSection={setSection} collapsed={collapsed} setCollapsed={setCollapsed} /><div className="flex-1 flex flex-col min-w-0"><header className="flex items-center justify-between px-8 py-5" style={{ borderBottom: `1px solid ${c.border}`, background: c.white }}><div><div className="text-2xl font-semibold" style={{ color: c.textPrimary }}>{meta.title}</div><div className="text-sm mt-0.5" style={{ color: c.textSecondary }}>{meta.subtitle}</div></div><div className="flex items-center gap-3">{section === 'produtos' && <button onClick={() => setProductForm('new')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: c.purple, color: '#fff' }}><Plus size={16} /> Adicionar produto</button>}<div className="relative"><button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative p-2 rounded-lg" style={{ color: c.textSecondary }} aria-label="Notificações"><Bell size={19} />{notifications.length > 0 && <span className="absolute top-1.5 right-1.5 rounded-full" style={{ width: 7, height: 7, background: c.danger }} />}</button>{notificationsOpen && <NotificationsPanel notes={notifications} />}</div><div className="flex items-center justify-center rounded-full font-semibold text-sm shrink-0" style={{ width: 32, height: 32, background: c.lilacLight, color: c.purple }}>F</div></div></header><main className="flex-1 p-8 overflow-y-auto">{section === 'dashboard' && <DashboardView setSection={setSection} products={products} />}{section === 'pedidos' && <OrdersView onSelectOrder={setSelectedOrder} />}{section === 'produtos' && <ProductsView products={products} setProducts={setProducts} notify={notify} onEdit={setProductForm} />}{section === 'categorias' && <CategoriesView products={products} categories={categories} setCategories={setCategories} notify={notify} />}{section === 'estoque' && <StockView products={products} movements={movements} onOpenMovement={setMovementProduct} />}{section === 'contagem' && <CountView products={products} setProducts={setProducts} setMovements={setMovements} notify={notify} />}{section === 'configuracoes' && <SettingsView notify={notify} />}</main></div><OrderDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} /><StockMovementModal product={movementProduct} onClose={() => setMovementProduct(null)} onConfirm={confirmMovement} />{productForm && <ProductFormModal key={productForm === 'new' ? 'new' : productForm.id} target={productForm} categories={categories.map((category) => category.name)} onClose={() => setProductForm(null)} onSave={saveProduct} />}{toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-xl text-sm" style={{ background: c.textPrimary, color: '#fff' }}>{toast}</div>}</div>;
}
