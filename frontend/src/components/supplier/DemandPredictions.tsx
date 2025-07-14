import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';

interface PredictionData {
  product: string;
  category: string;
  currentStock: number;
  predictedDemand: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  seasonality: 'high' | 'medium' | 'low';
  recommendedAction: string;
  timeframe: string;
  regions: string[];
}

interface MarketInsight {
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  category: string;
  urgency: 'high' | 'medium' | 'low';
}

const DemandPredictions: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('confidence');

  const predictions: PredictionData[] = [
    {
      product: 'Organic Fuji Apples',
      category: 'Fresh Produce',
      currentStock: 1250,
      predictedDemand: 1850,
      confidence: 92,
      trend: 'increasing',
      seasonality: 'medium',
      recommendedAction: 'Increase production by 35% for next 2 weeks',
      timeframe: 'Next 7 days',
      regions: ['Mumbai', 'Delhi', 'Pune']
    },
    {
      product: 'Baby Spinach 250g',
      category: 'Leafy Greens',
      currentStock: 890,
      predictedDemand: 675,
      confidence: 88,
      trend: 'stable',
      seasonality: 'low',
      recommendedAction: 'Maintain current production levels',
      timeframe: 'Next 7 days',
      regions: ['Bangalore', 'Chennai', 'Hyderabad']
    },
    {
      product: 'Organic Carrots 1kg',
      category: 'Root Vegetables',
      currentStock: 720,
      predictedDemand: 980,
      confidence: 85,
      trend: 'increasing',
      seasonality: 'high',
      recommendedAction: 'Increase production by 25% due to festival season',
      timeframe: 'Next 14 days',
      regions: ['Delhi', 'Gurugram', 'Noida']
    },
    {
      product: 'Spring Mix 250g',
      category: 'Salad Mix',
      currentStock: 540,
      predictedDemand: 420,
      confidence: 79,
      trend: 'decreasing',
      seasonality: 'medium',
      recommendedAction: 'Reduce production by 15% to optimize inventory',
      timeframe: 'Next 7 days',
      regions: ['Mumbai', 'Thane', 'Nashik']
    },
    {
      product: 'Cherry Tomatoes 400g',
      category: 'Tomatoes',
      currentStock: 1100,
      predictedDemand: 1450,
      confidence: 91,
      trend: 'increasing',
      seasonality: 'high',
      recommendedAction: 'Increase production by 30% for wedding season',
      timeframe: 'Next 10 days',
      regions: ['Bangalore', 'Mysore', 'Coimbatore']
    },
    {
      product: 'English Cucumbers',
      category: 'Cucumbers',
      currentStock: 680,
      predictedDemand: 520,
      confidence: 73,
      trend: 'stable',
      seasonality: 'low',
      recommendedAction: 'Maintain current levels, monitor closely',
      timeframe: 'Next 7 days',
      regions: ['Hyderabad', 'Visakhapatnam', 'Vijayawada']
    }
  ];

  const marketInsights: MarketInsight[] = [
    {
      title: 'Festival Season Demand Surge',
      description: 'Navratri and Diwali approaching in next 4 weeks. Expected 40% increase in fresh produce demand across North India.',
      impact: 'positive',
      category: 'Seasonal',
      urgency: 'high'
    },
    {
      title: 'Monsoon Impact on Leafy Greens',
      description: 'Heavy rainfall in Maharashtra may reduce supply chain efficiency. Plan for alternative sourcing routes.',
      impact: 'negative',
      category: 'Weather',
      urgency: 'medium'
    },
    {
      title: 'Health Trend: Organic Produce',
      description: 'Consumer preference shifting towards organic products. 25% increase in organic sales in metro cities.',
      impact: 'positive',
      category: 'Consumer Behavior',
      urgency: 'low'
    },
    {
      title: 'Inflation Impact on Root Vegetables',
      description: 'Rising fuel costs may impact transportation. Consider regional sourcing to reduce costs.',
      impact: 'negative',
      category: 'Economic',
      urgency: 'medium'
    }
  ];

  const filteredPredictions = predictions.filter(pred => 
    selectedCategory === 'all' || pred.category === selectedCategory
  );

  const sortedPredictions = [...filteredPredictions].sort((a, b) => {
    switch (sortBy) {
      case 'confidence':
        return b.confidence - a.confidence;
      case 'demand':
        return b.predictedDemand - a.predictedDemand;
      case 'stock':
        return b.currentStock - a.currentStock;
      default:
        return 0;
    }
  });

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-600 bg-green-50';
      case 'decreasing': return 'text-red-600 bg-red-50';
      case 'stable': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getInsightImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'border-l-green-500 bg-green-50';
      case 'negative': return 'border-l-red-500 bg-red-50';
      case 'neutral': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const categories = ['all', ...Array.from(new Set(predictions.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navigation role="supplier" currentPage="predictions" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Demand Predictions</h1>
          <p className="text-slate-600">AI-powered demand forecasting to optimize your production planning and inventory management.</p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex space-x-1">
            {['7d', '14d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeframe(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTimeframe === period
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="confidence">Sort by Confidence</option>
            <option value="demand">Sort by Predicted Demand</option>
            <option value="stock">Sort by Current Stock</option>
          </select>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Predictions List */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Demand Forecasts</h2>
                <p className="text-sm text-slate-600 mt-1">Based on historical data, market trends, and seasonal patterns</p>
              </div>
              <div className="divide-y divide-slate-200">
                {sortedPredictions.map((prediction, index) => (
                  <motion.div 
                    key={prediction.product}
                    className="p-6 hover:bg-slate-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{prediction.product}</h3>
                        <p className="text-sm text-slate-600">{prediction.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(prediction.trend)}`}>
                          {prediction.trend.charAt(0).toUpperCase() + prediction.trend.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}% confidence
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Current Stock</p>
                        <p className="text-2xl font-bold text-slate-900">{prediction.currentStock.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Predicted Demand</p>
                        <p className="text-2xl font-bold text-blue-600">{prediction.predictedDemand.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-slate-600 font-medium mb-2">Recommended Action</p>
                      <p className="text-sm text-slate-900 bg-blue-50 p-3 rounded-md">{prediction.recommendedAction}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 font-medium">Timeframe</p>
                        <p className="text-slate-900">{prediction.timeframe}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-medium">Key Regions</p>
                        <p className="text-slate-900">{prediction.regions.join(', ')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Market Insights */}
          <div className="space-y-6">
            <motion.div 
              className="bg-white rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Market Insights</h2>
                <p className="text-sm text-slate-600 mt-1">Key factors affecting demand</p>
              </div>
              <div className="p-6 space-y-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className={`border-l-4 p-4 rounded-r-lg ${getInsightImpactColor(insight.impact)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(insight.urgency)}`}>
                        {insight.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{insight.description}</p>
                    <p className="text-xs text-slate-600 font-medium">{insight.category}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Export Report</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Schedule Alert</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <Link 
                  to="/supplier/inventory" 
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Adjust Inventory</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandPredictions;
