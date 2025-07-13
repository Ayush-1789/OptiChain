import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  Package, 
  Clock, 
  MapPin,
  CheckCircle,
  AlertTriangle,
  Navigation as NavigationIcon,
  Fuel,
  Users,
  BarChart3,
  Cpu
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

interface DeliveryMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

interface ActiveDelivery {
  id: string;
  driver: string;
  vehicle: string;
  route: string;
  orders: number;
  status: 'in-transit' | 'loading' | 'delivered' | 'delayed';
  startTime: string;
  estimatedReturn: string;
  progress: number;
  location: string;
}

interface DeliveryAlert {
  id: string;
  type: 'delay' | 'breakdown' | 'traffic' | 'emergency';
  message: string;
  driver: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

const DeliveryDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Delivery metrics
  const deliveryMetrics: DeliveryMetric[] = [
    {
      label: 'Active Deliveries',
      value: '24',
      change: 8.3,
      icon: <Truck className="h-6 w-6" />,
      trend: 'up'
    },
    {
      label: 'Completed Today',
      value: '156',
      change: 12.5,
      icon: <CheckCircle className="h-6 w-6" />,
      trend: 'up'
    },
    {
      label: 'Avg. Delivery Time',
      value: '34 min',
      change: -7.2,
      icon: <Clock className="h-6 w-6" />,
      trend: 'up'
    },
    {
      label: 'On-Time Rate',
      value: '94.2%',
      change: 2.1,
      icon: <NavigationIcon className="h-6 w-6" />,
      trend: 'up'
    }
  ];

  // Active deliveries
  const activeDeliveries: ActiveDelivery[] = [
    {
      id: 'DEL001',
      driver: 'Rajesh Kumar',
      vehicle: 'MH-01-AB-1234',
      route: 'Andheri - Bandra - Worli',
      orders: 12,
      status: 'in-transit',
      startTime: '09:30 AM',
      estimatedReturn: '12:15 PM',
      progress: 65,
      location: 'Bandra West'
    },
    {
      id: 'DEL002',
      driver: 'Suresh Patel',
      vehicle: 'MH-01-CD-5678',
      route: 'Thane - Mulund - Bhandup',
      orders: 8,
      status: 'loading',
      startTime: '10:00 AM',
      estimatedReturn: '01:30 PM',
      progress: 15,
      location: 'Warehouse'
    },
    {
      id: 'DEL003',
      driver: 'Amit Singh',
      vehicle: 'MH-01-EF-9012',
      route: 'Powai - Vikhroli - Ghatkopar',
      orders: 15,
      status: 'in-transit',
      startTime: '08:45 AM',
      estimatedReturn: '11:45 AM',
      progress: 80,
      location: 'Ghatkopar East'
    },
    {
      id: 'DEL004',
      driver: 'Vikram Sharma',
      vehicle: 'MH-01-GH-3456',
      route: 'Malad - Goregaon - Jogeshwari',
      orders: 10,
      status: 'delayed',
      startTime: '09:15 AM',
      estimatedReturn: '01:00 PM',
      progress: 45,
      location: 'Goregaon West'
    },
    {
      id: 'DEL005',
      driver: 'Pradeep Gupta',
      vehicle: 'MH-01-IJ-7890',
      route: 'Kandivali - Borivali - Dahisar',
      orders: 9,
      status: 'delivered',
      startTime: '08:00 AM',
      estimatedReturn: '11:00 AM',
      progress: 100,
      location: 'Returning to Base'
    }
  ];

  // Delivery alerts
  const deliveryAlerts: DeliveryAlert[] = [
    {
      id: '1',
      type: 'delay',
      message: 'Heavy traffic on Western Express Highway causing 30 min delay',
      driver: 'Vikram Sharma',
      timestamp: '15 minutes ago',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'breakdown',
      message: 'Vehicle breakdown reported, requesting backup vehicle',
      driver: 'Anil Yadav',
      timestamp: '45 minutes ago',
      priority: 'high'
    },
    {
      id: '3',
      type: 'traffic',
      message: 'Road closure on SV Road, suggesting alternate route',
      driver: 'Manoj Kumar',
      timestamp: '1 hour ago',
      priority: 'medium'
    }
  ];

  // Fleet utilization
  const fleetUtilization = [
    { type: 'Active', count: 24, percentage: 80 },
    { type: 'Maintenance', count: 3, percentage: 10 },
    { type: 'Available', count: 3, percentage: 10 }
  ];

  // Route performance
  const routePerformance = [
    { route: 'Western Suburbs', deliveries: 45, avgTime: '32 min', onTime: 96 },
    { route: 'Central Mumbai', deliveries: 38, avgTime: '28 min', onTime: 94 },
    { route: 'Eastern Suburbs', deliveries: 42, avgTime: '36 min', onTime: 92 },
    { route: 'Thane District', deliveries: 31, avgTime: '45 min', onTime: 89 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'loading': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'breakdown': return 'border-l-red-500 bg-red-50';
      case 'delay': return 'border-l-yellow-500 bg-yellow-50';
      case 'traffic': return 'border-l-blue-500 bg-blue-50';
      case 'emergency': return 'border-l-purple-500 bg-purple-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'breakdown': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'delay': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'traffic': return <NavigationIcon className="h-5 w-5 text-blue-500" />;
      case 'emergency': return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation role="delivery" currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor fleet operations and delivery performance</p>
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
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <MapPin className="h-4 w-4 mr-2" />
              Track All
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {deliveryMetrics.map((metric, index) => (
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
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Active Deliveries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Active Deliveries</h2>
              </div>
              <span className="text-sm text-gray-500">24 vehicles</span>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{delivery.driver}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                          {delivery.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{delivery.vehicle} • {delivery.route}</p>
                      <p className="text-sm text-gray-500">📍 {delivery.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">{delivery.orders} orders</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{delivery.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${delivery.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Started: {delivery.startTime}</span>
                    <span>ETA: {delivery.estimatedReturn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">Live Alerts</h2>
              </div>
              <span className="text-sm text-gray-500">{deliveryAlerts.length} active</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {deliveryAlerts.map((alert) => (
                <div key={alert.id} className={`rounded-lg p-4 border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Driver: {alert.driver}</h3>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.timestamp}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fleet Utilization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Fleet Utilization</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {fleetUtilization.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'Active' ? 'bg-green-500' :
                      item.type === 'Maintenance' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <span className="font-medium text-gray-900">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">{item.count} vehicles</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.type === 'Active' ? 'bg-green-500' :
                          item.type === 'Maintenance' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Fleet Insights</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 30 total vehicles in fleet</li>
                <li>• Average fuel efficiency: 12 km/L</li>
                <li>• Total distance covered today: 2,847 km</li>
                <li>• Next maintenance due: 3 vehicles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Route Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Route Performance</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {routePerformance.map((route, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{route.route}</h3>
                    <span className="text-sm text-gray-600">{route.deliveries} deliveries</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Avg. Time</p>
                      <p className="font-medium">{route.avgTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">On-Time Rate</p>
                      <p className="font-medium">{route.onTime}%</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${route.onTime}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* This space can be used for additional widgets in the future */}
        </div>
        
        {/* Quick Actions Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <Link 
              to="/delivery/routes" 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <NavigationIcon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Plan Routes</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link 
              to="/delivery/fleet" 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-900">Manage Fleet</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link 
              to="/delivery/dropbot-ai" 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <Cpu className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-900">DropBot AI</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link 
              to="/delivery/loadswap" 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">LoadSwap</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <span className="font-medium text-gray-900">Emergency Alert</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DeliveryDashboard;
