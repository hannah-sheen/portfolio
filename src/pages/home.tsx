// import { useState } from 'react';
// import CardSwap, { Card } from '../components/CardSwap';
// import Shuffle from '../components/Shuffle';
// import LoadingScreen from '../components/LoadingScreen';

// export default function Home() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   // 3D Premium Glass Layer Styling
//   const glassCardClass = "backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-950/75 to-slate-900/90 text-white p-10 border border-white/15 rounded-2xl flex flex-col justify-between h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5),_inset_0_1px_1px_0_rgba(255,255,255,0.15)] select-none";

//   return (
//     <>
//       {/* 1. Global Screen Mounting Loader Overlay */}
//       {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

//       {/* 2. Main Area Section - Becomes visible only when isLoading goes false */}
//       <section 
//         id="home" 
//         className={`flex w-full h-screen overflow-hidden relative bg-[#030712] transition-opacity duration-1000 ease-out ${
//           isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
//         }`}
//         style={{ fontFamily: "'Manrope', sans-serif" }}
//       >
        
//         {/* LEFT HALF: Header Layout Window */}
//         <div className="w-1/2 h-full relative overflow-hidden border-r border-white/5 flex flex-col justify-between p-16 md:p-20">
//           <div className="absolute inset-0 -mt-30 h-[110%] pointer-events-none" />
//           <div className="h-6" />

//           {/* Center Primary Identity Headers */}
//           <div className="relative space-y-1 w-full z-20 select-none my-auto">
//             <div className="absolute -left-10 top-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            
//             <div className="overflow-hidden py-1">
//               {!isLoading && (
//                 <Shuffle
//                   text="Hannah"
//                   tag="span"
//                   textAlign="left"
//                   shuffleDirection="right"
//                   animationMode="evenodd"
//                   duration={0.6}
//                   stagger={0.03}
//                   shuffleTimes={2}
//                   className="block text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-none"
//                   style={{ fontWeight: 950 }}
//                 />
//               )}
//             </div>

//             <div className="overflow-hidden py-1 flex items-center gap-4">
//               {!isLoading && (
//                 <Shuffle
//                   text="Sheen"
//                   tag="span"
//                   textAlign="left"
//                   shuffleDirection="right"
//                   animationMode="evenodd"
//                   duration={0.6}
//                   stagger={0.035}
//                   shuffleTimes={2}
//                   className="block text-6xl md:text-7xl font-extralight text-slate-400 italic tracking-wide leading-none"
//                   style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }} 
//                 />
//               )}
//               <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-700/60 to-transparent ml-2 opacity-50 hidden sm:block" />
//             </div>

//             <div className="overflow-hidden py-1">
//               {!isLoading && (
//                 <Shuffle
//                   text="Obejero"
//                   tag="span"
//                   textAlign="left"
//                   shuffleDirection="right"
//                   animationMode="evenodd"
//                   duration={0.7}
//                   stagger={0.04}
//                   shuffleTimes={2}
//                   className="block text-7xl md:text-8xl font-black tracking-tight uppercase leading-none text-indigo-300"
//                   style={{ fontWeight: 950 }}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Bottom Subtext Profile Block */}
//           <div className="z-20 max-w-sm border-l-2 border-indigo-500/30 pl-4 py-1 select-none">
//             <p className="text-sm leading-relaxed text-slate-400 font-medium">
//               Building robust web foundations, scalable database systems, and clean server-side logic wrapped in elegant interfaces.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT HALF: CardSwap Deck Container */}
//         <div className="w-1/2 h-full flex items-center justify-center bg-[#030712] relative select-none p-12">
//           {/* Enhanced Backing Lights to filter refract points across the crystal glass layers */}
//           <div className="absolute w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-[120px] -top-10 right-10 pointer-events-none animate-pulse duration-[8000ms]" />
//           <div className="absolute w-[400px] h-[400px] bg-gradient-to-tl from-emerald-500/15 to-transparent rounded-full blur-[100px] -bottom-10 right-20 pointer-events-none animate-pulse duration-[6000ms]" />

//           {/* Restored cleanly to your preferred 640x480 resolution layout */}
//           <div style={{ width: 640, height: 480, position: 'relative', zIndex: 10 }}>
//             {!isLoading && (
//               <CardSwap 
//                 cardDistance={52} 
//                 verticalDistance={44} 
//                 delay={2000} 
//                 pauseOnHover={false} 
//                 width={640} 
//                 height={480}
//               >
                
