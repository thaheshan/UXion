import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Bot, Figma, Layers, Palette, Wand2, Rocket, Star } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface HeroProps {
  setCurrentSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const words = ['Prototype', 'Interface', 'Experience', 'Vision', 'Future'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-light via-surface-light/50 to-bg-light dark:from-bg-dark dark:via-surface-dark/50 dark:to-bg-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 animate-gradient-x"></div>
      </div>

      {/* Floating 3D geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <div 
              className={`w-${4 + Math.floor(Math.random() * 8)} h-${4 + Math.floor(Math.random() * 8)} bg-gradient-to-br from-primary/20 to-accent/20 rounded-${Math.random() > 0.5 ? 'full' : 'lg'} backdrop-blur-sm`}
              style={{
                transform: `perspective(1000px) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Interactive cursor follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Particle system */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: y1, opacity }}
      >
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div 
            className="inline-flex items-center space-x-3 bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl px-6 py-3 rounded-full border border-primary/20 shadow-2xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(26, 115, 232, 0.3)" }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(26, 115, 232, 0.2)",
                "0 0 40px rgba(124, 58, 237, 0.3)",
                "0 0 20px rgba(26, 115, 232, 0.2)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark tracking-wider">
              🚀 REVOLUTIONARY AI DESIGN PLATFORM
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Main headline with morphing text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
            <span className="block bg-gradient-to-r from-text-primary-light via-primary to-accent dark:from-text-primary-dark dark:via-primary-dark dark:to-accent-dark bg-clip-text text-transparent">
              From Idea to
            </span>
            <div className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 90 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                  style={{ 
                    backgroundSize: '200% 100%',
                    animation: 'gradient-x 3s ease infinite'
                  }}
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
              
              {/* Glowing underline */}
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <span className="block bg-gradient-to-r from-accent via-primary to-accent dark:from-accent-dark dark:via-primary-dark dark:to-accent-dark bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-3xl text-text-secondary-light dark:text-text-secondary-dark max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Transform your wildest UI/UX ideas into{' '}
            <span className="text-primary dark:text-primary-dark font-bold">stunning, interactive prototypes</span>{' '}
            using the power of conversational AI. Just describe what you want, and watch{' '}
            <span className="text-accent dark:text-accent-dark font-bold">magic happen</span>.
          </motion.p>
        </motion.div>

        {/* CTA Buttons with 3D effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            onClick={() => setCurrentSection('generate')}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-3xl shadow-2xl overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px rgba(26, 115, 232, 0.4)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #1A73E8, #7C3AED, #1A73E8)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite'
            }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                background: [
                  'linear-gradient(45deg, #7C3AED, #1A73E8)',
                  'linear-gradient(45deg, #1A73E8, #7C3AED)',
                  'linear-gradient(45deg, #7C3AED, #1A73E8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Button content */}
            <div className="relative flex items-center space-x-3 z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="w-6 h-6" />
              </motion.div>
              <span>Start Creating Magic</span>
              <motion.div
                className="group-hover:translate-x-2 transition-transform duration-300"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </div>
            
            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 2) * 60}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.button>
          
          <motion.button
            onClick={() => setCurrentSection('gallery')}
            className="group px-10 py-5 bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl text-text-primary-light dark:text-text-primary-dark font-bold text-lg rounded-3xl border-2 border-surface-light dark:border-surface-dark hover:border-primary dark:hover:border-primary-dark transition-all duration-500 shadow-xl"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(26, 115, 232, 0.1)',
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Palette className="w-6 h-6" />
              </motion.div>
              <span>Explore Gallery</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Feature highlights with 3D cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              description: "Generate complete prototypes in under 30 seconds",
              gradient: "from-yellow-400 to-orange-500",
              delay: 0
            },
            {
              icon: <Bot className="w-8 h-8" />,
              title: "AI Conversation",
              description: "Refine designs through natural language chat",
              gradient: "from-blue-400 to-purple-500",
              delay: 0.2
            },
            {
              icon: <Figma className="w-8 h-8" />,
              title: "Figma Ready",
              description: "Export directly to your Figma workspace",
              gradient: "from-green-400 to-blue-500",
              delay: 0.4
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateY: -30 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50,
                boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
              }}
              className="group relative p-8 bg-surface-light/20 dark:bg-surface-dark/20 backdrop-blur-xl rounded-3xl border border-surface-light/30 dark:border-surface-dark/30 hover:border-primary/50 dark:hover:border-primary-dark/50 transition-all duration-500 cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
              />
              
              {/* Icon with 3D effect */}
              <motion.div
                className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl`}
                whileHover={{ 
                  rotateY: 180,
                  scale: 1.1
                }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-white" style={{ transform: 'rotateY(0deg)' }}>
                  {feature.icon}
                </div>
                <div 
                  className="absolute inset-0 flex items-center justify-center text-white"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <Sparkles className="w-8 h-8" />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {feature.description}
              </p>
              
              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100`}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary dark:border-primary-dark rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary dark:bg-primary-dark rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;