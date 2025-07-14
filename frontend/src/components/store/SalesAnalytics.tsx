import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
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
      label: 'Net Sales',
      value: formatIndianCurrency(2847650),
      change: 8.4,
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up',
      target: formatIndianCurrency(2900000)
    },
    {
      label: 'Bills',
      value: '1,089',
      change: 5.2,
      icon: <ShoppingCart className="h-5 w-5" />,
      trend: 'up',
      target: '1,150'
    },
    {
      label: 'Footfall',
      value: '1,847',
      change: 3.8,
      icon: <Users className="h-5 w-5" />,
      trend: 'up',
      target: '1,900'
    },
    {
      label: 'Avg Bill Value',
      value: formatIndianCurrency(2615),
      change: 2.9,
      icon: <Package className="h-5 w-5" />,
      trend: 'up',
      target: formatIndianCurrency(2700)
    }
  ];

  // Category sales data
  const categorySales: CategorySales[] = [
    {
      category: 'Food & Grocery',
      sales: 1426780,
      growth: 6.8,
      items: 3247,
      margin: 12.4
    },
    {
      category: 'Electronics & Mobile',
      sales: 687450,
      growth: 11.2,
      items: 234,
      margin: 8.7
    },
    {
      category: 'Fashion & Apparel',
      sales: 289630,
      growth: 4.1,
      items: 789,
      margin: 22.8
    },
    {
      category: 'Home & Living',
      sales: 234890,
      growth: -2.3,
      items: 456,
      margin: 15.6
    },
    {
      category: 'Personal Care',
      sales: 208900,
      growth: 7.9,
      items: 1247,
      margin: 28.4
    }
  ];

  // Hourly sales data
  const hourlySales: HourlySales[] = [
    { hour: '9 AM', sales: 124780, transactions: 89 },
    { hour: '10 AM', sales: 167890, transactions: 124 },
    { hour: '11 AM', sales: 198450, transactions: 156 },
    { hour: '12 PM', sales: 234670, transactions: 189 },
    { hour: '1 PM', sales: 278940, transactions: 234 },
    { hour: '2 PM', sales: 298760, transactions: 256 },
    { hour: '3 PM', sales: 267890, transactions: 212 },
    { hour: '4 PM', sales: 245670, transactions: 198 },
    { hour: '5 PM', sales: 234890, transactions: 178 },
    { hour: '6 PM', sales: 289450, transactions: 203 },
    { hour: '7 PM', sales: 267340, transactions: 187 },
    { hour: '8 PM', sales: 189760, transactions: 134 }
  ];

  // Top products
  const topProducts = [
    { name: 'Tata Tea Gold 1kg', sales: formatIndianCurrency(67840), units: 178, category: 'Food & Grocery' },
    { name: 'Samsung Galaxy A54', sales: formatIndianCurrency(156900), units: 7, category: 'Electronics & Mobile' },
    { name: 'Fortune Sunflower Oil 5L', sales: formatIndianCurrency(45670), units: 234, category: 'Food & Grocery' },
    { name: 'Peter England Shirt', sales: formatIndianCurrency(38940), units: 26, category: 'Fashion & Apparel' },
    { name: 'Lakme Foundation', sales: formatIndianCurrency(28750), units: 89, category: 'Personal Care' }
  ];

  // Peak hours analysis
  const peakHours = [
    { time: '1:00 PM - 3:00 PM', sales: formatIndianCurrency(577700), percentage: 20.3 },
    { time: '6:00 PM - 8:00 PM', sales: formatIndianCurrency(557100), percentage: 19.6 },
    { time: '11:00 AM - 1:00 PM', sales: formatIndianCurrency(513610), percentage: 18.0 },
    { time: '3:00 PM - 5:00 PM', sales: formatIndianCurrency(480560), percentage: 16.9 }
  ];

  const maxSales = Math.max(...hourlySales.map(h => h.sales));

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navigation role="store" currentPage="analytics" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sales Analytics</h1>
              <p className="text-slate-600">Monitor sales performance and trends</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">MTD</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
        {/* Sales Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {salesMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    index === 0 ? 'bg-emerald-100 text-emerald-600' :
                    index === 1 ? 'bg-blue-100 text-blue-600' :
                    index === 2 ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  metric.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              {metric.target && (
                <div className="mt-2 text-sm text-gray-500">Target: {metric.target}</div>
              )}
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Hourly Performance */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Hourly Performance</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    Sales Volume
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
                    Transactions
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {hourlySales.map((hour, index) => {
                  const salesPercentage = (hour.sales / maxSales) * 100;
                  const maxTransactions = Math.max(...hourlySales.map(h => h.transactions));
                  const transactionPercentage = (hour.transactions / maxTransactions) * 100;
                  
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span className="font-medium">{hour.hour}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-900 font-semibold">{formatIndianCurrency(hour.sales)}</span>
                          <span className="text-gray-500">{hour.transactions} bills</span>
                        </div>
                      </div>
                      <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${Math.max(salesPercentage, 2)}%` }}
                        />
                        <div 
                          className="absolute inset-y-0 left-0 bg-gray-300 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${Math.max(transactionPercentage, 1)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{formatIndianCurrency(hourlySales.reduce((sum, h) => sum + h.sales, 0))}</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{hourlySales.reduce((sum, h) => sum + h.transactions, 0)}</div>
                  <div className="text-sm text-gray-600">Total Bills</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{formatIndianCurrency(hourlySales.reduce((sum, h) => sum + h.sales, 0) / hourlySales.reduce((sum, h) => sum + h.transactions, 0))}</div>
                  <div className="text-sm text-gray-600">Avg Bill Value</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Category Mix</h3>
            </div>
            <div className="p-6 space-y-4">
              {categorySales.map((category, index) => {
                const maxCategorySales = Math.max(...categorySales.map(c => c.sales));
                const percentage = (category.sales / maxCategorySales) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium text-slate-800 text-sm">{category.category}</div>
                        <div className="text-xs text-slate-500">{category.items} items • {category.margin}% margin</div>
                      </div>
                      <div className="text-right space-y-0.5">
                        <div className="font-semibold text-slate-800">{formatIndianCurrency(category.sales)}</div>
                        <div className={`text-xs font-medium ${
                          category.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {category.growth >= 0 ? '+' : ''}{category.growth}%
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                          index === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                          index === 2 ? 'bg-gradient-to-r from-purple-400 to-purple-500' :
                          index === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                          'bg-gradient-to-r from-pink-400 to-pink-500'
                        }`}
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section - Products & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products - Modern Card List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">Best Sellers</h3>
            </div>
            <div className="p-6 space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/50 to-transparent rounded-xl hover:from-slate-100/50 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                      index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                      'bg-gradient-to-br from-slate-300 to-slate-400'
                    }`}>
                      #{index + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-800">{product.name}</div>
                      <div className="text-sm text-slate-500">{product.category} • {product.units} units</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">{product.sales}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours & Insights */}
          <div className="space-y-6">
            {/* Peak Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800">Peak Performance</h3>
              </div>
              <div className="p-6 space-y-4">
                {peakHours.map((hour, index) => {
                  const maxPeakSales = Math.max(...peakHours.map(h => parseFloat(h.sales.replace(/[₹,]/g, ''))));
                  const currentSales = parseFloat(hour.sales.replace(/[₹,]/g, ''));
                  const percentage = (currentSales / maxPeakSales) * 100;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-slate-800">{hour.time}</div>
                        <div className="text-right space-y-0.5">
                          <div className="font-semibold text-slate-800">{hour.sales}</div>
                          <div className="text-sm text-slate-500">{hour.percentage}% of total</div>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Today's Insights</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Peak hour:</span> 1-3 PM with ₹5.77L sales (20.3% of daily total)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Top category:</span> Food & Grocery leading with 50.1% share
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Growth trend:</span> +8.4% vs yesterday, on track for monthly target
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
