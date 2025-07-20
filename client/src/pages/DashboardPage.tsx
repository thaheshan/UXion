import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Grid, 
  List, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  MoreVertical,
  Clock,
  Eye,
  Heart,
  Folder
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: string;
  createdAt: Date;
  views: number;
  likes: number;
  isPublic: boolean;
}

const DashboardPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Mobile App',
      description: 'Modern shopping app with clean UI and smooth checkout flow',
      thumbnail: 'https://images.pexels.com/photos/1342460/pexels-photo-1342460.jpeg?w=400&h=300&fit=crop',
      type: 'Mobile App',
      createdAt: new Date('2024-01-15'),
      views: 234,
      likes: 18,
      isPublic: true
    },
    {
      id: '2',
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard with data visualization and user management',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=400&h=300&fit=crop',
      type: 'Web App',
      createdAt: new Date('2024-01-12'),
      views: 187,
      likes: 24,
      isPublic: false
    },
    {
      id: '3',
      title: 'Restaurant Landing Page',
      description: 'Elegant landing page with menu showcase and reservation system',
      thumbnail: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?w=400&h=300&fit=crop',
      type: 'Landing Page',
      createdAt: new Date('2024-01-10'),
      views: 156,
      likes: 31,
      isPublic: true
    },
    {
      id: '4',
      title: 'Fitness App Interface',
      description: 'Workout tracking app with progress monitoring and social features',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop',
      type: 'Mobile App',
      createdAt: new Date('2024-01-08'),
      views: 298,
      likes: 42,
      isPublic: true
    },
    {
      id: '5',
      title: 'Banking App Redesign',
      description: 'Secure and user-friendly banking interface with modern design',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=400&h=300&fit=crop',
      type: 'Mobile App',
      createdAt: new Date('2024-01-05'),
      views: 445,
      likes: 67,
      isPublic: false
    },
    {
      id: '6',
      title: 'Portfolio Website',
      description: 'Creative portfolio with project showcases and contact forms',
      thumbnail: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?w=400&h=300&fit=crop',
      type: 'Website',
      createdAt: new Date('2024-01-03'),
      views: 123,
      likes: 15,
      isPublic: true
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: <Folder className="h-5 w-5" /> },
    { label: 'Total Views', value: projects.reduce((sum, p) => sum + p.views, 0), icon: <Eye className="h-5 w-5" /> },
    { label: 'Total Likes', value: projects.reduce((sum, p) => sum + p.likes, 0), icon: <Heart className="h-5 w-5" /> },
    { label: 'Public Projects', value: projects.filter(p => p.isPublic).length, icon: <Share2 className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage and organize your AI-generated designs
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                } transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                } transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span>New Project</span>
            </motion.button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-xs">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{project.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{project.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.isPublic
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {project.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {project.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{project.type}</span>
                          <span>{project.createdAt.toLocaleDateString()}</span>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{project.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{project.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.isPublic
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        {project.isPublic ? 'Public' : 'Private'}
                      </span>
                      <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or create a new project
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;