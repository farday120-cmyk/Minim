import React from 'react';
import { PenTool, Crown, Truck, ArrowRight } from 'lucide-react';

const services = [
  { 
    icon: PenTool, 
    title: 'Order Premium Mouse Skates', 
    desc: 'Perfect fit. Max performance.',
  },
  { 
    icon: Crown, 
    title: 'Browse Exclusive Designs', 
    desc: 'Unique art. Premium quality.',
  },
  { 
    icon: Truck, 
    title: 'Fast & Secure Shipping', 
    desc: 'Worldwide delivery. Track in real-time.',
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="px-6 py-8 space-y-6 pb-36">
      <h2 className="text-xl font-bold tracking-tight text-white">Our Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div 
              key={i}
              className="flex flex-col justify-between p-6 lg:p-8 rounded-[2rem] border border-white/5 bg-white/[0.03] min-h-[180px] lg:min-h-[220px] transition-all hover:bg-white/[0.05]"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white leading-[1.2] mb-1">{s.title}</h4>
                  <p className="text-[9px] text-white/30 leading-tight">{s.desc}</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors border border-white/5">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
