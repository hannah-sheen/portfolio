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

  // High-performance micro formatter to parse Markdown lists and bold text safely
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      let currentLine = line;
      const isListItem = currentLine.trim().startsWith('* ') || currentLine.trim().startsWith('- ');
      
      if (isListItem) {
        currentLine = currentLine.trim().replace(/^[\*\-]\s+/, '');
      }

      // Regex matching to parse **bold text** tokens inside strings
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server connection failure");
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error("Chat Router Error:", error);
      // Show more specific error message
      setMessages(prev => [...prev, { 
        id: botMsgId, 
        sender: 'bot', 
        text: error instanceof Error ? `Error: ${error.message}` : "Systems offline. Unable to reach the knowledge matrix." 
      }]);
    }
  };
    
  return (
    <div
      className="fixed bottom-6 right-6 z-[100] w-72 sm:w-80 h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300"
      onMouseEnter={() => document.body.setAttribute('data-dragging', 'true')}
      onMouseLeave={() => document.body.removeAttribute('data-dragging')}
    >
      {/* Header Panel */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-indigo-400 animate-pulse'}`} />
          <span className="text-xs font-semibold tracking-wide text-white">Info Hub AI</span>
        </div>
        
        <button 
          onClick={() => {
            document.body.removeAttribute('data-dragging');
            onClose();
          }}
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