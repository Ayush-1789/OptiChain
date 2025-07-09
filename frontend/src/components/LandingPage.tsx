import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay: number;
}

interface TimelineStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

const LandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const features: FeatureCard[] = [
    {
      icon: '📦',
      title: 'Inventory Simulator',
      description: 'AI-powered inventory optimization with predictive analytics',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: '🔄',
      title: 'Returns Radar',
      description: 'Smart returns prediction and processing automation',
      color: 'from-green-500 to-teal-500',
      delay: 0.2
    },
    {
      icon: '🕸️',
      title: 'Supply Mesh',
      description: 'Intelligent supplier network optimization',
      color: 'from-purple-500 to-pink-500',
      delay: 0.3
    },
    {
      icon: '🧬',
      title: 'Demand DNA',
      description: 'Advanced demand forecasting with machine learning',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.4
    },
    {
      icon: '🎯',
      title: 'Smart Drop Sync',
      description: 'Cross-dock optimization for maximum efficiency',
      color: 'from-red-500 to-pink-500',
      delay: 0.5
    },
    {
      icon: '🤖',
      title: 'DropBot',
      description: 'Automated dispatch and route optimization',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.6
    },
    {
      icon: '⚡',
      title: 'LoadSwap',
      description: 'Dynamic load balancing and resource allocation',
      color: 'from-cyan-500 to-blue-500',
      delay: 0.7
    }
  ];

  const timelineSteps: TimelineStep[] = [
    {
      step: '01',
      title: 'Data Integration',
      description: 'Connect all your supply chain data sources in real-time',
      icon: '🔗'
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our quantum algorithms analyze patterns and predict outcomes',
      icon: '🧠'
    },
    {
      step: '03',
      title: 'Smart Optimization',
      description: 'Automated optimization recommendations across all modules',
      icon: '⚙️'
    },
    {
      step: '04',
      title: 'Real-time Execution',
      description: 'Deploy optimizations with one-click automated execution',
      icon: '🚀'
    }
  ];

  const WarehouseSVG = () => (
    <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="50"
        y="150"
        width="300"
        height="120"
        fill="url(#warehouseGradient)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.rect
        x="80"
        y="120"
        width="60"
        height="30"
        fill="#06b6d4"
        initial={{ y: 200 }}
        animate={{ y: 120 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.rect
        x="160"
        y="110"
        width="80"
        height="40"
        fill="#10b981"
        initial={{ y: 200 }}
        animate={{ y: 110 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.rect
        x="260"
        y="130"
        width="70"
        height="20"
        fill="#f59e0b"
        initial={{ y: 200 }}
        animate={{ y: 130 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.circle
        cx="200"
        cy="80"
        r="15"
        fill="#6366f1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="floating-element"
      />
      <defs>
        <linearGradient id="warehouseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#004c91" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-dark via-walmart-blue to-quantum-purple overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-full opacity-20">
            <WarehouseSVG />
          </div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            Walmart{' '}
            <span className="gradient-text">Quantum</span>
            <br />
            Supply Chain Suite
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Revolutionary AI-powered supply chain optimization platform that transforms 
            how Walmart manages inventory, logistics, and supplier relationships.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-walmart-yellow text-walmart-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:bg-yellow-400 transition-all duration-300"
            >
              Request Demo 🚀
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Watch Overview 📹
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Seven <span className="gradient-text">AI Modules</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each module powered by cutting-edge AI algorithms designed to optimize specific aspects of your supply chain
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                  scale: 1.02 
                }}
                className="glass-card p-6 rounded-2xl cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-300">
              Four simple steps to transform your supply chain
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-quantum-purple to-quantum-cyan"></div>
            
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-4">{step.icon}</div>
                      <div>
                        <div className="text-sm text-quantum-cyan font-mono">STEP {step.step}</div>
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-quantum-cyan rounded-full border-4 border-walmart-dark"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your{' '}
              <span className="gradient-text">Supply Chain?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses already using our AI-powered platform to optimize their operations
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(255,194,32,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-walmart-yellow text-walmart-dark px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:bg-yellow-400 transition-all duration-300"
            >
              Get Started Today 🎯
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Demo Request Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8 rounded-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-4">Request Demo</h3>
              <p className="text-gray-300 mb-6">
                Get a personalized demo of our Quantum Supply Chain Suite
              </p>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                />
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quantum-cyan"
                />
                <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-quantum-cyan">
                  <option value="">Select your role</option>
                  <option value="admin">Supply Chain Manager</option>
                  <option value="logistics">Logistics Coordinator</option>
                  <option value="inventory">Inventory Analyst</option>
                  <option value="procurement">Procurement Specialist</option>
                </select>
              </div>
              
              <div className="flex gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 rounded-xl bg-walmart-yellow text-walmart-dark font-semibold hover:bg-yellow-400 transition-all duration-300"
                >
                  Request Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
