// import { useState, useRef, useEffect } from 'react'

// interface ChatbotProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Message {
//   id: string;
//   sender: 'user' | 'bot';
//   text: string;
// }

// // ─── AUTHENTIC PORTFOLIO DATA MATRIX ───
// const structuralPrompts = {
//   about: [
//     {
//       id: "a1",
//       question: "Who is Hannah Sheen Obejero? 👩‍💻",
//       answer: "I am a full-stack developer who naturally gravitates toward backend engineering. I love exploring server architectures, writing logic, discovering how structured data connects behind the scenes, and treating the frontend as a clean wrapper for that logic. I'm currently based in the Philippines as a Junior Developer!"
//     },
//     {
//       id: "a2",
//       question: "What is your current engineering focus? 🎯",
//       answer: "I am focused on strengthening my foundational knowledge of API routing, server stability, and databases. My main goal is always to write highly secure, clean, and maintainable backend code."
//     }
//   ],
//   skills: [
//     {
//       id: "s1",
//       question: "What languages & tools do you use? 🛠️",
//       answer: "My stack includes: \n• LANGUAGES: Python, Java, JavaScript, TypeScript, SQL, NoSQL, Pascal, HTML, CSS\n• DEV TOOLS: Git, GitHub, and VS Code."
//     },
//     {
//       id: "s2",
//       question: "What frameworks & databases do you manage? 🗄️",
//       answer: "• FRAMEWORKS: React, Django, Node.js, Flask, and TailwindCSS.\n• DATABASES & ENGINES: PostgreSQL, MySQL, SSMS (SQL Server), Supabase, and MongoDB."
//     }
//   ],
//   experience: [
//     {
//       id: "e1",
//       question: "What are your notable certifications? 📜",
//       answer: "I hold several certified credentials, including:\n• Galactic Problem Solver from the 2024 NASA International Space Apps Challenge\n• Foundations of User Experience (UX) Design by Google via Coursera\n• Networking Basics from the Cisco Networking Academy\n• Version Control with Git & GitHub from Google Developer Groups on Campus-CTU."
//     },
//     {
//       id: "e2",
//       question: "Have you attended any tech hackathons? 🚀",
//       answer: "Yes! I actively participated in the ASEAN AI Hackathon 2026: Workshop 1 entitled 'Human-Centric AI and Regional Problem Solving', which was held at the Mapúa MCL Global Classroom in collaboration with Arizona State University, Polytechnic University of the Philippines, and Duy Tan University."
//     }
//   ],
//   projects: [
//     {
//       id: "p1",
//       question: "Tell me about your core full-stack apps! 📱",
//       answer: "I built 'CIUDAD (BARIOS)' for Brgy. San Roque using React, React Native, TypeScript, Django, and PostgreSQL. It features real-time data orchestration and automated document lifecycles, which reduced manual administration processing times by 80%!"
//     },
//     {
//       id: "p2",
//       question: "Do you have experience with AI or machine learning? 🤖",
//       answer: "Yes! I developed a 'Face Recognition Profiling' system for Cebu Technological University using React, Python, Node.js, and the FaceNet deep learning model. I also built 'Quiz Odyssey' using HTML, JS, and Gemini AI to dynamically generate mock study quizzes through automated AI prompts."
//     },
//     {
//       id: "p3",
//       question: "What other systems have you engineered? ⚙️",
//       answer: "I engineered the 'PFC System' (People Fitness Center) using Python to automate member access passes and financial tallies. I also built the corporate web interface for 'Lifewood Data Technology PH' leveraging React, Tailwind CSS, and a serverless Supabase backend."
//     }
//   ]
// }

// type TabType = 'about' | 'skills' | 'experience' | 'projects';

// export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
//   const [activeTab, setActiveTab] = useState<TabType>('about')
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 'welcome',
//       sender: 'bot',
//       text: "Welcome! I'm Hannah's Interactive Assistant. Select any category tab below to query my verified portfolio projects, backend stack, or certifications directly! 👋"
//     }
//   ])
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])

//   if (!isOpen) return null

//   const handlePromptClick = (question: string, answer: string) => {
//     const userMsgId = `user-${Date.now()}`
//     const botMsgId = `bot-${Date.now()}`

//     setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: question }])

//     setTimeout(() => {
//       setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: answer }])
//     }, 400)
//   }

//   return (
//     <div
//       className="fixed bottom-24 right-6 md:right-12 z-50 w-80 sm:w-96 h-[560px] rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300"
//     >
//       {/* Header Panel */}
//       <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
//         <div className="flex items-center gap-2.5">
//           <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
//           <span className="text-sm font-semibold tracking-wide text-white">Interactive Assistant</span>
//         </div>
        
//         <button 
//           onClick={onClose}
//           className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
//           aria-label="Close chat"
//         >
//           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>

//       {/* Messaging Stream Box */}
//       <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//         {messages.map((msg) => (
//           <div 
//             key={msg.id} 
//             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md whitespace-pre-line ${
//                 msg.sender === 'user'
//                   ? 'bg-indigo-600 text-white rounded-br-none'
//                   : 'bg-white/5 border border-white/5 text-slate-300 rounded-bl-none'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Predefined Input Actions Interface */}
//       <div className="border-t border-white/10 bg-black/20 flex flex-col shrink-0">
        
