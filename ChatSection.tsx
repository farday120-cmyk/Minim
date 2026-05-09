import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, ChevronLeft, User, ShieldCheck } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'admin';
  time: string;
}

interface ChatProps {
  onBack: () => void;
  onNewAdminMessage: (msg: string) => void;
}

const ChatSection: React.FC<ChatProps> = ({ onBack, onNewAdminMessage }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('mg_chat_history');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Welcome to Minimalist Gaming Support. How can we assist your setup today?", sender: 'admin', time: '10:00 AM' }
    ];
  });
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('mg_chat_history', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const newUserMsg: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');

    // 24 Hour Auto-Reply Logic
    const lastReplyTime = localStorage.getItem('mg_last_auto_reply');
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const shouldReply = !lastReplyTime || (Date.now() - Number(lastReplyTime) > twentyFourHours);

    if (shouldReply) {
      localStorage.setItem('mg_last_auto_reply', Date.now().toString());
      setTimeout(() => {
        const autoReply: Message = {
          id: Date.now() + 1,
          text: "The support team will contact you shortly.",
          sender: 'admin',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, autoReply]);
        onNewAdminMessage(autoReply.text);
      }, 1500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[60] bg-[#020412] flex flex-col pt-24 pb-32"
    >
      {/* Header */}
      <div className="px-6 pb-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Admin Support</h2>
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold text-white/40 uppercase">System Online</span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
           <ShieldCheck size={20} />
        </div>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-violet-600' : 'bg-white/5'}`}>
                 {msg.sender === 'user' ? <User size={16} /> : <ShieldCheck size={16} className="text-violet-400" />}
              </div>
              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed border ${
                  msg.sender === 'user' 
                    ? 'bg-violet-600 border-violet-500 text-white rounded-tr-none shadow-[0_5px_15px_rgba(139,92,246,0.2)]' 
                    : 'bg-white/5 border-white/10 text-white/80 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[8px] font-bold uppercase tracking-widest text-white/20 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-gradient-to-t from-[#020412] to-transparent">
        <div className="glass-card p-2 pl-6 flex items-center gap-3 border-white/10 shadow-2xl">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your transmission..." 
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/20" 
          />
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatSection;
