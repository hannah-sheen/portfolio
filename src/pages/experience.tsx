import { useState } from 'react'
import Shuffle from '../components/Shuffle'

// Sample Data Array representing your structural timeline
const experienceData = [
  {
    id: "exp-1",
    role: "Full-Stack Developer",
    company: "Freelance / Open Source",
    period: "2025 - Present",
    description: "Architecting backend engines and designing schema architectures for modern platforms. Focused on high-availability API routing, data normalization, and lightweight client wrappers.",
    stack: ["Node.js", "Express", "PostgreSQL", "TypeScript"],
    coordinates: "0x7F / 04"
  },
  {
    id: "exp-2",
    role: "Backend Engineering Apprentice",
    company: "System Projects",
    period: "2024 - 2025",
    description: "Built scalable relational database configurations, implemented secure JWT token authentication pipelines, and optimized complex server-side scripts for data management pipelines.",
    stack: ["SQL", "RESTful APIs", "JavaScript", "Git"],
    coordinates: "0x3A / 01"
  }
]

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Custom high-end spotlight tracking matrix
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - card.left,
      y: e.clientY - card.top
    });
    setHoveredIndex(index);
  };

  return (
    <section id="experience" className="w-full h-screen bg-[#030712] relative overflow-hidden flex" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
      {/* Structural Tech Grid Layer Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute left-1/3 bottom-12 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* LEFT SIDE: Identity Section Frame (50/50 Architecture Split) */}
      <div className="w-1/2 h-full relative overflow-hidden border-r border-white/5 flex flex-col justify-between p-16 md:p-20 select-none z-20">
        <div className="h-6" />

        <div className="relative space-y-1 w-full my-auto">
          <div className="overflow-hidden py-1">
            <Shuffle
              text="EXPERIENCE"
              tag="h2"
              textAlign="left"
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.03}
              className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none"
              style={{ fontWeight: 950 }}
            />
          </div>
          <div className="overflow-hidden py-1 flex items-center gap-4">
            <Shuffle
              text="& Systems Track"
              tag="span"
              textAlign="left"
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.035}
              className="block text-4xl md:text-5xl font-extralight text-slate-400 italic tracking-wide leading-none"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-700/60 to-transparent ml-2 opacity-50 hidden sm:block" />
          </div>

          <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-sm pt-6 normal-case">
            A linear progression of building scalable digital infrastructure, breaking down logic problems, and refining full-stack environments.
          </p>
        </div>

        <div className="mt-12 md:mt-0 space-y-2 border-l-2 border-indigo-500/30 pl-4 py-1">
          <div className="text-[10px] tracking-wider text-slate-500 uppercase font-bold">System Status</div>
          <div className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Operational & Compiling
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Engine Track */}
      <div className="w-1/2 h-full flex flex-col justify-between p-16 md:p-20 relative z-20 bg-[#030712]">
        <div className="h-6" />

        {/* PREMIUM STRUCTURAL TIMELINE */}
        <div className="my-auto max-w-xl w-full relative pl-12 border-l border-white/5 space-y-10">
          
          {experienceData.map((item, index) => {
            const isCurrentHovered = hoveredIndex === index;
            
            return (
              <div 
                key={item.id}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative bg-slate-950/20 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-500 group overflow-hidden"
              >
                
                {/* ADVANCED SPOTLIGHT EFFECT: Follows cursor fluidly inside the card container */}
                <div 
                  className="absolute pointer-events-none rounded-full mix-blend-screen bg-indigo-500/10 blur-[60px] transition-opacity duration-500"
                  style={{
                    width: '240px',
                    height: '240px',
                    top: `${mousePos.y - 120}px`,
                    left: `${mousePos.x - 120}px`,
                    opacity: isCurrentHovered ? 1 : 0
                  }}
                />

                {/* Vertical Track Laser Node Node */}
                <div className="absolute -left-[57px] top-8 w-4 h-4 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center transition-all duration-500 z-30">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isCurrentHovered ? 'bg-indigo-400 scale-125' : 'bg-slate-700'}`} />
                  {/* Laser connecting line firing horizontally toward the card */}
                  <div className={`absolute left-3.5 h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent transition-all duration-500 ${isCurrentHovered ? 'w-8' : 'w-0'}`} />
                </div>

                {/* Card Content Matrix */}
                <div className="relative z-10 space-y-3">
                  
                  {/* Card Header Row */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-slate-500">
                    <span>{item.period}</span>
                    <span className={`transition-colors duration-300 ${isCurrentHovered ? 'text-indigo-400' : 'text-slate-600'}`}>
                      {item.coordinates}
                    </span>
                  </div>

                  {/* Title & Company Block */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      {item.role}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 font-mono mt-0.5 opacity-80">{item.company}</p>
                  </div>

                  {/* Description text */}
                  <p className="text-sm leading-relaxed text-slate-400 font-light pt-1 normal-case">
                    {item.description}
                  </p>

                  {/* Tech Stack Blueprint Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.stack.map((tech) => (
                      <span 
                        key={tech} 
                        className={`text-[10px] font-mono border rounded-md px-2 py-0.5 tracking-wide transition-all duration-300 ${
                          isCurrentHovered 
                            ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-300' 
                            : 'bg-white/5 border-white/5 text-slate-400'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            )
          })}

        </div>

        {/* Right Side Base Alignment Frame */}
        <div className="border-t border-white/5 pt-6 w-full opacity-0 pointer-events-none">
          <span className="text-xs text-slate-600">Spacer Matrix</span>
        </div>
      </div>

    </section>
  )
}