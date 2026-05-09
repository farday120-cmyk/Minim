import React, { useMemo } from 'react';
import { Home, ShoppingBag, PenTool, MessageCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = React.memo(({ activeTab, setActiveTab }) => {
  const tabs = useMemo(() => [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'customize', icon: PenTool, label: 'Customize' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'profile', icon: User, label: 'Profile' },
  ], []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 pt-10 bg-gradient-to-t from-[#020412] via-[#020412]/40 to-transparent pointer-events-none">
      <div className="relative bg-[#020617]/90 backdrop-blur-3xl rounded-[2rem] p-2 flex items-center justify-around inner-glow-bar pointer-events-auto max-w-[500px] mx-auto h-[88px] overflow-visible shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Lens Flare Effects */}
        <div className="lens-flare-container">
          <div className="lens-flare-top" />
          <div className="lens-flare-bottom" />
        </div>

        {/* Liquid Glass Animated Outline */}
        <div className="liquid-border" />
        
        {/* Fixed Neon Outline */}
        <div className="fixed-neon-corners" />
        
        {/* Static Base Border */}
        <div className="absolute inset-0 rounded-[1.5rem] border border-white/5 pointer-events-none" />
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCustomize = tab.id === 'customize';

          if (isCustomize) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative h-full flex items-center justify-center px-1"
                style={{ flex: '0 0 115px' }}
              >
                <motion.div 
                  whileTap={{ scale: 0.94 }}
                  className={`relative w-full h-[70px] rounded-[2rem] flex flex-col items-center justify-center gap-0.5 overflow-hidden transition-all duration-500 border ${
                    isActive 
                      ? 'bg-violet-600 border-violet-400 inner-glow-button shadow-[0_0_25px_rgba(139,92,246,0.4)]' 
                      : 'bg-white/10 border-white/5 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]'
                  }`}
                >
                  <div className={`relative z-10 flex flex-col items-center justify-center ${isActive ? 'animate-floating' : ''}`}>
                    <div className={`relative h-7 w-7 flex items-center justify-center bg-transparent ${isActive ? 'animate-neon-icon' : ''}`}>
                      <Icon 
                        size={26} 
                        strokeWidth={isActive ? 2 : 1.8}
                        className={`absolute inset-0 transition-all duration-300 ${isActive ? 'text-white/30' : 'text-white/70'}`} 
                      />
                      {isActive && (
                        <div className="absolute inset-0">
                          <Icon size={26} strokeWidth={2.5} className="text-white" />
                        </div>
                      )}
                    </div>
                    <span className={`text-[9px] font-black tracking-tight uppercase mt-0.5 transition-all duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-white/60'}`}>
                      {tab.label}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-white/10 blur-xl"
                    />
                  )}
                </motion.div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-center group relative h-full bg-transparent active:scale-95 transition-transform duration-75"
            >
              <div className={`flex flex-col items-center justify-center transition-all duration-500 ${isActive ? 'animate-floating -translate-y-2' : ''} bg-transparent`}>
                <div className="relative h-7 w-7 flex items-center justify-center bg-transparent overflow-visible">
                   <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId={`glow-${tab.id}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 bg-violet-500/10 blur-lg rounded-full"
                      />
                    )}
                  </AnimatePresence>

                  <Icon 
                    size={24} 
                    strokeWidth={isActive ? 2 : 1.8}
                    className={`absolute inset-0 transition-all duration-300 ${isActive ? 'text-violet-500/20' : 'text-white/40 group-hover:text-white/60'}`} 
                  />
                  
                  {isActive && (
                    <div className="absolute inset-0 animate-neon-icon">
                      <Icon size={24} strokeWidth={2.5} className="text-violet-400" />
                    </div>
                  )}
                </div>
                
                <span className={`text-[10px] font-black mt-0.5 transition-all duration-300 tracking-wide bg-transparent ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]' : 'text-white/40 group-hover:text-white/60'}`}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default BottomNav;
