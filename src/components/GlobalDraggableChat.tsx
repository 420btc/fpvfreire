import React, { useRef, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useChatContext } from '../contexts/ChatContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  responseTime?: number; // Tiempo de respuesta en segundos
}

const GlobalDraggableChat: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    messages,
    setMessages,
    position,
    setPosition,
    isDragging,
    setIsDragging
  } = useChatContext();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Manejar el arrastre del chat
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chatRef.current) return;
    
    const rect = chatRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Limitar el movimiento dentro de la ventana
    const maxX = window.innerWidth - 384; // 384px es el ancho del chat (w-96)
    const maxY = window.innerHeight - 384; // 384px es la altura del chat (h-96)
    
    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Agregar event listeners globales para el arrastre
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevenir selección de texto
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  // Ajustar posición cuando cambie el tamaño de la ventana solo si está fuera de los límites
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - 384;
      const maxY = window.innerHeight - 384;
      
      // Solo ajustar si la posición actual está fuera de los límites
      if (position.x > maxX || position.y > maxY) {
        setPosition({
          x: Math.max(0, Math.min(position.x, maxX)),
          y: Math.max(0, Math.min(position.y, maxY))
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, setPosition]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Límite de 10 mensajes (excluyendo el mensaje inicial del bot)
    if (messages.length >= 11) {
      const limitMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Has alcanzado el límite de 10 mensajes. Para más consultas, por favor contacta directamente conmigo.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const startTime = Date.now(); // Capturar tiempo de inicio

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Eres un experto en drones FPV (First Person View) y servicios de grabación aérea. Tu nombre es Carlos y trabajas para Freire FPV. Tienes amplio conocimiento sobre: tipos de drones FPV, técnicas de pilotaje, equipamiento necesario, regulaciones de vuelo, servicios de grabación para bodas, eventos, deportes, inspecciones, publicidad, etc. Responde de manera profesional pero amigable, en español o en el idioma que te hablen, y siempre enfócate en cómo los drones FPV pueden ayudar al cliente. Si te preguntan sobre precios, menciona que pueden contactar directamente para un presupuesto personalizado.'
            },
            {
              role: 'user',
              content: inputMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await response.json();
      const endTime = Date.now();
      const responseTimeInSeconds = (endTime - startTime) / 1000; // Convertir a segundos
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0].message.content,
        isUser: false,
        timestamp: new Date(),
        responseTime: responseTimeInSeconds
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const endTime = Date.now();
      const responseTimeInSeconds = (endTime - startTime) / 1000;
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o contacta directamente conmigo.',
        isUser: false,
        timestamp: new Date(),
        responseTime: responseTimeInSeconds
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante fijo en esquina inferior derecha */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            isIconOnly
            className="w-16 h-16 bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
            onPress={() => setIsOpen(true)}
          >
            <Icon icon="mdi:chat" width={32} height={32} />
          </Button>
        </div>
      )}

      {/* Ventana de chat arrastrable */}
       {isOpen && (
         <div className="fixed z-50" style={{ left: position.x, top: position.y }}>
           <Card 
          ref={chatRef}
          className={`w-96 h-96 shadow-2xl border border-orange-200 ${isDragging ? 'cursor-move' : ''}`}
        >
          <CardHeader 
            className="bg-orange-500 text-white p-4 flex justify-between items-center cursor-move"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:drone" width={24} height={24} />
              <div>
                <h3 className="font-bold">Asistente FPV</h3>
                <p className="text-xs opacity-90">Experto en drones - Arrastrable</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-white hover:bg-orange-600"
                onPress={() => setIsOpen(false)}
              >
                <Icon icon="mdi:minus" width={16} height={16} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-white hover:bg-orange-600"
                onPress={() => setIsOpen(false)}
              >
                <Icon icon="mdi:close" width={16} height={16} />
              </Button>
            </div>
          </CardHeader>
          
          <CardBody className="p-0 flex flex-col h-full">
            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex justify-between items-center text-xs opacity-70 mt-1">
                      <span>
                        {message.timestamp.toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {!message.isUser && message.responseTime !== undefined && (
                        <span 
                          className={`ml-2 ${message.responseTime <= 2 ? 'text-green-500' : 
                                          message.responseTime <= 6 ? 'text-orange-500' : 
                                          'text-red-500'}`}
                        >
                          {message.responseTime.toFixed(1)}s
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Área de input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Escribe tu pregunta sobre drones FPV..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  isIconOnly
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onPress={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Icon icon="mdi:send" width={20} height={20} />
                </Button>
              </div>
            </div>
          </CardBody>
          </Card>
        </div>
      )}
    </>
   );
};

export default GlobalDraggableChat;