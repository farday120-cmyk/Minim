import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Info, ShoppingBag, Package, Truck, ChevronLeft, Trash2 } from 'lucide-react';

export interface Notification {
  id: number;
  type: 'update' | 'order' | 'status' | 'delivery';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationProps {
  notifications: Notification[];
  onBack: () => void;
  onClear: () => void;
}

const NotificationView: React.FC<NotificationProps> = ({ notifications, onBack, onClear }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'update': return <Info size={18} className="text-blue-400" />;
      case 'order': return <ShoppingBag size={18} className="text-violet-400" />;
      case 'status': return <Package size={18} className="text-indigo-400" />;
      case 'delivery': return <Truck size={18} className="text-emerald-400" />;
      default: return <Bell size={18} className="text-white/40" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[60] bg-[#020412] overflow-y-auto pb-32"
    >
      <div className="pt-24 px-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Comms Center</h2>
          </div>
          
          {notifications.length > 0 && (
            <button 
              onClick={onClear}
              className="text-white/20 hover:text-red-400 transition-colors p-2"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full mx-auto flex items-center justify-center border border-white/5">
                <Bell size={32} className="text-white/10" />
              </div>
              <p className="text-white/20 text-sm font-bold uppercase tracking-widest">No active signals</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <motion.div 
                layout
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-card p-5 border-white/5 relative overflow-hidden group transition-all hover:bg-white/[0.03] ${!notif.isRead ? 'border-l-2 border-l-violet-500' : ''}`}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {getIcon(notif.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[13px] font-black text-white uppercase tracking-tight">{notif.title}</h4>
                      <span className="text-[10px] font-bold text-white/20">{notif.time}</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed font-medium">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="pt-8 opacity-20">
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationView;
