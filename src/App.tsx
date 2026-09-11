import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from './data';
import { palette, numeric } from './theme';
import type { Cart, CategoryId, PaymentStatus, Screen } from './types';
import { formatBRL, getCartCount, getCartEntries, getCartTotal } from './utils';
import { VitrinyMark } from './components/VitrinyMark';

const WARN_MS = 30_000;
const RESET_MS = 40_000;

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('geladeira');
  const [cart, setCart] = useState<Cart>({});
  const [stock, setStock] = useState<Record<string, number>>(
    () => Object.fromEntries(PRODUCTS.map((product) => [product.id, product.stock])),
  );
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const lastInteraction = useRef(Date.now());
  const paymentTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const bump = () => {
    lastInteraction.current = Date.now();
    setShowInactivityWarning(false);
  };

  function resetSession() {
    setCart({});
    setPaymentStatus('idle');
    setOrderNumber(null);
    setShowInactivityWarning(false);
    setScreen('home');
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (screen === 'home') return;
      const elapsed = Date.now() - lastInteraction.current;
      if (elapsed > RESET_MS) resetSession();
      else if (elapsed > WARN_MS) setShowInactivityWarning(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'success') return;
    const timer = setTimeout(resetSession, 8000);
    return () => clearTimeout(timer);
  }, [screen]);

  useEffect(() => () => paymentTimers.current.forEach(clearTimeout), []);

  function goTo(nextScreen: Screen) {
    bump();
    setScreen(nextScreen);
  }

  function addToCart(productId: string) {
    bump();
    setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + 1 }));
  }

  function incQty(productId: string) {
    if ((cart[productId] || 0) >= stock[productId]) return;
    addToCart(productId);
  }

  function decQty(productId: string) {
    bump();
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[productId] || 0) - 1;
      if (quantity <= 0) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  }

  const cartEntries = getCartEntries(cart, PRODUCTS);
  const cartCount = getCartCount(cartEntries);
  const cartTotal = getCartTotal(cartEntries);

  function confirmAndPay() {
    bump();
    setScreen('payment');
    setPaymentStatus('pendente');
    const processingTimer = setTimeout(() => setPaymentStatus('processando'), 1500);
    const approvalTimer = setTimeout(() => {
      setPaymentStatus('aprovado');
      setStock((current) => {
        const next = { ...current };
        cartEntries.forEach(({ product, qty }) => {
          next[product.id] = Math.max(0, next[product.id] - qty);
        });
        return next;
      });
      setOrderNumber(1000 + Math.floor(Math.random() * 900));
    }, 3800);
    const successTimer = setTimeout(() => setScreen('success'), 4600);
    paymentTimers.current = [processingTimer, approvalTimer, successTimer];
  }

  return (
    <div style={{ background: palette.frame }} className="w-full min-h-screen flex items-center justify-center p-6" onPointerDown={bump}>
      <div style={{ background: palette.bg, border: `1px solid ${palette.border}`, width: 380, height: 760, borderRadius: 28 }} className="relative overflow-hidden">
        {screen === 'home' && (
          <div className="h-full flex flex-col items-center justify-center px-8 text-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <VitrinyMark size={40} />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-semibold" style={{ color: palette.text }}>Vitriny</span>
                <span className="text-xs font-medium" style={{ color: palette.highlight }}>Compre fácil, sem filas.</span>
              </div>
            </div>
            <h1 className="text-3xl font-semibold leading-tight" style={{ color: palette.text }}>Olá! O que você<br />deseja comprar?</h1>
            <button onClick={() => goTo('catalog')} className="w-full py-5 rounded-2xl text-lg font-semibold active:scale-95 transition-transform" style={{ background: palette.accent, color: palette.onAccent }}>Começar</button>
            <div className="grid grid-cols-2 gap-3 w-full">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return <button key={category.id} onClick={() => { bump(); setActiveCategory(category.id); setScreen('catalog'); }} className="flex flex-col items-center gap-2 py-5 rounded-2xl active:scale-95 transition-transform" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}><Icon size={22} color={palette.textMuted} /><span className="text-sm" style={{ color: palette.text }}>{category.name}</span></button>;
              })}
            </div>
          </div>
        )}

        {screen === 'catalog' && <CatalogScreen activeCategory={activeCategory} cart={cart} stock={stock} cartCount={cartCount} cartTotal={cartTotal} onBack={() => goTo('home')} onCart={() => goTo('cart')} onCategory={(category) => { bump(); setActiveCategory(category); }} onAdd={addToCart} onIncrease={incQty} onDecrease={decQty} onContinue={() => goTo('cart')} />}
        {screen === 'cart' && <CartScreen entries={cartEntries} total={cartTotal} onBack={() => goTo('catalog')} onIncrease={incQty} onDecrease={decQty} onCheckout={() => goTo('checkout')} onContinue={() => goTo('catalog')} />}
        {screen === 'checkout' && <CheckoutScreen entries={cartEntries} total={cartTotal} onBack={() => goTo('cart')} onPay={confirmAndPay} />}
        {screen === 'payment' && <PaymentScreen status={paymentStatus} total={cartTotal} />}
        {screen === 'success' && <SuccessScreen orderNumber={orderNumber} onNewOrder={resetSession} />}

        {showInactivityWarning && <div className="absolute inset-0 flex items-center justify-center px-8" style={{ background: 'rgba(8,5,15,0.9)' }}><div className="rounded-2xl p-6 text-center flex flex-col items-center gap-4" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}><AlertTriangle size={28} color={palette.highlight} /><div className="text-sm" style={{ color: palette.text }}>Sua sessão será encerrada por falta de atividade.</div><button onClick={bump} className="w-full py-3 rounded-xl text-sm font-semibold active:scale-95 transition-transform" style={{ background: palette.accent, color: palette.onAccent }}>Continuar comprando</button></div></div>}
      </div>
    </div>
  );
}

type CatalogProps = { activeCategory: CategoryId; cart: Cart; stock: Record<string, number>; cartCount: number; cartTotal: number; onBack: () => void; onCart: () => void; onCategory: (category: CategoryId) => void; onAdd: (id: string) => void; onIncrease: (id: string) => void; onDecrease: (id: string) => void; onContinue: () => void };
function CatalogScreen({ activeCategory, cart, stock, cartCount, cartTotal, onBack, onCart, onCategory, onAdd, onIncrease, onDecrease, onContinue }: CatalogProps) {
  const categoryName = CATEGORIES.find((category) => category.id === activeCategory)?.name;
  return <div className="h-full flex flex-col"><Header title={categoryName} onBack={onBack}><button onClick={onCart} className="relative p-2 -mr-2" aria-label="Ver carrinho"><ShoppingCart size={20} color={palette.text} />{cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-xs font-semibold" style={{ background: palette.highlight, color: palette.onAccent, width: 16, height: 16, borderRadius: 9999, ...numeric }}>{cartCount}</span>}</button></Header><div className="flex gap-2 px-5 pb-4">{CATEGORIES.map((category) => <button key={category.id} onClick={() => onCategory(category.id)} className="px-4 py-2 rounded-full text-sm font-medium" style={activeCategory === category.id ? { background: palette.accent, color: palette.onAccent } : { background: palette.surface, color: palette.textMuted, border: `1px solid ${palette.border}` }}>{category.name}</button>)}</div><div className="flex-1 overflow-y-auto px-5 grid grid-cols-2 gap-3 content-start">{PRODUCTS.filter((product) => product.categoryId === activeCategory).map((product) => { const quantity = cart[product.id] || 0; const available = stock[product.id] > 0; const Icon = product.icon; return <div key={product.id} className="flex flex-col rounded-2xl p-3" style={{ background: palette.surface, border: `1px solid ${palette.border}`, opacity: available ? 1 : 0.5 }}><div className="flex items-center justify-center rounded-xl mb-3" style={{ background: palette.surfaceRaised, height: 72 }}><Icon size={26} color={available ? palette.accent : palette.textMuted} /></div><span className="text-sm font-medium leading-snug mb-1" style={{ color: palette.text }}>{product.name}</span><span className="text-sm mb-3" style={{ color: palette.textMuted, ...numeric }}>{formatBRL(product.priceCents)}</span>{!available ? <div className="text-center text-xs py-2 rounded-xl" style={{ color: palette.danger, border: `1px solid ${palette.danger}` }}>Indisponível</div> : quantity === 0 ? <button onClick={() => onAdd(product.id)} className="py-2 rounded-xl text-sm font-semibold active:scale-95 transition-transform" style={{ background: palette.accent, color: palette.onAccent }}>Adicionar</button> : <QuantityControl quantity={quantity} onDecrease={() => onDecrease(product.id)} onIncrease={() => onIncrease(product.id)} />}</div>; })}</div>{cartCount > 0 && <div className="px-5 py-4" style={{ borderTop: `1px solid ${palette.border}` }}><button onClick={onContinue} className="w-full flex items-center justify-between py-4 px-5 rounded-2xl active:scale-95 transition-transform" style={{ background: palette.accent, color: palette.onAccent }}><span className="font-semibold text-sm">{cartCount} {cartCount === 1 ? 'item' : 'itens'}</span><span className="font-semibold" style={numeric}>{formatBRL(cartTotal)}</span></button></div>}</div>;
}

function Header({ title, onBack, children }: { title?: string; onBack: () => void; children?: React.ReactNode }) { return <div className="flex items-center justify-between px-5 pt-5 pb-3"><button onClick={onBack} className="p-2 -ml-2" aria-label="Voltar"><ArrowLeft size={20} color={palette.textMuted} /></button><span className="text-base font-semibold" style={{ color: palette.text }}>{title}</span>{children || <span />}</div>; }
function QuantityControl({ quantity, onDecrease, onIncrease }: { quantity: number; onDecrease: () => void; onIncrease: () => void }) { return <div className="flex items-center justify-between rounded-xl" style={{ background: palette.surfaceRaised }}><button onClick={onDecrease} className="p-2" aria-label="Diminuir"><Minus size={16} color={palette.text} /></button><span className="text-sm font-semibold" style={{ color: palette.text, ...numeric }}>{quantity}</span><button onClick={onIncrease} className="p-2" aria-label="Aumentar"><Plus size={16} color={palette.text} /></button></div>; }

function CartScreen({ entries, total, onBack, onIncrease, onDecrease, onCheckout, onContinue }: { entries: ReturnType<typeof getCartEntries>; total: number; onBack: () => void; onIncrease: (id: string) => void; onDecrease: (id: string) => void; onCheckout: () => void; onContinue: () => void }) { return <div className="h-full flex flex-col"><Header title="Seu pedido" onBack={onBack} /><div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">{entries.length === 0 && <p className="text-sm mt-8 text-center" style={{ color: palette.textMuted }}>Seu carrinho está vazio.</p>}{entries.map(({ product, qty }) => { const Icon = product.icon; return <div key={product.id} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}><div className="flex items-center justify-center rounded-xl" style={{ background: palette.surfaceRaised, width: 48, height: 48 }}><Icon size={20} color={palette.accent} /></div><div className="flex-1"><div className="text-sm font-medium" style={{ color: palette.text }}>{product.name}</div><div className="text-xs" style={{ color: palette.textMuted, ...numeric }}>{qty} × {formatBRL(product.priceCents)}</div></div><QuantityControl quantity={qty} onDecrease={() => onDecrease(product.id)} onIncrease={() => onIncrease(product.id)} /></div>; })}</div><Footer total={total} actionLabel="Finalizar compra" disabled={entries.length === 0} onAction={onCheckout}><button onClick={onContinue} className="w-full py-3 rounded-2xl text-sm font-medium" style={{ color: palette.textMuted }}>Continuar comprando</button></Footer></div>; }
function CheckoutScreen({ entries, total, onBack, onPay }: { entries: ReturnType<typeof getCartEntries>; total: number; onBack: () => void; onPay: () => void }) { return <div className="h-full flex flex-col"><Header title="Revisar pedido" onBack={onBack} /><div className="flex-1 overflow-y-auto px-5 flex flex-col gap-1">{entries.map(({ product, qty }) => <div key={product.id} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${palette.border}` }}><span className="text-sm" style={{ color: palette.text }}>{qty} × {product.name}</span><span className="text-sm" style={{ color: palette.textMuted, ...numeric }}>{formatBRL(qty * product.priceCents)}</span></div>)}</div><div className="px-5 pt-4 pb-6" style={{ borderTop: `1px solid ${palette.border}` }}><div className="flex items-center justify-between mb-5"><span className="text-sm" style={{ color: palette.textMuted }}>Total a pagar</span><span className="text-2xl font-semibold" style={{ color: palette.text, ...numeric }}>{formatBRL(total)}</span></div><button onClick={onPay} className="w-full py-4 rounded-2xl font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2" style={{ background: palette.accent, color: palette.onAccent }}><CreditCard size={18} /> Confirmar e pagar</button></div></div>; }
function Footer({ total, actionLabel, disabled, onAction, children }: { total: number; actionLabel: string; disabled: boolean; onAction: () => void; children: React.ReactNode }) { return <div className="px-5 pt-4 pb-6" style={{ borderTop: `1px solid ${palette.border}` }}><div className="flex items-center justify-between mb-4"><span className="text-sm" style={{ color: palette.textMuted }}>Total</span><span className="text-xl font-semibold" style={{ color: palette.text, ...numeric }}>{formatBRL(total)}</span></div><div className="flex flex-col gap-2"><button disabled={disabled} onClick={onAction} className="w-full py-4 rounded-2xl font-semibold active:scale-95 transition-transform disabled:opacity-40" style={{ background: palette.accent, color: palette.onAccent }}>{actionLabel}</button>{children}</div></div>; }
function PaymentScreen({ status, total }: { status: PaymentStatus; total: number }) { return <div className="h-full flex flex-col items-center justify-center px-8 text-center gap-6">{status !== 'aprovado' ? <><Loader2 size={40} className="animate-spin" color={palette.accent} /><div><div className="text-lg font-semibold mb-1" style={{ color: palette.text }}>{status === 'pendente' ? 'Aguardando pagamento' : 'Processando pagamento'}</div><div className="text-sm" style={{ color: palette.textMuted }}>Aproxime ou insira o cartão no terminal</div></div><div className="text-2xl font-semibold" style={{ color: palette.text, ...numeric }}>{formatBRL(total)}</div></> : <><CheckCircle2 size={40} color={palette.highlight} /><div className="text-lg font-semibold" style={{ color: palette.text }}>Pagamento aprovado</div></>}</div>; }
function SuccessScreen({ orderNumber, onNewOrder }: { orderNumber: number | null; onNewOrder: () => void }) { return <div className="h-full flex flex-col items-center justify-center px-8 text-center gap-6"><div className="flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: palette.surface, border: `1px solid ${palette.border}` }}><CheckCircle2 size={30} color={palette.highlight} /></div><div><div className="text-2xl font-semibold mb-3" style={{ color: palette.text }}>Compra realizada!</div><div className="text-sm mb-1" style={{ color: palette.textMuted }}>Pedido</div><div className="text-lg font-semibold mb-4" style={{ color: palette.highlight, ...numeric }}>#{orderNumber}</div><div className="text-sm" style={{ color: palette.textMuted }}>Obrigado pela sua compra.</div></div><button onClick={onNewOrder} className="w-full py-4 rounded-2xl font-semibold active:scale-95 transition-transform" style={{ background: palette.accent, color: palette.onAccent }}>Nova compra</button></div>; }
