// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import RotatingText, { type RotatingTextRef } from './RotatingText';

// interface LoadingScreenProps {
//   onComplete: () => void;
// }

// export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
//   const [isExiting, setIsExiting] = useState<boolean>(false);
//   const rotatingTextRef = useRef<RotatingTextRef>(null);

//   const dynamicWords = [
//     'EXPERIENCES',  
//     'ARCHITECTURES',
//     'INTERFACES'
//   ];

//   useEffect(() => {
//     // Word 0 (EXPERIENCES) starts immediately.
    
//     // Word 1: Wait for Word 0 to sit on screen, stagger out, and let ARCHITECTURES stagger in.
//     const word1Timer = setTimeout(() => {
//       rotatingTextRef.current?.next();
//     }, 1400); // 1200ms rest + extra room for stagger overhead

//     // Word 2: ARCHITECTURES is a massive word (13 chars). Its exit animation takes much longer.
//     // We extend this window so it has time to sit fully on screen before moving on.
//     const word2Timer = setTimeout(() => {
//       rotatingTextRef.current?.next();
//     }, 3100); // Expanded gap to perfectly offset the 13-character stagger layout delay

//     // Exit Overlay: Give INTERFACES its beautiful 1200ms rest window plus animation overhead.
//     const exitTimer = setTimeout(() => {
//       setIsExiting(true);
      
//       const closureTimer = setTimeout(() => {
//         onComplete();
//       }, 600); // Main overlay panel ease-out
      
//       return () => clearTimeout(closureTimer);
//     }, 4700); // Complete sequence total time allowance

//     return () => {
//       clearTimeout(word1Timer);
//       clearTimeout(word2Timer);
//       clearTimeout(exitTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div 
//       className={`fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
//         isExiting ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100'
//       }`}
//       style={{ fontFamily: "'Manrope', sans-serif" }}
//     >
//       {/* Soft Center Background Ambient Glow Layer */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      
//       <div className="flex flex-row items-center justify-center gap-x-4 px-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight select-none text-center">
        
//         <span className="text-white shrink-0 uppercase">
//           BUILDING
//         </span>

//         <div className="inline-flex justify-start items-center text-indigo-400 overflow-hidden text-left min-w-[320px] sm:min-w-[420px] md:min-w-[500px]">
//           <RotatingText
//             ref={rotatingTextRef}
//             texts={dynamicWords}
//             animatePresenceMode="wait"
//             loop={false}
//             auto={false} // FORCE auto off so our optimized manual timeline balances the stagger delays
//             splitBy="characters"
//             staggerDuration={0.015} 
//             staggerFrom="first"
//             mainClassName="text-indigo-400 font-extrabold uppercase text-left"
//             transition={{ type: 'spring', damping: 15, stiffness: 450 }} 
//             initial={{ y: '100%', opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: '-100%', opacity: 0 }}
//           />
//         </div>

//       </div>
//     </div>
//   );
// }

'use client';
import { useEffect, useState, useRef } from 'react';
import RotatingText, { type RotatingTextRef } from './RotatingText';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const rotatingTextRef = useRef<RotatingTextRef>(null);

  const dynamicWords = [
    'EXPERIENCES',  
    'ARCHITECTURES',
    'INTERFACES'
  ];

  useEffect(() => {
    // Word 0 (EXPERIENCES) starts immediately.
    
    // Word 1: Wait for Word 0 to sit on screen, stagger out, and let ARCHITECTURES stagger in.
    const word1Timer = setTimeout(() => {
      rotatingTextRef.current?.next();
    }, 1400); // 1200ms rest + extra room for stagger overhead

    // Word 2: ARCHITECTURES is a massive word (13 chars). Its exit animation takes much longer.
    // We extend this window so it has time to sit fully on screen before moving on.
    const word2Timer = setTimeout(() => {
      rotatingTextRef.current?.next();
    }, 3100); // Expanded gap to perfectly offset the 13-character stagger layout delay

    // Exit Overlay: Give INTERFACES its beautiful 1200ms rest window plus animation overhead.
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      
      const closureTimer = setTimeout(() => {
        onComplete();
      }, 600); // Main overlay panel ease-out
      
      return () => clearTimeout(closureTimer);
    }, 4700); // Complete sequence total time allowance

    return () => {
      clearTimeout(word1Timer);
      clearTimeout(word2Timer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100'
      }`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* Soft Center Background Ambient Glow Layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-indigo-500/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-y-0 sm:gap-x-4 px-6 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight select-none text-center">
        
        <span className="text-white shrink-0 uppercase tracking-tight">
          BUILDING
        </span>

        <div className="inline-flex justify-center sm:justify-start items-center text-indigo-400 overflow-hidden text-center sm:text-left min-w-[260px] sm:min-w-[420px] md:min-w-[500px]">
          <RotatingText
            ref={rotatingTextRef}
            texts={dynamicWords}
            animatePresenceMode="wait"
            loop={false}
            auto={false} // FORCE auto off so our optimized manual timeline balances the stagger delays
            splitBy="characters"
            staggerDuration={0.015} 
            staggerFrom="first"
            mainClassName="text-indigo-400 font-extrabold uppercase text-center sm:text-left"
            transition={{ type: 'spring', damping: 15, stiffness: 450 }} 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
          />
        </div>

      </div>
    </div>
  );
}