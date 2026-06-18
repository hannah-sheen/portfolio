// import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
// import { GoogleGenAI } from '@google/genai';

// interface ChatbotProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Message {
//   id: string;
//   sender: 'user' | 'bot';
//   text: string;
// }

// // System Constraints and highly-natural personality context injection payload
// const SYSTEM_INSTRUCTION = `
// You are Hannah's exclusive portfolio assistant and Info Hub. Your goal is to represent her professionally but with a natural, conversational, and welcoming human tone—not sounding like a rigid robot or list generator.

// TONE & BEHAVIORAL BLUEPRINT:
// 1. Speak like a polished, helpful tech collaborator or peer. Be concise, organic, and direct. 
// 2. Instead of repeating data word-for-word, weave the facts naturally into comfortable sentences (e.g., instead of "STAGE: Junior Developer", say "Hannah is currently navigating her journey as a junior developer based in the Philippines...").
// 3. Use bullet points when it makes reading clean, but avoid overusing them for simple thoughts.
// 4. CRITICAL: If a user asks something completely unrelated to Hannah, her work, skills, history, or portfolio, decline politely and casually (e.g., "I'd love to chat about that, but as Hannah's portfolio assistant, I'm here to answer questions specifically about her backend work, projects, and tech background!").
// 5. Do not make up facts. Stay strictly within this dataset.

// ---
// AUTHORIZED DATASET MATRIX:

// PROFILE META:
// - Full Name: Hannah Sheen Obejero
// - Stage: Junior Developer
// - Current Base / Location: Philippines
// - Core Philosophy & Focus: She naturally gravitates toward backend logic. She loves diving into server architectures, engineering logic, and mapping out seamless structured data pipelines behind the scenes. She looks at the frontend as a clean wrapper designed to elegantly display the complex logic she builds underneath.

// 1. TECHNICAL ARSENAL:
// - Languages she writes: Python, Java, JavaScript, TypeScript, SQL, NoSQL, Pascal, HTML, and CSS.
// - Frameworks ecosystem: React, Django, Node.js, Flask, and TailwindCSS.
// - Databases she manages: PostgreSQL, MySQL, SSMS (Microsoft SQL Server Management Studio), Supabase, and MongoDB.
// - Dev Tools: Git, GitHub, and VS Code.

// 2. CERTIFICATIONS & CREDENTIALS:
// - ASEAN AI MAPUA Workshop (Focused on "Human-Centric AI and Regional Problem Solving" 2026 at Mapua MCL Global Classroom alongside Arizona State University, PUP, and Duy Tan University).
// - Google Foundations of UX Design (via Coursera).
// - GitHub Version Control credential from Google Developer Groups on Campus-CTU.
// - NASA Space Apps Challenge (Earned the Galactic Problem Solver award in the 2024 International challenge).
// - Networking Basics from the Cisco Networking Academy.

// 3. PROFESSIONAL TIMELINE & EXPERIENCE:
// - Project Management Lead at Cebu Technological University (2025): Led the infrastructure development for the BARIOS system, successfully optimizing administrative processes and slashing manual workflows by 90%.
// - Technical Instructor at Brgy. San Roque (2025): Delivered critical hands-on digital literacy and systems training to local government staff in partnership with the CTU Main CCICT extension team (featured in official university press).
// - Back End Intern at Camtastic Philippines Corp. (2026): Engineered secure core backend structural logic utilizing legacy Pascal environments integrated with standalone SQL database engines.
// - IT Intern at Lifewood Data Technology PH (2026): Immersed in corporate enterprise workflows, mastering prompt engineering, writing highly optimized source code patterns, and scaling systems using modern AI developer suites.

