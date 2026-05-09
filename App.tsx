import React, { useState, useCallback, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WelcomePopup from '@/components/WelcomePopup';
import TrendingSection from '@/components/TrendingSection';
import CustomizeSection from '@/components/CustomizeSection';
import ServicesSection from '@/components/ServicesSection';
import BottomNav from '@/components/BottomNav';
import BackgroundEffect from '@/components/BackgroundEffect';
import ReviewSection from '@/components/ReviewSection';
import { ShopSection } from '@/components/ShopSection';
import { ProfileSection } from '@/components/ProfileSection';
import ProductDetail from '@/components/ProductDetail';
import OrderTracking from '@/components/OrderTracking';
import CheckoutView from '@/components/CheckoutView';
import ChatSection from '@/components/ChatSection';
import NotificationView, { Notification } from '@/components/NotificationView';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const HomeView = React.memo(({ onSelectProduct, onAddToCart }: { onSelectProduct: (p: any) => void, onAddToCart: (e: React.MouseEvent, p: any) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-4 pointer-events-auto"
  >
    <Hero />
    <TrendingSection onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
    <ReviewSection />
    <ServicesSection />
  </motion.div>
));

const CustomizeView = React.memo(() => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="pt-24 min-h-screen pb-32"
  >
    <CustomizeSection />
    <div className="px-6 space-y-6">
      <h3 className="text-xl font-bold text-white uppercase italic">Recent Creations</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card aspect-square flex items-center justify-center text-white/20 border-dashed border-2 rounded-[2rem]">
           No recent designs
        </div>
        <div className="glass-card aspect-square flex items-center justify-center text-white/20 border-dashed border-2 rounded-[2rem]">
           + New Project
        </div>
      </div>
    </div>
  </motion.div>
));

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [flyingItems, setFlyingItems] = useState<{ id: number; x: number; y: number; image: string }[]>([]);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [lastOrderedId, setLastOrderedId] = useState<string | null>(null);
  const [showChatPopup, setShowChatPopup] = useState<{show: boolean, msg: string}>({ show: false, msg: '' });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'update',
      title: 'V2.0 Core Update',
      message: 'Systems recalibrated. New liquid animations deployed to navigation arrays.',
      time: 'Just Now',
      isRead: false
    }
  ]);

  const addNotification = useCallback((type: Notification['type'], title: string, message: string) => {
    setNotifications(prev => [{
      id: Date.now(),
      type,
      title,
      message,
      time: 'Just Now',
      isRead: false
    }, ...prev]);
  }, []);

  const handleAdminMessage = useCallback((msg: string) => {
    addNotification('status', 'New Message', msg);
    setShowChatPopup({ show: true, msg });
    setTimeout(() => setShowChatPopup({ show: false, msg: '' }), 4000);
  }, [addNotification]);

  const handleProductSelect = useCallback((product: any) => {
    const fullProduct = {
      ...product,
      description: 'Engineered for competitive excellence, this premium surface offers the perfect balance of friction and glide. Features triple-stitched anti-fray edges and a non-slip natural rubber base.',
      rating: 4.9,
      reviews: 128
    };
    setSelectedProduct(fullProduct);
  }, []);

  const addToCart = useCallback((e: React.MouseEvent, product: any) => {
    const x = e.clientX;
    const y = e.clientY;
    const flyingId = Date.now();
    setFlyingItems(prev => [...prev, { id: flyingId, x, y, image: product.image }]);
    
    setTimeout(() => {
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { 
          id: product.id, 
          name: product.name, 
          price: parseFloat(product.price), 
          image: product.image, 
          quantity: 1 
        }];
      });
      setFlyingItems(prev => prev.filter(item => item.id !== flyingId));
      setShowCartSuccess(true);
      setTimeout(() => setShowCartSuccess(false), 2000);
    }, 800);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, q: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  }, []);

  const handleCheckoutNow = useCallback((product: any) => {
    // Optimized immediate feedback
    setSelectedProduct(null);
    
    // Batch updates to avoid double render
    requestAnimationFrame(() => {
      setIsCheckoutOpen(true);
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) return prev;
        return [...prev, { 
          id: product.id, 
          name: product.name, 
          price: parseFloat(product.price), 
          image: product.image, 
          quantity: 1 
        }];
      });
    });
  }, []);

  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const renderContent = () => {
    if (isNotificationsOpen) return (
      <NotificationView 
        notifications={notifications} 
        onBack={() => setIsNotificationsOpen(false)}
        onClear={() => setNotifications([])}
      />
    );
    if (isTrackingOpen) return (
      <OrderTracking 
        onBack={() => {
          setIsTrackingOpen(false);
          setLastOrderedId(null);
        }} 
        orders={orders} 
        initialSelectedId={lastOrderedId}
      />
    );
    
    switch (activeTab) {
      case 'home': return <HomeView onSelectProduct={handleProductSelect} onAddToCart={addToCart} />;
      case 'customize': return <CustomizeView />;
      case 'shop': return <ShopSection onSelectProduct={handleProductSelect} onAddToCart={addToCart} />;
      case 'profile': return <ProfileSection />;
      case 'chat': return (
        <ChatSection 
          onBack={() => setActiveTab('home')} 
          onNewAdminMessage={handleAdminMessage}
        />
      );
      default: return <HomeView onSelectProduct={handleProductSelect} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-violet-500/30 overflow-x-hidden bg-[#020412]">
      <BackgroundEffect />
      <WelcomePopup />
      <Navbar 
        customCartCount={cartCount} 
        notificationCount={notifications.filter(n => !n.isRead).length}
        activeView={isTrackingOpen ? 'tracking' : isNotificationsOpen ? 'notifications' : isCheckoutOpen ? 'cart' : (activeTab === 'chat' ? 'chat' : '')}
        onCartClick={() => {
            if(cartItems.length > 0) {
              setIsCheckoutOpen(true);
              setIsNotificationsOpen(false);
              setIsTrackingOpen(false);
            } else {
              alert("Add hardware to proceed.");
            }
        }} 
        onTrackingClick={() => {
          setIsTrackingOpen(!isTrackingOpen);
          setIsNotificationsOpen(false);
          setIsCheckoutOpen(false);
        }}
        onNotificationsClick={() => {
            setIsNotificationsOpen(!isNotificationsOpen);
            setIsTrackingOpen(false);
            setIsCheckoutOpen(false);
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        }}
      />
      
      <main className="max-w-7xl mx-auto relative z-10 pointer-events-auto lg:px-8">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutView 
            items={cartItems}
            onBack={() => setIsCheckoutOpen(false)}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onOrderSuccess={(orderedItems) => {
                const orderId = `MG-${Math.floor(10000 + Math.random() * 90000)}`;
                const newOrder = {
                    id: orderId,
                    date: new Date().toISOString(),
                    items: [...orderedItems],
                    total: orderedItems.reduce((acc, i) => acc + (i.price * i.quantity), 0) + 80,
                    status: 'In Transit'
                };
                setOrders([newOrder, ...orders]);
                setLastOrderedId(orderId);
                addNotification('order', 'Deployment Confirmed', `Order ${orderId} placed successfully.`);
                setIsCheckoutOpen(false);
                setCartItems([]);
                setIsTrackingOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCartSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-violet-600 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.6)] flex items-center gap-3 border border-violet-400/30"
          >
            <CheckCircle2 size={18} />
            <span className="text-sm font-black uppercase tracking-widest whitespace-nowrap text-white">Product added to cart</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flyingItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ x: item.x - 40, y: item.y - 40, scale: 1, opacity: 1, borderRadius: "0px" }}
            animate={{ 
              x: window.innerWidth > 768 ? window.innerWidth / 2 + 150 : window.innerWidth - 40, 
              y: 20, 
              scale: 0.1, 
              opacity: 0.8,
              borderRadius: "50px"
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed z-[100] w-20 h-20 overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.6)] pointer-events-none"
          >
            <img src={item.image} alt="flying product" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-violet-500/30" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
            onAddToCart={addToCart}
            onCheckoutNow={handleCheckoutNow}
          />
        )}
      </AnimatePresence>

      {/* Chat Notification Popup */}
      <AnimatePresence>
        {showChatPopup.show && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            onClick={() => {
              setActiveTab('chat');
              setShowChatPopup({ show: false, msg: '' });
            }}
            className="fixed top-24 right-6 left-6 z-[100] bg-white/5 backdrop-blur-xl p-4 flex items-center gap-4 border border-violet-500/50 rounded-3xl shadow-[0_10px_30px_rgba(139,92,246,0.3)] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
               <MessageCircle size={20} className="text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-[10px] font-black uppercase text-violet-400 tracking-widest">Admin Message</p>
               <p className="text-sm font-bold text-white truncate">{showChatPopup.msg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav 
        activeTab={(isTrackingOpen || isCheckoutOpen || isNotificationsOpen) ? '' : activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsTrackingOpen(false);
          setIsCheckoutOpen(false);
          setIsNotificationsOpen(false);
        }} 
      />
    </div>
  );
};

export default App;
