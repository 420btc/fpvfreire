import { useState, useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader, Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente experto en drones FPV. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detectar cuando el usuario llega al final de la página
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Mostrar el botón cuando el usuario esté cerca del final (90% del scroll)
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      setIsVisible(scrollPercentage > 0.9);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
              content: 'Eres un experto en drones FPV (First Person View) y servicios de grabación aérea. Tu nombre es Carlos y trabajas para Freire FPV. Tienes amplio conocimiento sobre: tipos de drones FPV, técnicas de pilotaje, equipamiento necesario, regulaciones de vuelo, servicios de grabación para bodas, eventos, deportes, inspecciones, publicidad, etc. Responde de manera profesional pero amigable, en español, y siempre enfócate en cómo los drones FPV pueden ayudar al cliente. Si te preguntan sobre precios, menciona que pueden contactar directamente para un presupuesto personalizado.'
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
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0].message.content,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o contacta directamente conmigo.',
        isUser: false,
        timestamp: new Date()
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón flotante */}
      {!isOpen && (
        <Button
          isIconOnly
          className="w-16 h-16 bg-orange-500 hover:bg-orange-600 text-white shadow-lg animate-bounce"
          onPress={() => setIsOpen(true)}
        >
          <Icon icon="mdi:chat" width={32} height={32} />
        </Button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <Card className="w-96 h-96 shadow-2xl border border-orange-200">
          <CardHeader className="bg-orange-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:drone" width={24} height={24} />
              <div>
                <h3 className="font-bold">Asistente FPV</h3>
                <p className="text-xs opacity-90">Experto en drones</p>
              </div>
            </div>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-white hover:bg-orange-600"
              onPress={() => setIsOpen(false)}
            >
              <Icon icon="mdi:close" width={20} height={20} />
            </Button>
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
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
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
      )}
    </div>
  );
};

export default ChatBot;