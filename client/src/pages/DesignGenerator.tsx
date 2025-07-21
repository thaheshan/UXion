import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, Sparkles, Copy, Download, Figma, RefreshCw, Zap, Users } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'system';
  timestamp: Date;
  design?: {
    id: string;
    type: string;
    title: string;
    preview: string;
    description: string;
    components: any[];
    figmaInstructions?: string[];
  };
}

const DesignGenerator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI design assistant connected to Figma. Describe the interface you\'d like to create, and I\'ll generate it both here and directly in your Figma workspace. Try something like "Create a modern login page" or "Design a dashboard for a fitness app".',
      type: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentDesign, setCurrentDesign] = useState<any>(null);
  const [figmaConnected, setFigmaConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isConnected, isTyping, generateDesign, modifyDesign, connectFigma, socketService } = useSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Set up socket event listeners
    const handleDesignGenerated = (data: any) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        type: 'ai',
        timestamp: new Date(),
        design: {
          id: data.design.id,
          type: data.design.type,
          title: data.design.title,
          preview: getDesignPreview(data.design.type),
          description: data.design.description,
          components: data.design.components,
          figmaInstructions: data.design.figmaInstructions
        }
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentDesign(data.design);
    };

    const handleDesignModified = (data: any) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        type: 'ai',
        timestamp: new Date(),
        design: {
          id: data.design.id,
          type: data.design.type,
          title: data.design.title,
          preview: getDesignPreview(data.design.type),
          description: data.design.description,
          components: data.design.components,
          figmaInstructions: data.design.figmaInstructions
        }
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentDesign(data.design);
    };

    const handleDesignError = (data: any) => {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        type: 'system',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    };

    const handleFigmaConnected = (data: any) => {
      setFigmaConnected(true);
      const systemMessage: Message = {
        id: Date.now().toString(),
        content: '🎨 Figma plugin connected! Designs will now be created directly in your Figma workspace.',
        type: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
    };

    const handleFigmaUpdate = (data: any) => {
      if (data.type === 'new-design' || data.type === 'design-modified') {
        const systemMessage: Message = {
          id: Date.now().toString(),
          content: `🔄 Design ${data.type === 'new-design' ? 'created' : 'updated'} in Figma workspace`,
          type: 'system',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, systemMessage]);
      }
    };

    socketService.on('design-generated', handleDesignGenerated);
    socketService.on('design-modified', handleDesignModified);
    socketService.on('design-error', handleDesignError);
    socketService.on('figma-connected', handleFigmaConnected);
    socketService.on('figma-update', handleFigmaUpdate);

    return () => {
      socketService.off('design-generated', handleDesignGenerated);
      socketService.off('design-modified', handleDesignModified);
      socketService.off('design-error', handleDesignError);
      socketService.off('figma-connected', handleFigmaConnected);
      socketService.off('figma-update', handleFigmaUpdate);
    };
  }, [socketService]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const prompt = inputValue;
    setInputValue('');

    try {
      // Detect design type
      const designType = detectDesignType(prompt);
      generateDesign(prompt, designType);
    } catch (error) {
      console.error('Failed to generate design:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please check your connection and try again.',
        type: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleModifyDesign = (designId: string, modification: string) => {
    if (!modification.trim() || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: modification,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      modifyDesign(designId, 'user-modification', modification);
    } catch (error) {
      console.error('Failed to modify design:', error);
    }
  };

  const detectDesignType = (prompt: string): string => {
    const lowercasePrompt = prompt.toLowerCase();
    if (lowercasePrompt.includes('login') || lowercasePrompt.includes('signin')) return 'login';
    if (lowercasePrompt.includes('dashboard')) return 'dashboard';
    if (lowercasePrompt.includes('landing') || lowercasePrompt.includes('homepage')) return 'landing';
    if (lowercasePrompt.includes('mobile') || lowercasePrompt.includes('app')) return 'mobile';
    if (lowercasePrompt.includes('ecommerce') || lowercasePrompt.includes('shop')) return 'ecommerce';
    return 'general';
  };

  const getDesignPreview = (designType: string): string => {
    const previews = {
      login: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop',
      dashboard: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=400&h=300&fit=crop',
      landing: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?w=400&h=300&fit=crop',
      mobile: 'https://images.pexels.com/photos/1342460/pexels-photo-1342460.jpeg?w=400&h=300&fit=crop',
      ecommerce: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?w=400&h=300&fit=crop',
      general: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop'
    };
    return previews[designType as keyof typeof previews] || previews.general;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConnectFigma = () => {
    try {
      connectFigma({
        pluginId: 'designai-pro-chat',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to connect Figma:', error);
    }
  };

  const suggestionPrompts = [
    "Create a modern login page with social authentication",
    "Design a dashboard for a project management app",
    "Build a landing page for a SaaS product",
    "Create a mobile shopping app interface",
    "Design a user profile settings page",
    "Create a pricing page with three tiers"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Sparkles className="h-6 w-6 text-blue-500 mr-2" />
                AI Design Generator
                {figmaConnected && <span className="ml-2 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">Figma Connected</span>}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Describe your vision and watch it come to life in real-time
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isConnected 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <button 
                onClick={handleConnectFigma}
                className={`p-2 rounded-lg transition-colors ${
                  figmaConnected
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800'
                }`}
                title={figmaConnected ? 'Figma Connected' : 'Connect to Figma'}
              >
                <Figma className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${
                      message.type === 'user' 
                        ? 'justify-end' 
                        : message.type === 'system'
                        ? 'justify-center'
                        : 'justify-start'
                    }`}
                  >
                    <div className={`max-w-3xl ${
                      message.type === 'user' 
                        ? 'ml-12' 
                        : message.type === 'system'
                        ? 'mx-12'
                        : 'mr-12'
                    }`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : message.type === 'system'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-center text-sm'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                        
                        {/* Design Preview */}
                        {message.design && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
                          >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {message.design.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {message.design.components.length} components • {message.design.type}
                                  </p>
                                </div>
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => navigator.clipboard.writeText(JSON.stringify(message.design, null, 2))}
                                    className="p-2 rounded-lg bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                                    title="Copy Design JSON"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </button>
                                  <button className="p-2 rounded-lg bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
                                    <Download className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      const modification = prompt('How would you like to modify this design?');
                                      if (modification) {
                                        handleModifyDesign(message.design!.id, modification);
                                      }
                                    }}
                                    className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                  >
                                    <Zap className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <img
                                src={message.design.preview}
                                alt="Design Preview"
                                className="w-full h-48 object-cover rounded-lg mb-3"
                              />
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {message.design.description}
                              </p>
                              {figmaConnected && (
                                <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                                  <Figma className="h-4 w-4" />
                                  <span>Automatically created in Figma workspace</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">AI is designing...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Try these examples:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestionPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(prompt)}
                        className="text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe the interface you want to create..."
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    rows={3}
                    disabled={isTyping || !isConnected}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || !isConnected}
                  className="p-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isTyping ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignGenerator;