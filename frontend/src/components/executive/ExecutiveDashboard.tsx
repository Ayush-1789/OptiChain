import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Building, 
  DollarSign, 
  Users, 
  Store,
  Globe,
  Target,
  BarChart3,
  Calendar,
  Download,
  AlertCircle,
  CheckCircle,
  MapPin,
  Package,
  Clock,
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

interface ExecutiveMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  target?: string;
  color: string;
}

interface RegionalPerformance {
  id: string;
  name: string;
  revenue: number;
  target: number;
  stores: number;
  customers: number;
  growth: number;
  marketShare: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

interface ExecutiveAlert {
  id: string;
  type: 'market' | 'operational' | 'financial' | 'strategic';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string;
  region?: string;
}

const ExecutiveDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Executive metrics
  const executiveMetrics: ExecutiveMetric[] = [
    {
      label: 'Total Revenue',
      value: formatIndianCurrency(2850000000),
      change: 18.5,
      icon: <DollarSign className="h-6 w-6" />,
      trend: 'up',
      target: formatIndianCurrency(3000000000),
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Market Share',
      value: '23.8%',
      change: 2.3,
      icon: <Target className="h-6 w-6" />,
      trend: 'up',
      target: '25%',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'Total Stores',
      value: '287',
      change: 12.5,
      icon: <Store className="h-6 w-6" />,
      trend: 'up',
      target: '300',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      label: 'Customer Base',
      value: '45.2M',
      change: 15.2,
      icon: <Users className="h-6 w-6" />,
      trend: 'up',
      target: '50M',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      label: 'Regions',
      value: '28',
      change: 7.7,
      icon: <MapPin className="h-6 w-6" />,
      trend: 'up',
      target: '30',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      label: 'Employee Count',
      value: '125K',
      change: 8.9,
      icon: <Users className="h-6 w-6" />,
      trend: 'up',
      target: '130K',
      color: 'bg-pink-50 text-pink-600'
    }
  ];

  // Regional performances
  const regionalPerformances: RegionalPerformance[] = [
    {
      id: 'REG001',
      name: 'Mumbai Metro',
      revenue: 450000000,
      target: 480000000,
      stores: 18,
      customers: 2400000,
      growth: 12.5,
      marketShare: 28.5,
      status: 'excellent'
    },
    {
      id: 'REG002',
      name: 'Delhi NCR',
      revenue: 385000000,
      target: 420000000,
      stores: 15,
      customers: 1950000,
      growth: 8.3,
      marketShare: 24.2,
      status: 'good'
    },
    {
      id: 'REG003',
      name: 'Bangalore',
      revenue: 295000000,
      target: 350000000,
      stores: 12,
      customers: 1650000,
      growth: 15.8,
      marketShare: 21.8,
      status: 'excellent'
    },
    {
      id: 'REG004',
      name: 'Hyderabad',
      revenue: 220000000,
      target: 280000000,
      stores: 10,
      customers: 1250000,
      growth: 6.2,
      marketShare: 19.5,
      status: 'average'
    },
    {
      id: 'REG005',
      name: 'Chennai',
      revenue: 185000000,
      target: 240000000,
      stores: 8,
      customers: 980000,
      growth: 3.8,
      marketShare: 17.2,
      status: 'poor'
    }
  ];

  // Executive alerts
  const executiveAlerts: ExecutiveAlert[] = [
    {
      id: '1',
      type: 'market',
      priority: 'high',
      title: 'Market Share Decline',
      message: 'Chennai region showing 2.3% market share decline due to increased competition',
      timestamp: '2 hours ago',
      region: 'Chennai'
    },
    {
      id: '2',
      type: 'financial',
      priority: 'high',
      title: 'Revenue Target Gap',
      message: 'Q4 revenue tracking 8% below target. Immediate intervention required',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'operational',
      priority: 'medium',
      title: 'Supply Chain Disruption',
      message: 'Seasonal demand surge causing inventory shortages across 15 stores',
      timestamp: '6 hours ago',
      region: 'Mumbai Metro'
    },
    {
      id: '4',
      type: 'strategic',
      priority: 'medium',
      title: 'Expansion Opportunity',
      message: 'Market research identifies 3 new potential store locations in Pune',
      timestamp: '1 day ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'market': return 'border-l-blue-500 bg-blue-50';
      case 'financial': return 'border-l-red-500 bg-red-50';
      case 'operational': return 'border-l-yellow-500 bg-yellow-50';
      case 'strategic': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'market': return <Target className="h-5 w-5 text-blue-500" />;
      case 'financial': return <DollarSign className="h-5 w-5 text-red-500" />;
      case 'operational': return <Package className="h-5 w-5 text-yellow-500" />;
      case 'strategic': return <Zap className="h-5 w-5 text-green-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
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
                <Link to="/executive/dashboard" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                  Dashboard
                </Link>
                <Link to="/executive/analytics" className="text-slate-700 hover:text-blue-900 font-medium">
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
            <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
            <p className="text-gray-600 mt-1">Company-wide overview and strategic insights</p>
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {executiveMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color}`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</h3>
            <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
            {metric.target && (
              <p className="text-gray-500 text-xs">Target: {metric.target}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Regional Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Regional Performance</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Regions
              </button>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {regionalPerformances.map((region) => (
                <div key={region.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{region.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(region.status)}`}>
                          {region.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Revenue</p>
                          <p className="font-semibold text-lg">{formatIndianCurrency(region.revenue)}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${Math.min((region.revenue / region.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Market Share</p>
                          <p className="font-semibold text-lg">{region.marketShare}%</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              region.growth > 10 ? 'bg-green-100 text-green-700' : 
                              region.growth > 5 ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-red-100 text-red-700'
                            }`}>
                              {region.growth > 0 ? '+' : ''}{region.growth}% growth
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-6 text-sm text-gray-600">
                        <span>🏪 {region.stores} stores</span>
                        <span>👥 {(region.customers / 1000000).toFixed(1)}M customers</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">Executive Alerts</h2>
              </div>
              <span className="text-sm text-gray-500">
                {executiveAlerts.filter(alert => alert.priority === 'high').length} critical
              </span>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {executiveAlerts.map((alert) => (
                <div key={alert.id} className={`rounded-lg p-4 border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </span>
                          {alert.region && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.region}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic KPIs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Strategic KPIs</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Revenue Growth</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">18.5%</p>
              <p className="text-sm text-gray-600">YoY Growth</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Profit Margin</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12.3%</p>
              <p className="text-sm text-gray-600">Net Margin</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">ROI</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">24.8%</p>
              <p className="text-sm text-gray-600">Return on Investment</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Customer Retention</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">87.2%</p>
              <p className="text-sm text-gray-600">Retention Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
