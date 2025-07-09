import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Store, 
  DollarSign, 
  Users, 
  Package,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  MapPin,
  Calendar,
  Filter,
  Eye,
  Download
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

interface RegionalMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  target?: string;
}

interface StorePerformance {
  id: string;
  name: string;
  location: string;
  manager: string;
  revenue: number;
  target: number;
  customers: number;
  staff: number;
  satisfaction: number;
  efficiency: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  alerts: number;
}

interface RegionalAlert {
  id: string;
  store: string;
  type: 'inventory' | 'staff' | 'customer' | 'operational';
  priority: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface KPI {
  metric: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down';
  change: number;
}

const RegionalDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('mumbai');

  // Regional metrics
  const regionalMetrics: RegionalMetric[] = [
    {
      label: 'Total Revenue',
      value: formatIndianCurrency(45600000),
      change: 12.5,
      icon: <DollarSign className="h-6 w-6" />,
      trend: 'up',
      target: formatIndianCurrency(50000000)
    },
    {
      label: 'Active Stores',
      value: '18',
      change: 0,
      icon: <Store className="h-6 w-6" />,
      trend: 'up'
    },
    {
      label: 'Total Customers',
      value: '2.4L',
      change: 8.3,
      icon: <Users className="h-6 w-6" />,
      trend: 'up',
      target: '2.5L'
    },
    {
      label: 'Avg. Satisfaction',
      value: '4.2/5',
      change: 2.1,
      icon: <CheckCircle className="h-6 w-6" />,
      trend: 'up',
      target: '4.5/5'
    }
  ];

  // Store performances
  const storePerformances: StorePerformance[] = [
    {
      id: 'STR001',
      name: 'Walmart Andheri West',
      location: 'Andheri West, Mumbai',
      manager: 'Priya Sharma',
      revenue: 3450000,
      target: 3500000,
      customers: 15630,
      staff: 45,
      satisfaction: 4.5,
      efficiency: 95,
      status: 'excellent',
      alerts: 0
    },
    {
      id: 'STR002',
      name: 'Walmart Bandra',
      location: 'Bandra East, Mumbai',
      manager: 'Rajesh Kumar',
      revenue: 2890000,
      target: 3200000,
      customers: 12890,
      staff: 38,
      satisfaction: 4.2,
      efficiency: 88,
      status: 'good',
      alerts: 2
    },
    {
      id: 'STR003',
      name: 'Walmart Thane',
      location: 'Thane West, Mumbai',
      manager: 'Amit Patel',
      revenue: 2650000,
      target: 2800000,
      customers: 11200,
      staff: 42,
      satisfaction: 4.1,
      efficiency: 92,
      status: 'good',
      alerts: 1
    },
    {
      id: 'STR004',
      name: 'Walmart Powai',
      location: 'Powai, Mumbai',
      manager: 'Sneha Gupta',
      revenue: 1980000,
      target: 2500000,
      customers: 8760,
      staff: 35,
      satisfaction: 3.8,
      efficiency: 78,
      status: 'average',
      alerts: 4
    },
    {
      id: 'STR005',
      name: 'Walmart Malad',
      location: 'Malad West, Mumbai',
      manager: 'Vikram Singh',
      revenue: 1650000,
      target: 2200000,
      customers: 7230,
      staff: 32,
      satisfaction: 3.6,
      efficiency: 72,
      status: 'poor',
      alerts: 6
    }
  ];

  // Regional alerts
  const regionalAlerts: RegionalAlert[] = [
    {
      id: '1',
      store: 'Walmart Malad',
      type: 'inventory',
      priority: 'high',
      message: 'Critical stock shortage in Electronics department',
      timestamp: '30 minutes ago',
      resolved: false
    },
    {
      id: '2',
      store: 'Walmart Powai',
      type: 'staff',
      priority: 'medium',
      message: '15% staff shortage due to sick leaves',
      timestamp: '2 hours ago',
      resolved: false
    },
    {
      id: '3',
      store: 'Walmart Bandra',
      type: 'customer',
      priority: 'medium',
      message: 'Customer satisfaction below 4.0 threshold',
      timestamp: '4 hours ago',
      resolved: false
    },
    {
      id: '4',
      store: 'Walmart Thane',
      type: 'operational',
      priority: 'low',
      message: 'Maintenance required for checkout system #3',
      timestamp: '6 hours ago',
      resolved: true
    }
  ];

