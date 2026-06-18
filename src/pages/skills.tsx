import { useState, useEffect, useRef } from 'react'
import Shuffle from '../components/Shuffle'
import CircularGallery from '../components/CircularGallery'

import aseanAi from '../assets/certifications/ASEAN AI MAPUA Workshop.png'
import uxDesign from '../assets/certifications/Foundations of UX Design.jpeg'
import githubVc from '../assets/certifications/Github_Version_Control.png'
import nasaCert from '../assets/certifications/NASA Certificate.jpg'
import networkingBasics from '../assets/certifications/Networking_Basics.png'

interface SkillCategory {
  title: string;
  items: string[];
}

interface CertificationItem {
  title: string;
  image: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "LANGUAGES",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "NoSQL", "Pascal", "HTML", "CSS"]
  },
  {
    title: "FRAMEWORKS",
    items: ["React", "Django", "Node.js", "Flask", "TailwindCSS"]
  },
  {
    title: "DATABASES",
    items: ["PostgreSQL", "MySQL", "SSMS", "Supabase", "MongoDB"]
  },
  {
    title: "DEV TOOLS",
    items: ["Git", "GitHub", "VS Code"]
  }
]

const certificationImages: CertificationItem[] = [
  { title: "ASEAN AI MAPUA Workshop", image: aseanAi },
  { title: "Foundations of UX Design", image: uxDesign },
  { title: "GitHub Version Control", image: githubVc },
  { title: "NASA Space Apps Challenge", image: nasaCert },
  { title: "Networking Basics", image: networkingBasics }
]

export default function Skills() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [lightboxImage, setLightboxImage] = useState<CertificationItem | null>(null)
  
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const mouseStartPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.setAttribute('data-dragging', 'false')
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    mouseStartPos.current = { x: e.clientX, y: e.clientY }
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return 
    const deltaX = Math.abs(e.clientX - mouseStartPos.current.x)
    const deltaY = Math.abs(e.clientY - mouseStartPos.current.y)
    if (deltaX > 8 || deltaY > 8) {
      setIsDragging(true)
      document.body.setAttribute('data-dragging', 'true')
    }
  }

  const handleMouseUp = () => {
    setTimeout(() => {
      setIsDragging(false)
      document.body.setAttribute('data-dragging', 'false')
    }, 50)
  }

  return (
    <section 
      id="skills" 
      // 💡 FIX: Elevates the section's z-index to z-[9999] when open so elements from other sections can't leak over the screen overlay
      className={`w-full min-h-screen md:h-screen bg-[#030712] relative overflow-hidden flex flex-col justify-start p-6 sm:p-12 md:p-16 gap-6 md:gap-8 transition-all duration-100 ${
        lightboxImage ? 'z-[9999]' : 'z-10'
      }`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start z-10 pointer-events-auto">
        <div className="w-full md:w-1/4 flex flex-col shrink-0">
          <div className="py-1 pointer-events-auto cursor-default">
            <Shuffle
              text="SKILLS"
              tag="h2"
              className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none"
              style={{ fontWeight: 950 }}
            />
          </div>
          <div className="py-1 flex items-center gap-4 pointer-events-auto cursor-default">
            <Shuffle
              text="& Credentials"
              tag="span"
              className="block text-3xl sm:text-5xl md:text-6xl font-extralight text-indigo-300 italic tracking-wide leading-none"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            />
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-medium max-w-xs pt-4 normal-case pointer-events-auto">
            A comprehensive overview of my tech stack distribution paired with authenticated performance benchmarks.
          </p>
        </div>

        <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pt-2 pointer-events-auto">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="space-y-2.5 border-l border-white/5 pl-4 hover:border-indigo-500/30 transition-all duration-300">
              <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-widest uppercase block mb-1">
                // {cat.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold text-slate-300 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-lg transition-all duration-300 hover:border-indigo-500/40 hover:text-white hover:bg-indigo-500/5 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full z-20 flex flex-col gap-4 mt-auto pointer-events-auto">
        <div className="w-full border-b border-white/5" />
        
        {isMobile ? (
          <div className="flex gap-4 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-none style-scrollbar-hidden pointer-events-auto relative z-30">
            {certificationImages.map((cert, index) => (
              <div
                key={index}
                onClick={() => setLightboxImage(cert)}
                className="min-w-[280px] w-[280px] h-44 snap-center bg-[#050914]/85 border border-white/10 rounded-xl overflow-hidden relative cursor-pointer active:scale-[0.98] transition-transform duration-200"
              >
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover opacity-70" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent flex items-end p-4">
                  <span className="text-[10px] font-medium text-slate-300 uppercase tracking-wider">{cert.title}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="w-full h-[500px] relative rounded-2xl border border-white/5 bg-gradient-to-b from-[#040817]/30 to-transparent overflow-hidden shadow-2xl touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              className={`absolute inset-0 z-20 bg-transparent ${
                isDragging ? "pointer-events-auto cursor-grabbing" : "pointer-events-none cursor-grab"
              }`} 
            />

            {!isDragging && (
              <div className="absolute inset-0 z-30 pointer-events-none flex justify-center items-end pb-12">
                {certificationImages.map((cert, index) => (
                  <div 
                    key={index} 
                    className="absolute bottom-6 flex flex-col items-center gap-2 group pointer-events-auto"
                    style={{
                      transform: `translateX(${(index - (certificationImages.length - 1) / 2) * 290}px) scale(0.95)`,
                      width: "240px"
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 bg-[#030712]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[11px] font-medium text-slate-300 tracking-wide text-center transition-all duration-300 pointer-events-none shadow-xl">
                      {cert.title}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <CircularGallery 
              items={certificationImages} 
              bend={1.9} 
              borderRadius={0.03} 
              scrollSpeed={2.8} 
              scrollEase={0.05}
            />
          </div>
        )}
      </div>

      {/* FULL COVERAGE LIGHTBOX VIEWPORT */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] md:hidden flex flex-col items-center justify-center p-6 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative flex items-center justify-center">
            {/* Ambient Background Radial Glow Shield */}
            <div className="absolute w-[130%] aspect-square rounded-full bg-indigo-500/20 blur-[50px] z-0 pointer-events-none animate-pulse" />
            
            {/* Protected Scaling Image Container */}
            <div className="max-w-[85vw] max-h-[65vh] rounded-xl overflow-hidden border border-white/10 bg-[#050914]/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] relative z-10 flex items-center justify-center">
              <img 
                src={lightboxImage.image} 
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[65vh] object-contain block"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .style-scrollbar-hidden::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .style-scrollbar-hidden {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  )
}