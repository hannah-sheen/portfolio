// import Shuffle from '../components/Shuffle'
// import Lanyard from '../components/Lanyard'
// import forLanyard from '../assets/images/for_lanyard.jpg'

// function makeNameImage(): string {
//   const canvas = document.createElement('canvas')
//   canvas.width = 600
//   canvas.height = 800
//   const ctx = canvas.getContext('2d')!
//   ctx.fillStyle = '#111827'
//   ctx.fillRect(0, 0, 600, 800)
//   ctx.fillStyle = '#ffffff'
//   ctx.font = 'bold 64px Manrope, system-ui, sans-serif'
//   ctx.textAlign = 'center'
//   ctx.textBaseline = 'middle'
//   ctx.fillText('Hannah', 300, 340)
//   ctx.fillText('Sheen', 300, 420)
//   ctx.fillText('Obejero', 300, 500)
//   return canvas.toDataURL()
// }

// const backImage = makeNameImage()

// export default function About() {
//   return (
//     <section id="about" className="w-full h-screen bg-[#030712] relative overflow-hidden flex" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
//       {/* LEFT SIDE: Lanyard Canvas */}
//       <div className="w-1/2 h-full relative overflow-hidden border-r border-white/5">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.02)_0%,transparent_75%)] pointer-events-none" />
//         <div className="absolute inset-0 -mt-30 h-[110%]">
//           <Lanyard 
//             position={[0, 0, 15]} 
//             gravity={[0, -40, 0]} 
//             frontImage={forLanyard} 
//             backImage={backImage} 
//             imageFit="contain" 
//             cardName="Hannah Sheen" 
//           />
//         </div>
//       </div>

//       {/* RIGHT SIDE: Narrative Content Block */}
//       <div className="w-1/2 h-full relative z-10 flex flex-col justify-center gap-12 p-12 md:p-16 select-none">
        
//         {/* Header Section */}
//         <div className="space-y-1">
//           <div className="overflow-hidden py-1">
//             <Shuffle
//               text="ABOUT ME"
//               tag="h2"
//               textAlign="left"
//               shuffleDirection="right"
//               animationMode="evenodd"
//               duration={0.6}
//               stagger={0.03}
//               className="text-5xl md:text-6xl font-black tracking-tight uppercase leading-none text-white"
//               style={{ fontWeight: 950 }}
//             />
//           </div>
//           <div className="overflow-hidden py-1 flex items-center gap-4">
//             <Shuffle
//               text="& System Foundations"
//               tag="span"
//               textAlign="left"
//               shuffleDirection="right"
//               animationMode="evenodd"
//               duration={0.6}
//               stagger={0.035}
//               className="text-4xl md:text-5xl font-extralight text-slate-400 italic tracking-wide leading-none"
//               style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
//             />
//           </div>
//         </div>

//         {/* Narrative Copy */}
//         <div className="max-w-xl space-y-6">
//           <p className="text-lg md:text-xl font-light text-slate-300 leading-relaxed tracking-tight">
//             I am a full-stack developer who naturally gravitates toward the backend. I enjoy exploring server architectures, writing logic, and discovering how structured data connects seamlessly behind the scenes.
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-400 tracking-wide uppercase">
//             <div className="space-y-2 border-l-2 border-indigo-500/30 pl-4">
//               <span className="font-bold text-white block mb-0.5">My Current Focus</span>
//               <p className="normal-case text-slate-400">
//                 I am focused on strengthening my foundational knowledge of API routing, server stability, and databases, aiming to write clean, maintainable backend code.
//               </p>
//             </div>
//             <div className="space-y-2 border-l-2 border-emerald-400/30 pl-4">
//               <span className="font-bold text-white block mb-0.5">The Full Stack Mix</span>
//               <p className="normal-case text-slate-400">
//                 While I enjoy building web interfaces, I treat the frontend as a clean wrapper designed to correctly display the underlying logic I construct.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Footer Row */}
//         <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
//           <div>
//             <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Location</p>
//             <p className="text-xs font-semibold text-indigo-300">Philippines</p>
//           </div>
//           <div>
//             <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Preferred Environment</p>
//             <p className="text-xs font-semibold text-emerald-400">Backend Logic</p>
//           </div>
//           <div>
//             <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Stage</p>
//             <p className="text-xs font-semibold text-slate-300">Junior Developer</p>
//           </div>
//         </div>

