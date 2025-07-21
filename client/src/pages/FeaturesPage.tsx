import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Figma, 
  Sparkles, 
  Zap, 
  Palette, 
  Code, 
  Users, 
  Clock, 
  Shield,
  RefreshCw,
  Download,
  Globe
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Natural Language Processing',
      description: 'Describe your design ideas in plain English. Our AI understands context, design patterns, and user intentions.',
      benefits: ['Context-aware interpretation', 'Design pattern recognition', 'Intelligent suggestions']
    },
    {
      icon: <Figma className="h-8 w-8" />,
      title: 'Seamless Figma Integration',
      description: 'Export directly to Figma with layers, components, and design systems properly organized.',
      benefits: ['One-click export', 'Organized layer structure', 'Design system compatibility']
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI-Powered Design Intelligence',
      description: 'Advanced AI that understands design principles, accessibility, and modern UI/UX best practices.',
      benefits: ['Accessibility compliance', 'Modern design trends', 'Cross-platform optimization']
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning-Fast Generation',
      description: 'Generate complete prototypes in seconds, not hours. Perfect for rapid iteration and MVP development.',
      benefits: ['Sub-second generation', 'Instant previews', 'Real-time modifications']
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'Smart Color & Typography',
      description: 'Automatically selects harmonious color palettes and typography that matches your brand and context.',
      benefits: ['Brand-aware styling', 'Color accessibility', 'Typography scaling']
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Code Generation Ready',
      description: 'Generated designs are optimized for easy conversion to production-ready code.',
      benefits: ['Clean component structure', 'Semantic HTML', 'CSS best practices']
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Share designs instantly with team members and gather feedback in real-time.',
      benefits: ['Real-time sharing', 'Comment system', 'Version control']
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: 'Iterative Refinement',
      description: 'Continuously improve designs through conversational feedback and AI learning.',
      benefits: ['Conversational edits', 'Learning from feedback', 'Progressive enhancement']
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Multi-Platform Support',
      description: 'Generate designs optimized for web, mobile, tablet, and desktop platforms.',
      benefits: ['Responsive layouts', 'Platform-specific patterns', 'Cross-device consistency']
    }
  ];

  const workflows = [
    {
      step: 1,
      title: 'Describe Your Vision',
      description: 'Simply tell our AI what you want to create using natural language.',
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      step: 2,
      title: 'AI Generates Design',
      description: 'Our advanced AI creates a complete prototype with proper UX flows.',
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      step: 3,
      title: 'Refine & Iterate',
      description: 'Chat with AI to make adjustments and improvements in real-time.',
      icon: <RefreshCw className="h-6 w-6" />
    },
    {
      step: 4,
      title: 'Export to Figma',
      description: 'One-click export to Figma with organized layers and components.',
      icon: <Download className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Modern Design
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how our AI-powered platform revolutionizes the design process with 
              cutting-edge features that make professional design accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-cyan-400 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our streamlined workflow takes you from idea to prototype in minutes
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {workflows.map((workflow, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
                    {workflow.icon}
                  </div>
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {workflow.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {workflow.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {workflow.description}
                  </p>
                </div>
                {index < workflows.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Performance That Speaks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See the impact of AI-powered design automation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { number: '99%', label: 'Faster Than Traditional Design', icon: <Clock className="h-8 w-8" /> },
              { number: '95%', label: 'Design Accuracy Rate', icon: <Shield className="h-8 w-8" /> },
              { number: '10k+', label: 'Prototypes Generated', icon: <Sparkles className="h-8 w-8" /> },
              { number: '50+', label: 'UI Component Types', icon: <Palette className="h-8 w-8" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;