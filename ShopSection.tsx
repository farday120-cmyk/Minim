import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CategoryChips from './CategoryChips';
import { Search, SlidersHorizontal } from 'lucide-react';

const products = [
  { id: 1, name: 'Obsidian Flow', type: 'Control Surface', price: '39.99', image: 'https://images.unsplash.com/photo-1615494488192-7f231c1fce95?auto=format&fm=webp&q=40&w=500', category: 'pads' },
  { id: 2, name: 'Ink Wave XL', type: 'Speed Surface', price: '44.99', image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fm=webp&q=40&w=500', isBestSeller: true, category: 'pads' },
  { id: 3, name: 'Voidscape', type: 'Hybrid Surface', price: '42.99', image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fm=webp&q=40&w=500', category: 'pads' },
  { id: 4, name: 'Superglide 2', type: 'Glass Skates', price: '24.99', image: 'https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3?auto=format&fm=webp&q=40&w=500', category: 'skates' },
  { id: 5, name: 'Crimson Nebula', type: 'Soft Surface', price: '49.99', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba326b?auto=format&fm=webp&q=40&w=500', category: 'pads' },
  { id: 6, name: 'Apex Grip', type: 'Pro Accessories', price: '15.99', image: 'https://images.unsplash.com/photo-1616533382363-5e163837ea2f?auto=format&fm=webp&q=40&w=500', category: 'acc' },
];

interface ShopSectionProps {
  onSelectProduct: (product: any) => void;
  onAddToCart: (e: React.MouseEvent, product: any) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ onSelectProduct, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = products.filter(p => activeCategory === 'all' || p.category === activeCategory);

  return (
    <div className="pt-24 space-y-6 pb-32">
      <div className="px-6 space-y-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">Minimalist <br /> Gaming Store</h2>
        
        <div className="flex gap-3">
          <div className="flex-1 glass-card p-4 flex items-center gap-3 border-white/10">
            <Search size={20} className="text-white/40" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none text-sm w-full text-white pointer-events-auto" 
            />
          </div>
          <button className="glass-card p-4 border-white/10 text-violet-400 pointer-events-auto hover:bg-white/5 transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="px-6">
        <CategoryChips active={activeCategory} onSelect={setActiveCategory} />
      </div>

      <div className="px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map(p => (
          <ProductCard 
            key={p.id} 
            {...p} 
            onViewDetails={() => onSelectProduct(p)} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
