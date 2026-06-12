import { useState } from 'react'
import Home from './pages/home.tsx'
import About from './pages/about.tsx'
import Contact from './pages/contact.tsx'
import Experience from './pages/experience.tsx'
import Skills from './pages/skills.tsx'

const navLinks = [
  { label: 'Home', target: '#home' },
  { label: 'About Me', target: '#about' },
  { label: 'Experience', target: '#experience'},
  { label: 'Projects', target: '#work' },
  { label: 'Skills', target: '#skills' },
  { label: 'Contact Me', target: '#contact' }
]

const socialLinks = [
  { id: 'github', url: 'https://github.com/hannah-sheen', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> },
  { id: 'linkedin', url: 'https://www.linkedin.com/in/hannah-sheen-obejero-8a44b63a4', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" /> },
  { 
    id: 'instagram', 
    url: 'https://www.instagram.com/haruuxnna_/', 
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
      </>
    ) 
  },
  { id: 'facebook', url: 'https://www.facebook.com/missmaem', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> }
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMenuOpen(false)
    setChatOpen(false)
  }

  const handleNavClick = (target: string) => {
    setMenuOpen(false)
    setIsHovered(false)
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#030712] text-white overflow-x-hidden relative">
      
      <Home />
      <About />
      <Experience />
      <Skills/>
      <Contact/>

      {/* FIXED SIDEBAR: Social Media Accounts */}
      <div className="fixed left-6 bottom-0 z-50 flex flex-col items-center gap-5 after:content-[''] after:w-[1px] after:h-24 after:bg-gradient-to-b after:from-slate-700/80 after:to-transparent">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-indigo-400 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {social.icon}
            </svg>
          </a>
        ))}
      </div>

      {/* GLOBAL FLOATING CENTER DOCK SYSTEM */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-24 py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex items-center justify-center w-14 h-14">

          {/* CHATBOT BUTTON */}
          <div
            className="absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(-68px) scale(1)' : 'translateX(0px) scale(0.4)',
              pointerEvents: isHovered || chatOpen ? 'auto' : 'none',
            }}
          >
            {/* Chat Window */}
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
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#1e293b] border border-white/10 hover:border-indigo-400/50 hover:bg-[#1e293b]/80 transition-all shadow-lg cursor-pointer"
            >
              <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>

          {/* GLOWING CENTER CORE */}
          <div className="relative z-10 w-12 h-12 flex items-center justify-center pointer-events-none">
            <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isHovered ? 'bg-indigo-500/10 scale-75' : 'bg-indigo-500/40 scale-110 animate-pulse'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 shadow-xl ${isHovered ? 'bg-slate-900/60 border-white/10 scale-90' : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.55)] scale-100'}`}>
              <div className={`rounded-full transition-all duration-500 ${isHovered ? 'w-2 h-2 bg-slate-500' : 'w-3 h-3 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`} />
            </div>
          </div>

          {/* NAVIGATION MENU BUTTON */}
          <div
            className="absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(68px) scale(1)' : 'translateX(0px) scale(0.4)',
              pointerEvents: isHovered || menuOpen ? 'auto' : 'none',
            }}
          >
            {/* Popover Nav Links System */}
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
                  key={link.label}
                  onClick={() => handleNavClick(link.target)}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/15 hover:bg-indigo-500/30 hover:border-indigo-400/40 transition-all shadow-lg w-32 text-center cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setMenuOpen(o => !o); setChatOpen(false) }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg border border-indigo-500/50 cursor-pointer"
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