//       </div>

//     </section>
//   )
// }

import Shuffle from '../components/Shuffle'
import Lanyard from '../components/Lanyard'
import forLanyard from '../assets/images/for_lanyard.jpg'

// Dynamic ID card name generation function - fully restored
function makeNameImage(): string {
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 800
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#111827'
  ctx.fillRect(0, 0, 600, 800)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 64px Manrope, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Hannah', 300, 340)
  ctx.fillText('Sheen', 300, 420)
  ctx.fillText('Obejero', 300, 500)
  return canvas.toDataURL()
}

const backImage = makeNameImage()

export default function About() {
  return (
    <section id="about" className="w-full h-screen bg-[#030712] relative overflow-hidden flex" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
      {/* LEFT SIDE: Interactive Lanyard Canvas (Fully Restored exactly how you had it) */}
      <div className="w-1/2 h-full relative overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.02)_0%,transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 -mt-30 h-[110%]">
          <Lanyard 
            position={[0, 0, 15]} 
            gravity={[0, -40, 0]} 
            frontImage={forLanyard} 
            backImage={backImage} 
            imageFit="contain" 
            cardName="Hannah Sheen Obejero" 
          />
        </div>
      </div>

      {/* RIGHT SIDE: Narrative Content Block (Spaced and optimized for better utility) */}
      <div className="w-1/2 h-full relative z-10 flex flex-col justify-between p-16 md:p-20 select-none">
        
        {/* Top Alignment Holder */}
        <div className="h-6" />

        {/* Narrative Core Frame */}
        <div className="my-auto space-y-10">
          
          {/* Header Section - Styled for bold editorial cohesion */}
          <div className="space-y-1">
            <div className="overflow-hidden py-1">
              <Shuffle
                text="ABOUT ME"
                tag="h2"
                textAlign="left"
                shuffleDirection="right"
                animationMode="evenodd"
                duration={0.6}
                stagger={0.03}
                className="text-6xl md:text-7xl font-black tracking-tight uppercase leading-none text-white"
                style={{ fontWeight: 950 }}
              />
            </div>
            <div className="overflow-hidden py-1 flex items-center gap-4">
              <Shuffle
                text="& System Foundations"
                tag="span"
                textAlign="left"
                shuffleDirection="right"
                animationMode="evenodd"
                duration={0.6}
                stagger={0.035}
                className="text-4xl md:text-5xl font-extralight text-indigo-300 italic tracking-wide leading-none"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              />
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-700/60 to-transparent ml-2 opacity-50 hidden sm:block" />
            </div>
          </div>

          {/* Narrative Copy - Upgraded slightly to matching text dimensions */}
          <div className="max-w-xl space-y-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-200 tracking-tight">
              I am a full-stack developer who naturally gravitates toward the backend. I enjoy exploring server architectures, writing logic, and discovering how structured data connects seamlessly behind the scenes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-400 tracking-wide uppercase">
              <div className="space-y-2 border-l-2 border-indigo-500/30 pl-4 py-1">
                <span className="font-bold text-white block mb-0.5">My Current Focus</span>
                <p className="normal-case text-slate-400 text-sm">
                  I am focused on strengthening my foundational knowledge of API routing, server stability, and databases, aiming to write clean, maintainable backend code.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-emerald-400/30 pl-4 py-1">
                <span className="font-bold text-white block mb-0.5">The Full Stack Mix</span>
                <p className="normal-case text-slate-400 text-sm">
                  While I enjoy building web interfaces, I treat the frontend as a clean wrapper designed to correctly display the underlying logic I construct.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Row - Crisp layout metadata metrics mapping at the base */}
        <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Location</p>
            <p className="text-xs font-semibold text-indigo-300">Philippines</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Preferred Environment</p>
            <p className="text-xs font-semibold text-emerald-400">Backend Logic</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Stage</p>
            <p className="text-xs font-semibold text-slate-300">Junior Developer</p>
          </div>
        </div>

      </div>

    </section>
  )
}