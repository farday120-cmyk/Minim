import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: "Nebula Pro Mousepad",
    subtitle: "Ultra smooth. Maximum precision.",
    badge: "Limited Edition",
    image: "https://images.unsplash.com/photo-1615494488192-7f231c1fce95?auto=format&q=60&w=1200",
    color: "from-indigo-600 to-violet-700"
  },
  {
    id: 2,
    title: "Vanguard Elite Mouse",
    subtitle: "Engineered for elite control.",
    badge: "Top Seller",
    image: "https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3?auto=format&q=60&w=1200",
    color: "from-slate-800 to-slate-900"
  },
  {
    id: 3,
    title: "Cyber Deck Keyboard",
    subtitle: "The ultimate hybrid surface.",
    badge: "New Arrival",
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&q=60&w=1200",
    color: "from-blue-600 to-indigo-800"
  }
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-24 pb-8 px-6 lg:pt-32">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-950/20 border border-white/5 min-h-[380px] lg:min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="absolute inset-0 transform-gpu"
          >
            {/* Background Image */}
            <div className="absolute top-0 right-0 w-[85%] h-full opacity-60 pointer-events-none">
              <img 
                src={banners[index].image} 
                alt={banners[index].title} 
                className="w-full h-full object-contain scale-125 translate-x-10 translate-y-10 rotate-[-10deg]"
              />
            </div>

            <div className="relative z-10 flex flex-col items-start h-full p-8">
              <div className="w-full flex justify-end mb-8">
                 <div className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-[8px] font-black uppercase tracking-widest text-violet-300">
                  {banners[index].badge}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="text-violet-500 font-bold tracking-tight text-[10px] uppercase">Elite Hardware</h4>
                <h1 className="text-3xl font-black tracking-tighter text-white leading-[1.1] uppercase">
                  {banners[index].title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>{word} <br /></React.Fragment>
                  ))}
                </h1>
                <p className="text-white/40 text-xs max-w-[160px] leading-relaxed font-medium">
                  {banners[index].subtitle}
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 bg-violet-600 hover:bg-violet-500 text-white pl-6 pr-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] border border-violet-400/30"
              >
                Shop Now
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-8 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'w-2 bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