//                 {/* CARD 1: Database Relation Schema Diagram */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">DATA_RELATION // 01</span>
//                       <span className="text-xs text-slate-400 font-mono font-light">RELATION_MAP: OK</span>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Relational Schemas</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-6">Structuring clear normalization layers, mapping indexing paths, and engineering fast data query maps.</p>
                    
//                     {/* Visual 1: Mock Database Relation Layout */}
//                     <div className="bg-slate-950/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2.5 shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
//                       <div className="flex justify-between items-center"><span className="text-white bg-white/10 px-2 py-0.5 rounded shadow-sm border border-white/5">users.id</span><span className="text-slate-500 tracking-tighter">─────── (1:N) ───────</span><span className="text-slate-400">posts.user_id</span></div>
//                       <div className="flex justify-between items-center"><span className="text-white bg-white/10 px-2 py-0.5 rounded shadow-sm border border-white/5">sessions.token</span><span className="text-slate-500 tracking-tighter">─────── (1:1) ───────</span><span className="text-slate-400">users.session_id</span></div>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['PostgreSQL', 'MongoDB', 'Prisma ORM'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//                 {/* CARD 2: GitHub-Style Activity Contribution Grid */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CI_COMMIT // 02</span>
//                       <span className="text-xs text-emerald-400 font-mono font-light">ACTIVE DEPLOY</span>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Version Infrastructure</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-6">Maintaining dependable development workflows with structural atomic code changes and reliable source tree systems.</p>
                    
