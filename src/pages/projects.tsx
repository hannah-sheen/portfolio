import { useState, type MouseEvent } from 'react'
import Shuffle from '../components/Shuffle'

interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  company: string;
  description: string;
  bullets: string[];
  stack: string[];
  github?: string;
  article?: string; // New clean parameter for external news verification links
}

const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    tag: "0x01",
    title: "CIUDAD (BARIOS)",
    company: "Brgy. San Roque",
    description: "Full-stack administrative web and mobile platform featuring real-time data orchestration and automated document lifecycles.",
    bullets: [
      "Built a full-stack barangay management system with automated document generation and pre-filled certification templates, reducing manual processing time by 80%.",
      "Designed a centralized PostgreSQL database with real-time REST APIs, enabling seamless data access across web and mobile applications.",
      "Partnered with CTU Main CCICT extension teams to conduct digital skills and operational training for barangay personnel, as featured in official university media."
    ],
    stack: ["React", "React Native", "TypeScript", "Python", "Django", "PostgreSQL"],
    github: "https://github.com/hannah-sheen/CIUDAD-APP-BARIOS",
    article: "https://www.ctu.edu.ph/ctu-main-ccict-equips-barangay-san-roque-personnel-with-essential-digital-skills/" // Add your official article link here
  },
  {
    id: "proj-2",
    tag: "0x02",
    title: "Face Recognition Profiling",
    company: "Cebu Technological University",
    description: "Deep learning identity suite tailored for fast embedding evaluation and secure storage arrays.",
    bullets: [
      "Developed a facial recognition system for identity verification and profiling using the FaceNet deep learning model.",
      "Implemented a secure database for storing and managing facial embeddings and user data, ensuring data privacy and compliance."
    ],
    stack: ["React", "JavaScript", "Python", "Node.js", "NoSQL", "FaceNet"],
    github: "https://github.com/hannah-sheen/Face-Recognition-Profiling"
  },
  {
    id: "proj-3",
    tag: "0x03",
    title: "Quiz Odyssey",
    company: "AI-Powered Generation",
    description: "Generative educational tool built to streamline mock test authoring workflows dynamically.",
    bullets: [
      "Developed an AI-powered quiz maker built with native web structures to help students study by creating customized mock quizzes through automated Gemini AI prompts."
    ],
    stack: ["HTML", "JavaScript", "Gemini AI", "CSS Engines"],
    github: "https://github.com/hannah-sheen/PROJECT_QUIZODYSSEY"
  },
  {
    id: "proj-4",
    tag: "0x04",
    title: "Lifewood Website",
    company: "Lifewood Data Technology PH",
    description: "Premium enterprise landing interface engineered with scalable modern frameworks and serverless backends.",
    bullets: [
      "Designed and deployed a highly performant corporate presence featuring dynamic resource modules and content mapping structures."
    ],
    stack: ["React", "Tailwind CSS", "Supabase"],
    github: "https://github.com/hannah-sheen/lifewood-Website"
  },
  {
    id: "proj-5",
    tag: "0x05",
    title: "PFC System",
    company: "People Fitness Center",
    description: "Dedicated gym management system built to monitor membership conditions, log performance tracks, and optimize facility scheduling architectures.",
    bullets: [
      "Engineered an automated infrastructure backend using Python structures to manage client access passes, member state profiles, and administrative financial tallies cleanly."
    ],
    stack: ["Python", "Database Engine", "UI Layouts System"],
    github: "https://github.com/hannah-sheen/PFCSystem"
  }
]

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 })

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSpotlight({ x, y, opacity: 1 })
  }

  const handleCardMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }))
    setHoveredIdx(null)
  }

  return (
    <section 
      id="projects" 
      className="w-full h-screen bg-[#030712] text-white px-12 md:px-24 flex flex-col justify-between select-none relative overflow-hidden"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* Background High-Tech Canvas Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:45px_45px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.02)_0%,transparent_60%)]" />
      </div>

      <div className="w-full h-full py-24 md:py-28 flex flex-col justify-between z-10 overflow-hidden">
        
        {/* ─── HUD HEADER COMPONENT LAYER (TOP RIGHT) ─── */}
        <div className="w-full flex flex-col items-end text-right space-y-1 shrink-0">
          <div className="py-0.5 pointer-events-auto cursor-default">
            <Shuffle
              text="PROJECTS"
              tag="h2"
              textAlign="right"
              shuffleDirection="left"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.03}
              className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none pr-4 select-none"
              style={{ fontWeight: 950 }}
            />
          </div>
          <div className="py-0.5 flex items-center justify-end gap-4 pointer-events-auto cursor-default w-full">
            <div className="h-[1px] flex-1 bg-gradient-to-l from-slate-700/60 to-transparent mr-2 opacity-50 hidden sm:block" />
            <Shuffle
              text="& Compiled Architecture"
              tag="span"
              textAlign="right"
              shuffleDirection="left"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.035}
              className="block text-4xl md:text-5xl font-extralight text-indigo-300 italic tracking-wide leading-none select-none"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            />
          </div>
          <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-xs pt-4 normal-case pointer-events-none">
            My architectural compilation engineering web platforms, intelligent identity profiling pipelines, and adaptive automated tools.
          </p>
        </div>

        {/* ─── KINETIC MONOLITHIC MATRIX ARRAY ─── */}
        <div className="w-full flex-1 flex items-stretch gap-4 mt-12 mb-2 overflow-hidden">
          {projectsData.map((project, idx) => {
            const isHovered = hoveredIdx === idx
            const isAnyHovered = hoveredIdx !== null
            
            const flexWidth = isHovered 
              ? 'flex-[3.5]' 
              : isAnyHovered 
                ? 'flex-[0.4]' 
                : 'flex-1'

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  transition: 'flex 0.5s cubic-bezier(0.25, 1, 0.4, 1), border-color 0.3s, opacity 0.4s'
                }}
                className={`h-full border rounded-2xl bg-[#050914]/30 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between relative overflow-hidden ${
                  isHovered 
                    ? 'border-indigo-500/30 bg-[#060b1a]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-100 z-20' 
                    : 'border-white/5 opacity-30 z-10'
                } ${flexWidth}`}
              >
                {/* Moving Spotlight Gradient Glow Overlay */}
                {isHovered && (
                  <div 
                    style={{
                      background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(99,102,241,0.09), transparent 80%)`,
                      opacity: spotlight.opacity,
                      transition: 'opacity 0.2s ease'
                    }}
                    className="absolute inset-0 pointer-events-none z-30"
                  />
                )}

                {/* Laser Top Edge Linear Accent */}
                <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent transition-transform duration-500 ${
                  isHovered ? 'translate-y-0' : '-translate-y-1'
                }`} />

                {/* Main Content Area */}
                <div className="space-y-4 overflow-hidden flex-1 flex flex-col">
                  <div className="flex items-center justify-between shrink-0">
                    <span className={`font-mono text-[10px] tracking-widest ${isHovered ? 'text-indigo-400 font-bold' : 'text-slate-600'}`}>
                      {project.tag}
                    </span>

                    {/* Clean Action Router Layout for Source/Article Links */}
                    <div className={`flex items-center gap-2 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}>
                      {/* Optional Article Feature Link Button */}
                      {project.article && (
                        <a 
                          href={project.article}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[10px] font-mono text-slate-400 hover:text-indigo-400 transition-colors px-2.5 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg hover:border-indigo-500/30 shadow-md"
                          aria-label="Read Featured News Article"
                        >
                          READ PRESS
                        </a>
                      )}

                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-slate-400 hover:text-indigo-400 transition-colors p-1.5 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-lg hover:border-indigo-500/30 shadow-md group/btn" 
                          aria-label="View Source Code"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:scale-105 transition-transform">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <h3 className={`text-xl md:text-2xl font-black tracking-tight uppercase transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-slate-400'
                    }`}>
                      {project.title}
                    </h3>
                    <p className="text-[9px] font-mono tracking-wider text-indigo-400/80 uppercase mt-1">
                      {project.company}
                    </p>
                  </div>

                  {/* Rest State Default Description Panel */}
                  <p className={`text-xs text-slate-400 font-light leading-relaxed transition-all duration-500 normal-case shrink-0 ${
                    isHovered ? 'opacity-0 max-h-0 overflow-hidden mt-0 pointer-events-none' : 'opacity-100 max-h-20 mt-2'
                  }`}>
                    {project.description}
                  </p>

                  {/* Hover Active Operational Data Matrix */}
                  <div className={`transition-all duration-500 ease-in-out flex-1 overflow-hidden ${
                    isHovered ? 'opacity-100 pt-2' : 'opacity-0 max-h-0 pointer-events-none'
                  }`}>
                    <ul className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
                      {project.bullets.map((bullet, i) => (
                        <li key={i} className="text-[11px] text-slate-300 leading-relaxed font-light flex items-start gap-3 normal-case animate-fadeIn">
                          <span className="text-indigo-400 shrink-0 font-mono text-[10px] select-none mt-0.5">&gt;_</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Tech Array Dependencies Tray */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 shrink-0">
                  {project.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className={`text-[8px] font-mono px-2 py-0.5 rounded tracking-wide transition-colors duration-300 uppercase ${
                        isHovered 
                          ? 'bg-indigo-950/20 border border-indigo-500/20 text-indigo-300' 
                          : 'bg-white/5 border border-white/5 text-slate-500'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}