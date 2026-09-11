import { useState } from 'react';
import { Bell, Plus, Settings, Tag, Boxes, ClipboardList } from 'lucide-react';
import { ComingSoon, DashboardView, NotificationsPanel, OrderDrawer, OrdersView, ProductsView, Sidebar } from './admin/components';
import { SECTION_META } from './admin/data';
import { adminTheme as c } from './admin/theme';
import type { AdminSection, ComputedOrder } from './admin/types';

export default function AdminPanel() {
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ComputedOrder | null>(null);
  const meta = SECTION_META[section];

  return <div className="flex min-h-screen" style={{ background: c.bg, fontFamily: 'Poppins, system-ui, sans-serif' }}><Sidebar section={section} setSection={setSection} collapsed={collapsed} setCollapsed={setCollapsed} /><div className="flex-1 flex flex-col min-w-0"><header className="flex items-center justify-between px-8 py-5" style={{ borderBottom: `1px solid ${c.border}`, background: c.white }}><div><div className="text-2xl font-semibold" style={{ color: c.textPrimary }}>{meta.title}</div><div className="text-sm mt-0.5" style={{ color: c.textSecondary }}>{meta.subtitle}</div></div><div className="flex items-center gap-3">{section === 'produtos' && <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: c.purple, color: '#fff' }}><Plus size={16} /> Adicionar produto</button>}<div className="relative"><button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative p-2 rounded-lg" style={{ color: c.textSecondary }} aria-label="Notificações"><Bell size={19} /><span className="absolute top-1.5 right-1.5 rounded-full" style={{ width: 7, height: 7, background: c.danger }} /></button>{notificationsOpen && <NotificationsPanel />}</div><div className="flex items-center justify-center rounded-full font-semibold text-sm shrink-0" style={{ width: 32, height: 32, background: c.lilacLight, color: c.purple }}>F</div></div></header><main className="flex-1 p-8 overflow-y-auto">{section === 'dashboard' && <DashboardView setSection={setSection} />}{section === 'pedidos' && <OrdersView onSelectOrder={setSelectedOrder} />}{section === 'produtos' && <ProductsView />}{section === 'categorias' && <ComingSoon icon={Tag} title="Categorias" description="Organização de categorias e reordenação por arrastar chegam na próxima etapa." />}{section === 'estoque' && <ComingSoon icon={Boxes} title="Estoque" description="Controle de estoque, movimentações e histórico chegam na próxima etapa." />}{section === 'contagem' && <ComingSoon icon={ClipboardList} title="Contagem" description="O fluxo de contagem física e a conferência de divergências chegam na próxima etapa." />}{section === 'configuracoes' && <ComingSoon icon={Settings} title="Configurações" description="Preferências do estabelecimento, do totem e do usuário chegam na próxima etapa." />}</main></div><OrderDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} /></div>;
}
