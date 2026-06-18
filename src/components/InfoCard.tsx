import React, { useState, useRef } from 'react';
import type { MouseEvent } from 'react';

interface InfoCardProps {
  tag: string; 
  title: string;
  company: string;
  description: string;
  backgroundImage: string;
  onClick: () => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  company,
  description,
  backgroundImage,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const maxTilt = 8; 
    const calcRotateX = -((y - centerY) / centerY) * maxTilt;
    const calcRotateY = ((x - centerX) / centerX) * maxTilt;
    
    setRotateX(calcRotateX);
    setRotateY(calcRotateY);

    const glowX = (x / box.width) * 100;
    const glowY = (y / box.height) * 100;
    setGlowPos({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex w-[320px] h-[370px] flex-col rounded-2xl bg-[#090f1f]/70 border border-white/[0.06] text-slate-300 shadow-2xl transition-all duration-300 ease-out select-none overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Premium Spotlight Layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(220px circle at ${glowPos.x}% ${glowPos.y}%, rgba(99, 102, 241, 0.08), transparent 65%)`
        }}
      />

      {/* Embedded Edge Glow */}
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(129, 140, 248, 0.15), transparent 80%)`,
          padding: '1px'
        }}
      />

      {/* Image Window */}
      <div 
        className="relative w-full h-[170px] overflow-hidden bg-slate-950/80 shrink-0 z-10 border-b border-white/[0.04]"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090f1f] via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Content Canvas */}
      <div 
        className="p-5 flex-1 flex flex-col justify-between z-10 relative"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono tracking-[0.2em] text-indigo-400/60 uppercase font-semibold block">
            {company}
          </span>
          <h5 className="block font-sans text-base font-medium tracking-tight text-white antialiased transition-colors duration-300 group-hover:text-indigo-200 line-clamp-1">
            {title}
          </h5>
          <p className="block font-sans text-xs font-light leading-relaxed text-slate-400 antialiased line-clamp-3 normal-case pt-1">
            {description}
          </p>
        </div>

        {/* Previous Inline Layout — Font scale upsized from text-[9px] to text-xs */}
        <div className="pt-3">
          <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] font-bold text-slate-400 hover:text-indigo-400 transition-colors duration-200 uppercase outline-none cursor-pointer"
          >
            <span>EXPLORE</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              className="transition-transform duration-300 transform group-hover:translate-x-1"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};