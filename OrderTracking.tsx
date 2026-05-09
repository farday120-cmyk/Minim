import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, ChevronLeft, CheckCircle2, Box } from 'lucide-react';

interface OrderGroup {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: string;
  isDelivered?: boolean;
}

interface TrackingProps {
  onBack: () => void;
  orders: OrderGroup[];
  initialSelectedId?: string | null;
}

const OrderTracking: React.FC<TrackingProps> = ({ onBack, orders, initialSelectedId }) => {
  const [view, setView] = React.useState<'list' | 'detail'>(initialSelectedId ? 'detail' : 'list');
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(initialSelectedId || null);

  const steps = [
    { status: 'Order Placed', time: '10:30 AM', desc: 'Hardware components confirmed', completed: true },
    { status: 'Processing', time: '01:15 PM', desc: 'Custom surface printing started', completed: true },
    { status: 'Quality Check', time: '04:00 PM', desc: 'Laser precision measurement', completed: true },
    { status: 'Out for Delivery', time: 'Pending', desc: 'Elite courier dispatched', current: true },
  ];

  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  if (view === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="fixed inset-0 z-[60] bg-[#020412] overflow-y-auto pb-32"
      >
        <div className="pt-24 px-6 space-y-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-black text-white">Your Orders</h2>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full mx-auto flex items-center justify-center border border-white/5">
                  <Package size={32} className="text-white/20" />
                </div>
                <p className="text-white/40 text-sm font-medium">No gear deployed yet.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="glass-card p-5 space-y-4 border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] text-violet-400 font-black uppercase tracking-widest">Order ID: {order.id}</p>
                      <p className="text-xs text-white/40 font-bold">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-lg font-black text-white">৳{Math.floor(order.total)}</p>
                  </div>

                  <div className="flex -space-x-4 overflow-hidden">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-xl border-2 border-[#020412] overflow-hidden bg-white/5 shadow-xl">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-xl border-2 border-[#020412] bg-indigo-900 flex items-center justify-center text-[10px] font-bold">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${order.isDelivered ? 'bg-emerald-500' : 'bg-violet-500 animate-pulse'}`} />
                       <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                         {order.isDelivered ? 'Delivered' : 'In Transit'}
                       </span>
                    </div>
                    
                    {order.isDelivered ? (
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] px-4 py-2 bg-emerald-500/10 rounded-full">Received</span>
                    ) : (
                      <button 
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setView('detail');
                        }}
                        className="px-6 py-2 rounded-full bg-violet-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-violet-900/20 active:scale-95 transition-all"
                      >
                        Track
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed inset-0 z-[60] bg-[#020412] overflow-y-auto pb-32"
    >
      <div className="pt-24 px-6 space-y-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('list')}
            className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-white">Live Status</h2>
            <p className="text-violet-400 text-[10px] font-black uppercase tracking-widest">Package Deployment</p>
          </div>
        </div>

        {selectedOrder && (
          <motion.div 
            key={selectedOrder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="glass-card p-6 border-violet-500/20 relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                      <Box size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Shipment Group</p>
                      <h3 className="text-lg font-black text-white">ID: {selectedOrder.id}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Hardware in package:</p>
                     <div className="grid grid-cols-1 gap-2">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
                             <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                             </div>
                             <span className="text-[11px] font-bold text-white/80 truncate">{item.name}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6 pl-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Delivery Log</h4>
              
              <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/5" />
                
                {steps.map((step, i) => (
                  <div key={i} className="relative flex gap-6">
                    <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-violet-600' : step.current ? 'bg-violet-400 animate-pulse' : 'bg-white/5'}`}>
                      {step.completed && <CheckCircle2 size={14} className="text-white" />}
                      {step.current && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-3">
                        <h5 className={`text-sm font-black ${step.completed || step.current ? 'text-white' : 'text-white/30'}`}>
                          {step.status}
                        </h5>
                        <span className="text-[10px] font-bold text-white/20">{step.time}</span>
                      </div>
                      <p className="text-xs text-white/40 font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-5 rounded-[2rem] bg-white/[0.03] border border-white/10 font-black text-xs uppercase tracking-widest text-white backdrop-blur-2xl flex items-center justify-center gap-3">
              <MapPin size={18} className="text-violet-400" />
              View Tracking Map
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderTracking;
