import React, { useState } from 'react';
import { Filter, Search, Eye, Download, Heart, Star, Play, Zap, Palette, Code, Figma, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  likes: number;
  views: number;
  rating: number;
  author: string;
  tags: string[];
  featured?: boolean;
  isVideo?: boolean;
}

const ShowcaseGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Designs', icon: <Layers className="w-4 h-4" /> },
    { id: 'e-commerce', label: 'E-commerce', icon: <Zap className="w-4 h-4" /> },
    { id: 'mobile', label: 'Mobile Apps', icon: <Palette className="w-4 h-4" /> },
    { id: 'saas', label: 'SaaS', icon: <Code className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Star className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Figma className="w-4 h-4" /> }
  ];

  const showcaseItems: ShowcaseItem[] = [
    {
      id: '1',
      title: 'Quantum E-commerce Experience',
      description: 'Revolutionary shopping platform with AI-powered recommendations and AR try-on',
      category: 'e-commerce',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 2847,
      views: 15420,
      rating: 4.9,
      author: 'UXion AI',
      tags: ['shopping', 'ai', 'ar', 'responsive'],
      featured: true
    },
    {
      id: '2',
      title: 'Biometric Fitness Tracker',
      description: 'Advanced health monitoring with real-time biometric analysis and AI coaching',
      category: 'dashboard',
      image: 'https://images.pexels.com/photos/4498288/pexels-photo-4498288.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 1923,
      views: 12856,
      rating: 4.8,
      author: 'UXion AI',
      tags: ['health', 'analytics', 'biometric', 'ai'],
      isVideo: true
    },
    {
      id: '3',
      title: 'Neural SaaS Platform',
      description: 'Next-generation B2B software with neural network-powered automation',
      category: 'saas',
      image: 'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 3156,
      views: 18934,
      rating: 5.0,
      author: 'UXion AI',
      tags: ['b2b', 'automation', 'neural', 'enterprise'],
      featured: true
    },
    {
      id: '4',
      title: 'Quantum Banking Interface',
      description: 'Ultra-secure mobile banking with quantum encryption and biometric authentication',
      category: 'mobile',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 2634,
      views: 14567,
      rating: 4.7,
      author: 'UXion AI',
      tags: ['fintech', 'quantum', 'security', 'mobile']
    },
    {
      id: '5',
      title: 'Holographic Portfolio',
      description: 'Immersive 3D portfolio with holographic projections and spatial interactions',
      category: 'portfolio',
      image: 'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 4289,
      views: 25156,
      rating: 5.0,
      author: 'UXion AI',
      tags: ['3d', 'holographic', 'immersive', 'creative'],
      featured: true,
      isVideo: true
    },
    {
      id: '6',
      title: 'AI Food Delivery Ecosystem',
      description: 'Smart food ordering with AI-powered nutrition analysis and drone delivery tracking',
      category: 'mobile',
      image: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 1876,
      views: 11234,
      rating: 4.6,
      author: 'UXion AI',
      tags: ['food', 'ai', 'delivery', 'nutrition']
    },
    {
      id: '7',
      title: 'Metaverse Social Hub',
      description: 'Virtual reality social platform with avatar customization and spatial audio',
      category: 'mobile',
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 3567,
      views: 19823,
      rating: 4.9,
      author: 'UXion AI',
      tags: ['vr', 'social', 'metaverse', 'avatar'],
      featured: true
    },
    {
      id: '8',
      title: 'Crypto Trading Command Center',
      description: 'Advanced DeFi platform with real-time market analysis and automated trading',
      category: 'dashboard',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 2945,
      views: 16789,
      rating: 4.8,
      author: 'UXion AI',
      tags: ['crypto', 'defi', 'trading', 'analytics'],
      isVideo: true
    }
  ];

  const filteredItems = showcaseItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredItems = filteredItems.filter(item => item.featured);
  const regularItems = filteredItems.filter(item => !item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-surface-light/30 to-bg-light dark:from-bg-dark dark:via-surface-dark/30 dark:to-bg-dark pt-24 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"
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
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center space-x-3 bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl px-6 py-3 rounded-full border border-primary/20 shadow-2xl mb-8"
            whileHover={{ scale: 1.05 }}
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
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Palette className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark tracking-wider">
              🎨 DESIGN SHOWCASE GALLERY
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-5 h-5 text-primary fill-current" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-text-primary-light via-primary to-accent dark:from-text-primary-dark dark:via-primary-dark dark:to-accent-dark bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Design Showcase
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-text-secondary-light dark:text-text-secondary-dark max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover mind-blowing prototypes created by our AI. Get inspired and see what's possible when 
            <span className="text-primary dark:text-primary-dark font-bold"> creativity meets artificial intelligence</span>.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col lg:flex-row gap-6 mb-12"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark" />
            <input
              type="text"
              placeholder="Search incredible designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-3xl bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl border border-surface-light/50 dark:border-surface-dark/50 focus:border-primary dark:focus:border-primary-dark focus:outline-none text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark text-lg font-medium shadow-xl transition-all duration-300"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-3xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-2xl'
                    : 'bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 dark:hover:bg-primary-dark/10 border border-surface-light/50 dark:border-surface-dark/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={selectedCategory === category.id ? { rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                </motion.div>
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <motion.h2 
              className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-8 flex items-center"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-3"
              >
                <Star className="w-8 h-8 text-accent fill-current" />
              </motion.div>
              Featured Masterpieces
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -10,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
                  }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="group relative bg-surface-light/20 dark:bg-surface-dark/20 backdrop-blur-xl rounded-3xl border border-surface-light/50 dark:border-surface-dark/50 hover:border-primary/50 dark:hover:border-primary-dark/50 overflow-hidden transition-all duration-500 cursor-pointer"
                >
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <motion.div
                      className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold rounded-full shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>FEATURED</span>
                    </motion.div>
                  </div>

                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Video indicator */}
                    {item.isVideo && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </motion.div>
                      </motion.div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Overlay Actions */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: hoveredItem === item.id ? 1 : 0.8 }}
                    >
                      <div className="flex space-x-4">
                        <motion.button 
                          className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-6 h-6 text-white" />
                        </motion.button>
                        <motion.button 
                          className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors shadow-lg"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Download className="w-6 h-6 text-white" />
                        </motion.button>
                        <motion.button 
                          className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className="w-6 h-6 text-white" />
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-bold">{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary dark:text-primary-dark text-xs font-semibold rounded-full border border-primary/20"
                          whileHover={{ scale: 1.05 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-text-secondary-light dark:text-text-secondary-dark">
                        <motion.div 
                          className="flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Heart className="w-5 h-5 text-red-500" />
                          <span className="font-semibold">{item.likes.toLocaleString()}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Eye className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold">{item.views.toLocaleString()}</span>
                        </motion.div>
                      </div>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">
                        by {item.author}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {regularItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="group bg-surface-light/20 dark:bg-surface-dark/20 backdrop-blur-xl rounded-3xl border border-surface-light/50 dark:border-surface-dark/50 hover:border-primary/50 dark:hover:border-primary-dark/50 overflow-hidden transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Video indicator */}
                {item.isVideo && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play className="w-6 h-6 text-white ml-1" />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Overlay Actions */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: hoveredItem === item.id ? 1 : 0.8 }}
                >
                  <div className="flex space-x-3">
                    <motion.button 
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </motion.button>
                    <motion.button 
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download className="w-5 h-5 text-white" />
                    </motion.button>
                    <motion.button 
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{item.views}</span>
                    </div>
                  </div>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">
                    by {item.author}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ShowcaseGallery;