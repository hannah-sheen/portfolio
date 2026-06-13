// import { useState, useRef, type MouseEvent, type TouchEvent, useEffect } from 'react'
// import Shuffle from '../components/Shuffle'

// interface ExperienceNode {
//   id: string;
//   role: string;
//   company: string;
//   period: string;
//   description: string;
//   stack: string[];
//   x: number;
//   y: number;
//   tag: string;
// }

// const experienceNodes: ExperienceNode[] = [
//   {
//     id: "node-1",
//     role: "Project Management Lead",
//     company: "Cebu Technological University",
//     period: "2025",
//     description: "Led BARIOS development. Reduced manual workflows by 90%.",
//     stack: ["Project Management", "Systems Delivery", "Workflow Optimization"],
//     x: 300, 
//     y: 280,
//     tag: "0x01"
//   },
//   {
//     id: "node-2",
//     role: "Technical Instructor",
//     company: "Brgy. San Roque",
//     period: "2025",
//     description: "Delivered hands-on digital literacy and system training.",
//     stack: ["Technical Instruction", "System Training", "Tech Adoption"],
//     x: 650,
//     y: 530,
//     tag: "0x02"
//   },
//   {
//     id: "node-3",
//     role: "Back End Intern",
//     company: "Camtastic Philippines Corp.",
//     period: "2026",
//     description: "Engineered backend logic using Pascal and SQL engines.",
//     stack: ["Pascal", "SQL", "Database Optimization"],
//     x: 1000,
//     y: 230,
//     tag: "0x03"
//   },
//   {
//     id: "node-4",
//     role: "IT Intern",
//     company: "Lifewood Data Technology PH",
//     period: "2026",
//     description: "Explored enterprise workflows. Learned prompt engineering, efficient coding, and scaling with modern AI tools.",
//     stack: ["AI Tools", "Prompt Engineering", "Efficient Coding"],
//     x: 1400,
//     y: 480,
//     tag: "0x04"
//   }
// ]

// export default function Experience() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [activeNode, setActiveNode] = useState<ExperienceNode | null>(null)
//   const [isDragging, setIsDragging] = useState<boolean>(false)
//   const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 }) 
//   const [zoom, setZoom] = useState<number>(1)
//   const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
//   const [hasDragged, setHasDragged] = useState<boolean>(false)

//   const focusOnCoordinates = (x: number, y: number, customZoom = 1.2) => {
//     if (!containerRef.current) return
//     const width = containerRef.current.clientWidth
//     const h = containerRef.current.clientHeight
    
//     setZoom(customZoom)
//     setPan({
//       x: (width / 2) - (x * customZoom),
//       y: (h / 2) - (y * customZoom)
//     })
//   }

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         setActiveNode(null)
//         setZoom(1)
//       }
//     }
//     window.addEventListener('keydown', handleKeyDown)
//     return () => window.removeEventListener('keydown', handleKeyDown)
//   }, [])

//   useEffect(() => {
//     const firstNode = experienceNodes[0]
//     setActiveNode(firstNode)
//     setTimeout(() => {
//       focusOnCoordinates(firstNode.x, firstNode.y, 1.1)
//     }, 150)
//     // Cleanup global state flags if the component unmounts unexpectedly while dragging
//     return () => { document.body.setAttribute('data-dragging', 'false') }
//   }, [])

//   // Track dynamic changes to state and relay them immediately to GSAP's Observer engine via document body attributes
//   const startGlobalDragState = () => {
//     setIsDragging(true)
//     document.body.setAttribute('data-dragging', 'true')
//   }

//   const stopGlobalDragState = () => {
//     setIsDragging(false)
//     document.body.setAttribute('data-dragging', 'false')
//   }

//   const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
//     // ONLY bail out early if clicking inside an active description data-card
//     if ((e.target as HTMLElement).closest('.data-card')) return
    