// 4. FLAGSHIP PROJECT ARTIFACTS:
// - CIUDAD (BARIOS) for Brgy. San Roque: A robust full-stack administrative platform featuring real-time data orchestration and automated document lifecycles built with Django, React, React Native, and PostgreSQL. It tackled tough concurrency and sync issues in low-coverage zones, reducing processing times by 80%.
// - The Archivist's Silence: A 2D isometric tactical puzzle game built using Godot and GDScript. Hannah handled dynamic tile layout generation with graph-traversal cellular automata and seeded items using Gemini AI.
// - Quiz Odyssey: An AI-powered educational application built with HTML, CSS, JavaScript, and Gemini AI. She engineered defensive JSON schema parsers to guarantee reliable client-side quiz generation.
// - Lifewood Website: A premium enterprise landing interface engineered using React, Tailwind CSS, and localized Supabase edge storage routers to maximize core web vital load speeds.
// - PFC System (People Fitness Center): A specialized management database system built using Python to cleanly track scheduling metrics, check-ins, and ensure clean relational data integrity without row query locking.

// 5. PORTFOLIO CHANNELS & INTERNALS:
// - Contact Channel Routing: The site is equipped with a contact form that routes incoming messages via a secure REST payload pipeline straight to an internal node endpoint ("http://localhost:5000/api/contact"). Ready for backend, cloud database, or full-stack pipeline talk.

// 6. SOCIAL MEDIA & DIRECT CHANNELS:
// - Direct Email: hannahsheen12@gmail.com
// - GitHub: https://github.com/hannah-sheen
// - LinkedIn: https://www.linkedin.com/in/hannah-sheen-obejero-8a44b63a4
// - Instagram: https://www.instagram.com/haruuxnna_/
// - Facebook: https://www.facebook.com/missmaem
// `;

// export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 'welcome',
//       sender: 'bot',
//       text: "Hello! I am Hannah's portfolio assistant. Ask me anything about her projects, backend work, timelines, or credentials!"
//     }
//   ]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   if (!isOpen) return null;

//   const handleSendMessage = async (e: FormEvent) => {
//     e.preventDefault();
//     const query = inputValue.trim();
//     if (!query || isLoading) return;

//     const userMsgId = `user-${Date.now()}`;
//     const botMsgId = `bot-${Date.now()}`;

//     setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: query }]);
//     setInputValue("");
//     setIsLoading(true);

//     try {
//       const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
//       const response = await ai.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: query,
//         config: {
//           systemInstruction: SYSTEM_INSTRUCTION,
//           temperature: 0.15,
//         }
//       });

//       const replyText = response.text || "Connection signal lost. Please query again.";
//       setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: replyText }]);
//     } catch (error) {
//       console.error("Gemini Handshake Error:", error);
//       setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: "Systems offline. Unable to reach the knowledge matrix." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
   
//   return (
//     <div
//       // PERFECT MID-SIZE: Adjusted to w-72 / sm:w-80 and h-[480px]
//       className="fixed bottom-6 right-6 z-[100] w-72 sm:w-80 h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300"
//       onMouseEnter={() => document.body.setAttribute('data-dragging', 'true')}
//       onMouseLeave={() => document.body.removeAttribute('data-dragging')}
//     >
//       {/* Header Panel */}
//       <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-indigo-400 animate-pulse'}`} />
//           <span className="text-xs font-semibold tracking-wide text-white">Info Hub AI</span>
//         </div>
        
//         <button 
//           onClick={() => {
//             document.body.removeAttribute('data-dragging');
//             onClose();
//           }}
//           className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs font-bold"
//           aria-label="Close chat"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
//             <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//           </svg>
//         </button>
//       </div>

//       {/* Messaging Stream Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//         {messages.map((msg) => (
//           <div 
//             key={msg.id} 
//             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed shadow-md whitespace-pre-line ${
//                 msg.sender === 'user'
//                   ? 'bg-indigo-600 text-white rounded-br-none'
//                   : 'bg-white/5 border border-white/5 text-slate-300 rounded-bl-none'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-white/5 border border-white/5 text-slate-400 rounded-xl rounded-bl-none px-3 py-2 text-[11px] tracking-wide">
//               Typing...
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Text Input Panel */}
//       <form onSubmit={handleSendMessage} className="border-t border-white/10 bg-black/20 flex gap-1.5 shrink-0 p-3 items-center">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
//           placeholder="Ask a question..."
//           disabled={isLoading}
//           className="flex-1 bg-[#1e293b] border border-white/10 rounded-lg px-3 py-2 text-[11px] text-slate-200 outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
//         />
//         <button
//           type="submit"
//           disabled={isLoading || !inputValue.trim()}
//           className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-all font-semibold text-[11px] shrink-0 cursor-pointer"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
// import { GoogleGenAI } from '@google/genai';

