import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Heart, ShieldCheck, Truck, Zap, ArrowRight, Play, X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  type: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (e: React.MouseEvent, product: any) => void;
  onCheckoutNow?: (product: any) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = React.memo(({ product, onBack, onAddToCart, onCheckoutNow }) => {
  const images = useMemo(() => [
    product.image, 
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&q=60&w=1200", 
    "https://images.unsplash.com/photo-1541462608141-ad43b37803ac?auto=format&q=60&w=1200"
  ], [product.image]);
  const [currentImg, setCurrentImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[60] bg-[#020412] overflow-y-auto pointer-events-auto selection:bg-violet-500/40 transform-gpu"
    >
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="relative w-full max-w-2xl aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-950/20">
                  <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center animate-pulse">
                     <Play fill="white" size={32} />
                  </div>
                  <p className="mt-4 font-black uppercase tracking-widest text-[10px] text-white/60">Cinematic Preview Loading...</p>
               </div>
               <button 
                 onClick={() => setShowVideo(false)}
                 className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white"
               >
                 <X size={20} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-violet-600/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md mx-auto px-4 pt-6">
        <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl">
          <div className="product-lens-flare" />
          <div className="absolute inset-0 bg-[#0a0b1e]/60 backdrop-blur-xl z-0" />
          
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImg}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              src={images[currentImg]} 
              alt={product.name} 
              className="relative z-10 w-full h-full object-cover p-2 rounded-[3rem]"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#020412] via-transparent to-transparent z-20 opacity-80" />
          
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-30">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-black/30 backdrop-blur-xl flex items-center justify-center text-white border border-white/10"
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-2xl bg-black/30 backdrop-blur-xl flex items-center justify-center text-white border border-white/10">
                <Heart size={20} />
              </button>
            </div>
          </div>

          <motion.button 
            onClick={() => setShowVideo(true)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-20 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-violet-600/90 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] border border-white/20"
          >
            <Play size={12} fill="currentColor" />
            Watch Video
          </motion.button>

          <div className="absolute bottom-10 right-8 z-30 flex gap-2">
             {images.map((_, i) => (
               <button 
                key={i} 
                onClick={() => setCurrentImg(i)}
                className={`h-1 rounded-full transition-all duration-300 ${currentImg === i ? 'w-8 bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'w-2 bg-white/10'}`}
               />
             ))}
          </div>

          <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-2">
             <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-xl text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-white border border-white/10">
                <Zap size={10} fill="currentColor" className="text-violet-400" />
                Gallery View
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-8 mt-6 space-y-8 pb-48">
        <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md shadow-xl">
          <h1 className="text-xl font-bold text-white tracking-tight leading-tight">{product.name}</h1>
          <p className="text-xl font-black text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">৳{Math.floor(Number(product.price))}</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-[2rem] blur-md opacity-50 transition duration-1000" />
          <div className="relative p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-2 text-white">
               <div className="w-1 h-3 bg-violet-500 rounded-full" />
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Product Overview</h4>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-medium">
              {product.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/5">
            <ShieldCheck className="text-violet-400" size={18} />
            <div>
               <p className="text-[10px] font-bold text-white uppercase tracking-tight">Verified</p>
               <p className="text-[8px] text-white/30 uppercase font-black">Quality Cover</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/5">
            <Truck className="text-violet-400" size={18} />
            <div>
               <p className="text-[10px] font-bold text-white uppercase tracking-tight">Deployment</p>
               <p className="text-[8px] text-white/30 uppercase font-black">Global Ship</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 right-8 z-[70] pointer-events-none">
        <div className="max-w-md mx-auto flex items-center justify-around bg-[#0a0b1e]/90 backdrop-blur-3xl rounded-[2.5rem] p-2 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(139,92,246,0.1)] pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => onAddToCart?.(e, product)}
            className="flex-1 py-4 rounded-[2rem] bg-white/[0.03] border border-white/5 font-black text-[10px] uppercase tracking-widest text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          >
            <ShoppingBag size={16} className="text-violet-400" />
            Add to Cart
          </motion.button>
          
          <div className="w-px h-6 bg-white/10 mx-2" />

          <motion.button 
            whileTap={{ scale: 0.96, backgroundColor: "rgba(124, 58, 237, 1)" }}
            onClick={(e) => {
              e.stopPropagation();
              
              // Haptic feedback (10ms)
              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate(10);
              }

              // Instant visual paint
              requestAnimationFrame(() => {
                // Execute logic in next frame to prevent UI blocking
                setTimeout(() => {
                  onCheckoutNow?.(product);
                }, 16); // ~1 frame delay for background processing
              });
            }}
            className="flex-1 py-4 rounded-[2rem] bg-violet-600 font-black text-[10px] uppercase tracking-widest text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-violet-400/30 flex items-center justify-center gap-2 transition-transform transform-gpu"
          >
            <ArrowRight size={16} />
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductDetail;