//     // If clicking a node pivot button, don't preventDefault so the onClick event can fire cleanly
//     const isButton = (e.target as HTMLElement).closest('button')
//     if (!isButton) {
//       e.preventDefault()
//     }
    
//     startGlobalDragState()
//     setHasDragged(false)
//     setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
//   }

//   const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//     if (!isDragging) return
//     setHasDragged(true)
//     setPan({
//       x: e.clientX - dragStart.x,
//       y: e.clientY - dragStart.y
//     })
//   }

//   const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
//     if ((e.target as HTMLElement).closest('.data-card')) return
    
//     const touch = e.touches[0]
//     startGlobalDragState()
//     setHasDragged(false)
//     setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y })
//   }

//   const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
//     if (!isDragging) return
//     const touch = e.touches[0]
//     setHasDragged(true)
//     setPan({
//       x: touch.clientX - dragStart.x,
//       y: touch.clientY - dragStart.y
//     })
//   }

//   const handleNodeClick = (node: ExperienceNode) => {
//     if (hasDragged) return
//     if (activeNode?.id === node.id) {
//       setActiveNode(null)
//       setZoom(1)
//     } else {
//       setActiveNode(node)
//       focusOnCoordinates(node.x, node.y, 1.2)
//     }
//   }

//   return (
//     <section 
//       id="experience" 
//       ref={containerRef}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={stopGlobalDragState}
//       onMouseLeave={stopGlobalDragState}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={stopGlobalDragState}
//       className={`w-full h-screen bg-[#030712] relative overflow-hidden select-none touch-none ${
//         isDragging ? 'cursor-grabbing' : 'cursor-grab'
//       }`}
//       style={{ fontFamily: "'Manrope', sans-serif" }}
//     >
      
//       {/* HUD HEADER COMPONENT LAYER */}
//       <div className="absolute top-16 left-16 md:left-20 z-40 max-w-sm space-y-1">
//         <div className="py-1 pointer-events-auto cursor-default">
//           <Shuffle
//             text="EXPERIENCE"
//             tag="h2"
//             className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none pr-4 select-none"
//             style={{ fontWeight: 950 }}
//           />
//         </div>
//         <div className="py-1 flex items-center gap-4 pointer-events-auto cursor-default">
//           <Shuffle
//             text="& Systems Track"
//             tag="span"
//             className="block text-4xl md:text-5xl font-extralight text-indigo-300 italic tracking-wide leading-none select-none"
//             style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
//           />
//         </div>
//         <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-xs pt-4 normal-case pointer-events-none">
//           My professional timeline navigating management paths, systems instruction, and adaptive software tracks.
//         </p>
//       </div>

//       {/* DYNAMIC MAP ENGINE CANVAS */}
//       <div 
//         className="absolute inset-0 transform will-change-transform transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
//         style={{
//           transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom})`,
//           transformOrigin: '0 0'
//         }}
//       >
        
//         {/* Infinite Grid Blueprint Backing */}
//         <div className="absolute inset-0 w-[3000px] h-[2000px] bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

//         {/* Vector Constellation Path Pipeline Layer */}
//         <svg className="absolute inset-0 w-[3000px] h-[2000px] pointer-events-none z-0">
//           <path
//             d={`M ${experienceNodes[0].x} ${experienceNodes[0].y} 
//                 L ${experienceNodes[1].x} ${experienceNodes[1].y} 
//                 L ${experienceNodes[2].x} ${experienceNodes[2].y} 
//                 L ${experienceNodes[3].x} ${experienceNodes[3].y}`}
//             fill="none"
//             stroke="rgba(99, 102, 241, 0.15)"
//             strokeWidth="1.5"
//             strokeDasharray="4 4"
//           />
//         </svg>

//         {/* INTERACTIVE TRACKING MAP NODES */}
//         {experienceNodes.map((node) => {
//           const isSelected = activeNode?.id === node.id
          
