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

interface RecentOrder {
  id: string;
  storeLocation: string;
  products: string[];
  totalValue: number;
  deadline: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  priority: 'high' | 'medium' | 'low';
}

interface Alert {
  id: string;
  type: 'inventory' | 'delivery' | 'quality' | 'demand';
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

const SupplierDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

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
      label: 'Fill Rate',
      value: '97.8%',
      change: '+2.1%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      label: 'On-Time Delivery',
      value: '94.2%',
      change: '-1.3%',
      changeType: 'negative',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Active Orders',
      value: '142',
      change: '+18',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      label: 'Revenue (30d)',
      value: '₹2.4 Cr',
      change: '+12.5%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    }
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: 'WM-2024-08471',
      storeLocation: 'Mumbai Supercenter #001',
      products: ['Organic Fuji Apples', 'Baby Spinach 250g', 'Organic Carrots 1kg'],
      totalValue: 152400,
      deadline: '2024-07-12',
      status: 'confirmed',
      priority: 'high'
    },
    {
      id: 'WM-2024-08472',
      storeLocation: 'Delhi Neighborhood Market #3029',
      products: ['Bananas 1.5kg', 'Strawberries 500g'],
      totalValue: 87600,
      deadline: '2024-07-13',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'WM-2024-08473',
      storeLocation: 'Bangalore Supercenter #0004',
      products: ['Spring Mix 250g', 'Cherry Tomatoes 400g', 'English Cucumbers', 'Bell Peppers 3pk'],
      totalValue: 221500,
      deadline: '2024-07-14',
      status: 'shipped',
      priority: 'medium'
    },
    {
      id: 'WM-2024-08474',
      storeLocation: 'Hyderabad Supercenter #0100',
      products: ['Romaine Hearts 3pk', 'Avocados 4pk', 'Grape Tomatoes 500g'],
      totalValue: 118900,
      deadline: '2024-07-15',
      status: 'delivered',
      priority: 'low'
    }
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'inventory',
      message: 'Inventory threshold reached for Organic Baby Spinach 250g - Current stock: 47 units (Safety level: 75 units)',
      severity: 'high',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'demand',
      message: 'Demand forecast indicates 35% increase in apple products for week of July 15-21, 2024 across North India region',
      severity: 'medium',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'delivery',
      message: 'Monsoon advisory: Heavy rainfall approaching Maharashtra region may impact scheduled deliveries',
      severity: 'medium',
      timestamp: '6 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-amber-500 bg-amber-50';
      case 'low': return 'border-l-emerald-500 bg-emerald-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'demand':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'delivery':
        return (
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <Navigation role="supplier" currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Bharat Fresh Farms</h1>
          <p className="text-slate-600">Here's what's happening with your supply chain operations today.</p>
        </motion.div>

        {/* Time Filter */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex space-x-1">
            {['24h', '7d', '30d', '90d'].map((period) => (
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
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
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
          {/* Recent Orders */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                  <Link to="/supplier/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                    View all 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-slate-200">
                {recentOrders.map((order) => (
                  <div key={order.id} className={`p-6 hover:bg-slate-50 transition-colors border-l-4 ${getPriorityColor(order.priority)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded">{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-slate-900">
                        {formatIndianCurrency(order.totalValue)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{order.storeLocation}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {order.products.map((product, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
                          {product}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span className="font-medium">Deadline: {new Date(order.deadline).toLocaleDateString()}</span>
                      <span className={`${order.priority === 'high' ? 'text-red-600' : order.priority === 'medium' ? 'text-amber-600' : 'text-emerald-600'} font-semibold`}>
                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Alerts & Notifications */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Alerts */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Alerts & Notifications</h2>
              </div>
              <div className="p-6 space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertSeverityColor(alert.severity)}`}>
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm text-slate-900 mb-1 font-medium">{alert.message}</p>
                        <p className="text-xs text-slate-600">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link 
                  to="/supplier/inventory" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Update Inventory</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link 
                  to="/supplier/predictions" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">View Predictions</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link 
                  to="/supplier/smart-drop-sync" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">SmartDropSync</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link 
                  to="/supplier/inventory-simulator" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Inventory Simulator</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
