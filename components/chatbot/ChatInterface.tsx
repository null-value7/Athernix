// Archivo: components/ChatInterface.tsx
'use client';

import { useChat } from 'ai/react';
import { Message } from 'ai/react';
import { useEffect, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChatInterface() {
  // Conecta con tu Controlador (app/api/chat/route.ts)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  
  // Referencia para hacer auto-scroll hacia abajo cuando lleguen mensajes
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col shadow-xl">
      <CardHeader className="border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          Athernix Engine (Fase 1)
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="flex flex-col gap-4 pb-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-20">
                <p>El enlace cerebral está activo. ¿Qué deseas saber, jugador?</p>
              </div>
            )}
            
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Avatar IA (Izquierda) */}
                {m.role !== 'user' && (
                  <Avatar className="w-8 h-8 bg-primary/10">
                    <AvatarFallback><Bot className="w-4 h-4 text-primary" /></AvatarFallback>
                  </Avatar>
                )}

                {/* Burbuja de Mensaje */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted rounded-tl-sm'
                  }`}
                >
                  <span className="whitespace-pre-wrap text-sm">{m.content}</span>
                </div>

                {/* Avatar Usuario (Derecha) */}
                {m.role === 'user' && (
                  <Avatar className="w-8 h-8 bg-primary">
                    <AvatarFallback><User className="w-4 h-4 text-primary-foreground" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu comando o pregunta..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}