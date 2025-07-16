import React, { useState } from 'react';
import { Plus, Folder, Clock, Star, MoreVertical, Eye, Download, Share, Filter, Search, Grid, List, Zap, Palette, Code, Figma } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  createdAt: Date;
  status: 'draft' | 'completed' | 'exported';
  category: string;
  progress: number;
}

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Revolution',
      description: 'Next-gen sustainable fashion marketplace with AR try-on',
      thumbnail: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date('2024-01-15'),
      status: 'completed',
      category: 'E-commerce',
      progress: 100
    },
    {
      id: '2',
      name: 'Fitness AI Companion',
      description: 'AI-powered workout tracking with biometric integration',
      thumbnail: 'https://images.pexels.com/photos/4498288/pexels-photo-4498288.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date('2024-01-14'),
      status: 'draft',
      category: 'Health & Fitness',
      progress: 65
    },
    {
      id: '3',
      name: 'Quantum SaaS Platform',
      description: 'Revolutionary project management with quantum computing',
      thumbnail: 'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date('2024-01-13'),
      status: 'exported',
      category: 'SaaS',
      progress: 100
    },
    {
      id: '4',
      name: 'Crypto Trading Hub',
      description: 'Advanced DeFi platform with real-time analytics',
      thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date('2024-01-12'),
      status: 'completed',
      category: 'Fintech',
      progress: 100
    },
    {
      id: '5',
      name: 'Metaverse Social Hub',
      description: 'Virtual reality social platform with avatar customization',
      thumbnail: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date('2024-01-11'),
      status: 'draft',
      category: 'Social',
      progress: 45
    },
    {
      id: '6',
      name: 'AI Learning Platform',
      description: 'Personalized education with adaptive AI tutoring',
      thumbnail: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date('2024-01-10'),
      status: 'completed',
      category: 'Education',
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-success to-success-dark';
      case 'draft':
        return 'from-accent to-accent-dark';
      case 'exported':
        return 'from-primary to-primary-dark';
      default:
        return 'from-surface-light to-surface-dark';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Zap className="w-4 h-4" />;
      case 'draft':
        return <Palette className="w-4 h-4" />;
      case 'exported':
        return <Figma className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: 'Total Projects', value: '24', icon: <Folder className="w-6 h-6" />, color: 'from-blue-500 to-purple-600' },
    { label: 'This Month', value: '12', icon: <Clock className="w-6 h-6" />, color: 'from-green-500 to-teal-600' },
    { label: 'Completed', value: '18', icon: <Star className="w-6 h-6" />, color: 'from-yellow-500 to-orange-600' },
    { label: 'Exported', value: '15', icon: <Download className="w-6 h-6" />, color: 'from-pink-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-surface-light/30 to-bg-light dark:from-bg-dark dark:via-surface-dark/30 dark:to-bg-dark pt-24 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12"
        >
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-text-primary-light via-primary to-accent dark:from-text-primary-dark dark:via-primary-dark dark:to-accent-dark bg-clip-text text-transparent mb-3"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your Creative Workspace
            </motion.h1>
            <motion.p 
              className="text-xl text-text-secondary-light dark:text-text-secondary-dark"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Manage and organize your AI-generated masterpieces
            </motion.p>
          </div>
          
          <motion.button 
            className="mt-6 lg:mt-0 group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-3xl shadow-2xl overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px rgba(26, 115, 232, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <div className="relative flex items-center space-x-3 z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Plus className="w-6 h-6" />
              </motion.div>
              <span>Create New Project</span>
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
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="relative p-6 bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl rounded-3xl border border-surface-light/50 dark:border-surface-dark/50 overflow-hidden group cursor-pointer"
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-semibold mb-1">
                    {stat.label}
                  </p>
                  <motion.p 
                    className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
            <input
              type="text"
              placeholder="Search your amazing projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-3xl bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl border border-surface-light/50 dark:border-surface-dark/50 focus:border-primary dark:focus:border-primary-dark focus:outline-none text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark font-medium shadow-lg transition-all duration-300"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-4 rounded-3xl bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl border border-surface-light/50 dark:border-surface-dark/50 focus:border-primary dark:focus:border-primary-dark focus:outline-none text-text-primary-light dark:text-text-primary-dark font-medium shadow-lg"
              >
                <option value="all">All Projects</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
                <option value="exported">Exported</option>
              </select>
            </div>
            
            <div className="flex items-center bg-surface-light/30 dark:bg-surface-dark/30 backdrop-blur-xl rounded-3xl border border-surface-light/50 dark:border-surface-dark/50 p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                className={`group bg-surface-light/20 dark:bg-surface-dark/20 backdrop-blur-xl rounded-3xl border border-surface-light/50 dark:border-surface-dark/50 hover:border-primary/50 dark:hover:border-primary-dark/50 overflow-hidden transition-all duration-500 cursor-pointer ${
                  viewMode === 'list' ? 'flex items-center p-6' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'h-64'} overflow-hidden ${viewMode === 'grid' ? 'rounded-t-3xl' : 'rounded-2xl'}`}>
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className={`flex items-center space-x-2 px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} text-white text-xs font-bold rounded-full shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status}</span>
                    </motion.div>
                  </div>
                  
                  {/* Progress bar for drafts */}
                  {project.status === 'draft' && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-full bg-black/30 rounded-full h-2 backdrop-blur-sm">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-accent to-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-white text-xs font-medium mt-1 block">
                        {project.progress}% Complete
                      </span>
                    </div>
                  )}
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/30 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className={`${viewMode === 'list' ? 'flex-1 ml-6' : 'p-6'}`}>
                  <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className={`flex items-center ${viewMode === 'list' ? 'space-x-4' : 'justify-between'}`}>
                      <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
                        {project.createdAt.toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <motion.button 
                          className="p-2 rounded-xl hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        </motion.button>
                        <motion.button 
                          className="p-2 rounded-xl hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        </motion.button>
                        <motion.button 
                          className="p-2 rounded-xl hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Download className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        </motion.button>
                        <motion.button 
                          className="p-2 rounded-xl hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <MoreVertical className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;