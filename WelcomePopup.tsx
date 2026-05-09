import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Info, ExternalLink } from 'lucide-react';

const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Floating Trigger Button (appears when minimized) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed top-32 left-0 z-[200] flex items-center pointer-events-none"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              className="pointer-events-auto flex items-center gap-2 bg-violet-600/90 backdrop-blur-xl pl-3 pr-4 py-2 rounded-r-2xl border-y border-r border-violet-400/30 shadow-[0_0_20px_rgba(139,92,246,0.3)] group transition-all hover:pl-4"
            >
              <Info size={16} className="text-white" />
              <span className="text-[9px] font-black text-white uppercase tracking-wider">Contact</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 bg-black/70 backdrop-blur-[2px] pointer-events-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-sm glass-card p-8 border-violet-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transform-gpu"
            >
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-[50px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full pointer-events-none" />

              {/* Close/Minimize Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-90 z-20 border border-white/5"
              >
                <X size={20} />
              </button>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-violet-600 to-indigo-700 p-0.5 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                    <div className="w-full h-full rounded-[1.4rem] bg-[#020617] flex items-center justify-center">
                      <MessageCircle className="text-violet-400" size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Avex Studio</h3>
                </div>

                <div className="space-y-4 text-center leading-relaxed">
                  <p className="text-sm font-medium text-white/90">
                    হ্যালো, আসসালামু আলাইকুম।
                  </p>
                  <p className="text-sm font-medium text-white/70">
                    আমি <span className="text-violet-400 font-black">তাহসিন রিজন</span>, Avex Studio-এর owner এবং UI/UX ডিজাইনার। এই ওয়েবসাইটটি আপনাদের জন্য তৈরি করা হয়েছে। যদি আপনারা এই ওয়েবসাইটটি কিনতে চান, তাহলে দয়া করে WhatsApp বাটনে ক্লিক করুন।
                  </p>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/8801613911528"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-2xl bg-emerald-600 flex items-center justify-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(16,185,129,0.3)] border border-emerald-500/30 transition-all"
                >
                  <ExternalLink size={18} />
                  WhatsApp Now
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WelcomePopup;
