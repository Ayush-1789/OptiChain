import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';

interface PerformanceMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  target?: number;
}

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
}

interface ProductPerformance {
  product: string;
  category: string;
  revenue: number;
  volume: number;
  growth: number;
  margin: number;
  trend: 'up' | 'down' | 'stable';
}

interface RegionalData {
  region: string;
  revenue: number;
  orders: number;
  growth: number;
  marketShare: number;
}

interface QualityMetric {
  metric: string;
  score: number;
  target: number;
  trend: 'improving' | 'declining' | 'stable';
  incidents: number;
}

const SupplierAnalytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m');
  const [selectedView, setSelectedView] = useState('overview');

  // Helper function to format Indian currency
  const formatIndianCurrency = (amount: number): string => {
    if (amount >= 10000000) { // 1 crore
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) { // 1 lakh
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else if (amount >= 1000) { // 1 thousand
      return `₹${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const performanceMetrics: PerformanceMetric[] = [
    { label: 'Total Revenue', value: 2.84, unit: 'Cr', change: 15.3, changeType: 'positive', target: 3.0 },
    { label: 'Fill Rate', value: 97.8, unit: '%', change: 2.1, changeType: 'positive', target: 98 },
    { label: 'On-Time Delivery', value: 94.2, unit: '%', change: -1.3, changeType: 'negative', target: 96 },
    { label: 'Customer Satisfaction', value: 4.7, unit: '/5', change: 0.2, changeType: 'positive', target: 4.8 },
    { label: 'Order Volume', value: 1847, unit: 'orders', change: 23.1, changeType: 'positive' },
    { label: 'Avg Order Value', value: 154000, unit: '₹', change: 8.7, changeType: 'positive' }
  ];

  const salesData: SalesData[] = [
    { month: 'Jan', revenue: 2.1, orders: 145, avgOrderValue: 14500 },
    { month: 'Feb', revenue: 2.3, orders: 158, avgOrderValue: 14600 },
    { month: 'Mar', revenue: 2.8, orders: 167, avgOrderValue: 16800 },
    { month: 'Apr', revenue: 2.4, orders: 152, avgOrderValue: 15800 },
    { month: 'May', revenue: 2.9, orders: 178, avgOrderValue: 16300 },
    { month: 'Jun', revenue: 3.1, orders: 189, avgOrderValue: 16400 },
    { month: 'Jul', revenue: 2.8, orders: 165, avgOrderValue: 17000 },
    { month: 'Aug', revenue: 3.2, orders: 195, avgOrderValue: 16400 },
    { month: 'Sep', revenue: 2.7, orders: 158, avgOrderValue: 17100 },
    { month: 'Oct', revenue: 2.9, orders: 172, avgOrderValue: 16900 },
    { month: 'Nov', revenue: 3.4, orders: 203, avgOrderValue: 16700 },
    { month: 'Dec', revenue: 2.8, orders: 162, avgOrderValue: 17300 }
  ];

  const productPerformance: ProductPerformance[] = [
    { product: 'Organic Fuji Apples', category: 'Fresh Produce', revenue: 4.2, volume: 2340, growth: 18.5, margin: 22.3, trend: 'up' },
    { product: 'Cherry Tomatoes 400g', category: 'Tomatoes', revenue: 3.8, volume: 4470, growth: 24.1, margin: 28.7, trend: 'up' },
    { product: 'Baby Spinach 250g', category: 'Leafy Greens', revenue: 2.1, volume: 4667, growth: -3.2, margin: 19.8, trend: 'down' },
    { product: 'Organic Carrots 1kg', category: 'Root Vegetables', revenue: 2.8, volume: 4308, growth: 12.4, margin: 25.1, trend: 'up' },
    { product: 'English Cucumbers', category: 'Cucumbers', revenue: 1.9, volume: 7600, growth: 2.1, margin: 15.6, trend: 'stable' },
    { product: 'Spring Mix 250g', category: 'Salad Mix', revenue: 1.7, volume: 3091, growth: 8.9, margin: 21.4, trend: 'up' }
  ];

  const regionalData: RegionalData[] = [
    { region: 'Mumbai Metropolitan', revenue: 8.4, orders: 467, growth: 19.2, marketShare: 29.6 },
    { region: 'Delhi NCR', revenue: 7.1, orders: 389, growth: 15.8, marketShare: 25.0 },
    { region: 'Bangalore Urban', revenue: 5.9, orders: 321, growth: 22.4, marketShare: 20.8 },
    { region: 'Hyderabad Metro', revenue: 4.2, orders: 245, growth: 17.6, marketShare: 14.8 },
    { region: 'Chennai Metro', revenue: 2.8, orders: 167, growth: 11.3, marketShare: 9.8 }
  ];

  const qualityMetrics: QualityMetric[] = [
    { metric: 'Product Quality Score', score: 96.2, target: 95.0, trend: 'improving', incidents: 3 },
    { metric: 'Packaging Quality', score: 98.1, target: 97.0, trend: 'stable', incidents: 1 },
    { metric: 'Freshness Rating', score: 94.8, target: 96.0, trend: 'declining', incidents: 7 },
    { metric: 'Delivery Condition', score: 97.5, target: 97.0, trend: 'improving', incidents: 2 },
    { metric: 'Documentation Accuracy', score: 99.1, target: 98.0, trend: 'stable', incidents: 1 }
  ];

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
      case 'improving':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        );
      case 'down':
      case 'declining':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        );
      case 'stable':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getQualityColor = (score: number, target: number) => {
    if (score >= target) return 'text-green-600';
    if (score >= target - 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <Navigation role="supplier" currentPage="analytics" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Insights</h1>
          <p className="text-slate-600">Comprehensive performance analysis and business intelligence for your supply chain operations.</p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex space-x-1">
            {['3m', '6m', '12m', '24m'].map((period) => (
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

          <div className="flex space-x-1">
            {['overview', 'sales', 'products', 'quality'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedView === view
                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">{metric.label}</h3>
                <span className={`text-sm font-semibold ${getChangeColor(metric.changeType)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    {metric.unit === 'Cr' ? '₹' : metric.unit === '₹' ? formatIndianCurrency(metric.value) : ''}{metric.unit === 'Cr' ? `${metric.value} Cr` : metric.unit === '₹' ? '' : `${metric.value}${metric.unit}`}
                  </p>
                  {metric.target && (
                    <p className="text-sm text-slate-500 mt-1">
                      Target: {metric.unit === 'Cr' ? '₹' : ''}{metric.target}{metric.unit === 'Cr' ? ' Cr' : metric.unit === '₹' ? '' : metric.unit}
                    </p>
                  )}
                </div>
                {metric.target && (
                  <div className="w-16 h-2 bg-slate-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        metric.value >= metric.target ? 'bg-green-500' : 
                        metric.value >= metric.target * 0.9 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Trend Chart */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg border border-slate-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Revenue Trend (₹ Crores)</h2>
                <div className="text-sm text-slate-600">Last 12 months</div>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="space-y-3">
                {salesData.map((data, index) => (
                  <div key={data.month} className="flex items-center space-x-3">
                    <div className="w-8 text-xs text-slate-600 font-medium">{data.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-4 relative">
                          <motion.div 
                            className="h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          ></motion.div>
                        </div>
                        <div className="w-16 text-right text-sm font-medium text-slate-900">
                          ₹{data.revenue} Cr
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-sm text-slate-600">Total Orders</p>
                  <p className="text-xl font-bold text-slate-900">{salesData.reduce((sum, d) => sum + d.orders, 0).toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600">Avg Monthly Revenue</p>
                  <p className="text-xl font-bold text-slate-900">₹{(salesData.reduce((sum, d) => sum + d.revenue, 0) / salesData.length).toFixed(1)} Cr</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600">Growth Rate</p>
                  <p className="text-xl font-bold text-green-600">+15.3%</p>
                </div>
              </div>
            </motion.div>

            {/* Product Performance */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200 p-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Top Products Performance</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left text-sm font-medium text-slate-600 pb-3">Product</th>
                      <th className="text-right text-sm font-medium text-slate-600 pb-3">Revenue</th>
                      <th className="text-right text-sm font-medium text-slate-600 pb-3">Volume</th>
                      <th className="text-right text-sm font-medium text-slate-600 pb-3">Growth</th>
                      <th className="text-right text-sm font-medium text-slate-600 pb-3">Margin</th>
                      <th className="text-center text-sm font-medium text-slate-600 pb-3">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPerformance.map((product, index) => (
                      <tr key={product.product} className="border-b border-slate-100">
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-slate-900">{product.product}</p>
                            <p className="text-sm text-slate-500">{product.category}</p>
                          </div>
                        </td>
                        <td className="text-right py-4 font-semibold text-slate-900">₹{product.revenue} Cr</td>
                        <td className="text-right py-4 text-slate-600">{product.volume.toLocaleString()}</td>
                        <td className={`text-right py-4 font-semibold ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth >= 0 ? '+' : ''}{product.growth}%
                        </td>
                        <td className="text-right py-4 text-slate-600">{product.margin}%</td>
                        <td className="text-center py-4">
                          {getTrendIcon(product.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Regional Performance */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Regional Performance</h2>
              <div className="space-y-4">
                {regionalData.map((region, index) => (
                  <div key={region.region} className="border border-slate-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{region.region}</h4>
                      <span className="text-sm font-semibold text-green-600">+{region.growth}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Revenue</p>
                        <p className="font-semibold text-slate-900">₹{region.revenue} Cr</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Orders</p>
                        <p className="font-semibold text-slate-900">{region.orders}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Market Share</span>
                        <span>{region.marketShare}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${region.marketShare}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quality Metrics */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Quality Metrics</h2>
              <div className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={metric.metric} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-slate-900 text-sm">{metric.metric}</h4>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className={`font-semibold ${getQualityColor(metric.score, metric.target)}`}>
                          {metric.score}%
                        </span>
                        <span className="text-slate-500">Target: {metric.target}%</span>
                        <span className="text-slate-500">{metric.incidents} incidents</span>
                      </div>
                    </div>
                    <div className="w-16 h-2 bg-slate-200 rounded-full ml-3">
                      <div 
                        className={`h-2 rounded-full ${getQualityColor(metric.score, metric.target).includes('green') ? 'bg-green-500' : getQualityColor(metric.score, metric.target).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min((metric.score / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Download Report</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Schedule Review</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Custom Dashboard</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierAnalytics;
