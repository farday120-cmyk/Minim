import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Zishan Ahmed",
    role: "Professional Gamer",
    comment: "The surface quality of the Nebula Pro is unmatched. My aim has never been this consistent!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    id: 2,
    name: "Samiul Haque",
    role: "Creative Designer",
    comment: "Customizing my own mousepad was so easy. The colors came out exactly like the preview.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    id: 3,
    name: "Rayan Kabir",
    role: "Elite Streamer",
    comment: "Minimalist Gaming provides the best gear for long sessions. Super comfortable and stylish.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=3"
  }
];

const ReviewSection: React.FC = () => {
  return (
    <section className="px-6 py-8 space-y-8">
      {/* Social Links Panel */}
      <div className="glass-card p-6 border-white/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">Connect With Us</h4>
          <div className="h-px flex-1 bg-white/5 ml-4" />
        </div>
        
        <div className="flex gap-4">
          <motion.a 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://facebook.com" target="_blank" rel="noreferrer"
            className="flex-1 glass-card py-4 flex items-center justify-center border-white/10 hover:border-blue-500/50 transition-all group"
          >
            <div className="text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </div>
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://instagram.com" target="_blank" rel="noreferrer"
            className="flex-1 glass-card py-4 flex items-center justify-center border-white/10 hover:border-pink-500/50 transition-all group"
          >
            <div className="text-pink-500 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/yournumber" target="_blank" rel="noreferrer"
            className="flex-1 glass-card py-4 flex items-center justify-center border-white/10 hover:border-emerald-500/50 transition-all group"
          >
            <div className="text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
          </motion.a>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight text-white uppercase italic">Customer Stories</h2>
        <Quote size={20} className="text-violet-500 opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <motion.div 
            key={review.id}
            whileHover={{ y: -5 }}
            className="w-full glass-card p-6 lg:p-8 border-white/5 space-y-4 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-violet-500/30 p-0.5">
                <img src={review.avatar} alt={review.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">{review.name}</h4>
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">{review.role}</p>
              </div>
            </div>

            <div className="flex text-violet-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
              ))}
            </div>

            <p className="text-xs text-white/60 leading-relaxed italic">
              "{review.comment}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
