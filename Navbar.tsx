import React from 'react';
import { ShoppingCart, Truck, Bell } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavbarProps {
  customCartCount?: number;
  notificationCount?: number;
  onCartClick?: () => void;
  onTrackingClick?: () => void;
  onNotificationsClick?: () => void;
  activeView?: string;
}

const Navbar: React.FC<NavbarProps> = React.memo(({ 
  customCartCount = 0, 
  notificationCount = 0,
  onCartClick, 
  onTrackingClick,
  onNotificationsClick,
  activeView
}) => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(2, 4, 18, 0)', 'rgba(2, 4, 18, 0.8)']
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(16px)']
  );

  const isSolid = activeView === 'tracking' || activeView === 'notifications' || activeView === 'cart' || activeView === 'chat';

  return (
    <motion.nav
      style={{ 
        backgroundColor: isSolid ? 'rgba(2, 6, 23, 0.98)' : backgroundColor, 
        backdropFilter: isSolid ? 'blur(20px)' : backdropFilter 
      }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-center transition-all ${isSolid ? 'border-b border-white/5 shadow-2xl' : ''}`}
    >
      <div className="w-full max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            {/* Logo Outline Loop Animation */}
            <div className="logo-outline-loop" />
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#020617] border border-white/10 shadow-2xl">
              <img 
                src="https://www.image2url.com/r2/default/images/1778262434194-923d9ba6-3320-4159-b876-50ca3ea3b53a.jpeg" 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
              {/* Lens Flare Animation inside Logo */}
              <div className="logo-lens-flare">
                <div className="logo-flare-line" />
              </div>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-lg tracking-tight">Minimalist</span>
            <span className="text-violet-400 text-sm font-semibold tracking-wide uppercase tracking-[0.1em]">Gaming</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/80 relative z-[100]">
          {/* Tracking Icon */}
          <button 
            onClick={onTrackingClick}
            className="relative hover:text-violet-400 transition-colors pointer-events-auto p-2"
          >
            {activeView === 'tracking' && <div className="nav-icon-active-outline" />}
            <Truck size={22} className={activeView === 'tracking' ? 'text-violet-400' : ''} />
          </button>
          
          {/* Notifications Icon */}
          <button 
            onClick={onNotificationsClick}
            className="relative hover:text-violet-400 transition-colors pointer-events-auto p-2"
          >
            {activeView === 'notifications' && <div className="nav-icon-active-outline" />}
            <Bell size={22} className={activeView === 'notifications' ? 'text-violet-400' : ''} />
            {notificationCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 bg-indigo-500 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#020412]"
              >
                {notificationCount}
              </motion.span>
            )}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onCartClick?.();
            }}
            className="relative hover:text-violet-400 transition-colors pointer-events-auto p-2"
          >
            {activeView === 'cart' && <div className="nav-icon-active-outline" />}
            <ShoppingCart size={22} className={activeView === 'cart' ? 'text-violet-400' : ''} />
            {customCartCount > 0 && (
              <motion.span 
                key={customCartCount}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-1 right-1 bg-violet-600 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#020412]"
              >
                {customCartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
});

export default Navbar;
