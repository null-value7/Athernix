import type { Metadata } from 'next'
import ChatbotShell from './ChatbotShell'

export const metadata: Metadata = {
  title: 'Chatbot Ather',
  description: 'Conversa con Ather, el asistente con IA de ATHERNIX para aprender historia y STEM.',
  robots: { index: false, follow: false },
}

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ChatbotShell>{children}</ChatbotShell>
}
