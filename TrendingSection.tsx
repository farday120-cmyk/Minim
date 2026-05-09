import React from 'react';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

const products = [
  { id: 1, name: 'Obsidian Flow', type: 'Control Surface', price: '39.99', image: 'https://images.unsplash.com/photo-1615494488192-7f231c1fce95?auto=format&q=60&w=800' },
  { id: 2, name: 'Vanguard Mouse', type: 'Pro Gaming Mouse', price: '89.99', image: 'https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3?auto=format&q=60&w=800', isBestSeller: true },
  { id: 3, name: 'Ink Wave XL', type: 'Speed Surface', price: '44.99', image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&q=60&w=800' },
];

interface TrendingSectionProps {
  onSelectProduct: (product: any) => void;
  onAddToCart: (e: React.MouseEvent, product: any) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ onSelectProduct, onAddToCart }) => {
  return (
    <section className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">Trending Now</h2>
        <button className="flex items-center gap-2 text-[11px] font-bold text-white/40 hover:text-violet-400 transition-colors">
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(p => (
          <div key={p.id} className="w-full">
             <ProductCard 
              {...p} 
              onViewDetails={() => onSelectProduct(p)} 
              onAddToCart={onAddToCart} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
