import React from 'react';

const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020412] transform-gpu">
      {/* Performance Optimized Glows */}
      <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-violet-600/5 blur-[80px] rounded-full will-change-transform" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-indigo-600/5 blur-[80px] rounded-full will-change-transform" />
      
      {/* Static grid for background depth without performance cost */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} 
      />
    </div>
  );
};

export default React.memo(BackgroundEffect);
