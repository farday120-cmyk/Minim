import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box } from 'lucide-react';

const CustomizeSection: React.FC = () => {
  return (
    <section className="px-6 py-8">
      <div className="relative overflow-hidden bg-indigo-950/20 rounded-[2.5rem] border border-white/5 p-8 pb-10">
        {/* Background Preview */}
        <div className="absolute top-0 right-[-10%] w-[60%] h-full opacity-40 pointer-events-none">
           <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&q=60&w=1200" 
            alt="AI Preview" 
            className="w-full h-full object-contain translate-y-4"
          />
        </div>

        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-4">
             <div className="relative">
                <div className="w-14 h-14 bg-violet-600/20 rounded-2xl flex items-center justify-center border border-violet-500/30 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent" />
                   <Box className="text-violet-400 relative z-10" size={28} />
                </div>
                {/* Hexagon Outline Effect */}
                <div className="absolute -inset-1 border border-violet-500/10 rounded-2xl -z-10 rotate-12" />
             </div>
             <div>
                <p className="text-[9px] font-bold text-violet-500 uppercase tracking-widest mb-1">AI Powered</p>
                <h3 className="text-2xl font-extrabold text-white leading-tight">Customize Your <br /> Mousepad</h3>
             </div>
          </div>

          <p className="text-white/40 text-xs leading-relaxed max-w-[180px]">
            Design it. Preview it. <br /> Make it yours.
          </p>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold text-sm shadow-[0_10px_30px_rgba(139,92,246,0.3)] border border-violet-400/20 transition-all"
          >
            Customize Now
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CustomizeSection;
