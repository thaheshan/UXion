import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket, Star, Sparkles} from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const PricingPlans: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: isAnnual ? 0 : 0,
      period: 'forever',
      description: 'Perfect for exploring the magic of AI design',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-400 to-purple-500',
      gradient: 'from-blue-500/20 to-purple-600/20',
      features: [
        '5 AI-generated prototypes per month',
        'Basic conversation refinement',
        'Standard design templates',
        'PNG/JPG exports',
        'Community support',
        'Basic color palettes',
        'Mobile responsive designs'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: isAnnual ? 24 : 29,
      period: 'month',
      description: 'For serious designers and creative professionals',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-purple-400 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-600/20',
      popular: true,
      features: [
        'Unlimited AI-generated prototypes',
        'Advanced conversation refinement',
        'Premium templates & components',
        'Figma direct export',
        'High-resolution exports (4K)',
        'Priority support',
        'Team collaboration (up to 5 members)',
        'Version history & backups',
        'Custom color schemes',
        'Advanced animations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: isAnnual ? 79 : 99,
      period: 'month',
      description: 'For teams and large organizations',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-pink-400 to-red-500',
      gradient: 'from-pink-500/20 to-red-600/20',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Custom AI training',
        'Advanced integrations (Slack, etc.)',
        'White-label options',
        'Dedicated account manager',
        'Custom design systems',
        'SLA guarantee (99.9% uptime)',
        'Advanced analytics & insights',
        'API access',
        'Custom export formats',
        'Enterprise security'
      ]
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Absolutely! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately and we'll prorate any differences."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied, we'll refund your payment, no questions asked."
    },
    {
      question: "How does Figma integration work?",
      answer: "Simply connect your Figma account through our secure OAuth integration. Your AI-generated designs will be exported directly to your workspace with full layer organization and components."
    },
    {
      question: "Is my data secure?",
      answer: "Security is our top priority. We use enterprise-grade encryption, SOC 2 compliance, and never store your design data longer than necessary. Your intellectual property is always protected."
    },
    {
      question: "What makes UXion different?",
      answer: "UXion is the only platform that combines conversational AI with professional design output. Our neural networks understand design principles and create production-ready prototypes, not just mockups."
    },
    {
      question: "Do you support team collaboration?",
      answer: "Yes! Professional and Enterprise plans include real-time collaboration features, shared workspaces, commenting systems, and team management tools."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-surface-light/30 to-bg-light dark:from-bg-dark dark:via-surface-dark/30 dark:to-bg-dark pt-24 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
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
              <Star className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark tracking-wider">
              💎 TRANSPARENT PRICING
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-text-primary-light via-primary to-accent dark:from-text-primary-dark dark:via-primary-dark dark:to-accent-dark bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose Your Plan
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-text-secondary-light dark:text-text-secondary-dark max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start free and scale as you grow. All plans include our core AI-powered design generation with different limits and features.
          </motion.p>

          {/* Annual/Monthly Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center space-x-4"
          >
            <span className={`text-lg font-semibold ${!isAnnual ? 'text-primary dark:text-primary-dark' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-gradient-to-r from-primary to-accent' : 'bg-surface-light dark:bg-surface-dark'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-lg font-semibold ${isAnnual ? 'text-primary dark:text-primary-dark' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
              Annual
            </span>
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 bg-gradient-to-r from-success to-success-dark text-white text-sm font-bold rounded-full"
              >
                Save 20%
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
                boxShadow: plan.popular 
                  ? "0 30px 60px rgba(124, 58, 237, 0.3)" 
                  : "0 25px 50px rgba(0,0,0,0.15)"
              }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative bg-surface-light/20 dark:bg-surface-dark/20 backdrop-blur-xl rounded-3xl border transition-all duration-500 overflow-hidden ${
                plan.popular
                  ? 'border-primary dark:border-primary-dark shadow-2xl shadow-primary/20 scale-105'
                  : 'border-surface-light/50 dark:border-surface-dark/50 hover:border-primary/50 dark:hover:border-primary-dark/50'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(26, 115, 232, 0.3)",
                        "0 0 30px rgba(124, 58, 237, 0.5)",
                        "0 0 20px rgba(26, 115, 232, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ⭐ MOST POPULAR
                  </motion.div>
                </div>
              )}

              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 transition-opacity duration-500`}
                animate={{ opacity: hoveredPlan === plan.id ? 1 : 0 }}
              />

              <div className="relative p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <motion.div 
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${plan.color} rounded-3xl flex items-center justify-center text-white shadow-2xl`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 360,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {plan.icon}
                  </motion.div>
                  
                  <h3 className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 leading-relaxed">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline justify-center mb-2">
                    <motion.span 
                      className="text-5xl font-black text-text-primary-light dark:text-text-primary-dark"
                      key={`${plan.id}-${isAnnual}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${plan.price}
                    </motion.span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark ml-2 text-lg">
                      /{plan.period}
                    </span>
                  </div>
                  
                  {isAnnual && plan.price > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-success dark:text-success-dark text-sm font-semibold"
                    >
                      Save ${(plan.price * 12 * 0.2).toFixed(0)} per year!
                    </motion.p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + featureIndex * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <motion.div
                        className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-success to-success-dark rounded-full flex items-center justify-center mt-0.5"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-4 rounded-3xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-2xl hover:shadow-3xl'
                      : 'bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark border-2 border-surface-light dark:border-surface-dark hover:border-primary dark:hover:border-primary-dark'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={plan.popular ? {
                    background: 'linear-gradient(45deg, #1A73E8, #7C3AED)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite'
                  } : undefined}
                >
                  {plan.price === 0 ? 'Start Free' : 'Get Started'}
                  
                  {/* Sparkle effects for popular plan */}
                  {plan.popular && [...Array(4)].map((_, i) => (
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
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-text-primary-light dark:text-text-primary-dark mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about UXion
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="p-8 bg-surface-light/20 dark:bg-surface-dark/20 backdrop-blur-xl rounded-3xl border border-surface-light/50 dark:border-surface-dark/50 hover:border-primary/50 dark:hover:border-primary-dark/50 transition-all duration-300 text-left"
              >
                <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center">
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mr-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white font-bold text-sm">?</span>
                  </motion.div>
                  {faq.question}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPlans;