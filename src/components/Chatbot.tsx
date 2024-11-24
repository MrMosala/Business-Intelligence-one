import React, { useState, useEffect, useRef } from 'react';
import { chatbotQuery, getChatHistory } from '@/utils/api';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  user: boolean;
}

interface ChatbotProps {
  insightId: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ insightId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      setIsLoading(true);
      try {
        const response = await getChatHistory(insightId);
        if (response.chat_history && response.chat_history.length > 0) {
          const sortedHistory = response.chat_history.sort((a: any, b: any) => a.timestamp - b.timestamp);
          const formattedHistory = sortedHistory.flatMap((entry: any) => [
            { id: `user_${entry.timestamp}`, text: entry.user_message, user: true },
            { id: `bot_${entry.timestamp}`, text: entry.bot_response, user: false }
          ]);
          setMessages(formattedHistory);
        } else {
          setMessages([
            {
              id: 'welcome',
              text: "Welcome! I'm your Sales Data Assistant. How can I help you today?",
              user: false
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setMessages([
          {
            id: 'error',
            text: "Sorry, there was an error loading the chat history. How can I assist you today?",
            user: false
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [insightId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, insightId, currentTypingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    for (let i = 0; i <= text.length; i++) {
      setCurrentTypingMessage(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 3)); // Adjust speed here
    }
    setIsTyping(false);
    setCurrentTypingMessage('');
    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, user: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const data = await chatbotQuery(insightId, input);
      const botResponse = await simulateTyping(data.response);
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: botResponse, user: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Sorry, there was an error processing your request.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      const errorMsg: Message = { id: (Date.now() + 1).toString(), text: errorMessage, user: false };
      setMessages(prevMessages => [...prevMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-500 text-white rounded-full p-3 shadow-lg hover:bg-primary-500/90 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircle size={32} />
        </button>
      )}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-800 dark:border-gray-700 border border-border rounded-lg shadow-xl w-full h-full sm:w-4/5 sm:h-4/5 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
            <div className="flex bg-primary-500 text-white dark:border-gray-700 justify-between items-center p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Business Intelligence Assistant</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 messages-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl whitespace-pre-wrap px-4 py-2 ${message.user
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white'
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-2xl whitespace-pre-wrap px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
                    {currentTypingMessage}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="border-t border-border dark:border-gray-700 p-4 flex">
              <textarea
                value={input}
                rows={1}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-foreground border border-input px-3 py-2 rounded-l-md focus:outline-none focus:border-primary-500 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={isLoading || isTyping}
                className="bg-primary-500 text-white px-4 py-2 rounded-r-md hover:bg-primary-500/90 transition-colors disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;