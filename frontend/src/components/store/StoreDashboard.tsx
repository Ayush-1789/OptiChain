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

interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: 'morning' | 'afternoon' | 'night';
  status: 'present' | 'absent' | 'late';
  department: string;
}

interface StoreAlert {
  id: string;
  type: 'inventory' | 'equipment' | 'staff' | 'customer' | 'safety';
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
    },
    {
      label: 'Staff Present',
      value: '42/45',
      change: '93.3%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

  const todayStaff: StaffMember[] = [
    { id: '1', name: 'Priya Sharma', role: 'Cashier', shift: 'morning', status: 'present', department: 'Frontend' },
    { id: '2', name: 'Rajesh Kumar', role: 'Floor Manager', shift: 'morning', status: 'present', department: 'General' },
    { id: '3', name: 'Anita Patel', role: 'Fresh Produce', shift: 'morning', status: 'late', department: 'Fresh' },
    { id: '4', name: 'Vikram Singh', role: 'Security', shift: 'morning', status: 'present', department: 'Security' },
    { id: '5', name: 'Meera Reddy', role: 'Customer Service', shift: 'afternoon', status: 'absent', department: 'Frontend' },
    { id: '6', name: 'Suresh Gupta', role: 'Stock Associate', shift: 'afternoon', status: 'present', department: 'Backend' }
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
    },
    {
      id: '4',
      type: 'staff',
      message: 'Meera Reddy marked absent - Customer service desk needs coverage for afternoon shift',
      severity: 'medium',
      timestamp: '3 hours ago',
      department: 'Customer Service'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'absent': return 'bg-red-100 text-red-800 border border-red-200';
      case 'late': return 'bg-amber-100 text-amber-800 border border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border border-slate-200';
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
      case 'staff':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
    <div className="min-h-screen bg-slate-50">
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

            {/* Staff Overview */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Today's Staff</h2>
                  <Link to="/store/staff" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                    Manage All 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todayStaff.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-900 font-bold text-sm">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{staff.name}</p>
                          <p className="text-xs text-slate-600">{staff.role} • {staff.department}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                        {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Alerts & Quick Actions */}
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

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link 
                  to="/store/inventory" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Check Inventory</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link 
                  to="/store/staff" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Manage Staff</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Daily Checklist</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <Link 
                  to="/store/customer" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Customer Feedback</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link 
                  to="/store/inventory-simulator" 
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

                <Link 
                  to="/store/returns-radar" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Returns Radar</span>
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

export default StoreDashboard;
