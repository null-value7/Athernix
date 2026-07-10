'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useAltChatController } from '@/controllers/AI/chatbot';
import { AltChatMessage } from '@/models/AI/chatbot';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { MermaidDiagram } from '@/components/chatbot/roadmaps'; 
import React, { useMemo } from 'react';
import { VectorVisualizer } from '@/components/simulators/VectorVisualizer';
import { useAtherVoice } from '@/components/chatbot/AtherVoice';
import { useVoiceMode } from '@/components/chatbot/VoiceMode/VoiceMode';
import VoiceModeOverlay from '@/components/chatbot/VoiceMode/VoiceOverlay';
import { Component as AiLoaderCircle } from '@/components/ui/ai-loader';

// --- Shadcn & UI Integrations ---
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ImageIcon, 
  FileUp, 
  MonitorIcon, 
  CircleUserRound, 
  ArrowUpIcon, 
  Paperclip, 
  Code2, 
  Palette, 
  Layers, 
  Rocket, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Menu, 
  Plus, 
  Sparkles, 
  Bot, 
  ChevronRight, 
  MessageSquare,
  X
} from "lucide-react";

function useAutoResizeTextarea({ minHeight, maxHeight, value }: { minHeight: number, maxHeight?: number, value: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = `${minHeight}px`;
    if (value) {
      const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Infinity));
      textarea.style.height = `${newHeight}px`;
    }
  }, [minHeight, maxHeight, value]);
  return { textareaRef };
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}
function QuickAction({ icon, label, onClick }: QuickActionProps) {
  return (
    <Button 
      onClick={onClick} 
      variant="outline" 
      className="flex items-center gap-3 px-4 py-3 rounded-full border-[rgba(255,107,0,0.15)] bg-[rgba(255,107,0,0.02)] text-slate-300 hover:text-white hover:bg-[rgba(255,107,0,0.12)] hover:border-orange-500/50 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,0,0.25)] active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group"
    >
      <span className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </Button>
  );
}

// ── Typing indicator ───────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex gap-1.5 p-1 items-center">
      {[0, 1, 2].map(i => (
        <div 
          key={i} 
          className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" 
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.8s'
          }}
        />
      ))}
    </div>
  )
}

// ── Message bubble ─────────────────────────────────────────────
function AltMessageBubble({
  msg, isLast, busy,
}: {
  msg: AltChatMessage
  isLast: boolean
  busy: boolean
}) {
  const markdownComponents = useMemo(() => ({
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      
      // Si el bloque es tipo "mermaid", dibuja el roadmap
      if (!inline && match && match[1] === 'mermaid') {
        return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
      }
      
      // Si es código normal, le da estilo de terminal
      return (
        <code 
          className={className} 
          style={{ 
            background: 'rgba(255,107,0,0.1)', 
            padding: '2px 6px', 
            borderRadius: 6, 
            color: '#ffd700',
            fontSize: '0.9em'
          }}
          {...props}
        >
          {children}
        </code>
      );
    }
  }), []);
  
  const isAI       = msg.role === 'ai'
  const showTyping = isAI && isLast && busy && msg.text === ''

  return (
    <div className={cn(
      "flex gap-4 items-start w-full max-w-4xl mx-auto px-4 py-2 animate-fade-in-up",
      isAI ? "justify-start" : "justify-end"
    )}>
      {/* Bot Avatar */}
      {isAI && (
        <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-pink-600 to-orange-600 border border-pink-400/30 text-white shadow-lg">
          <Bot className="w-4.5 h-4.5" />
        </div>
      )}

      {/* Bubble Container */}
      <div className={cn("flex flex-col max-w-[80%]", isAI ? "items-start" : "items-end")}>
        {/* Name Tag */}
        <div className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wider text-slate-400 mb-1.5 uppercase font-mono">
          {isAI ? 'Athernix' : 'Tú'}
        </div>

        {/* Text box */}
        <div 
          className={cn(
            "px-4 py-3 rounded-2xl text-[0.88rem] leading-[1.62] shadow-sm",
            isAI 
              ? "glass-card-ai text-left rounded-tl-sm" 
              : "glass-card-user text-left rounded-tr-sm"
          )} 
          style={{ color: '#ffffff' }}
        >
          {showTyping ? (
            <TypingDots />
          ) : (
            <div className="alt-markdown">
              {/* Tool integrations */}
              {msg.toolInvocations?.map((tool: any) => {
                if (tool.state === 'result' && tool.toolName === 'vectorSimulator') {
                  return (
                    <div key={tool.toolCallId} className="my-3 p-3 border border-orange-500/30 bg-orange-950/20 rounded-xl">
                      <VectorVisualizer 
                        v1={tool.result.v1} 
                        v2={tool.result.v2} 
                        resultant={tool.result.resultant} 
                      />
                    </div>
                  );
                }
                return null;
              })}
              
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={markdownComponents}
              >
                {(msg.text || '…').replace(/<function=.*?>(<\/function>)?/g, '').trim()}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-300 shadow-md">
          <CircleUserRound className="w-4.5 h-4.5" />
        </div>
      )}
    </div>
  )
}