  // Regional KPIs
  const regionalKPIs: KPI[] = [
    { metric: 'Revenue per Store', current: 2.5, target: 2.8, unit: 'Cr', trend: 'up', change: 8.5 },
    { metric: 'Customer Footfall', current: 13400, target: 15000, unit: 'daily', trend: 'up', change: 12.3 },
    { metric: 'Average Basket Size', current: 1850, target: 2000, unit: '₹', trend: 'down', change: -3.2 },
    { metric: 'Staff Productivity', current: 87, target: 90, unit: '%', trend: 'up', change: 4.1 },
    { metric: 'Inventory Turnover', current: 8.2, target: 9.0, unit: 'times', trend: 'up', change: 6.7 },
    { metric: 'Operational Efficiency', current: 85, target: 88, unit: '%', trend: 'up', change: 2.8 }
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
      case 'inventory': return 'border-l-red-500 bg-red-50';
      case 'staff': return 'border-l-yellow-500 bg-yellow-50';
      case 'customer': return 'border-l-blue-500 bg-blue-50';
      case 'operational': return 'border-l-purple-500 bg-purple-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'inventory': return <Package className="h-5 w-5 text-red-500" />;
      case 'staff': return <Users className="h-5 w-5 text-yellow-500" />;
      case 'customer': return <Users className="h-5 w-5 text-blue-500" />;
      case 'operational': return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Header */}
      <Navigation role="regional" currentPage="dashboard" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Regional Dashboard</h1>
            <p className="text-gray-600 mt-1">Mumbai Region - 18 stores overview</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mumbai">Mumbai Region</option>
              <option value="delhi">Delhi NCR Region</option>
              <option value="bangalore">Bangalore Region</option>
              <option value="hyderabad">Hyderabad Region</option>
            </select>
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {regionalMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
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
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.label}</p>
            {metric.target && (
              <p className="text-gray-500 text-xs mt-1">Target: {metric.target}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Store Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Store className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Store Performance</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Stores
              </button>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {storePerformances.map((store) => (
                <div key={store.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{store.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(store.status)}`}>
                          {store.status}
                        </span>
                        {store.alerts > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            {store.alerts} alerts
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">📍 {store.location} • 👤 {store.manager}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Revenue</p>
                          <p className="font-medium">{formatIndianCurrency(store.revenue)}</p>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full"
                              style={{ width: `${Math.min((store.revenue / store.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Efficiency</p>
                          <p className="font-medium">{store.efficiency}%</p>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-green-500 h-1 rounded-full"
                              style={{ width: `${store.efficiency}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">Regional Alerts</h2>
              </div>
              <span className="text-sm text-gray-500">
                {regionalAlerts.filter(alert => !alert.resolved).length} active
              </span>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {regionalAlerts.map((alert) => (
                <div key={alert.id} className={`rounded-lg p-4 border-l-4 ${getAlertColor(alert.type)} ${alert.resolved ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{alert.store}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.timestamp}</p>
                      </div>
                    </div>
                    {!alert.resolved && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional KPIs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Key Performance Indicators</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalKPIs.map((kpi, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{kpi.metric}</h3>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(kpi.change)}%
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {kpi.unit === '₹' ? '₹' : ''}{kpi.current}{kpi.unit === '₹' ? '' : ' ' + kpi.unit}
                  </span>
                  <span className="text-sm text-gray-500">
                    Target: {kpi.unit === '₹' ? '₹' : ''}{kpi.target}{kpi.unit === '₹' ? '' : ' ' + kpi.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {((kpi.current / kpi.target) * 100).toFixed(1)}% of target achieved
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalDashboard;
