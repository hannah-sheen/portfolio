import { useState, useEffect, useRef } from 'react'
import Shuffle from '../components/Shuffle'
import CircularGallery from '../components/CircularGallery'

// Static imports referenced from image_7825e1.png
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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  
  // Track dragging state to prevent any hover interaction during active panning
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const mouseStartPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Tracks down-press vector changes to distinguish true pan actions from hover buttons
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartPos.current = { x: e.clientX, y: e.clientY }
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return // only check if left mouse button is held down
    const deltaX = Math.abs(e.clientX - mouseStartPos.current.x)
    const deltaY = Math.abs(e.clientY - mouseStartPos.current.y)
    if (deltaX > 8 || deltaY > 8) {
      setIsDragging(true)
    }
  }

  const handleMouseUp = () => {
    // Small delay ensures hover UI states don't flicker immediately post-drag
    setTimeout(() => setIsDragging(false), 50)
  }

  return (
    <section 
      id="skills" 
      className="w-full h-screen bg-[#030712] relative overflow-hidden flex flex-col justify-start p-6 md:p-12 lg:p-16 gap-6"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* Background Architectural Mesh Grid */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* TOP DASHBOARD ROW: Split between Left Title Block and 4-Column Skills Grid */}
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-start z-10">
        
        {/* LEFT COMPONENT LAYER */}
        <div className="w-full lg:w-1/4 flex flex-col shrink-0">
          <div className="py-1 pointer-events-auto cursor-default">
            <Shuffle
              text="SKILLS"
              tag="h2"
              className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none pr-4 select-none"
              style={{ fontWeight: 950 }}
            />
          </div>
          <div className="py-1 flex items-center gap-4 pointer-events-auto cursor-default">
            <Shuffle
              text="& Credentials"
              tag="span"
              className="block text-4xl md:text-5xl font-extralight text-indigo-300 italic tracking-wide leading-none select-none"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            />
          </div>
          <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-xs pt-4 normal-case pointer-events-none">
            A comprehensive overview of my tech stack distribution paired with authenticated performance benchmarks.
          </p>
        </div>

        {/* RIGHT COMPONENT LAYER: 4-Column Horizontal Layout Grid */}
        <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
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

      {/* BOTTOM ROW: Integrated Canvas Display Viewport */}
     <div className="w-full z-10 flex flex-col gap-4">
        <div className="w-full border-b border-white/5" />
        {isMobile ? (
          /* MOBILE HORIZONTAL GALLERY FALLBACK */
          <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide snap-x snap-mandatory">
            {certificationImages.map((cert, index) => (
              <div
                key={index}
                onClick={() => setLightboxImage(cert.image)}
                className="min-w-[280px] w-[280px] h-44 snap-center bg-[#050914]/85 border border-white/10 rounded-xl overflow-hidden relative cursor-pointer"
              >
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover opacity-70" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP PANORAMIC VIEWPORT: Locked absolute specifications */
          <div 
            className="w-full h-[500px] relative rounded-2xl border border-white/5 bg-gradient-to-b from-[#040817]/30 to-transparent overflow-hidden shadow-2xl"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* 🛠️ SAFETY INTERCEPTION SHIELD OVERLAY
                Blocks deep accidental item triggering while panning, but passes micro hover items cleanly */}
            <div 
              className={`absolute inset-0 z-20 bg-transparent ${
                isDragging ? "pointer-events-auto cursor-grabbing" : "pointer-events-none cursor-grab"
              }`} 
            />

            {/* 🛠️ CONTEXT HOVER LAYER (Appears on item track focus) */}
            {!isDragging && (
              <div className="absolute inset-0 z-30 pointer-events-none flex justify-center items-end pb-12">
                {certificationImages.map((cert, index) => (
                  <div 
                    key={index} 
                    className="absolute bottom-6 flex flex-col items-center gap-2 group pointer-events-auto"
                    style={{
                      // Spaces individual triggers across the horizontal canvas curve layout
                      transform: `translateX(${(index - (certificationImages.length - 1) / 2) * 290}px) scale(0.95)`,
                      width: "240px"
                    }}
                  >
                    {/* Floating Text Title Label */}
                    <div className="opacity-0 group-hover:opacity-100 bg-[#030712]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[11px] font-medium text-slate-300 tracking-wide text-center transition-all duration-300 pointer-events-none shadow-xl">
                      {cert.title}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Underlying 3D Canvas element */}
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
    </section>
  )
}