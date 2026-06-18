import { useState, useRef, useEffect } from 'react';
import type { MouseEvent, WheelEvent } from 'react';
import Shuffle from '../components/Shuffle';
import { InfoCard } from '../components/InfoCard';

import imgCiudad from '../assets/projects/ciudad.png';
import imgCiudad2 from '../assets/projects/ciudad(2).png';
import imgCiudad3 from '../assets/projects/ciudad(3).png';

import imgTheArchivist from '../assets/projects/tas.jpeg'; 
import imgTheArchivist2 from '../assets/projects/tas(2).png';
import imgTheArchivist3 from '../assets/projects/tas(3).png'; 

import imgQuizOdyssey from '../assets/projects/quiz_odessey.png';
import imgQuizOdyssey2 from '../assets/projects/quiz_odessey(2).png';
import imgQuizOdyssey3 from '../assets/projects/quiz_odessey(3).png';
import imgQuizOdyssey4 from '../assets/projects/quiz_odessey(4).png';

import imgLifewood from '../assets/projects/lifewood-website.png';
import imgLifewood2 from '../assets/projects/lifewood-website(2).png';
import imgLifewood3 from '../assets/projects/lifewood-website(3).png';

import imgPfc from '../assets/projects/PFCSystem.png';
import imgPfc2 from '../assets/projects/PFCSystem(2).png';
import imgPfc3 from '../assets/projects/PFCSystem(3).png';

interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  company: string;
  description: string;
  challenge: string;
  solution: string;
  stack: string[];
  images: string[]; 
  github?: string;
  article?: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    tag: "01",
    title: "CIUDAD (BARIOS)",
    company: "Brgy. San Roque",
    description: "A comprehensive full-stack administrative platform featuring real-time data orchestration and automated document lifecycles.",
    challenge: "Processing high concurrent data requests for official local paperwork while keeping records secure and synchronization smooth in weak cellular areas.",
    solution: "Engineered an asynchronous transactional query pipeline using Django and PostgreSQL, backed by offline-first local storage engines in React Native.",
    stack: ["React", "React Native", "TypeScript", "Python", "Django", "PostgreSQL"],
    images: [imgCiudad, imgCiudad2, imgCiudad3],
    github: "https://github.com/hannah-sheen/CIUDAD-APP-BARIOS",
    article: "https://www.ctu.edu.ph/ctu-main-ccict-equips-barangay-san-roque-personnel-with-essential-digital-skills/"
  },
  {
    id: "proj-2",
    tag: "02",
    title: "The Archivist's Silence",
    company: "Lifewood Data Technology PH",
    description: "2D isometric tactical puzzle game exploring desolate structural ruins with generative asset loops.",
    challenge: "Generating complex, predictable tile layouts dynamically at runtime without causing frame drops or disrupting AI pathfinding logic.",
    solution: "Wrote custom graph-traversal cellular automata directly in GDScript and integrated Gemini AI APIs into the pre-build pipeline to seed unique item variations.",
    stack: ["Godot", "GDScript", "Kenney Assets", "Gemini AI"],
    images: [imgTheArchivist, imgTheArchivist2, imgTheArchivist3],
    github: "https://github.com/hannah-sheen"
  },
  {
    id: "proj-3",
    tag: "03",
    title: "Quiz Odyssey",
    company: "Cebu Technological University",
    description: "Generative educational tool built to streamline mock test authoring workflows dynamically.",
    challenge: "Handling unstructured, unpredictable raw text payloads from LLMs and converting them into reliable, zero-latency multi-choice interfaces.",
    solution: "Enforced strict JSON output schemas via custom system instructions paired with a resilient, defensive parsing engine on the client application.",
    stack: ["HTML", "JavaScript", "Gemini AI", "CSS Engines"],
    images: [imgQuizOdyssey, imgQuizOdyssey2, imgQuizOdyssey3, imgQuizOdyssey4],
    github: "https://github.com/hannah-sheen/PROJECT_QUIZODYSSEY"
  },
  {
    id: "proj-4",
    tag: "04",
    title: "Lifewood Website",
    company: "Lifewood Data Technology PH",
    description: "Premium enterprise landing interface engineered with scalable modern rendering frameworks and edge localized assets.",
    challenge: "Maintaining a flawless visual look across viewports and handling multi-language localizations without inflating core web vital load speeds.",
    solution: "Utilized Tailwind's utility architecture to reduce style footprints and deployed static assets directly through localized Supabase edge routers.",
    stack: ["React", "Tailwind CSS", "Supabase"],
    images: [imgLifewood, imgLifewood2, imgLifewood3],
    github: "https://github.com/hannah-sheen/lifewood-Website"
  },
  {
    id: "proj-5",
    tag: "05",
    title: "PFC System",
    company: "People Fitness Center",
    description: "Specialized fitness management platform built to monitor membership metrics, log performance tracks, and optimize space scheduling.",
    challenge: "Preventing overlapping event assignments and resolving critical race conditions during high-volume check-in periods at the gym database.",
    solution: "Designed a clean, isolated relational schema with targeted structural indexes to safely handle rapid status updates without query locking.",
    stack: ["Python", "Database Engine", "UI Layouts System"],
    images: [imgPfc, imgPfc2, imgPfc3],
    github: "https://github.com/hannah-sheen/PFCSystem"
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [isLightbox, setIsLightbox] = useState<boolean>(false);
  
  const [isDown, setIsDown] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const mouseStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      document.body.setAttribute('data-dragging', 'false');
    };
  }, []);

  const handleOpenProject = (project: ProjectItem) => {
    setActiveProject(project);
    setCurrentImgIndex(0);
    setIsLightbox(false);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    mouseStartPos.current = { x: e.clientX, y: e.clientY };
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
    document.body.setAttribute('data-dragging', 'false');
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setTimeout(() => {
      setIsDragging(false);
      document.body.setAttribute('data-dragging', 'false');
    }, 50);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !scrollContainerRef.current) return;

    const deltaX = Math.abs(e.clientX - mouseStartPos.current.x);
    const deltaY = Math.abs(e.clientY - mouseStartPos.current.y);

    if (deltaX > 8 || deltaY > 8) {
      setIsDragging(true);
      document.body.setAttribute('data-dragging', 'true');
    }

    if (isDragging) {
      const walkX = (e.clientX - mouseStartPos.current.x) * 1.5; 
      scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
    }
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section 
      id="projects" 
      className="w-full h-screen bg-[#030712] text-white px-6 md:px-24 flex flex-col justify-between relative overflow-hidden"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:45px_45px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.02)_0%,transparent_60%)]" />
      </div>

      <div className="w-full h-full py-8 md:py-16 flex flex-col justify-between z-10 overflow-hidden">
        
        {/* HEADER BLOCK */}
        <div className="w-full flex flex-col items-end text-right space-y-1 shrink-0">
          <div className="py-0.5 pointer-events-auto cursor-default">
            <Shuffle text="PROJECTS" tag="h2" 
              textAlign="right" 
              shuffleDirection="left" 
              className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none"
              style={{ fontWeight: 950 }} 
            />
          </div>
          <div className="py-0.5 flex items-center justify-end gap-4 pointer-events-auto cursor-default w-full">
            <div className="h-[1px] flex-1 bg-gradient-to-l from-slate-700/60 to-transparent mr-2 opacity-50 block" />
            <Shuffle text="& Compiled Architecture" 
              tag="span" textAlign="right" 
              shuffleDirection="left" 
              className="block text-3xl sm:text-5xl md:text-6xl font-extralight text-indigo-300 italic tracking-wide leading-none"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }} 
            />
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-medium max-w-xl pt-3 normal-case pointer-events-none">
            My architectural compilation engineering web platforms, intelligent identity profiling pipelines, and adaptive automated tools.
          </p>
        </div>

        {/* DRAG TRACK FOR CARDS */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className={`w-full flex-1 flex items-center gap-4 md:gap-6 mt-4 mb-4 overflow-x-auto overflow-y-hidden pt-6 md:pt-10 pb-4 px-2 select-none justify-start [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory scroll-smooth'
          }`}
        >
          {projectsData.map((project) => (
            <div key={project.id} className="pointer-events-auto py-2 md:py-4 snap-center shrink-0">
              <InfoCard
                tag={project.tag}
                title={project.title}
                company={project.company}
                description={project.description}
                backgroundImage={project.images[0]}
                onClick={() => handleOpenProject(project)}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-between text-[9px] font-mono tracking-widest text-slate-600 uppercase pt-2 border-t border-white/5 shrink-0">
          <span className="md:hidden">Swipe to explore</span>
          <span className="hidden md:inline">Drag or scroll to explore</span>
        </div>
      </div>

      {/* ─── FULLSCREEN BLUR OVERLAY (Z-100) ─── */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#030712]/95 backdrop-blur-3xl overflow-y-auto px-6 md:px-16 lg:px-24 py-8 flex flex-col transition-opacity duration-500 ease-in-out ${
          activeProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
         }`}
      >
        {activeProject && (
          <div className="w-full flex flex-col max-w-7xl mx-auto relative">

            {/* Header Tray */}
            <div className="flex items-start justify-between pb-6 border-b border-white/5 shrink-0">
              <div className="text-left">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-1.5 leading-none">
                  {activeProject.title}
                </h3>
                <p className="text-[10px] md:text-sm text-slate-400 font-sans font-light mt-2 md:mt-2.5">
                  {activeProject.company}
                </p>
              </div>
              
              <button 
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all shadow-md"
                aria-label="Close layout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Split Grid Content Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 flex-1 items-start">
              <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
                <div className="space-y-1">
                  <h4 className="font-mono text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold">// System Synopsis</h4>
                  <p className="text-slate-200 text-sm md:text-base font-light leading-relaxed normal-case">
                    {activeProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="space-y-1 bg-red-500/[0.02] border border-red-500/10 p-4 rounded-xl">
                    <h4 className="font-mono text-[9px] text-red-400/90 uppercase tracking-widest font-bold">// Structural Challenge</h4>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed normal-case">
                      {activeProject.challenge}
                    </p>
                  </div>

                  <div className="space-y-1 bg-emerald-500/[0.02] border border-emerald-500/10 p-4 rounded-xl">
                    <h4 className="font-mono text-[9px] text-emerald-400/90 uppercase tracking-widest font-bold">// Engineering Solution</h4>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed normal-case">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">// Dependencies Track</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.stack.map(tech => (
                      <span key={tech} className="text-[9px] sm:text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-indigo-300 uppercase tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Image and Actions) */}
              <div className="lg:col-span-6 flex flex-col items-center space-y-6">
                
                {/* Micro-Icon Action Row */}
                <div className="w-full flex items-center justify-start gap-3 shrink-0 px-1">
                  {activeProject.article && (
                    <a 
                      href={activeProject.article} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-indigo-400 hover:text-indigo-300 transition-all shadow-md group/icon"
                      title="Navigator Log"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/icon:-translate-y-0.5 group-hover/icon:translate-x-0.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  {activeProject.github && (
                    <a 
                      href={activeProject.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all shadow-md group/icon"
                      title="Source Code Repository"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/icon:scale-105">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </a>
                  )}
                </div>

                <div 
                  onClick={() => setIsLightbox(true)}
                  className="w-full rounded-xl overflow-hidden bg-neutral-950/40 border border-white/5 p-1.5 shadow-xl shrink-0 cursor-zoom-in group relative"
                >
                  <img 
                    src={activeProject.images[currentImgIndex]} 
                    alt={`${activeProject.title} Rendering`} 
                    className="w-full h-auto max-h-[250px] sm:max-h-[350px] object-contain rounded-lg mx-auto transition-transform duration-500 group-hover:scale-[1.01]" 
                  />
                </div>

                {activeProject.images.length > 1 && (
                  <div className="flex items-center gap-2">
                    {activeProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImgIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentImgIndex === index ? 'w-6 bg-indigo-500' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to snapshot ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Matrix Baseline */}
            <div className="w-full text-left font-mono text-[9px] text-slate-600 border-t border-white/5 pt-6 pb-4 tracking-widest shrink-0">
              <span>// PIPELINE ENCRYPT READOUT: OK</span>
            </div>

          </div>
        )}
      </div>

      {/* ─── SCREEN-WIDE LIGHTBOX (Z-200, NO CLOSE BUTTON) ─── */}
      {activeProject && isLightbox && (
        <div 
          onClick={() => setIsLightbox(false)}
          className="fixed inset-0 w-screen h-screen bg-[#030712] z-[200] flex items-center justify-center cursor-zoom-out animate-fade-in"
        >
          <img 
            src={activeProject.images[currentImgIndex]} 
            alt="Expanded Fullscreen Snapshot" 
            className="max-w-[95vw] max-h-[92vh] object-contain rounded-xl shadow-2xl" 
          />
        </div>
      )}
    </section>
  );
}