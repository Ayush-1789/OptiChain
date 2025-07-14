import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';

interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

interface StoreAlert {
  id: string;
  type: 'inventory' | 'equipment' | 'customer' | 'safety';
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  department?: string;
}

interface DailyTarget {
  category: string;
  target: number;
  actual: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

const StoreDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

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

  // Mock data - replace with real API calls
  const metrics: DashboardMetric[] = [
    {
      label: 'Today\'s Sales',
      value: formatIndianCurrency(284500),
      change: '+8.3%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      label: 'Customer Footfall',
      value: '1,247',
      change: '+12.1%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      label: 'Conversion Rate',
      value: '73.2%',
      change: '-2.1%',
      changeType: 'negative',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const dailyTargets: DailyTarget[] = [
    { category: 'Sales Revenue', target: 300000, actual: 284500, unit: '₹', trend: 'up' },
    { category: 'Customer Count', target: 1200, actual: 1247, unit: 'customers', trend: 'up' },
    { category: 'Avg Basket Size', target: 850, actual: 780, unit: '₹', trend: 'down' },
    { category: 'Items Sold', target: 2500, actual: 2847, unit: 'items', trend: 'up' }
  ];

  const storeAlerts: StoreAlert[] = [
    {
      id: '1',
      type: 'inventory',
      message: 'Low stock alert: Tata Salt 1kg - Only 12 units remaining (Reorder threshold: 25 units)',
      severity: 'high',
      timestamp: '15 minutes ago',
      department: 'Grocery'
    },
    {
      id: '2',
      type: 'equipment',
      message: 'Freezer Unit #3 temperature above optimal range (Currently: -12°C, Target: -18°C)',
      severity: 'high',
      timestamp: '1 hour ago',
      department: 'Frozen Foods'
    },
    {
      id: '3',
      type: 'customer',
      message: 'Customer complaint received: Long checkout queue during peak hours (Counter #2 closed)',
      severity: 'medium',
      timestamp: '2 hours ago',
      department: 'Frontend'
    }
  ];

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-amber-500 bg-amber-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'inventory':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'equipment':
        return (
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'customer':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getTargetProgress = (target: number, actual: number) => {
    return Math.min((actual / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <Navigation role="store" currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Good Morning, Amit Kumar</h1>
          <p className="text-slate-600">Mumbai Supercenter #001 • July 8, 2025 • Monsoon season operations in effect</p>
        </motion.div>

        {/* Time Filter */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex space-x-1">
            {['today', 'yesterday', '7d', '30d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeframe(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTimeframe === period
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                }`}
              >
                {period === 'today' ? 'Today' : period === 'yesterday' ? 'Yesterday' : period}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  metric.changeType === 'positive' ? 'bg-emerald-50 text-emerald-700' :
                  metric.changeType === 'negative' ? 'bg-red-50 text-red-700' :
                  'bg-slate-50 text-slate-700'
                }`}>
                  {metric.icon}
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  metric.changeType === 'positive' ? 'text-emerald-700 bg-emerald-50' :
                  metric.changeType === 'negative' ? 'text-red-700 bg-red-50' :
                  'text-slate-700 bg-slate-50'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-slate-600 font-medium">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Targets & Staff Overview */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Daily Targets */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Today's Targets</h2>
              </div>
              <div className="p-6 space-y-4">
                {dailyTargets.map((target, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900">{target.category}</span>
                        <span className="text-sm text-slate-600">
                          {target.unit === '₹' ? formatIndianCurrency(target.actual) : `${target.actual.toLocaleString()} ${target.unit}`} / 
                          {target.unit === '₹' ? formatIndianCurrency(target.target) : ` ${target.target.toLocaleString()} ${target.unit}`}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            getTargetProgress(target.target, target.actual) >= 100 ? 'bg-emerald-500' :
                            getTargetProgress(target.target, target.actual) >= 80 ? 'bg-blue-500' :
                            getTargetProgress(target.target, target.actual) >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${getTargetProgress(target.target, target.actual)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        target.trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
                        target.trend === 'down' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {Math.round(getTargetProgress(target.target, target.actual))}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Alerts */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Store Alerts</h2>
              </div>
              <div className="p-6 space-y-4">
                {storeAlerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertSeverityColor(alert.severity)}`}>
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm text-slate-900 mb-1 font-medium">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-600">{alert.timestamp}</p>
                          {alert.department && (
                            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                              {alert.department}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