//         {/* Navigation Filters */}
//         <div className="flex border-b border-white/5 p-1 gap-1 text-[11px] font-medium bg-black/10">
//           {(['about', 'skills', 'experience', 'projects'] as TabType[]).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
//                 activeTab === tab
//                   ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30'
//                   : 'text-slate-400 hover:text-slate-200 border border-transparent'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Action Prompt Click Selection Triggers */}
//         <div className="p-4 flex flex-col gap-2 max-h-40 overflow-y-auto">
//           {structuralPrompts[activeTab].map((flow) => (
//             <button
//               key={flow.id}
//               onClick={() => handlePromptClick(flow.question, flow.answer)}
//               className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-indigo-600/30 border border-white/5 hover:border-indigo-400/40 rounded-xl transition-all shadow-sm cursor-pointer whitespace-normal break-words"
//             >
//               {flow.question}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useRef, useEffect, type ChangeEvent } from 'react'

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const structuralPrompts = [
  {
    id: "p1",
    question: "Tell me about your flagship full-stack and web applications",
    answer: "My standout full-stack project is CIUDAD (BARIOS), engineered specifically for Brgy. San Roque. I built this administrative web and mobile infrastructure using Django, React, React Native, and PostgreSQL. It streamlines data orchestration and introduces automated document generation, cutting manual processing times down by an impressive 80%.\n\nI also developed the enterprise landing platform for Lifewood Data Technology PH. For that site, I focused on building modular resource components and dynamic layouts utilizing React, Tailwind CSS, and a serverless Supabase backend."
  },
  {
    id: "p2",
    question: "What have you built with AI and deep learning models?",
    answer: "I like working with smart logic layers. I engineered a Face Recognition Profiling suite for Cebu Technological University that evaluates identity verification datasets and securely handles facial embeddings using the FaceNet deep learning model alongside a Node.js and NoSQL backbone.\n\nAdditionally, I developed Quiz Odyssey—an AI-driven educational platform built natively with JavaScript, HTML, and CSS. It uses automated Gemini AI prompts to allow students to generate dynamic, custom-tailored mock quizzes to study from."
  },
  {
    id: "p3",
    question: "What languages and developer tools are in your arsenal?",
    answer: "I program with a mix of modern and foundational code. My primary programming languages are Python, TypeScript, JavaScript, Java, and standard SQL/NoSQL structures. I also have academic experience with lower-level typing systems like Pascal. For my day-to-day workflow, project version tracking, and source control management, I rely entirely on Git, GitHub, and VS Code."
  },
  {
    id: "p4",
    question: "How do you manage databases and backend stability?",
    answer: "Since I focus heavily on backend architecture, database integrity is a major priority for me. I spend a lot of time writing clean relational designs and structuring schemas. My practical experience spans multiple environments, including robust systems like PostgreSQL and MySQL, Microsoft SQL Server Management Studio (SSMS), MongoDB for non-relational data structures, and Supabase for cloud-hosted environments."
  },
  {
    id: "p5",
    question: "What is your core development and engineering philosophy?",
    answer: "I approach programming from the inside out. I am a full-stack developer who genuinely enjoys the logic of the backend—exploring server stability, handling secure API routes, and designing structured data maps. While I take pride in building highly responsive web layouts, I consider the frontend a clean wrapper whose primary job is to correctly present the robust engineering humming beneath the surface."
  },
  {
    id: "p6",
    question: "What notable certifications have you completed?",
    answer: "I have consistently pushed myself to pick up specialized certifications to round out my development skill set. My current credentials include:\n- Galactic Problem Solver from the 2024 NASA International Space Apps Challenge\n- Foundations of User Experience (UX) Design from Google (via Coursera)\n- Networking Basics from the Cisco Networking Academy\n- Version Control with Git & GitHub from Google Developer Groups on Campus-CTU."
  },
  {
    id: "p7",
    question: "What hackathons or workshops have you participated in?",
    answer: "I recently joined the ASEAN AI Hackathon 2026: Workshop 1, titled 'Human-Centric AI and Regional Problem Solving'. This was a collaborative hackathon hosted at the Mapua MCL Global Classroom alongside Arizona State University, the Polytechnic University of the Philippines, and Duy Tan University, where we focused on leveraging AI models to tackle real-world regional challenges."
  }
]

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [selectedValue, setSelectedValue] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am Hannah's portfolio assistant. Select a topic from the dropdown menu below to get a detailed breakdown of her code stack, full-stack projects, or industry milestones."
    }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isOpen) return null

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value
    if (!selectedId) return

    const selectedPrompt = structuralPrompts.find(p => p.id === selectedId)
    if (!selectedPrompt) return

    const userMsgId = `user-${Date.now()}`
    const botMsgId = `bot-${Date.now()}`

    // Render the selected question as a message
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: selectedPrompt.question }])

    // Reset dropdown selection state
    setSelectedValue("")

    // Deliver the paraphrased response smoothly
    setTimeout(() => {
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: selectedPrompt.answer }])
    }, 400)
  }

  return (
    <div
      className="fixed bottom-24 right-6 md:right-12 z-50 w-80 sm:w-96 h-[560px] rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {/* Header Panel */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-sm font-semibold tracking-wide text-white">Info Hub</span>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs font-bold"
          aria-label="Close chat"
        >
          X
        </button>
      </div>

      {/* Messaging Stream Box */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white/5 border border-white/5 text-slate-300 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Dropdown Menu Interaction Panel */}
      <div className="border-t border-white/10 bg-black/20 flex flex-col shrink-0 p-5">
        <label htmlFor="topic-select" className="text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase mb-2 px-0.5">
          Choose a topic to discuss:
        </label>
        
        <select
          id="topic-select"
          value={selectedValue}
          onChange={handleDropdownChange}
          className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors cursor-pointer appearance-none shadow-sm"
        >
          <option value="" disabled className="text-slate-500">Select an option...</option>
          {structuralPrompts.map((flow) => (
            <option key={flow.id} value={flow.id} className="bg-[#0f172a] text-slate-300 py-2">
              {flow.question}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}