//           return (
//             <div
//               key={node.id}
//               className="absolute"
//               style={{ 
//                 top: `${node.y}px`, 
//                 left: `${node.x}px`,
//                 zIndex: isSelected ? 50 : 20 
//               }}
//             >
//               {/* Node Button Pivot Point */}
//               <button
//                 type="button"
//                 onClick={() => handleNodeClick(node)}
//                 className="group relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center outline-none"
//               >
//                 <span className={`absolute -top-6 font-mono text-[9px] font-bold tracking-wider transition-colors duration-300 ${
//                   isSelected ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'
//                 }`}>
//                   {node.tag}
//                 </span>

//                 <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
//                   isSelected 
//                     ? 'border-indigo-400 bg-indigo-500/20 scale-110 shadow-[0_0_25px_rgba(129,140,248,0.5)]' 
//                     : 'border-white/10 bg-slate-950/40 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]'
//                 }`}>
//                   <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     isSelected ? 'bg-indigo-300 scale-125 shadow-[0_0_8px_#ffffff]' : 'bg-slate-500 group-hover:bg-indigo-400'
//                   }`} />
//                 </div>
//               </button>

//               {/* CONTEXTUAL POPUP DATA TRAY CARD */}
//               <div className={`absolute left-8 top-0 -translate-y-1/2 data-card transition-all duration-500 origin-left transform ${
//                 isSelected ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-90 pointer-events-none'
//               }`}>
                
//                 <div className="w-72 bg-[#050914]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
//                   <div className="absolute -right-10 -top-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

//                   <div className="space-y-3">
//                     <div>
//                       <div className="flex items-center justify-between gap-2">
//                         <h3 className="text-xs font-bold text-white tracking-tight leading-tight">
//                           {node.role}
//                         </h3>
//                         <span className="text-indigo-400 font-mono text-[10px] font-bold tracking-wider shrink-0">
//                           {node.period}
//                         </span>
//                       </div>
                      
//                       <div className="text-[10px] font-mono mt-1">
//                         <span className="text-slate-400 font-semibold opacity-80">
//                           {node.company}
//                         </span>
//                       </div>
//                     </div>

//                     <p className="text-[11px] text-slate-400 leading-relaxed font-light normal-case">
//                       {node.description}
//                     </p>

//                     <div className="flex flex-wrap gap-1 pt-0.5">
//                       {node.stack.map((tech) => (
//                         <span 
//                           key={tech} 
//                           className="text-[8px] font-mono bg-white/5 border border-white/5 text-slate-300 px-2 py-0.5 rounded tracking-wide"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//               </div>

//             </div>
//           )
//         })}

//       </div>

//       {/* FOOTER METADATA: Unified Map Instructions Anchor Placement */}
//       <div className="absolute bottom-12 left-16 md:left-20 z-40 pointer-events-none">
//         <div className="flex flex-col gap-1 border-l-2 border-indigo-500/30 pl-4 py-0.5">
//           <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase">
//             Instructions
//           </span>
//           <span className="text-xs font-semibold text-slate-400 flex items-center gap-2">
//             Drag to pan • Click node to focus • Press <kbd className="bg-white/10 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white">ESC</kbd> to reset view
//           </span>
//         </div>
//       </div>

//     </section>
//   )
// }

import { useState, useRef, type MouseEvent, type TouchEvent, useEffect } from 'react'
import Shuffle from '../components/Shuffle'

interface ExperienceNode {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
  x: number;
  y: number;
  tag: string;
  article?: string; // Optional field for press coverage verification links
}

