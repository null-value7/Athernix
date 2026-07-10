"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

// Animated Robot Component
function AnimatedRobot({ isTyping }: { isTyping: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Idle animation - gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Rotate when typing
      if (isTyping) {
        groupRef.current.rotation.y += 0.02;
      } else {
        groupRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Robot Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.5, 0.8]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Robot Head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.2, 1.3, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={isTyping ? "#22c55e" : "#60a5fa"} 
          emissive={isTyping ? "#22c55e" : "#60a5fa"}
          emissiveIntensity={isTyping ? 2 : 1}
        />
      </mesh>
      <mesh position={[0.2, 1.3, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={isTyping ? "#22c55e" : "#60a5fa"} 
          emissive={isTyping ? "#22c55e" : "#60a5fa"}
          emissiveIntensity={isTyping ? 2 : 1}
        />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#a78bfa" 
          emissive="#a78bfa"
          emissiveIntensity={isTyping ? 3 : 1}
        />
      </mesh>
      
      {/* Arms */}
      <group>
        <mesh position={[-0.7, 0.3, 0]} rotation={[0, 0, isTyping ? Math.sin(Date.now() * 0.01) * 0.3 : 0]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.7, 0.3, 0]} rotation={[0, 0, isTyping ? -Math.sin(Date.now() * 0.01) * 0.3 : 0]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Legs */}
      <mesh position={[-0.3, -1.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#4338ca" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.3, -1.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#4338ca" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// 3D Scene Component
function Scene({ isTyping }: { isTyping: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      <AnimatedRobot isTyping={isTyping} />
      
      <Environment preset="city" />
    </>
  );
}

const ChatbotWith3D: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles: FloatingParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponses = [
        'That\'s an interesting question! Let me help you with that.',
        'I understand what you\'re asking. Here\'s what I think...',
        'Great question! Based on my knowledge, I can tell you that...',
        'I\'m here to assist you. Let me provide some insights on that.',
        'Absolutely! I\'d be happy to help you understand this better.',
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* 3D Interactive Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary-rgb, 59, 130, 246), 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Main Chat Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl relative z-10 flex gap-6"
        onMouseMove={handleMouseMove}
      >
        {/* 3D Robot Display */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-80 h-[700px] shrink-0 hidden lg:block"
        >
          <Card className="h-full backdrop-blur-xl bg-background/80 border-border/50 shadow-2xl overflow-hidden">
            <div className="h-full w-full">
              <Canvas>
                <Scene isTyping={isTyping || inputValue.length > 0} />
              </Canvas>
            </div>
          </Card>
        </motion.div>

        {/* Chat Container */}
        <Card className="backdrop-blur-xl bg-background/80 border-border/50 shadow-2xl overflow-hidden flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                  <Avatar className="h-14 w-14 border-2 border-primary/50 relative z-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-7 w-7" />
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    AI Assistant
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="h-5 w-5 text-primary" />
                    </motion.div>
                  </h2>
                  <p className="text-sm text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="hover:bg-primary/10"
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Avatar className="h-10 w-10 border-2 border-border">
                        <AvatarFallback
                          className={
                            message.sender === 'bot'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }
                        >
                          {message.sender === 'bot' ? (
                            <Bot className="h-5 w-5" />
                          ) : (
                            <User className="h-5 w-5" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[70%] rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      } shadow-lg relative overflow-hidden`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                      <p className="text-sm leading-relaxed relative z-10">{message.text}</p>
                      <span className="text-xs opacity-70 mt-2 block relative z-10">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl p-4 shadow-lg">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-foreground/50 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border/50 p-6 bg-background/50 backdrop-blur-sm">
            <div className="flex gap-3">
              <motion.div
                className="flex-1 relative"
                whileFocus={{ scale: 1.01 }}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="pr-12 h-12 bg-background/80 border-border/50 focus:border-primary transition-all"
                />
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleSendMessage}
                  size="lg"
                  className="h-12 px-6 bg-primary hover:bg-primary/90 shadow-lg relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <Send className="h-5 w-5 relative z-10" />
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>

        {/* Floating 3D Elements */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
};

export default ChatbotWith3D;
