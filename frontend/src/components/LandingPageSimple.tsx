import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CapabilityHighlight {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  keyFeatures: string[];
}

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  implementation: string;
}

interface ClientTestimonial {
  executiveName: string;
  title: string;
  company: string;
  content: string;
  industryContext: string;
}

const LandingPageSimple: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const capabilities: CapabilityHighlight[] = [
    {
      title: 'Store Replenishment System',
      description: 'Our automated ordering system manages inventory levels across all Walmart locations, processing sales data from 4,600+ stores to trigger replenishment orders. The system handles everything from groceries to electronics, ensuring shelves stay stocked across India.',
      metric: '94%',
      metricLabel: 'In-Stock Rate',
      keyFeatures: [
        'Automated reorder points by store and SKU',
        'Seasonal adjustment for festival periods',
        'Monsoon-based demand adjustments',
        'Supplier lead time optimization'
      ]
    },
    {
      title: 'Distribution Center Management',
      description: 'Coordinate product flow through 28 regional distribution centers and 85 fulfillment centers. The system optimizes truck loading, manages cross-docking operations, and schedules deliveries to minimize transportation costs across India.',
      metric: '₹8.4B',
      metricLabel: 'Annual Savings',
      keyFeatures: [
        'Truck load optimization and scheduling',
        'Cross-dock timing coordination',
        'Inventory allocation by geography',
        'Supplier delivery window management'
      ]
    },
    {
      title: 'Supplier Integration Hub',
      description: 'Direct connection with 75,000+ suppliers across India through EDI, API, and web portals. Suppliers receive real-time demand signals, submit invoices electronically, and track order status through our integrated platform.',
      metric: '87%',
      metricLabel: 'Electronic Orders',
      keyFeatures: [
        'EDI transaction processing',
        'Supplier performance scorecards',
        'Invoice matching and approval',
        'Festival planning coordination'
      ]
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      company: 'Metro Cash & Carry India',
      industry: 'Wholesale & Retail',
      challenge: 'Managing inventory across 28 wholesale centers with highly perishable products, experiencing 22% waste rates and frequent stockouts during festival seasons.',
      solution: 'Implemented demand intelligence platform with perishable-specific algorithms and automated replenishment systems tailored for Indian market conditions.',
      results: [
        'Reduced food waste by 67% (₹84 Crore annual savings)',
        'Improved fresh product availability by 34%',
        'Decreased manual ordering time by 78%',
        'Optimized markdown timing, saving ₹22 Crore annually'
      ],
      implementation: '8-week phased rollout with pilot stores, full network deployment in 6 months'
    },
    {
      company: 'Blue Dart Express Limited',
      industry: 'Logistics & Supply Chain',
      challenge: 'Coordinating shipments across 47 distribution centers with inconsistent carrier performance and rising transportation costs during monsoon season.',
      solution: 'Deployed transportation command center with carrier optimization and automated load planning considering Indian road conditions and seasonal challenges.',
      results: [
        'Cut transportation costs by 23% (₹126 Crore annually)',
        'Improved on-time delivery from 84% to 97%',
        'Reduced empty kilometers by 31%',
        'Increased truck utilization by 28%'
      ],
      implementation: '12-week integration with existing WMS and TMS systems'
    }
  ];

  const testimonials: ClientTestimonial[] = [
    {
      executiveName: 'Rajesh Sharma',
      title: 'Supplier Operations Manager',
      company: 'Britannia Industries Limited',
      content: 'The supplier portal gives us complete visibility into Walmart\'s demand forecasts for our categories. We can see sales trends for our biscuits and dairy products weeks in advance, allowing us to adjust production schedules and avoid stockouts during Diwali and wedding seasons.',
      industryContext: 'Major food manufacturer supplying packaged goods to 4,600+ Walmart locations across India'
    },
    {
      executiveName: 'Priya Patel',
      title: 'Store Manager',
      company: 'Walmart Supercenter Mumbai #001',
      content: 'The automated replenishment system has transformed how we manage inventory. The system knows our local customers prefer certain tea brands during monsoon season and automatically increases orders for those SKUs. My associates spend less time checking stock levels and more time helping customers.',
      industryContext: 'High-volume supercenter serving Mumbai metropolitan area with complex regional preferences'
    },
    {
      executiveName: 'Amit Kumar',
      title: 'Regional Distribution Manager',
      company: 'Walmart Distribution Center - Gurgaon',
      content: 'The transportation optimization has been a game-changer for our operations. The system coordinates supplier pickups, optimizes truck loading for our 280 stores, and schedules deliveries to minimize fuel costs while maintaining our service commitments. We\'ve reduced transportation costs by 18% this year.',
      industryContext: 'Regional distribution hub serving North India with 52 outbound routes daily'
    }
  ];

  const performanceMetrics = [
    { value: '₹14.7B', label: 'Annual Cost Savings Delivered', description: 'Across all client implementations' },
    { value: '85+', label: 'Distribution Centers', description: 'Currently optimized by our platform' },
    { value: '4,600+', label: 'Store Locations', description: 'Receiving demand intelligence insights' },
    { value: '99.2%', label: 'Average Uptime', description: 'Enterprise-grade reliability' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <div className="flex flex-col justify-center">
                    <span className="text-4xl font-bold text-blue-900 leading-none">
                      Walmart
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                      OptiChain Suite
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#capabilities" className="text-gray-700 hover:text-blue-900 font-medium">
                Capabilities
              </a>
              <a href="#case-studies" className="text-gray-700 hover:text-blue-900 font-medium">
                Case Studies
              </a>
              <Link to="/login" className="text-gray-700 hover:text-blue-900 font-medium">
                Sign In
              </Link>
              <Link to="/register" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors shadow-sm">
                Get Started
              </Link>
              <a href="#contact" className="bg-blue-900 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors shadow-sm">
                Contact Sales
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Transform Your Supply Chain with
                <span className="text-blue-900 block">
                  OptiChain Intelligence
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-700 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Walmart's enterprise-grade supply chain optimization platform delivers measurable results through advanced analytics, machine learning, and real-time intelligence. Trusted by Fortune 500 companies to reduce costs, improve efficiency, and enhance customer satisfaction.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/register"
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-yellow-300 transition-colors shadow-lg text-center"
                >
                  Get Started Free
                </Link>
                <button 
                  className="border border-blue-900 text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  Schedule Demo
                </button>
              </motion.div>
              
              {/* Trust Indicators */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-4">Trusted by leading enterprises:</p>
                <div className="flex flex-wrap gap-8 items-center opacity-60">
                  <span className="text-lg font-semibold">Fortune 500 Retailers</span>
                  <span className="text-lg font-semibold">3PL Providers</span>
                  <span className="text-lg font-semibold">Healthcare Networks</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <motion.div 
                className="bg-white rounded-lg shadow-xl p-8 border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Real-Time Performance Dashboard
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <div className="text-2xl font-bold text-yellow-600">98.4%</div>
                    <div className="text-sm text-gray-600">Forecast Accuracy</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">₹59.2B</div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <div className="text-2xl font-bold text-yellow-600">99.2%</div>
                    <div className="text-sm text-gray-600">On-Time Delivery</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">4,600+</div>
                    <div className="text-sm text-gray-600">Store Locations</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Live data from enterprise implementations
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceMetrics.map((metric, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-yellow-500 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core Platform Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three integrated modules that work seamlessly together to optimize your entire supply chain operation from demand planning to delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {capabilities.map((capability, index) => (
              <motion.div 
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border border-gray-200 rounded-xl p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold border border-yellow-200">
                      {capability.metricLabel}
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {capability.metric}
                    </div>
                  </div>

                  {/* Visual Icon based on capability */}
                  <div className="flex justify-center mb-4">
                    {index === 0 && (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                        </svg>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors text-center">
                    {capability.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-center">
                    {capability.description}
                  </p>
                  
                  {/* Visual representation of key features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide text-center">Key Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {capability.keyFeatures.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm bg-gray-50 p-2 rounded">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {capability.keyFeatures.length > 3 && (
                      <div className="text-center">
                        <div className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800 bg-blue-50 p-2 rounded">
                          + {capability.keyFeatures.length - 3} more features
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* How It Works Section */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our proven 4-stage approach transforms your supply chain operations through data integration, intelligent analysis, and continuous optimization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-yellow-400 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Data Integration</h4>
                <div className="bg-white rounded-lg p-4 shadow-sm border mb-3">
                  <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                    <span>ERP</span>
                    <span>WMS</span>
                    <span>TMS</span>
                    <span>POS</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                    <div className="flex-1 h-2 bg-yellow-300 rounded"></div>
                    <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                    <div className="flex-1 h-2 bg-yellow-300 rounded"></div>
                  </div>
                  <div className="text-center mt-2 text-xs font-medium text-gray-700">Unified Platform</div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Connect all supply chain data sources into a unified platform for comprehensive visibility.
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-yellow-400 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">AI Analysis</h4>
                <div className="bg-white rounded-lg p-4 shadow-sm border mb-3">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <div className="flex-1 h-1 bg-blue-100 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600 ml-2">Pattern Recognition</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <div className="flex-1 h-1 bg-yellow-100 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600 ml-2">Demand Prediction</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <div className="flex-1 h-1 bg-blue-100 rounded-full overflow-hidden">
                        <div className="w-5/6 h-full bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600 ml-2">Optimization</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Advanced ML algorithms analyze patterns and predict demand fluctuations.
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-yellow-400 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Smart Optimization</h4>
                <div className="bg-white rounded-lg p-4 shadow-sm border mb-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <div className="text-blue-600 font-bold">📦</div>
                      <div>Inventory</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded text-center">
                      <div className="text-yellow-600 font-bold">🚛</div>
                      <div>Transport</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <div className="text-blue-600 font-bold">📊</div>
                      <div>Planning</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded text-center">
                      <div className="text-yellow-600 font-bold">🎯</div>
                      <div>Routes</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Intelligent recommendations for inventory and transportation optimization.
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-yellow-400 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Continuous Improvement</h4>
                <div className="bg-white rounded-lg p-4 shadow-sm border mb-3">
                  <div className="relative">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xs font-bold text-blue-600">24/7</div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-600 mt-2">Real-time Monitoring</div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Real-time monitoring ensures continuous adaptation and performance improvement.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real implementations, measurable results, and transformative outcomes across diverse industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {study.company}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {study.industry}
                    </span>
                  </div>

                  {/* Visual Summary Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <h4 className="font-semibold text-red-800 text-sm">Challenge</h4>
                      </div>
                      <p className="text-red-700 text-xs leading-relaxed">{study.challenge}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                        </svg>
                        <h4 className="font-semibold text-blue-800 text-sm">Solution</h4>
                      </div>
                      <p className="text-blue-700 text-xs leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                  
                  {/* Results with Visual Indicators */}
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 mb-4">
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <h4 className="font-semibold text-green-800 text-sm">Results Achieved</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center text-sm bg-white p-2 rounded shadow-sm">
                          <span className="text-green-500 mr-2 font-bold">✓</span>
                          <span className="text-green-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Implementation Timeline */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-medium">Implementation Timeline: </span>
                      <span className="ml-2">{study.implementation}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Direct feedback from supply chain executives who have transformed their operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <blockquote className="text-sm text-gray-900 font-medium leading-relaxed italic">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
                      <span className="text-gray-900 font-bold text-sm">
                        {testimonial.executiveName.split(' ').map(name => name[0]).join('')}
                      </span>
                    </div>
                    <div className="text-base font-bold text-gray-900 mb-1">
                      {testimonial.executiveName}
                    </div>
                    <div className="text-blue-900 font-semibold text-sm mb-1">
                      {testimonial.title}
                    </div>
                    <div className="text-gray-600 mb-2 font-medium text-sm">
                      {testimonial.company}
                    </div>
                    <div className="text-xs text-gray-500 italic bg-gray-50 px-3 py-1 rounded-full">
                      {testimonial.industryContext}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section id="contact" className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join Fortune 500 companies that have achieved measurable results with our OptiChain supply chain intelligence platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
                onClick={() => setShowModal(true)}
              >
                Schedule Executive Demo
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                Download ROI Calculator
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Walmart</div>
              <div className="text-gray-400 mb-4">OptiChain Supply Suite</div>
              <p className="text-gray-400 text-sm">
                Enterprise-grade supply chain optimization delivering measurable results for Fortune 500 companies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Demand Intelligence</li>
                <li>Supply Network Optimization</li>
                <li>Transportation Management</li>
                <li>Inventory Optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Leadership</li>
                <li>Case Studies</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <div>Enterprise Sales: 1-800-WALMART</div>
                <div>support@walmart-optichain.com</div>
                <div>Gurgaon, India | Mumbai, India</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Walmart Inc. All rights reserved. OptiChain Supply Suite is a trademark of Walmart Inc.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg p-8 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Schedule Executive Demo
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with our supply chain experts to discuss your specific requirements and see how our platform can transform your operations.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-yellow-400 text-gray-900 py-2 px-4 rounded-md font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
                >
                  Schedule Demo
                </button>
                <button 
                  type="button"
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPageSimple;
