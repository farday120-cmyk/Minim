import React from 'react';
import { LayoutGrid, Square, MousePointer2, Grid3X3 } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: LayoutGrid },
  { id: 'pads', name: 'Mousepads', icon: Square },
  { id: 'skates', name: 'Mouse Skates', icon: MousePointer2 },
  { id: 'acc', name: 'Accessories', icon: Grid3X3 },
];

interface CategoryChipsProps {
  active: string;
  onSelect: (id: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ active, onSelect }) => {
  return (
    <div className="flex gap-4 px-0 overflow-x-auto no-scrollbar py-2">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-3 px-6 py-3.5 rounded-[1.5rem] whitespace-nowrap transition-all border ${
              isActive 
                ? 'bg-violet-600/20 border-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                : 'bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            <Icon size={18} className={isActive ? 'text-violet-400' : 'text-white/40'} />
            <span className="text-sm font-bold tracking-tight">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
