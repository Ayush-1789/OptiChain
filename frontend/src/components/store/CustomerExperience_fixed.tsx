import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Star, 
  MessageSquare, 
  ShoppingCart,
  Clock,
  ThumbsUp,
  AlertTriangle,
  BarChart3,
  Eye,
  Filter
} from 'lucide-react';

// Helper function for Indian currency formatting
const formatIndianCurrency = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

interface CustomerFeedback {
  id: string;
  customer: string;
  rating: number;
  category: string;
  feedback: string;
  timestamp: string;
  status: 'new' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
}

interface CustomerMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const CustomerExperience: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Customer metrics data
  const customerMetrics: CustomerMetric[] = [
    {
      label: 'Daily Footfall',
      value: '2,847',
      change: 12.5,
      icon: <Users className="h-6 w-6" />,
      trend: 'up'
    },
    {
      label: 'Avg. Rating',
      value: '4.3',
      change: 0.2,
      icon: <Star className="h-6 w-6" />,
      trend: 'up'
    },
    {
      label: 'Customer Satisfaction',
      value: '87%',
      change: -3.2,
      icon: <ThumbsUp className="h-6 w-6" />,
      trend: 'down'
    },
    {
      label: 'Avg. Wait Time',
      value: '3.2 min',
      change: -15.8,
      icon: <Clock className="h-6 w-6" />,
      trend: 'up'
    }
  ];

  // Recent feedback data
  const recentFeedback: CustomerFeedback[] = [
    {
      id: '1',
      customer: 'Priya Sharma',
      rating: 5,
      category: 'Service Quality',
      feedback: 'Excellent service at the electronics section. Staff was very helpful in finding the right smartphone.',
      timestamp: '2 hours ago',
      status: 'new',
      priority: 'medium'
    },
    {
      id: '2',
      customer: 'Rajesh Kumar',
      rating: 2,
      category: 'Queue Management',
      feedback: 'Very long wait times at checkout. Need more billing counters during peak hours.',
      timestamp: '4 hours ago',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: '3',
      customer: 'Anita Patel',
      rating: 4,
      category: 'Product Availability',
      feedback: 'Good variety of products, but some items were out of stock in groceries section.',
      timestamp: '6 hours ago',
      status: 'resolved',
      priority: 'medium'
    },
    {
      id: '4',
      customer: 'Vikram Singh',
      rating: 5,
      category: 'Store Cleanliness',
      feedback: 'Store is very clean and well-organized. Easy to find products.',
      timestamp: '8 hours ago',
      status: 'new',
      priority: 'low'
    },
    {
      id: '5',
      customer: 'Meera Gupta',
      rating: 3,
      category: 'Staff Behavior',
      feedback: 'Staff at customer service was okay, but could be more proactive in helping.',
      timestamp: '1 day ago',
      status: 'in-progress',
      priority: 'medium'
    }
  ];

  // Customer journey data
  const customerJourney = [
    { stage: 'Entry', visitors: 2847, conversion: 100 },
    { stage: 'Browse', visitors: 2654, conversion: 93.2 },
    { stage: 'Add to Cart', visitors: 1789, conversion: 62.8 },
    { stage: 'Checkout Queue', visitors: 1456, conversion: 51.1 },
    { stage: 'Purchase', visitors: 1389, conversion: 48.8 },
    { stage: 'Exit', visitors: 1389, conversion: 48.8 }
  ];

  // Category-wise satisfaction
  const categorySatisfaction = [
    { category: 'Groceries', rating: 4.5, reviews: 345 },
    { category: 'Electronics', rating: 4.2, reviews: 186 },
    { category: 'Clothing', rating: 4.0, reviews: 124 },
    { category: 'Home & Garden', rating: 4.3, reviews: 98 },
    { category: 'Health & Beauty', rating: 4.4, reviews: 156 }
  ];

  const filteredFeedback = selectedCategory === 'all' 
    ? recentFeedback 
    : recentFeedback.filter(feedback => feedback.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/store/dashboard" className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Customer Experience</h1>
                <p className="text-slate-600">Monitor customer satisfaction and feedback</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {customerMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {metric.icon}
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Customer Journey */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Customer Journey</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {customerJourney.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">{stage.visitors.toLocaleString()}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${stage.conversion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12">{stage.conversion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Satisfaction */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Category Satisfaction</h2>
              <Star className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {categorySatisfaction.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{category.category}</div>
                    <div className="text-sm text-gray-500">{category.reviews} reviews</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(Math.floor(category.rating))}
                    </div>
                    <span className="font-medium text-gray-900">{category.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Feedback */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Customer Feedback</h2>
              <div className="flex items-center gap-4">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Service Quality">Service Quality</option>
                  <option value="Queue Management">Queue Management</option>
                  <option value="Product Availability">Product Availability</option>
                  <option value="Store Cleanliness">Store Cleanliness</option>
                  <option value="Staff Behavior">Staff Behavior</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {feedback.customer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{feedback.customer}</div>
                        <div className="flex items-center gap-2">
                          {renderStars(feedback.rating)}
                          <span className="text-sm text-gray-500">({feedback.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(feedback.priority)}`}>
                        {feedback.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(feedback.status)}`}>
                        {feedback.status}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-2">
                      {feedback.category}
                    </span>
                    <p className="text-gray-700">{feedback.feedback}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{feedback.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Reply</button>
                      <button className="text-gray-600 hover:text-gray-800 font-medium">Mark as Resolved</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerExperience;
