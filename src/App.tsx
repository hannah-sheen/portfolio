import { useState } from 'react'
import Lanyard from './components/Lanyard'
import forLanyard from './assets/images/for_lanyard.jpg'
import CardSwap, { Card } from './components/CardSwap'

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
  ctx.fillText('Hello', 300, 360)
  ctx.fillText('Sheen', 300, 440)
  return canvas.toDataURL()
}

const backImage = makeNameImage()
const navLinks = ['About', 'Work', 'Skills', 'Contact']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-collapses the sub-menus if the user leaves the overall controls area entirely
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMenuOpen(false)
    setChatOpen(false)
  }

  return (
    <div className="flex w-full h-screen overflow-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Lanyard — left half */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <div className="absolute inset-0 -mt-30 h-[110%]">
          <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} frontImage={forLanyard} backImage={backImage} imageFit="contain" cardName="Hannah Sheen" />
        </div>
        <div className="absolute left-8 right-8 bottom-8 text-slate-300 pointer-events-none">
          <p className="text-2xl font-semibold text-white leading-tight pointer-events-auto">
            Hi, I'm <span className="text-indigo-300">Hannah Sheen</span>.
          </p>
          <p className="mt-3 text-sm leading-7 pointer-events-auto">
            I design and develop high-performing interactive experiences that solve real-world problems. Merging clean code with intuitive design, I help brands stand out in the digital space.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] font-semibold text-indigo-300 pointer-events-auto">
            Currently open to new opportunities.
          </p>
        </div>
      </div>

      {/* CardSwap — right half */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <div style={{ width: 840, height: 620, position: 'relative' }}>
          <CardSwap cardDistance={96} verticalDistance={110} delay={5000} pauseOnHover={false} width={840} height={620}>
            <Card customClass="bg-slate-950/90 text-white p-12 shadow-[0_36px_120px_-36px_rgba(15,23,42,0.9)]">
              <h3 className="text-4xl font-semibold mb-5">Interactive design</h3>
              <p className="text-xl leading-relaxed text-slate-300">Modern UI transitions and motion-driven experiences.</p>
            </Card>
            <Card customClass="bg-slate-950/90 text-white p-12 shadow-[0_36px_120px_-36px_rgba(15,23,42,0.9)]">
              <h3 className="text-4xl font-semibold mb-5">Performance-first</h3>
              <p className="text-xl leading-relaxed text-slate-300">Fast animations, smooth interactions, and real-time responsiveness.</p>
            </Card>
            <Card customClass="bg-slate-950/90 text-white p-12 shadow-[0_36px_120px_-36px_rgba(15,23,42,0.9)]">
              <h3 className="text-4xl font-semibold mb-5">Creative systems</h3>
              <p className="text-xl leading-relaxed text-slate-300">Thoughtful brand experiences backed by solid engineering.</p>
            </Card>
          </CardSwap>
        </div>
      </div>

      {/* New Centered Floating Dock System */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex items-center justify-center w-14 h-14">

          {/* CHATBOT BUTTON (Deploys leftward on hover) */}
          <div
            className="absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(-64px) scale(1)' : 'translateX(0px) scale(0.4)',
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
          >
            {/* Chat window — relative to button parent context */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 rounded-2xl overflow-hidden border border-white/12 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl"
              style={{
                opacity: chatOpen ? 1 : 0,
                transform: chatOpen ? 'translateY(0)' : 'translateY(8px)',
                pointerEvents: chatOpen ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-sm font-semibold text-white">Chat with me</span>
              </div>
              <div className="h-44 px-4 py-3 flex items-center justify-center">
                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  Hey! I'm Hannah. Drop me a message and I'll get back to you soon. 👋
                </p>
              </div>
              <div className="px-3 py-3 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 text-xs bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
                />
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-400 transition-colors">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>

            <button
              onClick={() => { setChatOpen(o => !o); setMenuOpen(false) }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#1e293b] border border-white/10 hover:border-indigo-400/50 hover:bg-[#1e293b]/80 transition-all shadow-lg"
            >
              <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>

          {/* GLOWING CENTER ICON / TRIGGER */}
          <div className="relative z-10 w-12 h-12 flex items-center justify-center pointer-events-none">
            {/* Soft Ambient Radial Background Glow */}
            <div 
              className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
                isHovered ? 'bg-indigo-500/10 scale-75' : 'bg-indigo-500/40 scale-110 animate-pulse'
              }`} 
            />
            
            {/* Glowing Active Visual Ring */}
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 shadow-xl ${
                isHovered 
                  ? 'bg-slate-900/60 border-white/10 scale-90' 
                  : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.55)] scale-100'
              }`}
            >
              {/* Dynamic Inner core shape */}
              <div 
                className={`rounded-full transition-all duration-500 ${
                  isHovered ? 'w-2 h-2 bg-slate-500' : 'w-3 h-3 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                }`} 
              />
            </div>
          </div>

          {/* MENU BUTTON (Deploys rightward on hover) */}
          <div
            className="absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(64px) scale(1)' : 'translateX(0px) scale(0.4)',
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
          >
            {/* Nav menu item stack panels */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 flex flex-col items-center gap-2"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                pointerEvents: menuOpen ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {navLinks.map(link => (
                <button
                  key={link}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/15 hover:bg-indigo-500/30 hover:border-indigo-400/40 transition-all shadow-lg w-32 text-center"
                >
                  {link}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setMenuOpen(o => !o); setChatOpen(false) }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg border border-indigo-500/50"
            >
              <svg
                className="w-5 h-5 text-white transition-transform duration-300"
                style={{ transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App