// interface ChatbotProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Message {
//   id: string;
//   sender: 'user' | 'bot';
//   text: string;
// }

// // System Constraints and highly-natural personality context injection payload
// const SYSTEM_INSTRUCTION = `
// You are Hannah's exclusive portfolio assistant and Info Hub. Your goal is to represent her professionally but with a natural, conversational, and welcoming human tone—not sounding like a rigid robot or list generator.

// TONE & BEHAVIORAL BLUEPRINT:
// 1. Speak like a polished, helpful tech collaborator or peer. Be concise, organic, and direct. 
// 2. Instead of repeating data word-for-word, weave the facts naturally into comfortable sentences (e.g., instead of "STAGE: Junior Developer", say "Hannah is currently navigating her journey as a junior developer based in the Philippines...").
// 3. Use bullet points when it makes reading clean, but avoid overusing them for simple thoughts.
// 4. CRITICAL: If a user asks something completely unrelated to Hannah, her work, skills, history, or portfolio, decline politely and casually (e.g., "I'd love to chat about that, but as Hannah's portfolio assistant, I'm here to answer questions specifically about her backend work, projects, and tech background!").
// 5. Do not make up facts. Stay strictly within this dataset.

// ---
// AUTHORIZED DATASET MATRIX:

// PROFILE META:
// - Full Name: Hannah Sheen Obejero
// - Stage: Junior Developer
// - Current Base / Location: Philippines
// - Core Philosophy & Focus: She naturally gravitates toward backend logic. She loves diving into server architectures, engineering logic, and mapping out seamless structured data pipelines behind the scenes. She looks at the frontend as a clean wrapper designed to elegantly display the complex logic she builds underneath.

// 1. TECHNICAL ARSENAL:
// - Languages she writes: Python, Java, JavaScript, TypeScript, SQL, NoSQL, Pascal, HTML, and CSS.
// - Frameworks ecosystem: React, Django, Node.js, Flask, and TailwindCSS.
// - Databases she manages: PostgreSQL, MySQL, SSMS (Microsoft SQL Server Management Studio), Supabase, and MongoDB.
// - Dev Tools: Git, GitHub, and VS Code.

// 2. CERTIFICATIONS & CREDENTIALS:
// - ASEAN AI MAPUA Workshop (Focused on "Human-Centric AI and Regional Problem Solving" 2026 at Mapua MCL Global Classroom alongside Arizona State University, PUP, and Duy Tan University).
// - Google Foundations of UX Design (via Coursera).
// - GitHub Version Control credential from Google Developer Groups on Campus-CTU.
// - NASA Space Apps Challenge (Earned the Galactic Problem Solver award in the 2024 International challenge).
// - Networking Basics from the Cisco Networking Academy.

// 3. PROFESSIONAL TIMELINE & EXPERIENCE:
// - Project Management Lead at Cebu Technological University (2025): Led the infrastructure development for the BARIOS system, successfully optimizing administrative processes and slashing manual workflows by 90%.
// - Technical Instructor at Brgy. San Roque (2025): Delivered critical hands-on digital literacy and systems training to local government staff in partnership with the CTU Main CCICT extension team (featured in official university press).
// - Back End Intern at Camtastic Philippines Corp. (2026): Engineered secure core backend structural logic utilizing legacy Pascal environments integrated with standalone SQL database engines.
// - IT Intern at Lifewood Data Technology PH (2026): Immersed in corporate enterprise workflows, mastering prompt engineering, writing highly optimized source code patterns, and scaling systems using modern AI developer suites.

