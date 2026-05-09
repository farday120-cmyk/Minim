import { useState } from 'react';
import { Mail, Lock, User as UserIcon, ChevronRight, Settings, ShoppingBag, CreditCard, Bell, Heart, LogOut } from 'lucide-react';

export const ProfileSection = () => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isLogin) {
    return (
      <div className="pt-24 px-6 space-y-8 pb-32">
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Access <br /><span className="text-violet-500">Minimalist</span> Gaming</h2>
          <p className="text-white/40 text-sm">Sign in to unlock exclusive custom designs and rewards.</p>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-4 flex items-center gap-4 border-white/10">
            <Mail size={20} className="text-violet-400" />
            <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-sm w-full text-white" />
          </div>
          <div className="glass-card p-4 flex items-center gap-4 border-white/10">
            <Lock size={20} className="text-violet-400" />
            <input type="password" placeholder="Password" className="bg-transparent border-none outline-none text-sm w-full text-white" />
          </div>
          
          <button className="w-full py-4 bg-violet-600 rounded-2xl font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-violet-400/30 text-white">
            Sign In
          </button>
        </div>

        <div className="text-center">
          <button onClick={() => setIsLogin(true)} className="text-xs text-white/40">
            Don't have an account? <span className="text-violet-400 font-bold underline">Create Account</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 space-y-8 pb-32 max-w-4xl mx-auto">
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-1">
          <div className="w-full h-full rounded-[1.4rem] bg-[#020617] flex items-center justify-center">
            <UserIcon size={32} className="text-violet-400" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Elite Gamer #1337</h2>
          <p className="text-violet-400 text-xs font-bold uppercase tracking-widest">Premium Member</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 space-y-1">
          <p className="text-white/40 text-[10px] font-bold uppercase">Reward Points</p>
          <p className="text-xl font-black text-white">2,450</p>
        </div>
        <div className="glass-card p-4 space-y-1">
          <p className="text-white/40 text-[10px] font-bold uppercase">Orders</p>
          <p className="text-xl font-black text-white">12</p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { icon: Settings, label: 'Account Settings' },
          { icon: ShoppingBag, label: 'Order History' },
          { icon: CreditCard, label: 'Payment Methods' },
          { icon: Bell, label: 'Notifications' },
          { icon: Heart, label: 'Followed Designers' },
        ].map((item, i) => (
          <button key={i} className="w-full glass-card p-4 flex items-center justify-between border-white/5 hover:bg-white/10 transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                <item.icon size={18} />
              </div>
              <span className="text-sm font-bold text-white/80">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-white/20" />
          </button>
        ))}
        
        <button onClick={() => setIsLogin(false)} className="w-full glass-card p-4 flex items-center gap-4 border-red-500/10 text-red-400/80 hover:bg-red-500/5 transition-all mt-4">
          <LogOut size={18} />
          <span className="text-sm font-bold">Log Out</span>
        </button>
      </div>
    </div>
  );
};
