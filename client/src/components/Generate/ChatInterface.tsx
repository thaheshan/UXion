import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader, Download, Eye, Wand2, Zap, Palette, Code, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'generating';
  attachments?: string[];
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "🎨 Welcome to UXion! I'm your AI design genius ready to transform your wildest ideas into stunning prototypes.\n\n✨ Try these magical prompts:\n• \"Create a futuristic e-commerce platform for space tourism\"\n• \"Design a mindfulness app with calming animations\"\n• \"Build a crypto trading dashboard with real-time charts\"\n\nWhat amazing design shall we create together?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [typingEffect, setTypingEffect] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsGenerating(true);

    // Simulate typing effect
    const responses = [
      "🚀 Analyzing your brilliant idea...",
      "🎨 Generating color palettes and layouts...",
      "⚡ Creating interactive components...",
      "🔮 Adding magical animations...",
      "✨ Finalizing your masterpiece..."
    ];

    for (let i = 0; i < responses.length; i++) {
      setTimeout(() => {
        setTypingEffect(responses[i]);
      }, i * 800);
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "🎉 Your design is ready! I've created a stunning prototype with:\n\n🌟 Modern glassmorphism design\n🎨 Dynamic color schemes\n⚡ Smooth micro-interactions\n📱 Responsive layouts\n🔗 Intuitive user flows\n\nYour prototype includes 8 connected screens with advanced animations and is ready for Figma export!",
        timestamp: new Date(),
        attachments: ['prototype-preview.png', 'design-system.fig']
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
      setTypingEffect('');
    }, 4000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "🚀 Futuristic dashboard",
    "🎵 Music streaming app", 
    "🛍️ E-commerce platform",
    "💰 Fintech mobile app"
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-bg-light via-surface-light/30 to-bg-light dark:from-bg-dark dark:via-surface-dark/30 dark:to-bg-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Chat Header */}
      <motion.div 
        className="flex-shrink-0 p-6 bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl border-b border-surface-light/50 dark:border-surface-dark/50 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{ 
                  rotate: [0, 360],
                  boxShadow: [
                    '0 0 20px rgba(26, 115, 232, 0.3)',
                    '0 0 40px rgba(124, 58, 237, 0.5)',
                    '0 0 20px rgba(26, 115, 232, 0.3)'
                  ]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Bot className="w-7 h-7 text-white" />
              </motion.div>
              
              {/* Status indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white dark:border-bg-dark"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <div>
              <motion.h3 
                className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                UXion AI Designer
              </motion.h3>
              <motion.p 
                className="text-text-secondary-light dark:text-text-secondary-dark flex items-center space-x-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                <span>Ready to create magic</span>
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="p-3 bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm rounded-xl hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
            </motion.button>
            <motion.button
              className="p-3 bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm rounded-xl hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick Prompts */}
      <motion.div 
        className="flex-shrink-0 p-4 border-b border-surface-light/30 dark:border-surface-dark/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {quickPrompts.map((prompt, index) => (
            <motion.button
              key={index}
              onClick={() => setInputMessage(prompt.split(' ').slice(1).join(' '))}
              className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-text-primary-light dark:text-text-primary-dark rounded-full border border-primary/20 hover:border-primary/50 transition-all duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {prompt}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-4xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`flex items-start space-x-4 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <motion.div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-primary to-accent text-white'
                        : 'bg-gradient-to-br from-accent to-primary text-white'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={message.type === 'ai' ? { 
                      boxShadow: [
                        '0 0 20px rgba(124, 58, 237, 0.3)',
                        '0 0 30px rgba(26, 115, 232, 0.4)',
                        '0 0 20px rgba(124, 58, 237, 0.3)'
                      ]
                    } : {}}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    {message.type === 'user' ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Bot className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Message bubble */}
                  <motion.div
                    className={`relative px-6 py-4 rounded-3xl shadow-xl backdrop-blur-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-primary to-accent text-white'
                        : 'bg-surface-light/50 dark:bg-surface-dark/50 text-text-primary-light dark:text-text-primary-dark border border-surface-light/50 dark:border-surface-dark/50'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    style={{
                      background: message.type === 'user' 
                        ? 'linear-gradient(135deg, #1A73E8, #7C3AED)'
                        : undefined
                    }}
                  >
                    {/* Message content */}
                    <p className="whitespace-pre-wrap leading-relaxed font-medium">
                      {message.content}
                    </p>
                    
                    {/* Attachments */}
                    {message.attachments && (
                      <motion.div 
                        className="mt-4 space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {message.attachments.map((attachment, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center space-x-3 p-3 bg-white/10 rounded-2xl backdrop-blur-sm"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-success to-success-dark rounded-lg flex items-center justify-center">
                              {attachment.includes('.fig') ? <Palette className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-sm font-medium">{attachment}</span>
                            <motion.button
                              className="ml-auto p-1 hover:bg-white/20 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Download className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    
                    {/* Timestamp and actions */}
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-xs ${
                          message.type === 'user'
                            ? 'text-white/70'
                            : 'text-text-secondary-light dark:text-text-secondary-dark'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.type === 'ai' && messages.indexOf(message) > 0 && (
                        <div className="flex space-x-2 ml-4">
                          <motion.button 
                            className="p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                          </motion.button>
                          <motion.button 
                            className="p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Download className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="max-w-4xl">
                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 20px rgba(124, 58, 237, 0.3)',
                        '0 0 40px rgba(26, 115, 232, 0.5)',
                        '0 0 20px rgba(124, 58, 237, 0.3)'
                      ]
                    }}
                    transition={{ 
                      scale: { duration: 1, repeat: Infinity },
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Wand2 className="w-5 h-5 text-white" />
                    </motion.div>
                  </motion.div>
                  <div className="px-6 py-4 rounded-3xl bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-surface-light/50 dark:border-surface-dark/50 shadow-xl">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader className="w-5 h-5 text-primary dark:text-primary-dark" />
                      </motion.div>
                      <motion.span 
                        className="text-text-primary-light dark:text-text-primary-dark font-medium"
                        key={typingEffect}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {typingEffect || "Generating your design..."}
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div 
        className="flex-shrink-0 p-6 bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl border-t border-surface-light/50 dark:border-surface-dark/50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <motion.textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your dream design... ✨"
              className="w-full p-6 pr-16 rounded-3xl bg-bg-light/50 dark:bg-bg-dark/50 backdrop-blur-sm border-2 border-surface-light dark:border-surface-dark focus:border-primary dark:focus:border-primary-dark focus:outline-none resize-none text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark font-medium shadow-xl transition-all duration-300"
              rows={1}
              style={{ minHeight: '60px', maxHeight: '120px' }}
              whileFocus={{ scale: 1.02 }}
            />
            <div className="absolute right-4 bottom-4">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </motion.div>
            </div>
          </div>
          
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isGenerating}
            className="p-4 bg-gradient-to-r from-primary to-accent text-white rounded-3xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(26, 115, 232, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #1A73E8, #7C3AED)',
              backgroundSize: '200% 200%',
              animation: !inputMessage.trim() ? 'none' : 'gradient-shift 2s ease infinite'
            }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 hover:opacity-100 transition-opacity duration-300"
            />
            
            <motion.div
              className="relative z-10"
              animate={isGenerating ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
            >
              {isGenerating ? (
                <Loader className="w-6 h-6" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </motion.div>
            
            {/* Sparkle effects */}
            {!isGenerating && inputMessage.trim() && [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${25 + i * 20}%`,
                  top: `${25 + (i % 2) * 50}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;