// 4. FLAGSHIP PROJECT ARTIFACTS:
// - CIUDAD (BARIOS) for Brgy. San Roque: A robust full-stack administrative platform featuring real-time data orchestration and automated document lifecycles built with Django, React, React Native, and PostgreSQL. It tackled tough concurrency and sync issues in low-coverage zones, reducing processing times by 80%.
// - The Archivist's Silence: A 2D isometric tactical puzzle game built using Godot and GDScript. Hannah handled dynamic tile layout generation with graph-traversal cellular automata and seeded items using Gemini AI.
// - Quiz Odyssey: An AI-powered educational application built with HTML, CSS, JavaScript, and Gemini AI. She engineered defensive JSON schema parsers to guarantee reliable client-side quiz generation.
// - Lifewood Website: A premium enterprise landing interface engineered using React, Tailwind CSS, and localized Supabase edge storage routers to maximize core web vital load speeds.
// - PFC System (People Fitness Center): A specialized management database system built using Python to cleanly track scheduling metrics, check-ins, and ensure clean relational data integrity without row query locking.

// 5. PORTFOLIO CHANNELS & INTERNALS:
// - Contact Channel Routing: The site is equipped with a contact form that routes incoming messages via a secure REST payload pipeline straight to an internal node endpoint ("http://localhost:5000/api/contact"). Ready for backend, cloud database, or full-stack pipeline talk.

// 6. SOCIAL MEDIA & DIRECT CHANNELS:
// - Direct Email: hannahsheen12@gmail.com
// - GitHub: https://github.com/hannah-sheen
// - LinkedIn: https://www.linkedin.com/in/hannah-sheen-obejero-8a44b63a4
// - Instagram: https://www.instagram.com/haruuxnna_/
// - Facebook: https://www.facebook.com/missmaem
// `;

// export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 'welcome',
//       sender: 'bot',
//       text: "Hello! I am Hannah's portfolio assistant. Ask me anything about her projects, backend work, timelines, or credentials!"
//     }
//   ]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // High-performance micro formatter to parse Markdown lists and bold text safely
//   const renderMessageText = (text: string) => {
//     return text.split('\n').map((line, lineIdx) => {
//       let currentLine = line;
//       const isListItem = currentLine.trim().startsWith('* ') || currentLine.trim().startsWith('- ');
      
//       if (isListItem) {
//         currentLine = currentLine.trim().replace(/^[\*\-]\s+/, '');
//       }

//       // Regex matching to parse **bold text** tokens inside strings
//       const parts = currentLine.split(/(\*\*.*?\*\*)/g);
//       const content = parts.map((part, partIdx) => {
//         if (part.startsWith('**') && part.endsWith('**')) {
//           return <strong key={partIdx} className="font-bold text-white">{part.slice(2, -2)}</strong>;
//         }
//         return part;
//       });

//       if (isListItem) {
//         return (
//           <span key={lineIdx} className="flex items-start gap-2 pl-1 my-0.5">
//             <span className="text-indigo-400 select-none mt-1 shrink-0 text-[9px]">➔</span>
//             <span>{content}</span>
//           </span>
//         );
//       }

//       return <p key={lineIdx} className={lineIdx > 0 && currentLine ? "mt-1.5" : ""}>{content}</p>;
//     });
//   };

//   if (!isOpen) return null;

//   const handleSendMessage = async (e: FormEvent) => {
//     e.preventDefault();
//     const query = inputValue.trim();
//     if (!query || isLoading) return;

//     const userMsgId = `user-${Date.now()}`;
//     const botMsgId = `bot-${Date.now()}`;

//     setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: query }]);
//     setInputValue("");
//     setIsLoading(true);

//     try {
//       const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
//       const response = await ai.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: query,
//         config: {
//           systemInstruction: SYSTEM_INSTRUCTION,
//           temperature: 0.15,
//         }
//       });

//       const replyText = response.text || "Connection signal lost. Please query again.";
//       setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: replyText }]);
//     } catch (error) {
//       console.error("Gemini Handshake Error:", error);
//       setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: "Systems offline. Unable to reach the knowledge matrix." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
   
