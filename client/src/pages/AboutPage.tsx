import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  Award, 
  Lightbulb,
  Heart,
  Globe,
  Zap,
  Rocket
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-founder',
      bio: 'Former design lead at top tech companies with 10+ years of experience in AI and UX.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO & Co-founder',
      bio: 'AI researcher and former machine learning engineer at leading tech firms.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Design',
      bio: 'Design systems expert with a passion for making design accessible to everyone.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Product',
      bio: 'Product strategist focused on user experience and AI-human collaboration.',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?w=300&h=300&fit=crop&crop=face'
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and design, constantly exploring new ways to enhance creativity.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Democratizing Design',
      description: 'Making professional design accessible to everyone, regardless of their technical background or resources.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'User-Centric',
      description: 'Every feature we build is designed with our users\' needs and workflows at the center of our thinking.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Impact',
      description: 'Empowering creators worldwide to bring their ideas to life and build better digital experiences.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize design through AI'
    },
    {
      year: '2023',
      title: 'MVP Launch',
      description: 'Released our first AI-powered design generator'
    },
    {
      year: '2024',
      title: 'Figma Integration',
      description: 'Launched seamless Figma plugin and integration'
    },
    {
      year: '2024',
      title: '10K+ Users',
      description: 'Reached our first major user milestone'
    },
    {
      year: '2024',
      title: 'Series A Funding',
      description: 'Secured funding to accelerate growth and innovation'
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
              Revolutionizing Design with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              We believe that great design should be accessible to everyone. Our mission is to democratize 
              the design process through innovative AI technology that understands and amplifies human creativity.
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-cyan-400">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-cyan-400">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Designs Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-cyan-400">99%</div>
                <div className="text-gray-600 dark:text-gray-400">User Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We're on a mission to bridge the gap between imagination and implementation. 
                Traditional design tools require years of training and expertise, creating barriers 
                for entrepreneurs, developers, and creators who have amazing ideas but lack design skills.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our AI-powered platform eliminates these barriers by understanding natural language 
                descriptions and translating them into professional, production-ready designs. 
                We're not replacing designers – we're empowering everyone to be a designer.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Our Goal</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Make professional design accessible to 1 billion creators worldwide
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 lg:mt-0"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl p-8 text-white">
                <Rocket className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Vision 2025</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-3" />
                    Real-time collaborative design with AI
                  </li>
                  <li className="flex items-center">
                    <Globe className="h-5 w-5 mr-3" />
                    Multi-platform code generation
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 mr-3" />
                    Industry-leading design accuracy
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide our work and shape our culture
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate innovators from design, AI, and technology backgrounds
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-cyan-400 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Key milestones in our mission to democratize design
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-cyan-400"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-cyan-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full border-4 border-white dark:border-gray-900"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;