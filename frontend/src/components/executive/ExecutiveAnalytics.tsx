import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Building, 
  BarChart3, 
  PieChart, 
  Activity,
  Target,
  DollarSign,
  Users,
  Store,
  Globe,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
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

interface AnalyticsMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  period: string;
  target?: string;
  color: string;
}

interface CategoryPerformance {
  category: string;
  revenue: number;
  growth: number;
  marketShare: number;
  margin: number;
  color: string;
}

interface GeographicData {
  region: string;
  revenue: number;
  stores: number;
  customers: number;
  growth: number;
  penetration: number;
}

const ExecutiveAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Analytics metrics
  const analyticsMetrics: AnalyticsMetric[] = [
    {
      label: 'Total Revenue',
      value: formatIndianCurrency(2850000000),
      change: 18.5,
      trend: 'up',
      period: 'vs last quarter',
      target: formatIndianCurrency(3000000000),
      color: 'bg-blue-500'
    },
    {
      label: 'Gross Margin',
      value: '28.4%',
      change: 2.1,
      trend: 'up',
      period: 'vs last quarter',
      target: '30%',
      color: 'bg-green-500'
    },
    {
      label: 'Customer Acquisition',
      value: '2.8M',
      change: 15.3,
      trend: 'up',
      period: 'new customers',
      target: '3.2M',
      color: 'bg-purple-500'
    },
    {
      label: 'Market Penetration',
      value: '23.8%',
      change: 1.9,
      trend: 'up',
      period: 'market share',
      target: '25%',
      color: 'bg-orange-500'
    },
    {
      label: 'Operational Efficiency',
      value: '92.1%',
      change: 3.4,
      trend: 'up',
      period: 'efficiency score',
      target: '95%',
      color: 'bg-indigo-500'
    },
    {
      label: 'Employee Productivity',
      value: '₹2.8L',
      change: 8.7,
      trend: 'up',
      period: 'revenue per employee',
      target: '₹3L',
      color: 'bg-pink-500'
    }
  ];

  // Category performance
  const categoryPerformances: CategoryPerformance[] = [
    {
      category: 'Groceries & Food',
      revenue: 1140000000,
      growth: 12.3,
      marketShare: 40,
      margin: 22.5,
      color: 'bg-green-500'
    },
    {
      category: 'Electronics',
      revenue: 570000000,
      growth: 28.7,
      marketShare: 20,
      margin: 18.2,
      color: 'bg-blue-500'
    },
    {
      category: 'Fashion & Apparel',
      revenue: 456000000,
      growth: 15.8,
      marketShare: 16,
      margin: 35.8,
      color: 'bg-purple-500'
    },
    {
      category: 'Home & Kitchen',
      revenue: 342000000,
      growth: 9.2,
      marketShare: 12,
      margin: 28.3,
      color: 'bg-orange-500'
    },
    {
      category: 'Health & Personal Care',
      revenue: 228000000,
      growth: 22.1,
      marketShare: 8,
      margin: 31.7,
      color: 'bg-teal-500'
    },
    {
      category: 'Sports & Outdoors',
      revenue: 114000000,
      growth: 18.5,
      marketShare: 4,
      margin: 24.9,
      color: 'bg-red-500'
    }
  ];

  // Geographic data
  const geographicData: GeographicData[] = [
    {
      region: 'Western India',
      revenue: 855000000,
      stores: 86,
      customers: 13500000,
      growth: 16.8,
      penetration: 32.5
    },
    {
      region: 'Northern India',
      revenue: 684000000,
      stores: 75,
      customers: 11200000,
      growth: 14.2,
      penetration: 28.3
    },
    {
      region: 'Southern India',
      revenue: 627000000,
      stores: 68,
      customers: 10800000,
      growth: 19.5,
      penetration: 25.1
    },
    {
      region: 'Eastern India',
      revenue: 456000000,
      stores: 42,
      customers: 7200000,
      growth: 12.8,
      penetration: 18.7
    },
    {
      region: 'Central India',
      revenue: 228000000,
      stores: 16,
      customers: 3100000,
      growth: 28.3,
      penetration: 12.2
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm rounded-lg mb-6">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Building className="h-5 w-5 text-white" />
                </div>
              </Link>
              <nav className="flex space-x-8">
                <Link to="/executive/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                  Dashboard
                </Link>
                <Link to="/executive/analytics" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                  Analytics
                </Link>
                <Link to="/executive/strategy" className="text-slate-700 hover:text-blue-900 font-medium">
                  Strategy
                </Link>
                <Link to="/executive/performance" className="text-slate-700 hover:text-blue-900 font-medium">
                  Performance
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Executive Analytics</h1>
            <p className="text-gray-600 mt-1">Advanced business intelligence and data insights</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Key Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {analyticsMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {getTrendIcon(metric.trend)}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
            <p className="text-gray-500 text-xs">{metric.period}</p>
            {metric.target && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-gray-500 text-xs">Target: {metric.target}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PieChart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Category Performance</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Detailed View
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryPerformances.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`} />
                    <div>
                      <h3 className="font-medium text-gray-900">{category.category}</h3>
                      <p className="text-sm text-gray-500">{category.marketShare}% market share</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatIndianCurrency(category.revenue)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getTrendColor('up')}`}>
                        +{category.growth}%
                      </span>
                      <span className="text-sm text-gray-500">
                        {category.margin}% margin
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Geographic Performance</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Map View
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {geographicData.map((region, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{region.region}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getTrendColor('up')}`}>
                        +{region.growth}%
                      </span>
                      {getTrendIcon('up')}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-semibold text-lg">{formatIndianCurrency(region.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Penetration</p>
                      <p className="font-semibold text-lg">{region.penetration}%</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-6 text-sm text-gray-600">
                    <span>🏪 {region.stores} stores</span>
                    <span>👥 {(region.customers / 1000000).toFixed(1)}M customers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Performance Trends</h2>
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="revenue">Revenue</option>
                <option value="customers">Customers</option>
                <option value="market-share">Market Share</option>
                <option value="efficiency">Efficiency</option>
              </select>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Advanced Analytics
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Interactive chart visualization</p>
              <p className="text-gray-400 text-xs mt-1">
                {selectedMetric === 'revenue' ? 'Revenue trends across quarters' :
                 selectedMetric === 'customers' ? 'Customer acquisition trends' :
                 selectedMetric === 'market-share' ? 'Market share evolution' :
                 'Operational efficiency metrics'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Comparative Analysis</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">vs Competition</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">+5.2%</p>
              <p className="text-sm text-gray-600">Market share lead</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">vs Last Year</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">+18.5%</p>
              <p className="text-sm text-gray-600">Revenue growth</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">vs Industry</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">+12.8%</p>
              <p className="text-sm text-gray-600">Above average</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">vs Target</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-600">Target achievement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveAnalytics;
