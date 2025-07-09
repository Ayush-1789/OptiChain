import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Eye
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

interface SalesMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  target?: string;
}

interface CategorySales {
  category: string;
  sales: number;
  growth: number;
  items: number;
  margin: number;
}

interface HourlySales {
  hour: string;
  sales: number;
  transactions: number;
}

const SalesAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sales metrics
  const salesMetrics: SalesMetric[] = [
    {
      label: 'Total Revenue',
      value: formatIndianCurrency(2850000),
      change: 15.2,
      icon: <DollarSign className="h-6 w-6" />,
      trend: 'up',
      target: formatIndianCurrency(3000000)
    },
    {
      label: 'Transactions',
      value: '1,247',
      change: 8.7,
      icon: <ShoppingCart className="h-6 w-6" />,
      trend: 'up',
      target: '1,300'
    },
    {
      label: 'Customers',
      value: '2,134',
      change: 12.3,
      icon: <Users className="h-6 w-6" />,
      trend: 'up',
      target: '2,200'
    },
    {
      label: 'Items Sold',
      value: '4,892',
      change: -3.2,
      icon: <Package className="h-6 w-6" />,
      trend: 'down',
      target: '5,000'
    }
  ];

  // Category sales data
  const categorySales: CategorySales[] = [
    {
      category: 'Groceries',
      sales: 1250000,
      growth: 12.5,
      items: 2186,
      margin: 18.2
    },
    {
      category: 'Electronics',
      sales: 890000,
      growth: 23.1,
      items: 189,
      margin: 22.5
    },
    {
      category: 'Clothing',
      sales: 456000,
      growth: 8.7,
      items: 267,
      margin: 35.8
    },
    {
      category: 'Home & Garden',
      sales: 234000,
      growth: -5.2,
      items: 156,
      margin: 28.1
    },
    {
      category: 'Health & Beauty',
      sales: 198000,
      growth: 15.6,
      items: 298,
      margin: 42.3
    }
  ];

  // Hourly sales data
  const hourlySales: HourlySales[] = [
    { hour: '8 AM', sales: 45000, transactions: 23 },
    { hour: '9 AM', sales: 78000, transactions: 45 },
    { hour: '10 AM', sales: 156000, transactions: 89 },
    { hour: '11 AM', sales: 234000, transactions: 134 },
    { hour: '12 PM', sales: 398000, transactions: 267 },
    { hour: '1 PM', sales: 434000, transactions: 298 },
    { hour: '2 PM', sales: 367000, transactions: 234 },
    { hour: '3 PM', sales: 298000, transactions: 189 },
    { hour: '4 PM', sales: 234000, transactions: 156 },
    { hour: '5 PM', sales: 189000, transactions: 134 },
    { hour: '6 PM', sales: 267000, transactions: 167 },
    { hour: '7 PM', sales: 189000, transactions: 145 }
  ];

  // Top products
  const topProducts = [
    { name: 'iPhone 15', sales: formatIndianCurrency(234000), units: 12, category: 'Electronics' },
    { name: 'Basmati Rice 5kg', sales: formatIndianCurrency(89000), units: 456, category: 'Groceries' },
    { name: 'Samsung 55" TV', sales: formatIndianCurrency(156000), units: 8, category: 'Electronics' },
    { name: 'Levis Jeans', sales: formatIndianCurrency(67000), units: 23, category: 'Clothing' },
    { name: 'Himalaya Face Wash', sales: formatIndianCurrency(34000), units: 189, category: 'Health & Beauty' }
  ];

  // Peak hours analysis
  const peakHours = [
    { time: '12:00 PM - 2:00 PM', sales: formatIndianCurrency(832000), percentage: 29.2 },
    { time: '10:00 AM - 12:00 PM', sales: formatIndianCurrency(532000), percentage: 18.7 },
    { time: '6:00 PM - 8:00 PM', sales: formatIndianCurrency(456000), percentage: 16.0 },
    { time: '8:00 AM - 10:00 AM', sales: formatIndianCurrency(245000), percentage: 8.6 }
  ];

  const maxSales = Math.max(...hourlySales.map(h => h.sales));

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
                <h1 className="text-3xl font-bold text-slate-900">Sales Analytics</h1>
                <p className="text-slate-600">Track sales performance and revenue insights</p>
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
                <option value="quarter">This Quarter</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
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
          {salesMetrics.map((metric, index) => (
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
              {metric.target && (
                <p className="text-xs text-gray-500 mt-1">Target: {metric.target}</p>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Hourly Sales Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Hourly Performance</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-72 relative">
              {/* Chart Container */}
              <div className="h-full flex items-end justify-between space-x-1 px-2">
                {hourlySales.map((hour, index) => {
                  const heightPercentage = (hour.sales / maxSales) * 100;
                  const isHighPerformance = hour.sales > maxSales * 0.7;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group">
                      <div className="relative flex-1 w-full max-w-10 flex items-end">
                        {/* Background bar */}
                        <div className="absolute bottom-0 w-full bg-gray-100 rounded-t-lg" style={{ height: '100%' }}></div>
                        
                        {/* Data bar */}
                        <motion.div
                          className={`relative w-full rounded-t-lg transition-all duration-500 ease-out cursor-pointer ${
                            isHighPerformance 
                              ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 hover:from-emerald-700 hover:to-emerald-500' 
                              : 'bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500'
                          }`}
                          style={{ 
                            height: `${heightPercentage}%`,
                            minHeight: '4px'
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {/* Hover tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            <div className="font-semibold">{hour.hour}</div>
                            <div>Sales: {formatIndianCurrency(hour.sales)}</div>
                            <div>Transactions: {hour.transactions}</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Labels */}
                      <div className="mt-3 text-center">
                        <div className="text-xs font-medium text-gray-700 mb-1">{hour.hour}</div>
                        <div className="text-xs text-gray-500">{hour.transactions}tx</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Chart footer with insights */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Peak: {formatIndianCurrency(maxSales)}</span>
                  <span>•</span>
                  <span>Total: {hourlySales.reduce((sum, h) => sum + h.transactions, 0)} transactions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-sm"></div>
                  <span>High Performance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Category Performance</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-72 space-y-2">
              {categorySales.map((category, index) => {
                const maxCategorySales = Math.max(...categorySales.map(c => c.sales));
                const widthPercentage = (category.sales / maxCategorySales) * 100;
                const isTopPerformer = category.sales > maxCategorySales * 0.7;
                
                return (
                  <motion.div 
                    key={index} 
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">{category.category}</h4>
                          <div className={`flex items-center text-sm font-medium ml-2 ${
                            category.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {category.growth >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(category.growth)}%
                          </div>
                        </div>
                        
                        {/* Performance bar */}
                        <div className="relative mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isTopPerformer 
                                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                                  : 'bg-gradient-to-r from-blue-500 to-blue-400'
                              }`}
                              style={{ width: `${widthPercentage}%` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${widthPercentage}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                          {isTopPerformer && (
                            <div className="absolute -top-1 right-0 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-900">{formatIndianCurrency(category.sales)}</span>
                          <div className="flex items-center space-x-3 text-gray-500">
                            <span>{category.items} items</span>
                            <span>•</span>
                            <span className="font-medium">{category.margin}% margin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover details */}
                    <div className="absolute left-0 top-full mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
                      <div className="font-semibold mb-1">{category.category} Details</div>
                      <div>Revenue: {formatIndianCurrency(category.sales)}</div>
                      <div>Items Sold: {category.items}</div>
                      <div>Profit Margin: {category.margin}%</div>
                      <div>Growth: {category.growth >= 0 ? '+' : ''}{category.growth}%</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Footer insights */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-sm"></div>
                  <span>Top Performer</span>
                </div>
                <span>Total Categories: {categorySales.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Products</h2>
              <Eye className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{product.sales}</div>
                    <div className="text-sm text-gray-500">{product.units} units</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Peak Hours</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {peakHours.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{hour.time}</div>
                    <div className="text-sm text-gray-500">{hour.percentage}% of daily sales</div>
                  </div>
                  <div className="font-medium text-gray-900">{hour.sales}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
