import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Package, 
  Truck, 
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Zap,
  Settings,
  Calendar,
  BarChart3
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

interface OperationalMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  target?: string;
}

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignee: string;
  department: string;
  dueTime: string;
  description: string;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  department: string;
  resolved: boolean;
}

const StoreOperations: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState<'tasks' | 'alerts' | 'equipment'>('tasks');

  // Operational metrics
  const operationalMetrics: OperationalMetric[] = [
    {
      label: 'Tasks Completed',
      value: '24/30',
      change: 20,
      icon: <CheckCircle className="h-6 w-6" />,
      trend: 'up',
      target: '30'
    },
    {
      label: 'Equipment Uptime',
      value: '98.5%',
      change: 2.1,
      icon: <Zap className="h-6 w-6" />,
      trend: 'up',
      target: '99%'
    },
    {
      label: 'Pending Issues',
      value: '6',
      change: -25,
      icon: <AlertTriangle className="h-6 w-6" />,
      trend: 'up',
      target: '< 5'
    },
    {
      label: 'Staff Efficiency',
      value: '92%',
      change: 5.3,
      icon: <Users className="h-6 w-6" />,
      trend: 'up',
      target: '95%'
    }
  ];

  // Tasks data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Restock Electronics Section',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Priya Sharma',
      department: 'Electronics',
      dueTime: '2:00 PM',
      description: 'Restock smartphones and accessories based on morning sales'
    },
    {
      id: '2',
      title: 'Clean Produce Area',
      priority: 'medium',
      status: 'completed',
      assignee: 'Rajesh Kumar',
      department: 'Groceries',
      dueTime: '11:00 AM',
      description: 'Deep clean produce display area and organize items'
    },
    {
      id: '3',
      title: 'Checkout System Maintenance',
      priority: 'high',
      status: 'pending',
      assignee: 'Vikram Singh',
      department: 'IT',
      dueTime: '4:00 PM',
      description: 'Perform routine maintenance on checkout systems #3 and #7'
    },
    {
      id: '4',
      title: 'Update Price Tags',
      priority: 'low',
      status: 'overdue',
      assignee: 'Anita Patel',
      department: 'General',
      dueTime: '10:00 AM',
      description: 'Update promotional price tags in clothing section'
    }
  ];

  // System alerts
  const systemAlerts: SystemAlert[] = [
    {
      id: '1',
      type: 'error',
      message: 'Checkout system #3 is offline',
      timestamp: '10:30 AM',
      department: 'IT',
      resolved: false
    },
    {
      id: '2',
      type: 'warning',
      message: 'Low stock alert: Frozen foods section',
      timestamp: '9:45 AM',
      department: 'Groceries',
      resolved: false
    },
    {
      id: '3',
      type: 'info',
      message: 'Scheduled maintenance completed',
      timestamp: '8:00 AM',
      department: 'Maintenance',
      resolved: true
    }
  ];

  const filteredTasks = selectedDepartment === 'all' 
    ? tasks 
    : tasks.filter(task => task.department === selectedDepartment);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-900">Walmart</span>
                <span className="text-sm text-slate-600 ml-2">OptiChain Store Manager Portal</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/store/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                Dashboard
              </Link>
              <Link to="/store/inventory" className="text-slate-700 hover:text-blue-900 font-medium">
                Inventory
              </Link>
              <Link to="/store/staff" className="text-slate-700 hover:text-blue-900 font-medium">
                Staff
              </Link>
              <Link to="/store/customer" className="text-slate-700 hover:text-blue-900 font-medium">
                Customer
              </Link>
              <Link to="/store/operations" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                Operations
              </Link>
              <Link to="/store/analytics" className="text-slate-700 hover:text-blue-900 font-medium">
                Analytics
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-slate-500 hover:text-slate-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">RS</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Store Operations</h1>
              <p className="text-slate-600">Monitor daily operations and task management</p>
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
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
          {operationalMetrics.map((metric, index) => (
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

        {/* Tab Navigation */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tasks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Task Management
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'alerts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                System Alerts
              </button>
              <button
                onClick={() => setActiveTab('equipment')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'equipment'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Equipment Status
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'tasks' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Daily Tasks</h3>
                <div className="flex items-center gap-4">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Groceries">Groceries</option>
                    <option value="IT">IT</option>
                    <option value="General">General</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Add Task
                  </button>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      Due: {task.dueTime}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">Assigned to: {task.assignee}</span>
                      <span className="text-sm text-gray-500">Department: {task.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-green-600 hover:text-green-800 font-medium text-sm">
                        Mark Complete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'alerts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`border-l-4 p-4 rounded-lg ${
                      alert.type === 'error' ? 'border-red-500 bg-red-50' :
                      alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getAlertIcon(alert.type)}
                          <div>
                            <p className="font-medium text-gray-900">{alert.message}</p>
                            <p className="text-sm text-gray-500">{alert.department} • {alert.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!alert.resolved && (
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'equipment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Equipment Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Checkout Systems</h4>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">7/8 operational</p>
                  <p className="text-xs text-red-600 mt-1">System #3 offline</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Refrigeration</h4>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">All units operational</p>
                  <p className="text-xs text-green-600 mt-1">Optimal temperature</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Security Systems</h4>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">All cameras active</p>
                  <p className="text-xs text-green-600 mt-1">No issues detected</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StoreOperations;