//                     {/* Visual 2: Expanded GitHub-Style Grid Matrix */}
//                     <div className="grid grid-flow-col grid-rows-4 gap-2 p-4 bg-slate-950/40 border border-white/10 rounded-xl w-fit shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
//                       {[4, 2, 0, 3, 1, 4, 2, 0, 4, 3, 1, 4, 0, 2, 3, 4, 1, 0, 3, 2, 4, 1, 0, 4, 2, 3, 1, 4, 2, 0, 3, 4, 1, 0, 2, 4].map((val, idx) => {
//                         const colors = ['bg-slate-900/60', 'bg-emerald-950/40', 'bg-emerald-900/50', 'bg-emerald-700/80', 'bg-emerald-500'];
//                         return <div key={idx} className={`w-3.5 h-3.5 rounded-sm ${colors[val]} border border-white/[0.02] shadow-sm`} />
//                       })}
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['Git Engine', 'GitHub Actions', 'Monorepos'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//                 {/* CARD 3: Minimalist Wireframe Viewport Skeleton */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CLIENT_BRIDGE // 03</span>
//                       <span className="text-xs text-slate-400 font-mono font-light">VIEWPORT: FLUID</span>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Full-Stack Flow</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-6">Constructing clean presentation layouts intentionally optimized to connect perfectly with deeper database routing loops.</p>
                    
//                     {/* Visual 3: Architectural Wireframe Screen Skeleton */}
//                     <div className="w-full border border-white/10 rounded-xl p-4 flex flex-col gap-3 bg-slate-950/40 shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
//                       <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
//                         <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/30" /><div className="w-2 h-2 rounded-full bg-white/30" /><div className="w-2 h-2 rounded-full bg-white/30" /></div>
//                         <div className="w-28 h-2.5 bg-white/10 rounded" />
//                       </div>
//                       <div className="flex gap-4 pt-1">
//                         <div className="w-16 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-md" />
//                         <div className="flex-1 space-y-2.5 py-1">
//                           <div className="w-full h-2 bg-white/10 rounded" />
//                           <div className="w-3/4 h-2 bg-white/5 rounded" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['TypeScript', 'React 19', 'Tailwind CSS'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//                 {/* CARD 4: Live API Performance Streams / Logs */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CORE_API // 04</span>
//                       <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-light"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LISTENING</div>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Backend Architecture</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-6">Designing dependable server architectures, decoupled custom micro-logics, and clean data translation systems.</p>
                    
//                     {/* Visual 4: Mock Live API Terminal Stream */}
//                     <div className="font-mono text-xs bg-slate-950/80 p-4 rounded-xl border border-white/10 space-y-1.5 shadow-lg">
//                       <p className="text-slate-300"><span className="text-emerald-400">➔</span> GET /api/v1/auth/session <span className="text-emerald-400">200 OK</span> <span className="text-slate-500">(14ms)</span></p>
//                       <p className="text-slate-300"><span className="text-indigo-400">➔</span> POST /api/v1/data/sync <span className="text-indigo-400">201 CREATED</span> <span className="text-slate-500">(124ms)</span></p>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['Node.js', 'Express Engine', 'REST APIs'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//                 {/* CARD 5: Server Cluster Nodes Configuration */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CLUSTER_NET // 05</span>
//                       <span className="text-xs text-slate-400 font-mono font-light">REGIONS: 2 STABLE</span>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Distributed Services</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-6">Managing multi-node server infrastructure environments to process continuous data loading patterns efficiently.</p>
                    
//                     {/* Visual 5: Server Cluster Matrix Status Blocks */}
//                     <div className="grid grid-cols-2 gap-3 font-mono text-xs">
//                       <div className="p-3 bg-slate-950/40 border border-white/10 rounded-xl flex items-center justify-between shadow-[inset_0_1px_6px_rgba(0,0,0,0.4)]">
//                         <span className="text-slate-200">node-apac-01</span>
//                         <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />22ms</span>
//                       </div>
//                       <div className="p-3 bg-slate-950/40 border border-white/10 rounded-xl flex items-center justify-between shadow-[inset_0_1px_6px_rgba(0,0,0,0.4)]">
//                         <span className="text-slate-200">node-useast-02</span>
//                         <span className="text-indigo-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />89ms</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['Network Routing', 'Cors Systems', 'Cloud Nodes'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//                 {/* CARD 6: Micro JSON Payload Output */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">DATA_STREAM // 06</span>
//                       <span className="text-xs text-indigo-400 font-mono font-light">JSON_STRUCT</span>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Structured Payloads</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-5">Parsing clean data models, ensuring rigid structural typing definitions, and managing accurate system communications.</p>
                    
//                     {/* Visual 6: Micro Object JSON Tree */}
//                     <div className="p-4 bg-slate-950/70 rounded-xl font-mono text-xs border border-white/10 text-slate-400 shadow-md">
//                       <span className="text-indigo-300">{"{"}</span> <br/>
//                       &nbsp;&nbsp;<span className="text-emerald-400">"status"</span>: <span className="text-slate-200">"synchronized"</span>,<br/>
//                       &nbsp;&nbsp;<span className="text-emerald-400">"modules"</span>: <span className="text-indigo-300">["auth", "db", "stream"]</span><br/>
//                       <span className="text-indigo-300">{"}"}</span>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['Data Serialization', 'Type Maps', 'NoSQL Formats'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//                 {/* CARD 7: Encryption Token Validation Steps */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">SECURE_GUARD // 07</span>
//                       <span className="text-xs text-emerald-400 font-mono font-light">KEY_VERIFIED</span>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Security & Identity</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-6">Enforcing modern session authorization layers, parsing tokens safely, and writing robust verification protocols.</p>
                    
//                     {/* Visual 7: Token Cryptographic Flow Maps */}
//                     <div className="w-full flex items-center justify-between p-4 bg-slate-950/40 border border-white/10 rounded-xl font-mono text-xs text-slate-300 shadow-[inset_0_1px_8px_rgba(0,0,0,0.5)]">
//                       <span className="text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded shadow-sm">SHA-256</span>
//                       <span className="text-slate-500">➔</span>
//                       <span className="text-slate-300 font-semibold">[ 4a8e...3b9c ]</span>
//                       <span className="text-slate-500">➔</span>
//                       <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded shadow-sm animate-pulse">VALIDATED</span>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['JWT Verification', 'Bcrypt Hashing', 'Auth Guards'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//                 {/* CARD 8: Real-Time System Telemetry Gauges */}
//                 <Card customClass={glassCardClass}>
//                   <div>
//                     <div className="flex items-center justify-between mb-6">
//                       <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">METRIC_LOG // 08</span>
//                       <span className="text-xs text-slate-400 font-mono font-light">LOOP_LOAD: MINIMAL</span>
//                     </div>
//                     <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Performance Tracking</h3>
//                     <p className="text-base leading-relaxed text-slate-300 mb-6">Optimizing event loop speeds, analyzing memory limits, and building optimized runtime structures.</p>
                    
//                     {/* Visual 8: Multi-Layer Performance Data Progress Bars */}
//                     <div className="space-y-3 bg-slate-950/40 p-4 border border-white/10 rounded-xl font-mono text-xs text-slate-400 shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
//                       <div>
//                         <div className="flex justify-between text-slate-300 mb-1"><span>CPU Thread Weight</span><span className="text-emerald-400 font-semibold">14%</span></div>
//                         <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-sm"><div className="bg-emerald-400 h-full w-[14%]" /></div>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-slate-300 mb-1"><span>Heap Memory Alloc</span><span className="text-indigo-400 font-semibold">242MB</span></div>
//                         <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-sm"><div className="bg-indigo-400 h-full w-[38%]" /></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
//                     {['Event Loops', 'Memory Logs', 'System Tuning'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
//                   </div>
//                 </Card>

//               </CardSwap>
//             )}
//           </div>
//         </div>

//       </section>
//     </>
//   );
// }

import { useState } from 'react';
import CardSwap, { Card } from '../components/CardSwap';
import Shuffle from '../components/Shuffle';
import LoadingScreen from '../components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 3D Premium Glass Layer Styling
  const glassCardClass = "backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-950/75 to-slate-900/90 text-white p-10 border border-white/15 rounded-2xl flex flex-col justify-between h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5),_inset_0_1px_1px_0_rgba(255,255,255,0.15)] select-none";

  return (
    <>
      {/* 1. Global Screen Mounting Loader Overlay */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Main Area Section - Becomes visible only when isLoading goes false */}
      <section 
        id="home" 
        className={`flex flex-col md:flex-row w-full h-screen overflow-hidden relative bg-[#030712] transition-opacity duration-1000 ease-out ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        
        {/* LEFT HALF: Header Layout Window (Expands to full screen on mobile) */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between p-8 sm:p-16 md:p-20">
          <div className="absolute inset-0 -mt-30 h-[110%] pointer-events-none" />
          <div className="h-6 hidden md:block" />

          {/* Center Primary Identity Headers */}
          <div className="relative space-y-1 w-full z-20 select-none my-auto">
            <div className="absolute -left-10 top-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="overflow-hidden py-1">
              {!isLoading && (
                <Shuffle
                  text="Hannah"
                  tag="span"
                  textAlign="left"
                  shuffleDirection="right"
                  animationMode="evenodd"
                  duration={0.6}
                  stagger={0.03}
                  shuffleTimes={2}
                  className="block text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-none"
                  style={{ fontWeight: 950 }}
                />
              )}
            </div>

            <div className="overflow-hidden py-1 flex items-center gap-4">
              {!isLoading && (
                <Shuffle
                  text="Sheen"
                  tag="span"
                  textAlign="left"
                  shuffleDirection="right"
                  animationMode="evenodd"
                  duration={0.6}
                  stagger={0.035}
                  shuffleTimes={2}
                  className="block text-5xl sm:text-6xl md:text-7xl font-extralight text-slate-400 italic tracking-wide leading-none"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }} 
                />
              )}
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-700/60 to-transparent ml-2 opacity-50 hidden sm:block" />
            </div>

            <div className="overflow-hidden py-1">
              {!isLoading && (
                <Shuffle
                  text="Obejero"
                  tag="span"
                  textAlign="left"
                  shuffleDirection="right"
                  animationMode="evenodd"
                  duration={0.7}
                  stagger={0.04}
                  shuffleTimes={2}
                  className="block text-6xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-none text-indigo-300"
                  style={{ fontWeight: 950 }}
                />
              )}
            </div>
          </div>

          {/* Bottom Subtext Profile Block */}
          <div className="z-20 max-w-sm border-l-2 border-indigo-500/30 pl-4 py-1 select-none mt-6 md:mt-0">
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Building robust web foundations, scalable database systems, and clean server-side logic wrapped in elegant interfaces.
            </p>
          </div>
        </div>

        {/* RIGHT HALF: CardSwap Deck Container (Completely hidden when screen becomes smaller) */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-[#030712] relative select-none p-12">
          {/* Enhanced Backing Lights to filter refract points across the crystal glass layers */}
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-[120px] -top-10 right-10 pointer-events-none animate-pulse duration-[8000ms]" />
          <div className="absolute w-[400px] h-[400px] bg-gradient-to-tl from-emerald-500/15 to-transparent rounded-full blur-[100px] -bottom-10 right-20 pointer-events-none animate-pulse duration-[6000ms]" />

          {/* Restored cleanly to your preferred 640x480 resolution layout */}
          <div style={{ width: 640, height: 480, position: 'relative', zIndex: 10 }}>
            {!isLoading && (
              <CardSwap 
                cardDistance={52} 
                verticalDistance={44} 
                delay={2000} 
                pauseOnHover={false} 
                width={640} 
                height={480}
              >
                
                {/* CARD 1: Database Relation Schema Diagram */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">DATA_RELATION // 01</span>
                      <span className="text-xs text-slate-400 font-mono font-light">RELATION_MAP: OK</span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Relational Schemas</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-6">Structuring clear normalization layers, mapping indexing paths, and engineering fast data query maps.</p>
                    
                    {/* Visual 1: Mock Database Relation Layout */}
                    <div className="bg-slate-950/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2.5 shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
                      <div className="flex justify-between items-center"><span className="text-white bg-white/10 px-2 py-0.5 rounded shadow-sm border border-white/5">users.id</span><span className="text-slate-500 tracking-tighter">─────── (1:N) ───────</span><span className="text-slate-400">posts.user_id</span></div>
                      <div className="flex justify-between items-center"><span className="text-white bg-white/10 px-2 py-0.5 rounded shadow-sm border border-white/5">sessions.token</span><span className="text-slate-500 tracking-tighter">─────── (1:1) ───────</span><span className="text-slate-400">users.session_id</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['PostgreSQL', 'MongoDB', 'Prisma ORM'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

                {/* CARD 2: GitHub-Style Activity Contribution Grid */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CI_COMMIT // 02</span>
                      <span className="text-xs text-emerald-400 font-mono font-light">ACTIVE DEPLOY</span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Version Infrastructure</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-6">Maintaining dependable development workflows with structural atomic code changes and reliable source tree systems.</p>
                    
                    {/* Visual 2: Expanded GitHub-Style Grid Matrix */}
                    <div className="grid grid-flow-col grid-rows-4 gap-2 p-4 bg-slate-950/40 border border-white/10 rounded-xl w-fit shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
                      {[4, 2, 0, 3, 1, 4, 2, 0, 4, 3, 1, 4, 0, 2, 3, 4, 1, 0, 3, 2, 4, 1, 0, 4, 2, 3, 1, 4, 2, 0, 3, 4, 1, 0, 2, 4].map((val, idx) => {
                        const colors = ['bg-slate-900/60', 'bg-emerald-950/40', 'bg-emerald-900/50', 'bg-emerald-700/80', 'bg-emerald-500'];
                        return <div key={idx} className={`w-3.5 h-3.5 rounded-sm ${colors[val]} border border-white/[0.02] shadow-sm`} />
                      })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['Git Engine', 'GitHub Actions', 'Monorepos'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

                {/* CARD 3: Minimalist Wireframe Viewport Skeleton */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CLIENT_BRIDGE // 03</span>
                      <span className="text-xs text-slate-400 font-mono font-light">VIEWPORT: FLUID</span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Full-Stack Flow</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-6">Constructing clean presentation layouts intentionally optimized to connect perfectly with deeper database routing loops.</p>
                    
                    {/* Visual 3: Architectural Wireframe Screen Skeleton */}
                    <div className="w-full border border-white/10 rounded-xl p-4 flex flex-col gap-3 bg-slate-950/40 shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                        <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/30" /><div className="w-2 h-2 rounded-full bg-white/30" /><div className="w-2 h-2 rounded-full bg-white/30" /></div>
                        <div className="w-28 h-2.5 bg-white/10 rounded" />
                      </div>
                      <div className="flex gap-4 pt-1">
                        <div className="w-16 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-md" />
                        <div className="flex-1 space-y-2.5 py-1">
                          <div className="w-full h-2 bg-white/10 rounded" />
                          <div className="w-3/4 h-2 bg-white/5 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['TypeScript', 'React 19', 'Tailwind CSS'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

                {/* CARD 4: Live API Performance Streams / Logs */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CORE_API // 04</span>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-light"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LISTENING</div>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Backend Architecture</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-6">Designing dependable server architectures, decoupled custom micro-logics, and clean data translation systems.</p>
                    
                    {/* Visual 4: Mock Live API Terminal Stream */}
                    <div className="font-mono text-xs bg-slate-950/80 p-4 rounded-xl border border-white/10 space-y-1.5 shadow-lg">
                      <p className="text-slate-300"><span className="text-emerald-400">➔</span> GET /api/v1/auth/session <span className="text-emerald-400">200 OK</span> <span className="text-slate-500">(14ms)</span></p>
                      <p className="text-slate-300"><span className="text-indigo-400">➔</span> POST /api/v1/data/sync <span className="text-indigo-400">201 CREATED</span> <span className="text-slate-500">(124ms)</span></p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['Node.js', 'Express Engine', 'REST APIs'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

                {/* CARD 5: Server Cluster Nodes Configuration */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">CLUSTER_NET // 05</span>
                      <span className="text-xs text-slate-400 font-mono font-light">REGIONS: 2 STABLE</span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Distributed Services</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-6">Managing multi-node server infrastructure environments to process continuous data loading patterns efficiently.</p>
                    
                    {/* Visual 5: Server Cluster Matrix Status Blocks */}
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3 bg-slate-950/40 border border-white/10 rounded-xl flex items-center justify-between shadow-[inset_0_1px_6px_rgba(0,0,0,0.4)]">
                        <span className="text-slate-200">node-apac-01</span>
                        <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />22ms</span>
                      </div>
                      <div className="p-3 bg-slate-950/40 border border-white/10 rounded-xl flex items-center justify-between shadow-[inset_0_1px_6px_rgba(0,0,0,0.4)]">
                        <span className="text-slate-200">node-useast-02</span>
                        <span className="text-indigo-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />89ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['Network Routing', 'Cors Systems', 'Cloud Nodes'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

                {/* CARD 6: Micro JSON Payload Output */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">DATA_STREAM // 06</span>
                      <span className="text-xs text-indigo-400 font-mono font-light">JSON_STRUCT</span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Structured Payloads</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-5">Parsing clean data models, ensuring rigid structural typing definitions, and managing accurate system communications.</p>
                    
                    {/* Visual 6: Micro Object JSON Tree */}
                    <div className="p-4 bg-slate-950/70 rounded-xl font-mono text-xs border border-white/10 text-slate-400 shadow-md">
                      <span className="text-indigo-300">{"{"}</span> <br/>
                      &nbsp;&nbsp;<span className="text-emerald-400">"status"</span>: <span className="text-slate-200">"synchronized"</span>,<br/>
                      &nbsp;&nbsp;<span className="text-emerald-400">"modules"</span>: <span className="text-indigo-300">["auth", "db", "stream"]</span><br/>
                      <span className="text-indigo-300">{"}"}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['Data Serialization', 'Type Maps', 'NoSQL Formats'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

                {/* CARD 7: Encryption Token Validation Steps */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">SECURE_GUARD // 07</span>
                      <span className="text-xs text-emerald-400 font-mono font-light">KEY_VERIFIED</span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Security & Identity</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-6">Enforcing modern session authorization layers, parsing tokens safely, and writing robust verification protocols.</p>
                    
                    {/* Visual 7: Token Cryptographic Flow Maps */}
                    <div className="w-full flex items-center justify-between p-4 bg-slate-950/40 border border-white/10 rounded-xl font-mono text-xs text-slate-300 shadow-[inset_0_1px_8px_rgba(0,0,0,0.5)]">
                      <span className="text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded shadow-sm">SHA-256</span>
                      <span className="text-slate-500">➔</span>
                      <span className="text-slate-300 font-semibold">[ 4a8e...3b9c ]</span>
                      <span className="text-slate-500">➔</span>
                      <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded shadow-sm animate-pulse">VALIDATED</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['JWT Verification', 'Bcrypt Hashing', 'Auth Guards'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

                {/* CARD 8: Real-Time System Telemetry Gauges */}
                <Card customClass={glassCardClass}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">METRIC_LOG // 08</span>
                      <span className="text-xs text-slate-400 font-mono font-light">LOOP_LOAD: MINIMAL</span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Performance Tracking</h3>
                    <p className="text-base leading-relaxed text-slate-300 mb-6">Optimizing event loop speeds, analyzing memory limits, and building optimized runtime structures.</p>
                    
                    {/* Visual 8: Multi-Layer Performance Data Progress Bars */}
                    <div className="space-y-3 bg-slate-950/40 p-4 border border-white/10 rounded-xl font-mono text-xs text-slate-400 shadow-[inset_0_1px_12px_rgba(0,0,0,0.5)]">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1"><span>CPU Thread Weight</span><span className="text-emerald-400 font-semibold">14%</span></div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-sm"><div className="bg-emerald-400 h-full w-[14%]" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1"><span>Heap Memory Alloc</span><span className="text-indigo-400 font-semibold">242MB</span></div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-sm"><div className="bg-indigo-400 h-full w-[38%]" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {['Event Loops', 'Memory Logs', 'System Tuning'].map(t => <span key={t} className="text-xs font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 shadow-sm">{t}</span>)}
                  </div>
                </Card>

              </CardSwap>
            )}
          </div>
        </div>

      </section>
    </>
  );
}