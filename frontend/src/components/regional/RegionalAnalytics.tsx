import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download,
  Filter,
  Calendar,
  DollarSign,
  Users,
  Store,
  Package,
  Target,
  Zap
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

interface RegionalPerformance {
  region: string;
  revenue: number;
  growth: number;
  stores: number;
  customers: number;
  efficiency: number;
  marketShare: number;
}

interface CategoryAnalysis {
  category: string;
  revenue: number;
  growth: number;
  regionShare: number;
  topRegion: string;
}

const RegionalAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Regional performance data
  const regionalPerformance: RegionalPerformance[] = [
    {
      region: 'Mumbai',
      revenue: 45600000,
      growth: 12.5,
      stores: 18,
      customers: 234000,
      efficiency: 89,
      marketShare: 24.5
    },
    {
      region: 'Delhi NCR',
      revenue: 52300000,
      growth: 15.2,
      stores: 22,
      customers: 267000,
      efficiency: 92,
      marketShare: 28.1
    },
    {
      region: 'Bangalore',
      revenue: 38900000,
      growth: 8.7,
      stores: 15,
      customers: 198000,
      efficiency: 85,
      marketShare: 20.9
    },
    {
      region: 'Hyderabad',
      revenue: 31200000,
      growth: 11.3,
      stores: 12,
      customers: 164000,
      efficiency: 87,
      marketShare: 16.8
    },
    {
      region: 'Chennai',
      revenue: 24500000,
      growth: 6.8,
      stores: 9,
      customers: 128000,
      efficiency: 83,
      marketShare: 13.2
    }
  ];

  // Category analysis
  const categoryAnalysis: CategoryAnalysis[] = [
    {
      category: 'Food & Grocery',
      revenue: 98500000,
      growth: 9.2,
      regionShare: 52.4,
      topRegion: 'Delhi NCR'
    },
    {
      category: 'Electronics',
      revenue: 45200000,
      growth: 14.8,
      regionShare: 24.1,
      topRegion: 'Mumbai'
    },
    {
      category: 'Fashion',
      revenue: 28900000,
      growth: 7.3,
      regionShare: 15.4,
      topRegion: 'Bangalore'
    },
    {
      category: 'Home & Living',
      revenue: 15400000,
      growth: 11.6,
      regionShare: 8.2,
      topRegion: 'Hyderabad'
    }
  ];

  const totalRevenue = regionalPerformance.reduce((sum, region) => sum + region.revenue, 0);
  const totalStores = regionalPerformance.reduce((sum, region) => sum + region.stores, 0);
  const totalCustomers = regionalPerformance.reduce((sum, region) => sum + region.customers, 0);
  const avgGrowth = regionalPerformance.reduce((sum, region) => sum + region.growth, 0) / regionalPerformance.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="bg-blue-900 text-white px-3 py-1 rounded-lg font-bold">
                  W
                </div>
                <span className="text-sm text-slate-600 ml-2">OptiChain Regional Portal</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/regional/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                Dashboard
              </Link>
              <Link to="/regional/analytics" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                Analytics
              </Link>
              <Link to="/regional/network" className="text-slate-700 hover:text-blue-900 font-medium">
                Store Network
              </Link>
              <Link to="/regional/operations" className="text-slate-700 hover:text-blue-900 font-medium">
                Operations
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-slate-500 hover:text-slate-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">RM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Regional Analytics</h1>
              <p className="text-gray-600 mt-1">Performance insights across all regions</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Regions</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi NCR</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                <TrendingUp className="h-4 w-4" />
                {avgGrowth.toFixed(1)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatIndianCurrency(totalRevenue)}</h3>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                <Target className="h-4 w-4" />
                Active
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalStores}</h3>
            <p className="text-gray-600 text-sm">Total Stores</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                <TrendingUp className="h-4 w-4" />
                8.2%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{(totalCustomers / 1000).toFixed(0)}K</h3>
            <p className="text-gray-600 text-sm">Total Customers</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                <TrendingUp className="h-4 w-4" />
                3.1%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">87.2%</h3>
            <p className="text-gray-600 text-sm">Avg Efficiency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Regional Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Regional Performance</h2>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="revenue">Revenue</option>
                    <option value="growth">Growth</option>
                    <option value="efficiency">Efficiency</option>
                    <option value="marketShare">Market Share</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {regionalPerformance.map((region, index) => {
                  const maxValue = Math.max(...regionalPerformance.map(r => 
                    selectedMetric === 'revenue' ? r.revenue : 
                    selectedMetric === 'growth' ? r.growth :
                    selectedMetric === 'efficiency' ? r.efficiency : r.marketShare
                  ));
                  const currentValue = selectedMetric === 'revenue' ? region.revenue : 
                    selectedMetric === 'growth' ? region.growth :
                    selectedMetric === 'efficiency' ? region.efficiency : region.marketShare;
                  const percentage = (currentValue / maxValue) * 100;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{region.region}</span>
                          <span className="text-sm text-gray-500">{region.stores} stores</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {selectedMetric === 'revenue' ? formatIndianCurrency(currentValue) : 
                             selectedMetric === 'growth' ? `${currentValue}%` :
                             selectedMetric === 'efficiency' ? `${currentValue}%` : `${currentValue}%`}
                          </div>
                          <div className={`text-xs font-medium ${
                            region.growth >= 10 ? 'text-green-600' : 
                            region.growth >= 5 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {region.growth >= 0 ? '+' : ''}{region.growth}% growth
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                            index === 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                            index === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                            index === 3 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                            'bg-gradient-to-r from-pink-500 to-pink-600'
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

          {/* Category Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <PieChart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Category Analysis</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {categoryAnalysis.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-emerald-500' :
                          index === 2 ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <span className="font-medium text-gray-900">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{formatIndianCurrency(category.revenue)}</div>
                        <div className={`text-xs font-medium ${
                          category.growth >= 10 ? 'text-green-600' : 
                          category.growth >= 5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {category.growth >= 0 ? '+' : ''}{category.growth}%
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Region Share: </span>
                        <span className="font-medium">{category.regionShare}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Top Region: </span>
                        <span className="font-medium">{category.topRegion}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Delhi NCR</span> leads in revenue with ₹52.3Cr and highest growth at 15.2%
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Food & Grocery</span> dominates with 52.4% of total revenue across regions
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Electronics</span> shows strongest growth at 14.8% led by Mumbai region
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700">
                <span className="font-semibold">Chennai</span> has growth opportunity with 6.8% growth, lowest among regions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalAnalytics;
