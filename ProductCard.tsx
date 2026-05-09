import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Eye } from 'lucide-react';

interface ProductProps {
  id: number;
  name: string;
  type: string;
  price: string;
  image: string;
  isBestSeller?: boolean;
  onViewDetails?: () => void;
  onAddToCart?: (e: React.MouseEvent, product: any) => void;
}

const ProductCard: React.FC<ProductProps> = React.memo((props) => {
  const { name, type, price, image, isBestSeller, onViewDetails, onAddToCart } = props;
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative group w-full"
    >
      <div className="bg-indigo-950/10 backdrop-blur-md overflow-hidden rounded-[2rem] border border-white/5 group-hover:border-violet-500/30 transition-all duration-300 shadow-xl">
        <div className="relative h-40 overflow-hidden bg-white/5">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/40 group-hover:text-violet-400 transition-colors z-10">
            <Heart size={16} fill={isBestSeller ? 'currentColor' : 'none'} className={isBestSeller ? 'text-violet-500' : ''} />
          </button>

          {isBestSeller && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-violet-600/20 backdrop-blur-md border border-violet-500/30 rounded-lg text-[7px] font-bold uppercase tracking-widest text-violet-300 z-10">
              Best Seller
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-0.5">
            <h3 className="text-white font-bold text-[13px] tracking-tight truncate">{name}</h3>
            <p className="text-white/30 text-[9px] font-medium">{type}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-violet-400 font-extrabold text-[13px] tracking-tight">${price}</span>
            <div className="flex items-center gap-2">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails?.();
                }}
                className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10"
              >
                <Eye size={16} />
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(e, props);
                }}
                className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <Plus size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;
