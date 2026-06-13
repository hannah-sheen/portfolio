import { useEffect, useState } from 'react';
import RotatingText from './RotatingText';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const dynamicWords = [
    'EXPERIENCES',  
    'FOUNDATIONS',
    'ARCHITECTURES',
    'PIPELINES',
    'INTERFACES'
  ];

  useEffect(() => {
    // 5 words * 220ms interval = ~1100ms total fast animation runtime
    const holdTimer = setTimeout(() => {
      setIsExiting(true);
      
      const closureTimer = setTimeout(() => {
        onComplete();
      }, 500); // Snappier fade-out window
      
      return () => clearTimeout(closureTimer);
    }, 1150);

    return () => clearTimeout(holdTimer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center transition-all duration-[500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isExiting ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100'
      }`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="flex flex-row items-center justify-center gap-x-4 px-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight select-none text-center">
        
        <span className="text-white shrink-0 uppercase">
          BUILDING
        </span>

        <div className="inline-flex justify-start items-center text-indigo-400 overflow-hidden text-left min-w-[320px] sm:min-w-[420px] md:min-w-[500px]">
          <RotatingText
            texts={dynamicWords}
            rotationInterval={220} // Accelerated from 420ms to 220ms for rapid shifting
            animatePresenceMode="wait"
            loop={false}
            auto={true}
            splitBy="characters"
            staggerDuration={0.01} // Accelerated letter stagger timing
            staggerFrom="first"
            mainClassName="text-indigo-400 font-extrabold uppercase text-left"
            transition={{ type: 'spring', damping: 15, stiffness: 450 }} // Increased stiffness for snappy motion
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
          />
        </div>

      </div>
    </div>
  );
}