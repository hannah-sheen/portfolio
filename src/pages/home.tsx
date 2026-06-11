import CardSwap, { Card } from '../components/CardSwap'
import Shuffle from '../components/Shuffle'

export default function Home() {
  return (
    <section id="home" className="flex w-full h-screen overflow-hidden relative bg-[#030712]">
      
      {/* LEFT HALF: Header Layout Window */}
      <div className="w-1/2 h-full relative overflow-hidden border-r border-white/5 flex flex-col justify-between p-16 md:p-20">
        
        {/* Background lanyard canvas placeholder space */}
        <div className="absolute inset-0 -mt-30 h-[110%] pointer-events-none" />

        {/* Dummy spacing element */}
        <div className="h-6" />

        {/* Center Primary Identity Headers */}
        <div className="relative space-y-1 w-full z-20 select-none my-auto">
          <div className="absolute -left-10 top-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="overflow-hidden py-1">
            <Shuffle
              text="Hannah"
              tag="span"
              textAlign="left"
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.03}
              shuffleTimes={2}
              className="block text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-none"
              style={{ fontWeight: 950 }}
            />
          </div>

          <div className="overflow-hidden py-1 flex items-center gap-4">
            <Shuffle
              text="Sheen"
              tag="span"
              textAlign="left"
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.035}
              shuffleTimes={2}
              className="block text-6xl md:text-7xl font-extralight text-slate-400 italic tracking-wide leading-none"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }} 
            />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-700/60 to-transparent ml-2 opacity-50 hidden sm:block" />
          </div>

          <div className="overflow-hidden py-1">
            <Shuffle
              text="Obejero"
              tag="span"
              textAlign="left"
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.7}
              stagger={0.04}
              shuffleTimes={2}
              className="block text-7xl md:text-8xl font-black tracking-tight uppercase leading-none text-indigo-300"
              style={{ fontWeight: 950 }}
            />
          </div>
        </div>

        {/* Bottom Subtext Profile Block */}
        <div className="z-20 max-w-sm border-l-2 border-indigo-500/30 pl-4 py-1 select-none">
          <p className="text-sm leading-relaxed text-slate-400 font-medium">
            Building robust web foundations, scalable database systems, and clean server-side logic wrapped in elegant interfaces.
          </p>
        </div>
      </div>

      {/* RIGHT HALF: CardSwap Deck Container */}
      {/* UPDATED: Container dimensions adjusted down from 840x620 to 560x420 for a more compact appearance */}
      <div className="w-1/2 h-full flex items-center justify-center bg-[#030712]">
        <div style={{ width: 560, height: 420, position: 'relative' }}>
          <CardSwap cardDistance={64} verticalDistance={72} delay={5000} pauseOnHover={false} width={560} height={420}>
            
            {/* CARD 1: Backend Architecture Focus */}
            {/* UPDATED: Swapped padding to p-8, title to text-2xl, and description text to text-base */}
            <Card customClass="bg-slate-950/90 text-white p-8 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.9)] border border-white/5 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-3">Backend Core</h3>
              <p className="text-base leading-relaxed text-slate-300">Designing dependable server architectures, custom logic systems, and smooth API integration maps.</p>
            </Card>
            
            {/* CARD 2: Structured Data Focus */}
            <Card customClass="bg-slate-950/90 text-white p-8 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.9)] border border-white/5 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-3">Data Pipelines</h3>
              <p className="text-base leading-relaxed text-slate-300">Managing relational storage layers and secure routing mechanisms to keep platform info completely stable.</p>
            </Card>
            
            {/* CARD 3: Clean Full Stack Focus */}
            <Card customClass="bg-slate-950/90 text-white p-8 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.9)] border border-white/5 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-3">Full-Stack Flow</h3>
              <p className="text-base leading-relaxed text-slate-300">Constructing clean, responsive presentation layers intentionally optimized to connect with complex backend features.</p>
            </Card>

          </CardSwap>
        </div>
      </div>

    </section>
  )
}