const experienceNodes: ExperienceNode[] = [
  {
    id: "node-1",
    role: "Project Management Lead",
    company: "Cebu Technological University",
    period: "2025",
    description: "Led BARIOS development. Reduced manual workflows by 90%.",
    stack: ["Project Management", "Systems Delivery", "Workflow Optimization"],
    x: 300, 
    y: 280,
    tag: "0x01"
  },
  {
    id: "node-2",
    role: "Technical Instructor",
    company: "Brgy. San Roque",
    period: "2025",
    description: "Delivered hands-on digital literacy and system training to local personnel in collaboration with the CTU Main CCICT extension team, as covered in official university media.",
    stack: ["Technical Instruction", "System Training", "Tech Adoption"],
    x: 650,
    y: 530,
    tag: "0x02",
    article: "https://www.ctu.edu.ph/ctu-main-ccict-equips-barangay-san-roque-personnel-with-essential-digital-skills/" // Connects your real-world verification link
  },
  {
    id: "node-3",
    role: "Back End Intern",
    company: "Camtastic Philippines Corp.",
    period: "2026",
    description: "Engineered backend logic using Pascal and SQL engines.",
    stack: ["Pascal", "SQL", "Database Optimization"],
    x: 1000,
    y: 230,
    tag: "0x03"
  },
  {
    id: "node-4",
    role: "IT Intern",
    company: "Lifewood Data Technology PH",
    period: "2026",
    description: "Explored enterprise workflows. Learned prompt engineering, efficient coding, and scaling with modern AI tools.",
    stack: ["AI Tools", "Prompt Engineering", "Efficient Coding"],
    x: 1400,
    y: 480,
    tag: "0x04"
  }
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeNode, setActiveNode] = useState<ExperienceNode | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 }) 
  const [zoom, setZoom] = useState<number>(1)
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [hasDragged, setHasDragged] = useState<boolean>(false)

  const focusOnCoordinates = (x: number, y: number, customZoom = 1.2) => {
    if (!containerRef.current) return
    const width = containerRef.current.clientWidth
    const h = containerRef.current.clientHeight
    
    setZoom(customZoom)
    setPan({
      x: (width / 2) - (x * customZoom),
      y: (h / 2) - (y * customZoom)
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveNode(null)
        setZoom(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const firstNode = experienceNodes[0]
    setActiveNode(firstNode)
    setTimeout(() => {
      focusOnCoordinates(firstNode.x, firstNode.y, 1.1)
    }, 150)
    return () => { document.body.setAttribute('data-dragging', 'false') }
  }, [])

  const startGlobalDragState = () => {
    setIsDragging(true)
    document.body.setAttribute('data-dragging', 'true')
  }

  const stopGlobalDragState = () => {
    setIsDragging(false)
    document.body.setAttribute('data-dragging', 'false')
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.data-card')) return
    
    const isButton = (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')
    if (!isButton) {
      e.preventDefault()
    }
    
    startGlobalDragState()
    setHasDragged(false)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setHasDragged(true)
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.data-card')) return
    
    const touch = e.touches[0]
    startGlobalDragState()
    setHasDragged(false)
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y })
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const touch = e.touches[0]
    setHasDragged(true)
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    })
  }

  const handleNodeClick = (node: ExperienceNode) => {
    if (hasDragged) return
    if (activeNode?.id === node.id) {
      setActiveNode(null)
      setZoom(1)
    } else {
      setActiveNode(node)
      focusOnCoordinates(node.x, node.y, 1.2)
    }
  }

  return (
    <section 
      id="experience" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopGlobalDragState}
      onMouseLeave={stopGlobalDragState}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopGlobalDragState}
      className={`w-full h-screen bg-[#030712] relative overflow-hidden select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      
      {/* HUD HEADER COMPONENT LAYER */}
      <div className="absolute top-16 left-16 md:left-20 z-40 max-w-sm space-y-1">
        <div className="py-1 pointer-events-auto cursor-default">
          <Shuffle
            text="EXPERIENCE"
            tag="h2"
            className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none pr-4 select-none"
            style={{ fontWeight: 950 }}
          />
        </div>
        <div className="py-1 flex items-center gap-4 pointer-events-auto cursor-default">
          <Shuffle
            text="& Systems Track"
            tag="span"
            className="block text-4xl md:text-5xl font-extralight text-indigo-300 italic tracking-wide leading-none select-none"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          />
        </div>
        <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-xs pt-4 normal-case pointer-events-none">
          My professional timeline navigating management paths, systems instruction, and adaptive software tracks.
        </p>
      </div>

      {/* DYNAMIC MAP ENGINE CANVAS */}
      <div 
        className="absolute inset-0 transform will-change-transform transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        
        {/* Infinite Grid Blueprint Backing */}
        <div className="absolute inset-0 w-[3000px] h-[2000px] bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        {/* Vector Constellation Path Pipeline Layer */}
        <svg className="absolute inset-0 w-[3000px] h-[2000px] pointer-events-none z-0">
          <path
            d={`M ${experienceNodes[0].x} ${experienceNodes[0].y} 
                L ${experienceNodes[1].x} ${experienceNodes[1].y} 
                L ${experienceNodes[2].x} ${experienceNodes[2].y} 
                L ${experienceNodes[3].x} ${experienceNodes[3].y}`}
            fill="none"
            stroke="rgba(99, 102, 241, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* INTERACTIVE TRACKING MAP NODES */}
        {experienceNodes.map((node) => {
          const isSelected = activeNode?.id === node.id
          
          return (
            <div
              key={node.id}
              className="absolute"
              style={{ 
                top: `${node.y}px`, 
                left: `${node.x}px`,
                zIndex: isSelected ? 50 : 20 
              }}
            >
              {/* Node Button Pivot Point */}
              <button
                type="button"
                onClick={() => handleNodeClick(node)}
                className="group relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center outline-none"
              >
                <span className={`absolute -top-6 font-mono text-[9px] font-bold tracking-wider transition-colors duration-300 ${
                  isSelected ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'
                }`}>
                  {node.tag}
                </span>

                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  isSelected 
                    ? 'border-indigo-400 bg-indigo-500/20 scale-110 shadow-[0_0_25px_rgba(129,140,248,0.5)]' 
                    : 'border-white/10 bg-slate-950/40 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                }`}>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-indigo-300 scale-125 shadow-[0_0_8px_#ffffff]' : 'bg-slate-500 group-hover:bg-indigo-400'
                  }`} />
                </div>
              </button>

              {/* CONTEXTUAL POPUP DATA TRAY CARD */}
              <div className={`absolute left-8 top-0 -translate-y-1/2 data-card transition-all duration-500 origin-left transform ${
                isSelected ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-90 pointer-events-none'
              }`}>
                
                <div className="w-72 bg-[#050914]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xs font-bold text-white tracking-tight leading-tight">
                          {node.role}
                        </h3>
                        <span className="text-indigo-400 font-mono text-[10px] font-bold tracking-wider shrink-0">
                          {node.period}
                        </span>
                      </div>
                      
                      <div className="text-[10px] font-mono mt-1">
                        <span className="text-slate-400 font-semibold opacity-80">
                          {node.company}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-light normal-case">
                      {node.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex flex-wrap gap-1">
                        {node.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[8px] font-mono bg-white/5 border border-white/5 text-slate-300 px-2 py-0.5 rounded tracking-wide"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Clean Verification Hyperlink Action Router */}
                      {node.article && (
                        <a 
                          href={node.article}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[8px] font-mono font-bold tracking-wider text-indigo-400 hover:text-indigo-300 underline transition-colors shrink-0 px-1 py-0.5"
                        >
                          READ PRESS
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )
        })}

      </div>

      {/* FOOTER METADATA: Unified Map Instructions Anchor Placement */}
      <div className="absolute bottom-12 left-16 md:left-20 z-40 pointer-events-none">
        <div className="flex flex-col gap-1 border-l-2 border-indigo-500/30 pl-4 py-0.5">
          <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase">
            Instructions
          </span>
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-2">
            Drag to pan • Click node to focus • Press <kbd className="bg-white/10 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white">ESC</kbd> to reset view
          </span>
        </div>
      </div>

    </section>
  )
}