//   return (
//     <div
//       // PERFECT MID-SIZE: Adjusted to w-72 / sm:w-80 and h-[480px]
//       className="fixed bottom-6 right-6 z-[100] w-72 sm:w-80 h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300"
//       onMouseEnter={() => document.body.setAttribute('data-dragging', 'true')}
//       onMouseLeave={() => document.body.removeAttribute('data-dragging')}
//     >
//       {/* Header Panel */}
//       <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-indigo-400 animate-pulse'}`} />
//           <span className="text-xs font-semibold tracking-wide text-white">Info Hub AI</span>
//         </div>
        
//         <button 
//           onClick={() => {
//             document.body.removeAttribute('data-dragging');
//             onClose();
//           }}
//           className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs font-bold"
//           aria-label="Close chat"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
//             <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//           </svg>
//         </button>
//       </div>

//       {/* Messaging Stream Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent">
//         {messages.map((msg) => (
//           <div 
//             key={msg.id} 
//             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed shadow-md ${
//                 msg.sender === 'user'
//                   ? 'bg-indigo-600 text-white rounded-br-none'
//                   : 'bg-white/5 border border-white/5 text-slate-300 rounded-bl-none'
//               }`}
//             >
//               {renderMessageText(msg.text)}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-white/5 border border-white/5 text-slate-400 rounded-xl rounded-bl-none px-3 py-2 text-[11px] tracking-wide">
//               Typing...
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Text Input Panel */}
//       <form onSubmit={handleSendMessage} className="border-t border-white/10 bg-black/20 flex gap-1.5 shrink-0 p-3 items-center">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
//           placeholder="Ask a question..."
//           disabled={isLoading}
//           className="flex-1 bg-[#1e293b] border border-white/10 rounded-lg px-3 py-2 text-[11px] text-slate-200 outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
//         />
//         <button
//           type="submit"
//           disabled={isLoading || !inputValue.trim()}
//           className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-all font-semibold text-[11px] shrink-0 cursor-pointer"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// src/pages/chatbot.tsx
import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am Hannah's portfolio assistant. Ask me anything about her projects, backend work, timelines, or credentials!"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      let currentLine = line;
      const isListItem = currentLine.trim().startsWith('* ') || currentLine.trim().startsWith('- ');
      
      if (isListItem) {
        currentLine = currentLine.trim().replace(/^[\*\-]\s+/, '');
      }

      const parts = currentLine.split(/(\*\*.*?\*\*)/g);
      const content = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx} className="font-bold text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isListItem) {
        return (
          <span key={lineIdx} className="flex items-start gap-2 pl-1 my-0.5">
            <span className="text-indigo-400 select-none mt-1 shrink-0 text-[9px]">➔</span>
            <span>{content}</span>
          </span>
        );
      }

      return <p key={lineIdx} className={lineIdx > 0 && currentLine ? "mt-1.5" : ""}>{content}</p>;
    });
  };

  if (!isOpen) return null;

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: query }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Determine API URL based on environment
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:5000/api/chat'  // Local development
        : '/api/chat';                       // Production (Vercel)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      
      const replyText = data.reply || "Connection signal lost. Please query again.";
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: replyText }]);
      
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages(prev => [...prev, { 
        id: botMsgId, 
        sender: 'bot', 
        text: "Systems offline. Unable to reach the knowledge matrix." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
   
  return (
    <div
      className="fixed bottom-6 right-6 z-[100] w-72 sm:w-80 h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      {/* Header Panel */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-indigo-400 animate-pulse'}`} />
          <span className="text-xs font-semibold tracking-wide text-white">Info Hub AI</span>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs font-bold"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Messaging Stream Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed shadow-md ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white/5 border border-white/5 text-slate-300 rounded-bl-none'
              }`}
            >
              {renderMessageText(msg.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/5 text-slate-400 rounded-xl rounded-bl-none px-3 py-2 text-[11px] tracking-wide">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Text Input Panel */}
      <form onSubmit={handleSendMessage} className="border-t border-white/10 bg-black/20 flex gap-1.5 shrink-0 p-3 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          className="flex-1 bg-[#1e293b] border border-white/10 rounded-lg px-3 py-2 text-[11px] text-slate-200 outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-all font-semibold text-[11px] shrink-0 cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}