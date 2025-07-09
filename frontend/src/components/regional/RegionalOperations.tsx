import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  Package,
  Truck,
  BarChart3,
  TrendingUp,
  MapPin,
  Calendar,
  Filter,
  RefreshCw,
  Download,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

interface OperationalAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'inventory' | 'staff' | 'systems' | 'compliance' | 'customer';
  store: string;
  region: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  status: 'open' | 'in-progress' | 'resolved';
  estimatedResolution: string;
}

interface SystemStatus {
  system: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  uptime: number;
  lastUpdate: string;
  affectedStores: number;
  description: string;
}

interface ComplianceItem {
  id: string;
  area: string;
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'audit-required';
  dueDate: string;
  responsible: string;
  stores: string[];
  priority: 'high' | 'medium' | 'low';
}

const RegionalOperations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'alerts' | 'systems' | 'compliance'>('alerts');

  // Operational alerts
  const operationalAlerts: OperationalAlert[] = [
    {
      id: 'ALT001',
      type: 'critical',
      category: 'inventory',
      store: 'Walmart Andheri West',
      region: 'Mumbai',
      message: 'Critical stock shortage in Electronics department - 15 SKUs below safety stock',
      timestamp: '2024-07-08T09:30:00Z',
      priority: 'high',
      assignedTo: 'Inventory Team',
      status: 'in-progress',
      estimatedResolution: '2024-07-08T18:00:00Z'
    },
    {
      id: 'ALT002',
      type: 'warning',
      category: 'staff',
      store: 'Walmart Bandra',
      region: 'Mumbai',
      message: '20% staff shortage due to sick leaves - requesting temporary staff allocation',
      timestamp: '2024-07-08T08:15:00Z',
      priority: 'medium',
      assignedTo: 'HR Team',
      status: 'open',
      estimatedResolution: '2024-07-09T10:00:00Z'
    },
    {
      id: 'ALT003',
      type: 'critical',
      category: 'systems',
      store: 'Multiple Stores',
      region: 'Delhi NCR',
      message: 'POS system intermittent connectivity issues affecting 3 stores in Delhi region',
      timestamp: '2024-07-08T07:45:00Z',
      priority: 'high',
      assignedTo: 'IT Support',
      status: 'in-progress',
      estimatedResolution: '2024-07-08T14:00:00Z'
    },
    {
      id: 'ALT004',
      type: 'warning',
      category: 'compliance',
      store: 'Walmart Whitefield',
      region: 'Bangalore',
      message: 'Food safety audit scheduled for next week - preparation required',
      timestamp: '2024-07-08T06:20:00Z',
      priority: 'medium',
      assignedTo: 'Compliance Team',
      status: 'open',
      estimatedResolution: '2024-07-15T17:00:00Z'
    },
    {
      id: 'ALT005',
      type: 'info',
      category: 'customer',
      store: 'Walmart Hitech City',
      region: 'Hyderabad',
      message: 'Customer satisfaction score dropped to 4.0 - action plan needed',
      timestamp: '2024-07-08T05:10:00Z',
      priority: 'low',
      assignedTo: 'Customer Service',
      status: 'resolved',
      estimatedResolution: '2024-07-08T12:00:00Z'
    }
  ];

  // System status
  const systemStatus: SystemStatus[] = [
    {
      system: 'Point of Sale (POS)',
      status: 'degraded',
      uptime: 97.8,
      lastUpdate: '2024-07-08T09:30:00Z',
      affectedStores: 3,
      description: 'Intermittent connectivity issues in Delhi NCR region'
    },
    {
      system: 'Inventory Management',
      status: 'operational',
      uptime: 99.9,
      lastUpdate: '2024-07-08T09:00:00Z',
      affectedStores: 0,
      description: 'All systems functioning normally'
    },
    {
      system: 'Supply Chain Platform',
      status: 'operational',
      uptime: 99.5,
      lastUpdate: '2024-07-08T08:45:00Z',
      affectedStores: 0,
      description: 'Regular maintenance completed successfully'
    },
    {
      system: 'Customer Mobile App',
      status: 'operational',
      uptime: 98.7,
      lastUpdate: '2024-07-08T09:15:00Z',
      affectedStores: 0,
      description: 'Performance optimization deployed'
    },
    {
      system: 'Staff Management Portal',
      status: 'maintenance',
      uptime: 95.2,
      lastUpdate: '2024-07-08T07:00:00Z',
      affectedStores: 5,
      description: 'Scheduled maintenance window: 7:00 AM - 11:00 AM'
    }
  ];

  // Compliance tracking
  const complianceItems: ComplianceItem[] = [
    {
      id: 'COMP001',
      area: 'Food Safety',
      requirement: 'FSSAI Annual Inspection',
      status: 'audit-required',
      dueDate: '2024-07-15',
      responsible: 'Store Manager',
      stores: ['Walmart Andheri West', 'Walmart Bandra'],
      priority: 'high'
    },
    {
      id: 'COMP002',
      area: 'Fire Safety',
      requirement: 'Fire Equipment Maintenance',
      status: 'compliant',
      dueDate: '2024-08-30',
      responsible: 'Facilities Team',
      stores: ['All Mumbai Stores'],
      priority: 'medium'
    },
    {
      id: 'COMP003',
      area: 'Labor Compliance',
      requirement: 'Minimum Wage Compliance Review',
      status: 'pending',
      dueDate: '2024-07-20',
      responsible: 'HR Team',
      stores: ['All Delhi NCR Stores'],
      priority: 'medium'
    },
    {
      id: 'COMP004',
      area: 'Environmental',
      requirement: 'Waste Management Audit',
      status: 'non-compliant',
      dueDate: '2024-07-10',
      responsible: 'Operations Manager',
      stores: ['Walmart Whitefield'],
      priority: 'high'
    }
  ];

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'down': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'audit-required': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <Link to="/regional/analytics" className="text-slate-700 hover:text-blue-900 font-medium">
                Analytics
              </Link>
              <Link to="/regional/network" className="text-slate-700 hover:text-blue-900 font-medium">
                Store Network
              </Link>
              <Link to="/regional/operations" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
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
              <h1 className="text-3xl font-bold text-gray-900">Regional Operations</h1>
              <p className="text-gray-600 mt-1">Monitor and manage operational health across regions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('alerts')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'alerts' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Alerts & Issues
                </button>
                <button
                  onClick={() => setViewMode('systems')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'systems' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  System Status
                </button>
                <button
                  onClick={() => setViewMode('compliance')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'compliance' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Compliance
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'alerts' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-xs font-medium text-red-600">Critical</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {operationalAlerts.filter(alert => alert.type === 'critical').length}
                </h3>
                <p className="text-sm text-gray-600">Critical Issues</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-xs font-medium text-yellow-600">In Progress</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {operationalAlerts.filter(alert => alert.status === 'in-progress').length}
                </h3>
                <p className="text-sm text-gray-600">Active Issues</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">Resolved</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {operationalAlerts.filter(alert => alert.status === 'resolved').length}
                </h3>
                <p className="text-sm text-gray-600">Today</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600">Avg Resolution</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">4.2h</h3>
                <p className="text-sm text-gray-600">Response Time</p>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {operationalAlerts.map((alert) => (
                <div key={alert.id} className={`bg-white rounded-lg shadow-sm border-2 p-6 ${getAlertTypeColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertTypeColor(alert.type)}`}>
                          {alert.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                          {alert.priority} priority
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          {alert.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          alert.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{alert.message}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Store:</span> {alert.store}
                        </div>
                        <div>
                          <span className="font-medium">Region:</span> {alert.region}
                        </div>
                        <div>
                          <span className="font-medium">Assigned to:</span> {alert.assignedTo}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-500">
                          Reported: {new Date(alert.timestamp).toLocaleString('en-IN')}
                        </div>
                        <div className="text-sm text-gray-500">
                          Est. Resolution: {new Date(alert.estimatedResolution).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'systems' && (
          <div className="space-y-6">
            {/* System Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemStatus.map((system, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{system.system}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                      {system.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="text-sm font-medium text-gray-900">{system.uptime}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          system.uptime >= 99 ? 'bg-green-500' :
                          system.uptime >= 95 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${system.uptime}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Affected Stores</span>
                      <span className="text-sm font-medium text-gray-900">{system.affectedStores}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Last Update: {new Date(system.lastUpdate).toLocaleString('en-IN')}
                    </div>
                    
                    <p className="text-sm text-gray-700 mt-2">{system.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'compliance' && (
          <div className="space-y-6">
            {/* Compliance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">Compliant</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {complianceItems.filter(item => item.status === 'compliant').length}
                </h3>
                <p className="text-sm text-gray-600">Items</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-xs font-medium text-red-600">Non-Compliant</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {complianceItems.filter(item => item.status === 'non-compliant').length}
                </h3>
                <p className="text-sm text-gray-600">Items</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-xs font-medium text-yellow-600">Pending</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {complianceItems.filter(item => item.status === 'pending').length}
                </h3>
                <p className="text-sm text-gray-600">Items</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-purple-600">Audit Required</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {complianceItems.filter(item => item.status === 'audit-required').length}
                </h3>
                <p className="text-sm text-gray-600">Items</p>
              </div>
            </div>

            {/* Compliance Items */}
            <div className="space-y-4">
              {complianceItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.area}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority} priority
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{item.requirement}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Due Date:</span> {new Date(item.dueDate).toLocaleDateString('en-IN')}
                        </div>
                        <div>
                          <span className="font-medium">Responsible:</span> {item.responsible}
                        </div>
                        <div>
                          <span className="font-medium">Stores:</span> {item.stores.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Take Action
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionalOperations;
