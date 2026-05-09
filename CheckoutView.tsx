import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, User, Phone, MapPin, CheckCircle2, ArrowRight, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, q: number) => void;
  onOrderSuccess: (items: CartItem[]) => void;
}

const CheckoutView: React.FC<CheckoutProps> = ({ items, onBack, onOrderSuccess, onRemove, onUpdateQuantity }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [deliveryArea, setDeliveryArea] = useState<'inside' | 'outside'>('inside');
  const [formData, setForm] = useState({ name: '', phone: '', address: '' });

  const subtotal = Math.floor(items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
  const deliveryCharge = deliveryArea === 'inside' ? 80 : 130;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = () => {
    if (formData.name && formData.phone && formData.address) {
      setStep('success');
    } else {
      alert("Please provide all required information.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed inset-0 z-[70] bg-[#020412] overflow-y-auto"
    >
      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 px-6 space-y-8 pb-48 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Order Details</h2>
            </div>

            {/* Cart Items Summary */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Items In Gear Bag</h4>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="glass-card p-3 flex gap-4 border-white/5 relative">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-xs font-bold text-white truncate max-w-[150px]">{item.name}</h4>
                      <p className="text-violet-400 font-black text-xs">৳{Math.floor(item.price)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-6 h-6 rounded bg-white/5 text-xs text-white">-</button>
                       <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded bg-white/5 text-xs text-white">+</button>
                       <button onClick={() => onRemove(item.id)} className="text-white/20 ml-2 hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Customer Information</h4>
                <div className="glass-card p-4 flex items-center gap-4 border-white/10">
                  <User size={20} className="text-white/20" />
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="bg-transparent border-none outline-none text-sm w-full text-white" 
                    onChange={e => setForm({...formData, name: e.target.value})}
                  />
                </div>
                <div className="glass-card p-4 flex items-center gap-4 border-white/10">
                  <Phone size={20} className="text-white/20" />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="bg-transparent border-none outline-none text-sm w-full text-white" 
                    onChange={e => setForm({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="glass-card p-4 flex items-start gap-4 border-white/10">
                  <MapPin size={20} className="text-white/20 mt-1" />
                  <textarea 
                    placeholder="Full Delivery Address" 
                    className="bg-transparent border-none outline-none text-sm w-full text-white min-h-[80px] resize-none" 
                    onChange={e => setForm({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              {/* Delivery Area Selection */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Delivery Area</h4>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setDeliveryArea('inside')}
                    className={`flex-1 py-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${deliveryArea === 'inside' ? 'bg-violet-600/20 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-white/5 border-white/5 text-white/40'}`}
                  >
                    Inside Dhaka (৳80)
                  </button>
                  <button 
                    onClick={() => setDeliveryArea('outside')}
                    className={`flex-1 py-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${deliveryArea === 'outside' ? 'bg-violet-600/20 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-white/5 border-white/5 text-white/40'}`}
                  >
                    Outside Dhaka (৳130)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculations and CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#020412] via-[#020412]/95 to-transparent z-[80]">
              <div className="max-w-md mx-auto space-y-4">
                 <div className="glass-card p-4 border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-white/40">Subtotal</span>
                       <span className="text-white">৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-white/40">Delivery Charge</span>
                       <span className="text-white">৳{deliveryCharge}</span>
                    </div>
                    <div className="h-px bg-white/5 my-2" />
                    <div className="flex justify-between items-center">
                       <span className="text-violet-400 text-xs font-black uppercase tracking-widest">Total Amount</span>
                       <span className="text-2xl font-black text-white">৳{total}</span>
                    </div>
                 </div>
                 <button 
                  onClick={handlePlaceOrder}
                  className="w-full py-5 rounded-[2rem] bg-violet-600 font-black text-xs uppercase tracking-[0.2em] text-white shadow-[0_15px_40px_rgba(139,92,246,0.4)] border border-violet-400/30 transition-all flex items-center justify-center gap-3"
                >
                  Place Order
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inset-0 flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-8"
          >
            <div className="relative">
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)] border border-violet-400/30"
              >
                <CheckCircle2 size={56} className="text-white" />
              </motion.div>
              <div className="absolute inset-0 rounded-full border-2 border-violet-400/30 animate-ping" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-1"
            >
              <motion.h2 
                animate={{ 
                  textShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.5)", "0 0 0px rgba(139,92,246,0)"] 
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xl font-bold text-white uppercase tracking-[0.3em]"
              >
                Order Confirmed
              </motion.h2>
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mt-2 opacity-50" />
            </motion.div>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOrderSuccess(items)}
              className="px-12 py-4 rounded-2xl bg-[#0a0b1e] border border-violet-500/30 font-black text-[10px] uppercase tracking-[0.3em] text-white shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:border-violet-500/60 transition-all flex items-center gap-3"
            >
              Order Track
              <ArrowRight size={16} className="text-violet-400" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CheckoutView;
