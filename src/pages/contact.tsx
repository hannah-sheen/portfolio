import { useState, type FormEvent } from 'react'
import Shuffle from '../components/Shuffle'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setEmail('')
        setSubject('')
        setMessage('')
        
        // Automatically hide the status notification message after 3 seconds
        setTimeout(() => {
          setStatus('idle')
        }, 3000)
      } else {
        setStatus('error')
        // Clear error alert after 3 seconds as well
        setTimeout(() => {
          setStatus('idle')
        }, 3000)
      }
    } catch (error) {
      console.error('Frontend message dispatch error:', error)
      setStatus('error')
      // Clear network connection error alert after 3 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    }
  }

  return (
    <section 
      id="contact" 
      className="w-full h-screen bg-[#030712] relative overflow-hidden flex" 
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >      
      {/* Background Soft Ambient Light Layers */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* LEFT SIDE: Full-Scale Interactive Form Block (w-1/2 split) */}
      <div className="w-1/2 h-full flex flex-col justify-between p-16 md:p-20 relative z-20 bg-[#030712] border-r border-white/5">
        
        {/* Top Spacer */}
        <div className="h-6" />

        {/* Clean, spacious card enclosure centered in the frame */}
        <div className="w-full max-w-xl my-auto bg-slate-950/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-10 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Email Address</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
              />
            </div>

            {/* Subject Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Subject</label>
              <input
                type="text"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project Inquiry / Collaboration opportunity"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Your Message</label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about what system you're looking to build..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300 resize-none"
              />
            </div>

            {/* Submission Button and Status Notification */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/50 disabled:text-slate-400 transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-[0.98] cursor-pointer"
              >
                {status === 'sending' ? 'Dispatching Message...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-xs font-medium text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs font-medium text-rose-400 flex items-center gap-1.5 animate-fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> System failure. Try again.
                </p>
              )}
            </div>

          </form>
        </div>

        {/* Left Side Bottom Balancing Spacer */}
        <div className="pt-6 w-full opacity-0 pointer-events-none">
          <span className="text-xs text-slate-600">Spacer Alignment</span>
        </div>
      </div>

      {/* RIGHT SIDE: Editorial Text Block (w-1/2 split) */}
      <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-between p-16 md:p-20 select-none">
        
        {/* Top Spacer */}
        <div className="h-6" />

        {/* Scaled Headers - Now utilizing the spacious right viewport column */}
        <div className="relative space-y-1 w-full z-20 my-auto">
          <div className="overflow-hidden py-1">
            <Shuffle
              text="LET'S BUILD"
              tag="h2"
              textAlign="left"
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.03}
              className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none"
              style={{ fontWeight: 950 }}
            />
          </div>
          <div className="overflow-hidden py-1 flex items-center gap-4">
            <Shuffle
              text="Something Real."
              tag="span"
              textAlign="left"
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.6}
              stagger={0.035}
              className="block text-5xl md:text-6xl font-extralight text-indigo-300 italic tracking-wide leading-none"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-700/60 to-transparent ml-2 opacity-50 hidden sm:block" />
          </div>

          <p className="text-lg md:text-xl font-light text-slate-400 max-w-md pt-6 normal-case leading-relaxed">
            Whether you need to architect a robust backend infrastructure, map out a complex database scheme, or roll out an enterprise full-stack system, let's talk.
          </p>
        </div>

        {/* Right Side Footer Indicator */}
        <div className="mt-12 md:mt-0 space-y-2 border-l-2 border-indigo-500/30 pl-4 py-1">
          <div className="text-[10px] tracking-wider text-slate-500 uppercase font-bold">Current Base</div>
          <div className="text-xs font-semibold text-slate-300">Philippines</div>
        </div>
      </div>

    </section>
  )
}