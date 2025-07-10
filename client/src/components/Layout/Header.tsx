import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Zap, Bot, Sparkles, Layers, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentSection, 
  setCurrentSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const { darkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'generate', label: 'Generate', icon: <Bot className="w-4 h-4" /> },
    { id: 'workspace', label: 'Workspace', icon: <Layers className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <Palette className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-xl border-b border-surface-light/30 dark:border-surface-dark/30 shadow-2xl shadow-primary/5' 
          : 'bg-transparent'
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-gradient-x opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with 3D effect */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:shadow-accent/50 transition-all duration-500"
                animate={{ 
                  rotateY: [0, 360],
                  boxShadow: [
                    '0 0 20px rgba(26, 115, 232, 0.3)',
                    '0 0 40px rgba(124, 58, 237, 0.5)',
                    '0 0 20px rgba(26, 115, 232, 0.3)'
                  ]
                }}
                transition={{ 
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              
              {/* Floating particles around logo */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent rounded-full"
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 30],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 30],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
            
            <div className="flex flex-col">
              <motion.span 
                className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 100%' }}
              >
                UXion
              </motion.span>
              <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium tracking-wider">
                AI DESIGN REVOLUTION
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation with 3D effects */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`relative px-6 py-3 text-sm font-semibold transition-all duration-500 rounded-2xl group ${
                  currentSection === item.id
                    ? 'text-white'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Active background with morphing effect */}
                {currentSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl shadow-primary/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative flex items-center space-x-2 z-10">
                  <motion.div
                    animate={currentSection === item.id ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span>{item.label}</span>
                </div>
                
                {/* Glowing underline effect */}
                {currentSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-8 h-1 bg-gradient-to-r from-accent to-primary rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{ width: 32, x: '-50%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="relative p-3 rounded-2xl bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-surface-light dark:border-surface-dark hover:border-primary dark:hover:border-primary-dark transition-all duration-300 group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark relative z-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark relative z-10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              className="lg:hidden p-3 rounded-2xl bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-surface-light dark:border-surface-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with stunning animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-xl border-t border-surface-light/30 dark:border-surface-dark/30 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                      : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-light/50 dark:hover:bg-surface-dark/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={currentSection === item.id ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;