import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatPosition {
  x: number;
  y: number;
}

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  position: ChatPosition;
  setPosition: (position: ChatPosition) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente experto en drones FPV. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [position, setPosition] = useState<ChatPosition>({ x: window.innerWidth - 420, y: window.innerHeight - 500 });

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedPosition = localStorage.getItem('chatPosition');
    const savedIsOpen = localStorage.getItem('chatIsOpen');

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }

    if (savedPosition) {
      try {
        const parsedPosition = JSON.parse(savedPosition);
        setPosition(parsedPosition);
      } catch (error) {
        console.error('Error parsing saved position:', error);
      }
    }

    if (savedIsOpen) {
      setIsOpen(savedIsOpen === 'true');
    }
  }, []);

  // Guardar mensajes en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Guardar posición en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('chatPosition', JSON.stringify(position));
  }, [position]);

  // Guardar estado de apertura en localStorage
  useEffect(() => {
    localStorage.setItem('chatIsOpen', isOpen.toString());
  }, [isOpen]);

  const value = {
    isOpen,
    setIsOpen,
    messages,
    setMessages,
    position,
    setPosition,
    isDragging,
    setIsDragging
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};