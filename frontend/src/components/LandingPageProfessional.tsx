import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

interface ExecutiveProfile {
  name: string;
  role: string;
  background: string;
  experience: string;
}

interface ClientTestimonial {
  executiveName: string;
  title: string;
  company: string;
  content: string;
  industryContext: string;
}

const LandingPageProfessional: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const capabilities: CapabilityHighlight[] = [
    {
      title: 'Demand Intelligence Platform',
      description: 'Advanced forecasting algorithms process over 15 billion data points daily, incorporating external factors like weather patterns, economic indicators, and social media sentiment to predict demand fluctuations across 4,700+ store locations.',
      metric: '98.4%',
      metricLabel: 'Forecast Accuracy',
      keyFeatures: [
        'Real-time demand sensing across all channels',
        'Seasonal pattern recognition with 18-month horizon',
        'Event-based demand modeling (holidays, promotions, weather)',
        'Category-specific algorithms for different product types'
      ]
    },
    {
      title: 'Supply Network Optimization',
      description: 'Dynamic network modeling continuously optimizes inventory placement across distribution centers, stores, and fulfillment centers, reducing total supply chain costs while maintaining service levels.',
      metric: '$847M',
      metricLabel: 'Annual Cost Reduction',
      keyFeatures: [
        'Multi-echelon inventory optimization',
        'DC-to-store replenishment optimization',
        'Cross-docking efficiency improvements',
        'Vendor-managed inventory integration'
      ]
    },
    {
      title: 'Transportation Command Center',
      description: 'Integrated logistics management platform coordinates over 6,000 daily shipments, optimizing routes, consolidating loads, and managing carrier performance across our private fleet and 400+ carrier partners.',
      metric: '99.2%',
      metricLabel: 'On-Time Delivery',
      keyFeatures: [
        'Real-time route optimization and re-routing',
        'Load consolidation and cube utilization',
        'Private fleet vs. carrier cost optimization',
        'Carrier performance scorecards and benchmarking'
      ]
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      company: 'Regional Grocery Chain',
      industry: 'Food & Beverage Retail',
      challenge: 'Managing inventory across 240 stores with highly perishable products, experiencing 18% waste rates and frequent stockouts during peak seasons.',
      solution: 'Implemented demand intelligence platform with perishable-specific algorithms and automated replenishment systems.',
      results: [
        'Reduced food waste by 67% ($12M annual savings)',
        'Improved fresh product availability by 34%',
        'Decreased manual ordering time by 78%',
        'Optimized markdown timing, saving $3.2M annually'
      ],
      implementation: '8-week phased rollout with pilot stores, full network deployment in 6 months'
    },
    {
      company: 'Mid-Atlantic Distribution Company',
      industry: 'Third-Party Logistics',
      challenge: 'Coordinating shipments across 47 distribution centers with inconsistent carrier performance and rising transportation costs.',
      solution: 'Deployed transportation command center with carrier optimization and automated load planning.',
      results: [
        'Cut transportation costs by 23% ($18M annually)',
        'Improved on-time delivery from 84% to 97%',
        'Reduced empty miles by 31%',
        'Increased cube utilization by 28%'
      ],
      implementation: '12-week integration with existing WMS and TMS systems'
    }
  ];

  const executiveTeam: ExecutiveProfile[] = [
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      background: 'Former VP of Supply Chain Technology at Amazon, led development of demand forecasting systems',
      experience: '15+ years in supply chain technology, PhD in Operations Research from MIT'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Supply Chain Solutions',
      background: 'Previously Chief Supply Chain Officer at Target, managed $45B in annual procurement',
      experience: '20+ years in retail operations, MBA from Wharton'
    },
    {
      name: 'Jennifer Liu',
      role: 'Director of Analytics',
      background: 'Former Principal Data Scientist at UPS, specialized in logistics optimization',
      experience: '12+ years in supply chain analytics, MS in Industrial Engineering from Stanford'
    }
  ];

  const testimonials: ClientTestimonial[] = [
    {
      executiveName: 'David Martinez',
      title: 'Chief Operating Officer',
      company: 'Northeast Food Distribution',
      content: 'The demand intelligence platform transformed our forecasting accuracy from 72% to 96%. During last year\'s hurricane season, we were able to pre-position inventory based on weather predictions, maintaining 99% product availability while our competitors faced significant shortages. The ROI was evident within 4 months of implementation.',
      industryContext: 'Food distribution serving 1,200+ restaurants and grocery stores'
    },
    {
      executiveName: 'Lisa Thompson',
      title: 'VP of Logistics',
      company: 'Regional Retail Group',
      content: 'Our transportation costs dropped by $4.2M in the first year alone. The system\'s ability to dynamically optimize routes and consolidate shipments while maintaining service levels is remarkable. We\'ve gone from managing logistics reactively to having predictive insights that let us stay ahead of potential issues.',
      industryContext: '340 stores across 12 states with complex distribution requirements'
    },
    {
      executiveName: 'Robert Kim',
      title: 'Director of Supply Chain',
      company: 'Healthcare Supply Partners',
      content: 'In healthcare, stockouts can be life-threatening. The platform\'s predictive analytics helped us maintain 99.8% fill rates for critical medical supplies during COVID-19, while reducing excess inventory by 28%. The supplier performance monitoring has been invaluable for maintaining our quality standards.',
      industryContext: 'Medical supply distribution to 450+ hospitals and clinics'
    }
  ];

  const performanceMetrics = [
    { value: '$2.1B', label: 'Annual Cost Savings Delivered', description: 'Across all client implementations' },
    { value: '150+', label: 'Distribution Centers', description: 'Currently optimized by our platform' },
    { value: '4,700+', label: 'Store Locations', description: 'Receiving demand intelligence insights' },
    { value: '99.2%', label: 'Average Uptime', description: 'Enterprise-grade reliability' }
  ];

  const implementationPhases = [
    {
      phase: 'Discovery & Assessment',
      duration: '2-4 weeks',
      description: 'Comprehensive analysis of current supply chain processes, data quality assessment, and identification of optimization opportunities.',
      deliverables: ['Current state assessment', 'ROI projections', 'Implementation roadmap', 'Success metrics definition']
    },
    {
      phase: 'Data Integration & Setup',
      duration: '4-6 weeks',
      description: 'Secure connection to existing ERP, WMS, and TMS systems with automated data validation and cleansing processes.',
      deliverables: ['System integrations', 'Data validation protocols', 'Security implementation', 'User access provisioning']
    },
    {
      phase: 'Model Training & Validation',
      duration: '6-8 weeks',
      description: 'Custom machine learning models trained on historical data with rigorous validation against known outcomes.',
      deliverables: ['Trained forecasting models', 'Performance validation', 'Accuracy benchmarking', 'Model documentation']
    },
    {
      phase: 'Pilot Deployment',
      duration: '4-6 weeks',
      description: 'Controlled rollout to select locations or product categories with continuous monitoring and optimization.',
      deliverables: ['Pilot implementation', 'Performance monitoring', 'User training', 'Process refinement']
    },
    {
      phase: 'Full Production & Optimization',
      duration: '8-12 weeks',
      description: 'Enterprise-wide deployment with ongoing optimization based on real-world performance and business feedback.',
      deliverables: ['Full deployment', 'Continuous optimization', 'Performance reporting', 'Ongoing support']
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex flex-col justify-center">
                  <span className="text-4xl font-bold text-blue-900 leading-none">
                    Walmart
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                    OptiChain Suite
                  </span>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#capabilities" className="text-gray-700 hover:text-blue-900 font-medium">
                Capabilities
              </a>
              <a href="#case-studies" className="text-gray-700 hover:text-blue-900 font-medium">
                Case Studies
              </a>
              <a href="#implementation" className="text-gray-700 hover:text-blue-900 font-medium">
                Implementation
              </a>
              <a href="#contact" className="bg-blue-900 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800">
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
                  Quantum Intelligence
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
                <button 
                  className="bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  Schedule Demo
                </button>
                <button className="border border-blue-900 text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors">
                  Download Case Study
                </button>
              </motion.div>
              
              {/* Trust Indicators */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-600 mb-4">Trusted by leading enterprises:</p>
                <div className="flex flex-wrap gap-8 items-center opacity-60">
                  <span className="text-lg font-semibold">Fortune 500 Retailers</span>
                  <span className="text-lg font-semibold">3PL Providers</span>
                  <span className="text-lg font-semibold">Healthcare Networks</span>
                  <span className="text-lg font-semibold">Food Distributors</span>
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
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">98.4%</div>
                    <div className="text-sm text-gray-600">Forecast Accuracy</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">$847M</div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">99.2%</div>
                    <div className="text-sm text-gray-600">On-Time Delivery</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-900">4,700+</div>
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
                <div className="text-4xl font-bold text-blue-900 mb-2">
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
      <section id="capabilities" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Enterprise Supply Chain Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed for large-scale operations, delivering measurable improvements across your entire supply chain network.
            </p>
          </div>
          
          <div className="space-y-16">
            {capabilities.map((capability, index) => (
              <motion.div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-blue-900 text-white inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {capability.metricLabel}: {capability.metric}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {capability.description}
                  </p>
                  <div className="space-y-3">
                    {capability.keyFeatures.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="bg-white rounded-lg shadow-lg p-8 border">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Performance Impact
                        </h4>
                        <span className="text-2xl font-bold text-blue-900">
                          {capability.metric}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-900 h-2 rounded-full transition-all duration-1000"
                          style={{ width: index === 0 ? '98%' : index === 1 ? '85%' : '99%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Implementation Time</span>
                        <span className="font-semibold text-gray-900">
                          {index === 0 ? '12-16 weeks' : index === 1 ? '8-12 weeks' : '6-10 weeks'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">ROI Timeline</span>
                        <span className="font-semibold text-gray-900">
                          {index === 0 ? '4-6 months' : index === 1 ? '3-5 months' : '2-4 months'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Typical Savings</span>
                        <span className="font-semibold text-green-900">
                          {index === 0 ? '$15-25M annually' : index === 1 ? '$8-15M annually' : '$5-12M annually'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {study.company}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {study.industry}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-700 text-sm">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-700 text-sm">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="text-sm text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Implementation: </span>
                        <span className="ml-2">{study.implementation}</span>
                      </div>
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
          
          <div className="relative">
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-8 lg:p-12 border"
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <div className="text-4xl text-blue-900 mb-4">"</div>
                <blockquote className="text-xl lg:text-2xl text-gray-900 font-medium leading-relaxed mb-8">
                  {testimonials[currentTestimonial].content}
                </blockquote>
                
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {testimonials[currentTestimonial].executiveName}
                  </div>
                  <div className="text-blue-900 font-semibold mb-2">
                    {testimonials[currentTestimonial].title}
                  </div>
                  <div className="text-gray-600 mb-4">
                    {testimonials[currentTestimonial].company}
                  </div>
                  <div className="text-sm text-gray-500 italic">
                    {testimonials[currentTestimonial].industryContext}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-900' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section id="implementation" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured approach ensuring successful deployment and measurable results within 6 months.
            </p>
          </div>
          
          <div className="space-y-8">
            {implementationPhases.map((phase, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {phase.phase}
                        </h3>
                        <div className="text-sm text-blue-900 font-semibold">
                          {phase.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/4">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                  
                  <div className="lg:w-1/4">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Deliverables</h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable, deliverableIndex) => (
                        <li key={deliverableIndex} className="text-sm text-gray-700 flex items-start">
                          <span className="text-blue-900 mr-2">•</span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry veterans with proven track records in supply chain transformation at scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveTeam.map((executive, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 border text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="text-2xl font-bold text-blue-900">
                    {executive.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {executive.name}
                </h3>
                <div className="text-blue-900 font-semibold mb-4">
                  {executive.role}
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {executive.background}
                </p>
                <div className="text-xs text-gray-500 italic">
                  {executive.experience}
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
              Join Fortune 500 companies that have achieved measurable results with our quantum supply chain intelligence platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
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
              <div className="flex flex-col mb-4">
                <div className="text-2xl font-bold mb-1">Walmart</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">OptiChain Suite</div>
              </div>
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
                <li>Implementation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <div>Enterprise Sales: 1-800-WALMART</div>
                <div>support@walmart-quantum.com</div>
                <div>Bentonville, AR | New York, NY</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Walmart Inc. All rights reserved. Quantum Supply Chain Suite is a trademark of Walmart Inc.</p>
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
                  className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-800 transition-colors"
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

export default LandingPageProfessional;
