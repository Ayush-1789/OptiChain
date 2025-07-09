import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  Users, 
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Clock,
  FileText,
  Target,
  Truck,
  Calendar,
  Download,
  Eye,
  Filter,
  RefreshCw
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

interface ProcurementMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  target?: string;
  color: string;
}

interface VendorPerformance {
  id: string;
  name: string;
  category: string;
  rating: number;
  totalOrders: number;
  totalValue: number;
  onTimeDelivery: number;
  qualityScore: number;
  paymentTerms: string;
  status: 'excellent' | 'good' | 'average' | 'poor';
  lastDelivery: string;
}

interface ProcurementAlert {
  id: string;
  type: 'vendor' | 'delivery' | 'quality' | 'payment' | 'inventory';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  vendor?: string;
  timestamp: string;
  resolved: boolean;
}

interface PurchaseOrder {
  id: string;
  vendor: string;
  category: string;
  items: number;
  value: number;
  orderDate: string;
  expectedDelivery: string;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  urgency: 'high' | 'medium' | 'low';
}

const ProcurementDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Procurement metrics
  const procurementMetrics: ProcurementMetric[] = [
    {
      label: 'Total Procurement',
      value: formatIndianCurrency(1250000000),
      change: 15.8,
      icon: <ShoppingCart className="h-6 w-6" />,
      trend: 'up',
      target: formatIndianCurrency(1400000000),
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'Active Vendors',
      value: '287',
      change: 8.3,
      icon: <Users className="h-6 w-6" />,
      trend: 'up',
      target: '300',
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Cost Savings',
      value: formatIndianCurrency(45000000),
      change: 22.5,
      icon: <Target className="h-6 w-6" />,
      trend: 'up',
      target: formatIndianCurrency(50000000),
      color: 'bg-purple-50 text-purple-600'
    },
    {
      label: 'Avg. Delivery Time',
      value: '5.2 days',
      change: -12.3,
      icon: <Clock className="h-6 w-6" />,
      trend: 'up',
      target: '4.5 days',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      label: 'Quality Score',
      value: '94.5%',
      change: 4.2,
      icon: <CheckCircle className="h-6 w-6" />,
      trend: 'up',
      target: '96%',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      label: 'Contract Value',
      value: formatIndianCurrency(850000000),
      change: 18.7,
      icon: <FileText className="h-6 w-6" />,
      trend: 'up',
      target: formatIndianCurrency(950000000),
      color: 'bg-pink-50 text-pink-600'
    }
  ];

  // Vendor performances
  const vendorPerformances: VendorPerformance[] = [
    {
      id: 'V001',
      name: 'Reliance Industries',
      category: 'Electronics',
      rating: 4.8,
      totalOrders: 156,
      totalValue: 125000000,
      onTimeDelivery: 96,
      qualityScore: 98,
      paymentTerms: 'Net 30',
      status: 'excellent',
      lastDelivery: '2 days ago'
    },
    {
      id: 'V002',
      name: 'Tata Consumer Products',
      category: 'Food & Beverages',
      rating: 4.6,
      totalOrders: 203,
      totalValue: 89000000,
      onTimeDelivery: 94,
      qualityScore: 96,
      paymentTerms: 'Net 45',
      status: 'excellent',
      lastDelivery: '1 day ago'
    },
    {
      id: 'V003',
      name: 'Hindustan Unilever',
      category: 'Personal Care',
      rating: 4.4,
      totalOrders: 178,
      totalValue: 67000000,
      onTimeDelivery: 91,
      qualityScore: 93,
      paymentTerms: 'Net 30',
      status: 'good',
      lastDelivery: '3 days ago'
    },
    {
      id: 'V004',
      name: 'Marico Industries',
      category: 'Home & Kitchen',
      rating: 4.1,
      totalOrders: 142,
      totalValue: 45000000,
      onTimeDelivery: 87,
      qualityScore: 89,
      paymentTerms: 'Net 60',
      status: 'good',
      lastDelivery: '5 days ago'
    },
    {
      id: 'V005',
      name: 'Dabur India',
      category: 'Health & Wellness',
      rating: 3.8,
      totalOrders: 98,
      totalValue: 32000000,
      onTimeDelivery: 82,
      qualityScore: 85,
      paymentTerms: 'Net 45',
      status: 'average',
      lastDelivery: '1 week ago'
    }
  ];

  // Procurement alerts
  const procurementAlerts: ProcurementAlert[] = [
    {
      id: '1',
      type: 'delivery',
      priority: 'high',
      title: 'Delayed Delivery Alert',
      message: 'Critical inventory items delayed by 3 days',
      vendor: 'Reliance Industries',
      timestamp: '1 hour ago',
      resolved: false
    },
    {
      id: '2',
      type: 'quality',
      priority: 'high',
      title: 'Quality Issue Reported',
      message: 'Quality score dropped below 90% threshold',
      vendor: 'Dabur India',
      timestamp: '3 hours ago',
      resolved: false
    },
    {
      id: '3',
      type: 'vendor',
      priority: 'medium',
      title: 'Vendor Performance Review',
      message: 'Monthly performance review due for top vendors',
      timestamp: '6 hours ago',
      resolved: false
    },
    {
      id: '4',
      type: 'payment',
      priority: 'medium',
      title: 'Payment Terms Negotiation',
      message: 'Renegotiate payment terms with Marico Industries',
      vendor: 'Marico Industries',
      timestamp: '1 day ago',
      resolved: false
    },
    {
      id: '5',
      type: 'inventory',
      priority: 'low',
      title: 'Inventory Optimization',
      message: 'Optimize inventory levels for seasonal demand',
      timestamp: '2 days ago',
      resolved: true
    }
  ];

  // Recent purchase orders
  const recentPurchaseOrders: PurchaseOrder[] = [
    {
      id: 'PO001',
      vendor: 'Reliance Industries',
      category: 'Electronics',
      items: 2500,
      value: 15000000,
      orderDate: '2024-07-06',
      expectedDelivery: '2024-07-12',
      status: 'shipped',
      urgency: 'high'
    },
    {
      id: 'PO002',
      vendor: 'Tata Consumer Products',
      category: 'Food & Beverages',
      items: 4200,
      value: 8500000,
      orderDate: '2024-07-05',
      expectedDelivery: '2024-07-11',
      status: 'approved',
      urgency: 'medium'
    },
    {
      id: 'PO003',
      vendor: 'Hindustan Unilever',
      category: 'Personal Care',
      items: 1800,
      value: 6200000,
      orderDate: '2024-07-04',
      expectedDelivery: '2024-07-10',
      status: 'delivered',
      urgency: 'low'
    },
    {
      id: 'PO004',
      vendor: 'Marico Industries',
      category: 'Home & Kitchen',
      items: 3100,
      value: 4800000,
      orderDate: '2024-07-03',
      expectedDelivery: '2024-07-09',
      status: 'pending',
      urgency: 'medium'
    },
    {
      id: 'PO005',
      vendor: 'Dabur India',
      category: 'Health & Wellness',
      items: 2200,
      value: 3200000,
      orderDate: '2024-07-02',
      expectedDelivery: '2024-07-08',
      status: 'cancelled',
      urgency: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'vendor': return 'border-l-blue-500 bg-blue-50';
      case 'delivery': return 'border-l-red-500 bg-red-50';
      case 'quality': return 'border-l-yellow-500 bg-yellow-50';
      case 'payment': return 'border-l-green-500 bg-green-50';
      case 'inventory': return 'border-l-purple-500 bg-purple-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'vendor': return <Users className="h-5 w-5 text-blue-500" />;
      case 'delivery': return <Truck className="h-5 w-5 text-red-500" />;
      case 'quality': return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case 'payment': return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'inventory': return <Package className="h-5 w-5 text-purple-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-900">Walmart</span>
                <span className="text-sm text-slate-600 ml-2">OptiChain Procurement Portal</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/procurement/dashboard" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                Dashboard
              </Link>
              <Link to="/procurement/vendors" className="text-slate-700 hover:text-blue-900 font-medium">
                Vendors
              </Link>
              <Link to="/procurement/orders" className="text-slate-700 hover:text-blue-900 font-medium">
                Orders
              </Link>
              <Link to="/procurement/contracts" className="text-slate-700 hover:text-blue-900 font-medium">
                Contracts
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-slate-500 hover:text-slate-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">PM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Procurement Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive procurement management and vendor oversight</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="food">Food & Beverages</option>
                <option value="personal-care">Personal Care</option>
                <option value="home-kitchen">Home & Kitchen</option>
              </select>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {procurementMetrics.map((metric, index) => (
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</h3>
            <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
            {metric.target && (
              <p className="text-gray-500 text-xs">Target: {metric.target}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Vendor Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Top Vendor Performance</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Vendors
              </button>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {vendorPerformances.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                          {vendor.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{vendor.category} • {vendor.paymentTerms}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Total Value</p>
                          <p className="font-semibold text-lg">{formatIndianCurrency(vendor.totalValue)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Rating</p>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-lg">{vendor.rating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                        <span>📦 {vendor.totalOrders} orders</span>
                        <span>⏱️ {vendor.onTimeDelivery}% on-time</span>
                        <span>✅ {vendor.qualityScore}% quality</span>
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

        {/* Procurement Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">Procurement Alerts</h2>
              </div>
              <span className="text-sm text-gray-500">
                {procurementAlerts.filter(alert => !alert.resolved).length} active
              </span>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {procurementAlerts.map((alert) => (
                <div key={alert.id} className={`rounded-lg p-4 border-l-4 ${getAlertColor(alert.type)} ${alert.resolved ? 'opacity-60' : ''}`}>
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
                          {alert.vendor && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {alert.vendor}
                            </span>
                          )}
                        </div>
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

      {/* Recent Purchase Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Recent Purchase Orders</h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Orders
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Order ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Vendor</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Items</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Value</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Expected Delivery</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Priority</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentPurchaseOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 text-gray-700">{order.vendor}</td>
                    <td className="px-4 py-3 text-gray-700">{order.category}</td>
                    <td className="px-4 py-3 text-gray-700">{order.items.toLocaleString()}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {formatIndianCurrency(order.value)}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(order.expectedDelivery).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
                        {order.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProcurementDashboard;