// ── Main view ──────────────────────────────────────────────────
export default function AltChatView() {
  const {
    state, messagesEndRef,
    toggleSidebar, loadSession, newChat,
    setInput, sendMessage,
    handleKeyDown, handleSubmit,
  } = useAltChatController()
  
  const { textareaRef } = useAutoResizeTextarea({ minHeight: 48, maxHeight: 150, value: state.input });

  const { state: voiceModeState, openVoiceMode, closeVoiceMode, startVoiceCycle, interrupt } =
    useVoiceMode((role: 'user' | 'ai', text: string) => {
      if (role === 'user') sendMessage(text)
  })

  const { voiceState, speak, stopSpeaking, toggleTTS, startListening, stopListening } =
    useAtherVoice((transcript) => {
      sendMessage(transcript)
  })
    
  const { sidebarOpen, sessions, currentSession, messages, input, busy } = state

  // Custom Cursor state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (!voiceState.ttsEnabled) return
    if (busy) return  // esperar a que termine
    const last = messages[messages.length - 1]
    if (last?.role === 'ai' && last.text) {
      speak(last.text)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy])

  return (
    <>
      {/* Custom Cursors */}
      <div 
        id="cursor-dot" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorHovered ? 1.5 : 1})`
        }} 
      />
      <div 
        id="cursor-ring" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorHovered ? 1.2 : 1})`,
          borderColor: cursorHovered ? 'var(--pink)' : 'var(--orange)',
          boxShadow: cursorHovered ? '0 0 25px rgba(255, 0, 110, 0.3)' : '0 0 15px var(--glass-glow)'
        }} 
      />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
      </div>
      <div className="grain-overlay" />

      <div className="bg-transparent h-screen min-h-[520px] flex overflow-hidden relative font-sans text-slate-200 z-10">

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div 
            onClick={toggleSidebar} 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300 pointer-events-auto"
          />
        )}

        {/* ── Sidebar ── */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 lg:relative lg:z-10 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out bg-[#08000a]/95 lg:bg-transparent",
          sidebarOpen ? "w-[280px] translate-x-0" : "w-0 -translate-x-full lg:w-0 lg:translate-x-0"
        )}>
          <div className="w-[280px] h-[calc(100%-32px)] m-4 mr-0 rounded-[40px] glass-login-panel flex flex-col p-5 flex-1 pointer-events-auto">

            {/* Sidebar header */}
            <div className="pb-4 mb-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-600 to-orange-600 flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold tracking-wider text-white">ATHEX CHATS</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* New chat button */}
            <button 
              onClick={() => {
                newChat();
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-pink-600/15 to-orange-600/10 border border-orange-500/15 text-orange-200 text-xs font-semibold tracking-wider cursor-pointer mb-5 flex items-center justify-center gap-2 transition-all duration-300 hover:from-pink-600/25 hover:to-orange-600/20 hover:border-orange-500/35 hover:shadow-[0_4px_20px_rgba(255,107,0,0.2)] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
            >
              <Plus className="w-3.5 h-3.5" /> NUEVO CHAT
            </button>

            {/* Recientes tag */}
            <div className="text-[0.62rem] font-bold tracking-widest text-slate-500 uppercase mb-3 px-1 font-mono">
              Recientes
            </div>

            {/* Session list */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
              {sessions.map(s => {
                const isActive = currentSession === s.id;
                return (
                  <button 
                    key={s.id} 
                    onClick={() => {
                      loadSession(s.id);
                      if (window.innerWidth < 1024) toggleSidebar();
                    }}
                    className={cn(
                      "w-full text-left flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 border",
                      isActive 
                        ? "bg-orange-500/10 border-orange-500/20 shadow-[0_4px_16px_rgba(255,107,0,0.15)]" 
                        : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5"
                    )}
                  >
                    <MessageSquare className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-orange-400" : "text-slate-500")} />
                    <div className="flex-1 min-w-0">
                      <div className={cn("text-xs font-medium overflow-hidden text-ellipsis whitespace-nowrap", isActive ? "text-white" : "text-slate-400")}>
                        {s.title}
                      </div>
                      <div className="text-[0.58rem] font-medium text-slate-600 mt-0.5 font-mono">
                        {s.date.toUpperCase()}
                      </div>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-3 h-3 text-orange-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main panel ── */}
        <div className="flex-1 flex flex-col relative z-10 min-w-0">

          {/* Clean HUD Topbar */}
          <div className="mx-4 mt-4 lg:mx-6 lg:mt-6 px-4 lg:px-6 py-3 rounded-3xl border border-white/5 bg-black/35 backdrop-blur-xl flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-30 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Menu button */}
              <button 
                onClick={toggleSidebar}
                className="w-9 h-9 rounded-xl flex-shrink-0 bg-white/5 border border-white/5 text-slate-300 cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white/10 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] active:scale-95 active:bg-white/15"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>

              {/* Status Indicator */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-3 h-3 rounded-full bg-orange-400/20 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_var(--orange)]" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ATHERNIX AI
                  </div>
                  <div className="text-[0.55rem] font-semibold tracking-wider text-orange-400/50 uppercase font-mono">
                    online
                  </div>
                </div>
              </div>
            </div>

            {/* Combined Voice and Audio Controls */}
            <div className="flex items-center gap-1.5">
              {/* TTS Toggle Icon */}
              <button
                onClick={toggleTTS}
                title={voiceState.ttsEnabled ? 'Desactivar Lectura de voz' : 'Activar Lectura de voz'}
                className={cn(
                  "w-9 h-9 rounded-xl border cursor-pointer flex items-center justify-center transition-all duration-300 active:scale-95",
                  voiceState.ttsEnabled 
                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400 shadow-[0_0_16px_rgba(255,107,0,0.2)] hover:bg-orange-500/15 hover:border-orange-500/40" 
                    : "bg-transparent border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/5 hover:border-white/10"
                )}
              >
                {voiceState.ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* MIC Toggle Icon */}
              <button
                onClick={() => {
                  if (voiceState.listening) {
                    stopListening();
                  } else {
                    startListening();
                  }
                }}
                disabled={voiceState.speaking}
                title="Dictar mensaje"
                className={cn(
                  "w-9 h-9 rounded-xl border cursor-pointer flex items-center justify-center transition-all duration-300 active:scale-95",
                  voiceState.listening 
                    ? "bg-pink-500/10 border-pink-500/30 text-pink-400 shadow-[0_0_16px_rgba(255,0,110,0.25)] animate-pulse hover:bg-pink-500/15 hover:border-pink-500/40" 
                    : "bg-transparent border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/5 hover:border-white/10"
                )}
              >
                {voiceState.listening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {/* Voice mode overlay trigger */}
              <button
                onClick={openVoiceMode}
                title="Modo Conversación de voz"
                className="w-9 h-9 rounded-xl bg-orange-600/15 border border-orange-500/20 text-orange-300 cursor-pointer flex items-center justify-center hover:bg-orange-600/25 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 active:translate-y-0"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col gap-4 h-0 relative scroll-smooth bg-transparent">
            {messages.length === 0 || voiceState.listening ? (
              /* Empty state or listening state */
              <div className="flex-1 flex flex-col items-center justify-center pb-12 select-none relative z-10">
                <div className="relative flex items-center justify-center mb-6">
                  {/* Glowing rings behind the orb */}
                  <div className="absolute w-[180px] h-[180px] rounded-full bg-orange-600/5 blur-xl animate-pulse" />
                  <div className="absolute w-[160px] h-[160px] rounded-full border border-orange-500/10 animate-spin" style={{ animationDuration: '30s' }} />
                  <AiLoaderCircle size={130} text={voiceState.listening ? "ESCUCHANDO" : "ATHERNIX"} embed={true} />
                </div>
                
                <div className="text-center mb-8 px-4">
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-orange-500 tracking-wider drop-shadow-[0_0_12px_rgba(255,107,0,0.15)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {voiceState.listening ? "ESCUCHANDO..." : "ATHERNIX AI"}
                  </h1>
                  <p className="mt-2 text-slate-400 text-xs lg:text-sm max-w-md mx-auto">
                    {voiceState.listening ? "Habla ahora para enviar tu mensaje" : "Tu asistente inteligente de nueva generación. ¿En qué puedo ayudarte hoy?"}
                  </p>
                </div>

                {/* Quick Actions - only show when not listening */}
                {!voiceState.listening && (
                  <div className="flex items-center justify-center flex-wrap gap-2.5 max-w-[620px] px-4 animate-fade-in-up">
                  <QuickAction onClick={() => sendMessage("Generate a React Component")} icon={<Code2 className="w-4 h-4" />} label="Crear Código" />
                  <QuickAction onClick={() => sendMessage("Help me launch my Next.js app")} icon={<Rocket className="w-4 h-4" />} label="Lanzar App" />
                  <QuickAction onClick={() => sendMessage("Design a UI component")} icon={<Layers className="w-4 h-4" />} label="Diseño UI" />
                  <QuickAction onClick={() => sendMessage("Suggest color theme ideas")} icon={<Palette className="w-4 h-4" />} label="Colores de Temas" />
                  <QuickAction onClick={() => sendMessage("Create a user dashboard layout")} icon={<CircleUserRound className="w-4 h-4" />} label="Dashboard" />
                  <QuickAction onClick={() => sendMessage("Build a landing page")} icon={<MonitorIcon className="w-4 h-4" />} label="Landing Page" />
                  <QuickAction onClick={() => sendMessage("Analyze this document")} icon={<FileUp className="w-4 h-4" />} label="Analizar Docs" />
                  <QuickAction onClick={() => sendMessage("Generate image assets")} icon={<ImageIcon className="w-4 h-4" />} label="Generar Imagen" />
                </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <AltMessageBubble
                    key={i}
                    msg={msg}
                    isLast={i === messages.length - 1}
                    busy={busy}
                  />
                ))}
                
                {/* Standalone typing indicator */}
                {busy && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-4 items-start w-full max-w-4xl mx-auto px-4 py-2 animate-fade-in-up">
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-pink-600 to-orange-600 border border-pink-400/30 text-white shadow-lg">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col items-start max-w-[80%]">
                      <div className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wider text-slate-400 mb-1.5">
                        Athernix
                      </div>
                      <div className="px-4 py-3 rounded-2xl glass-card-ai rounded-tl-sm border-white/10">
                        <TypingDots />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef}/>
          </div>

          {/* Input area */}
          <div className="w-full max-w-4xl mx-auto px-4 lg:px-6 pb-6 pt-2 z-20">
            <div className="relative input-field-chatbot bg-[#08000a]/20 backdrop-blur-xl border transition-all duration-300">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    } else {
                      handleKeyDown(e);
                    }
                  }}
                  placeholder="Envía un mensaje a Athernix..."
                  disabled={busy}
                  className={cn(
                    "w-full px-5 py-4 resize-none border-none",
                    "bg-transparent text-white text-[0.88rem] leading-relaxed",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                    "placeholder:text-slate-500 min-h-[48px] disabled:opacity-50"
                  )}
                  style={{ overflow: "hidden" }}
                />
                
                {/* Footer Buttons */}
                <div className="flex items-center justify-between px-3 py-2 border-t border-white/5 bg-black/10 rounded-b-2xl">
                  <Button type="button" variant="ghost" size="icon" className="text-slate-400 hover:bg-white/5 hover:text-white hover:shadow-[0_2px_8px_rgba(255,255,255,0.1)] rounded-xl w-8 h-8 transition-all duration-300" >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      type="submit" 
                      disabled={busy || !input.trim()} 
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 p-0 cursor-pointer btn-gradient",
                        "hover:shadow-[0_4px_16px_rgba(255,0,110,0.4)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
                        (busy || !input.trim()) 
                          && "opacity-30 cursor-not-allowed shadow-none hover:translate-y-0"
                      )}
                    >
                      <ArrowUpIcon className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="text-[0.58rem] tracking-widest text-center mt-3 font-semibold text-slate-600 uppercase font-mono">
              Athernix Engine v2.0 • Conversación Segura
            </div>
          </div>
        </div>
      </div>
      
      <VoiceModeOverlay
        state={voiceModeState}
        onClose={closeVoiceMode}
        onStartCycle={startVoiceCycle}
        onInterrupt={interrupt}
      />
    </>
  )
}
