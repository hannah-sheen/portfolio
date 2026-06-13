import React, { useState } from 'react';

interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  company: string;
  description: string;
  bullets: string[];
  stack: string[];
  link?: string;
}

interface FolderProps {
  color?: string;
  size?: number;
  items: ProjectItem[];
  activeIndex: number;
  onSelectProject: (idx: number) => void;
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ 
  color = '#6366F1', 
  size = 1, 
  items = [], 
  activeIndex,
  onSelectProject,
  className = '' 
}) => {
  const maxItems = 3;
  const [open, setOpen] = useState(true);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.45);
  const paperColors = ['#1e1b4b', '#2e1065', '#0f172a'];

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const getOpenTransform = (index: number, isSelected: boolean) => {
    if (isSelected) {
      // The focused active file shoots forward in 3D space
      return 'translate(-50%, -105%) rotate(0deg) translateZ(60px) scale(1.08)';
    }
    if (index === 0) return 'translate(-125%, -65%) rotate(-14deg) translateZ(-10px)';
    if (index === 1) return 'translate(25%, -65%) rotate(14deg) translateZ(-20px)';
    if (index === 2) return 'translate(-50%, -80%) rotate(4deg) translateZ(-30px)';
    return '';
  };

  return (
    <div style={{ transform: `scale(${size})` }} className={`${className} select-none`}>
      <div className="group relative [transform-style:preserve-3d] transition-transform duration-300">
        <div
          className="relative w-[140px] h-[100px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/5"
          style={{ backgroundColor: folderBackColor, transformStyle: 'preserve-3d' }}
        >
          <span
            className="absolute z-0 bottom-[99%] left-0 w-[45px] h-[14px] rounded-tl-[6px] rounded-tr-[6px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          
          {items.map((project, i) => {
            const isSelected = activeIndex === i;
            let sizeClasses = i === 0 ? 'w-[75%] h-[90%]' : i === 1 ? 'w-[80%] h-[85%]' : 'w-[85%] h-[80%]';

            const transformStyle = open
              ? `${getOpenTransform(i, isSelected)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={project.id}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={() => handlePaperMouseLeave(i)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProject(i);
                }}
                className={`absolute bottom-[15%] left-1/2 transition-all duration-300 ease-out cursor-pointer border p-2.5 shadow-2xl ${sizeClasses} ${
                  isSelected 
                    ? 'border-indigo-400/80 shadow-[0_10px_30px_rgba(99,102,241,0.25)] z-40' 
                    : 'border-white/10 hover:border-white/30 z-20 opacity-40 mix-blend-luminosity hover:mix-blend-normal hover:opacity-80'
                }`}
                style={{
                  transform: transformStyle,
                  backgroundColor: paperColors[i % paperColors.length],
                  borderRadius: '8px',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="flex flex-col h-full justify-between pointer-events-none [transform:translateZ(10px)]">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[7px] tracking-tight ${isSelected ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>
                      {project.tag}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-indigo-400 animate-pulse' : 'bg-white/10'}`} />
                  </div>
                  <p className="text-[9px] font-black tracking-tight text-white uppercase truncate leading-none mb-1">
                    {project.title.split(' ')[0]}
                  </p>
                  <div className="w-full h-[2px] bg-white/5 rounded-full">
                    <div className={`h-full rounded-full ${isSelected ? 'bg-indigo-500 w-full' : 'bg-white/20 w-1/3'} transition-all duration-500`} />
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Front Flap Overlay configured with skew styling to simulate split perspective opens */}
          <div
            className="absolute z-30 w-full h-full origin-bottom transition-transform duration-300 border-t border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"
            style={{
              backgroundColor: color,
              borderRadius: '4px 12px 12px 12px',
              transform: 'skew(10deg) scaleY(0.65) translateZ(25px)',
              opacity: 0.95
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;