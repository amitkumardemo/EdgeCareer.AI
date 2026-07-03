"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, X, Send, User, Bot, Sparkles, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePathname } from "next/navigation";

const QUICK_REPLIES = [
  "Tell me about the Internship Programs & Benefits.",
  "How can I Verify my Certificate?",
  "What courses do you offer?",
  "I want to Apply for an Internship!"
];

export default function Chatbot() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: "Hi there! 👋 I am the TechieHelp AI Assistant. How can I guide you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Exclude on certain pages like auth, dashboard to match footer logic
  const excludedPrefixes = [
    "/admin",
    "/internship/student",
    "/internship/admin",
    "/internship/college",
    "/tpo",
    "/sign-in",
    "/sign-up"
  ];
  const shouldHideChatbot = excludedPrefixes.some(prefix => pathname?.startsWith(prefix));

  // Auto-scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    // Add user message to UI
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([...newMessages, { role: "model", content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          { role: "model", content: data.error || "Sorry, something went wrong. Please try again." }
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "model", content: "Network error. Please check your connection." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (question) => {
    handleSendMessage(question);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  if (!isMounted || shouldHideChatbot) return null;

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}
        aria-label="Open Chatbot"
      >
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping pointer-events-none" />
        <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden p-1.5">
            <Image 
                src="/icon.png" 
                alt="TechieHelp Icon" 
                width={40} 
                height={40} 
                className="object-contain"
            />
        </div>

        {/* Tooltip */}
        <span className={`absolute right-full mr-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-1.5 px-3 rounded-full whitespace-nowrap shadow-lg transition-all duration-300 pointer-events-none ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          Need help? Ask AI
        </span>
      </button>

      {/* CHAT WINDOW */}
      <div 
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[70] w-[calc(100vw-2rem)] sm:w-[380px] h-[600px] max-h-[80vh] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <Image src="/icon.png" alt="TH Logo" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">TechieHelp AI</h3>
              <p className="text-[10px] text-cyan-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Always here to help
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* Bot Avatar */}
              {msg.role === 'model' && (
                <div className="w-7 h-7 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-tl-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:font-semibold hover:prose-a:underline prose-ul:pl-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Quick Replies (Only show if last message is from bot and not loading) */}
          {!isLoading && messages[messages.length - 1].role === 'model' && (
             <div className="flex flex-wrap gap-2 pt-2">
               {QUICK_REPLIES.map((qr, i) => (
                 <button
                   key={i}
                   onClick={() => handleQuickReply(qr)}
                   className="text-[11px] font-medium bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 rounded-full px-3 py-1.5 transition-colors text-left"
                 >
                   {qr}
                 </button>
               ))}
             </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          
          {/* Custom Footer inside chat */}
          <div className="mt-2 text-center flex items-center justify-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
            Powered by <Image src="/thp logo.png" alt="TechieHelp" width={60} height={16} className="h-3 w-auto opacity-70 grayscale dark:invert" /> AI
          </div>
        </div>

      </div>
    </>
  );
}
