import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Filter,
  Download,
  Search,
  Eye,
  BarChart3,
  Users,
  Truck,
  Package,
  Globe,
  Zap,
  Shield,
  DollarSign,
  Calendar,
  Bell,
  ArrowRight,
  Star,
  Thermometer,
  CloudRain,
  Factory,
  FileText,
  RefreshCw,
  Settings,
  X
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  performanceScore: number;
  leadTimeAccuracy: number;
  qualityScore: number;
  totalOrders: number;
  activeOrders: number;
  lastDelivery: string;
  nextDelivery: string;
  currentAlerts: number;
  revenue: number;
  trends: {
    performance: 'up' | 'down' | 'stable';
    leadTime: 'up' | 'down' | 'stable';
    quality: 'up' | 'down' | 'stable';
  };
  riskFactors: string[];
  alternateSuppliers: string[];
}

interface RiskAlert {
  id: string;
  supplierId: string;
  supplierName: string;
  type: 'weather' | 'geopolitical' | 'transport' | 'quality' | 'delay' | 'financial';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  timestamp: string;
  affectedOrders: number;
}

interface PerformanceMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

const SupplyMeshAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'suppliers' | 'risks' | 'analytics'>('dashboard');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'electronics' | 'clothing' | 'grocery' | 'home'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCriticalDetails, setShowCriticalDetails] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  // Mock data for performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      title: "Active Suppliers",
      value: "2,847",
      change: 5.2,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Avg Risk Score",
      value: "6.7/10",
      change: -8.1,
      icon: Shield,
      color: "bg-green-500"
    },
    {
      title: "On-Time Delivery",
      value: "94.2%",
      change: 3.4,
      icon: Clock,
      color: "bg-purple-500"
    },
    {
      title: "Active Alerts",
      value: "23",
      change: -15.6,
      icon: Bell,
      color: "bg-orange-500"
    }
  ];

  // Mock data for suppliers
  const suppliers: Supplier[] = [
    {
      id: "SUP-001",
      name: "TechFlow Electronics Ltd",
      category: "Electronics",
      location: "Shenzhen, China",
      riskScore: 8.5,
      riskLevel: "high",
      performanceScore: 87,
      leadTimeAccuracy: 78,
      qualityScore: 92,
      totalOrders: 1250,
      activeOrders: 45,
      lastDelivery: "2025-07-08",
      nextDelivery: "2025-07-15",
      currentAlerts: 3,
      revenue: 2500000,
      trends: {
        performance: 'down',
        leadTime: 'down',
        quality: 'up'
      },
      riskFactors: ["Port congestion in Shanghai", "Monsoon season delays", "Quality audit pending"],
      alternateSuppliers: ["ElectroMax Industries", "ComponentPro Ltd"]
    },
    {
      id: "SUP-002",
      name: "FashionForward Textiles",
      category: "Clothing",
      location: "Bangalore, India",
      riskScore: 4.2,
      riskLevel: "medium",
      performanceScore: 91,
      leadTimeAccuracy: 95,
      qualityScore: 88,
      totalOrders: 890,
      activeOrders: 28,
      lastDelivery: "2025-07-09",
      nextDelivery: "2025-07-12",
      currentAlerts: 1,
      revenue: 1800000,
      trends: {
        performance: 'up',
        leadTime: 'stable',
        quality: 'up'
      },
      riskFactors: ["Monsoon transport delays"],
      alternateSuppliers: ["StyleCraft Industries", "TextilePlus Co"]
    },
    {
      id: "SUP-003",
      name: "GlobalGrocery Distributors",
      category: "Grocery",
      location: "Mumbai, India",
      riskScore: 2.8,
      riskLevel: "low",
      performanceScore: 96,
      leadTimeAccuracy: 98,
      qualityScore: 94,
      totalOrders: 2100,
      activeOrders: 67,
      lastDelivery: "2025-07-10",
      nextDelivery: "2025-07-11",
      currentAlerts: 0,
      revenue: 3200000,
      trends: {
        performance: 'up',
        leadTime: 'stable',
        quality: 'stable'
      },
      riskFactors: [],
      alternateSuppliers: ["FreshSupply Network", "QuickGrocer Ltd"]
    },
    {
      id: "SUP-004",
      name: "HomeEssentials Manufacturing",
      category: "Home & Kitchen",
      location: "Chennai, India",
      riskScore: 6.1,
      riskLevel: "medium",
      performanceScore: 84,
      leadTimeAccuracy: 82,
      qualityScore: 91,
      totalOrders: 675,
      activeOrders: 22,
      lastDelivery: "2025-07-07",
      nextDelivery: "2025-07-14",
      currentAlerts: 2,
      revenue: 1450000,
      trends: {
        performance: 'stable',
        leadTime: 'down',
        quality: 'up'
      },
      riskFactors: ["Raw material shortage", "Labor strike risk"],
      alternateSuppliers: ["KitchenCraft Industries", "HomePro Manufacturing"]
    }
  ];

  // Mock data for risk alerts
  const riskAlerts: RiskAlert[] = [
    {
      id: "ALERT-001",
      supplierId: "SUP-001",
      supplierName: "TechFlow Electronics Ltd",
      type: "transport",
      severity: "high",
      title: "Shanghai Port Congestion",
      description: "Major congestion at Shanghai port affecting 15+ suppliers",
      impact: "2-5 day delays expected for electronics shipments",
      recommendation: "Reroute through alternate ports or activate backup suppliers",
      timestamp: "2025-07-10T08:30:00Z",
      affectedOrders: 45
    },
    {
      id: "ALERT-002",
      supplierId: "SUP-002",
      supplierName: "FashionForward Textiles",
      type: "weather",
      severity: "medium",
      title: "Monsoon Weather Alert",
      description: "Heavy rainfall predicted in supplier region",
      impact: "Potential 1-2 day transportation delays",
      recommendation: "Monitor closely, consider buffer stock",
      timestamp: "2025-07-10T06:15:00Z",
      affectedOrders: 28
    },
    {
      id: "ALERT-003",
      supplierId: "SUP-004",
      supplierName: "HomeEssentials Manufacturing",
      type: "quality",
      severity: "critical",
      title: "Quality Audit Required",
      description: "Recent batch quality issues detected",
      impact: "Potential halt of current orders pending audit",
      recommendation: "Immediate quality inspection and corrective action plan",
      timestamp: "2025-07-09T14:20:00Z",
      affectedOrders: 22
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesRisk = filterRisk === 'all' || supplier.riskLevel === filterRisk;
    const matchesCategory = filterCategory === 'all' || supplier.category.toLowerCase().includes(filterCategory);
    const matchesSearch = searchTerm === '' || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesCategory && matchesSearch;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-800 bg-red-100 border-red-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather': return CloudRain;
      case 'transport': return Truck;
      case 'quality': return Factory;
      case 'geopolitical': return Globe;
      case 'financial': return DollarSign;
      default: return AlertTriangle;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return null;
    }
  };

  // Determine current role from URL
  const getCurrentRole = (): 'store' | 'supplier' | 'procurement' | 'regional' => {
    const path = window.location.pathname;
    if (path.includes('/store/')) return 'store';
    if (path.includes('/supplier/')) return 'supplier';
    if (path.includes('/procurement/')) return 'procurement';
    if (path.includes('/regional/')) return 'regional';
    return 'procurement';
  };

  const currentRole = getCurrentRole();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation role={currentRole} currentPage="supplymesh-ai" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SupplyMesh AI</h1>
          <p className="text-gray-600 mt-2">
            Dynamic Supplier Performance & Risk Intelligence Platform
          </p>
        </div>

        {/* Performance Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Critical Alerts Banner */}
        {riskAlerts.filter(alert => alert.severity === 'critical').length > 0 && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium text-red-900">
                Critical Alert: {riskAlerts.filter(alert => alert.severity === 'critical').length} supplier(s) require immediate attention
              </span>
              <button 
                onClick={() => setShowCriticalDetails(!showCriticalDetails)}
                className="ml-auto text-red-600 hover:text-red-700 font-medium"
              >
                {showCriticalDetails ? 'Hide Details' : 'View Details'} →
              </button>
            </div>
            
            {/* Critical Alert Details */}
            {showCriticalDetails && (
              <motion.div 
                className="mt-4 pt-4 border-t border-red-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {riskAlerts.filter(alert => alert.severity === 'critical').map((alert, index) => {
                    const AlertIcon = getAlertIcon(alert.type);
                    const supplier = suppliers.find(s => s.id === alert.supplierId);
                    return (
                      <div key={index} className="bg-white rounded-lg border border-red-300 p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <AlertIcon className="h-5 w-5 text-red-600 mr-2" />
                            <div>
                              <h4 className="font-semibold text-red-900">{alert.title}</h4>
                              <p className="text-sm text-red-700">{alert.supplierName}</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            CRITICAL
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-red-900">Impact:</span>
                            <p className="text-red-700">{alert.impact}</p>
                          </div>
                          <div>
                            <span className="font-medium text-red-900">Recommendation:</span>
                            <p className="text-red-700">{alert.recommendation}</p>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-red-200">
                            <div className="text-red-600">
                              <strong>{alert.affectedOrders}</strong> orders affected
                            </div>
                            {supplier && (
                              <div className="text-red-600">
                                Risk Score: <strong>{supplier.riskScore}/10</strong>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-red-200">
                          <span className="text-xs text-red-600">
                            {new Date(alert.timestamp).toLocaleString('en-IN')}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                              Take Action
                            </button>
                            <button className="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors">
                              View Supplier
                            </button>
                          </div>
                        </div>
                        
                        {/* Additional Insights */}
                        {supplier && (
                          <div className="mt-4 p-3 bg-red-25 rounded-lg border border-red-200">
                            <h5 className="font-medium text-red-900 mb-2">Supplier Insights</h5>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-red-700">Performance Score:</span>
                                <div className="font-semibold text-red-900">{supplier.performanceScore}%</div>
                              </div>
                              <div>
                                <span className="text-red-700">Active Orders:</span>
                                <div className="font-semibold text-red-900">{supplier.activeOrders}</div>
                              </div>
                              <div>
                                <span className="text-red-700">Lead Time Accuracy:</span>
                                <div className="font-semibold text-red-900">{supplier.leadTimeAccuracy}%</div>
                              </div>
                              <div>
                                <span className="text-red-700">Quality Score:</span>
                                <div className="font-semibold text-red-900">{supplier.qualityScore}%</div>
                              </div>
                            </div>
                            
                            {supplier.riskFactors.length > 0 && (
                              <div className="mt-3">
                                <span className="text-red-700 font-medium">Risk Factors:</span>
                                <ul className="mt-1 space-y-1">
                                  {supplier.riskFactors.map((factor, idx) => (
                                    <li key={idx} className="text-red-700 text-xs flex items-center">
                                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                                      {factor}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {supplier.alternateSuppliers.length > 0 && (
                              <div className="mt-3">
                                <span className="text-red-700 font-medium">Alternate Suppliers:</span>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {supplier.alternateSuppliers.map((alt, idx) => (
                                    <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                      {alt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Summary Actions */}
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-yellow-900">Immediate Actions Required</h5>
                      <p className="text-sm text-yellow-700">
                        Total affected orders: {riskAlerts.filter(alert => alert.severity === 'critical').reduce((sum, alert) => sum + alert.affectedOrders, 0)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                        <Bell className="h-4 w-4 mr-2" />
                        Notify Stakeholders
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Create Action Plan
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'dashboard', label: 'Risk Dashboard', icon: BarChart3 },
                { id: 'suppliers', label: 'Supplier Performance', icon: Users },
                { id: 'risks', label: 'Risk Alerts', icon: AlertTriangle },
                { id: 'analytics', label: 'Predictive Analytics', icon: Zap }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Risk Distribution */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Risk Distribution</h3>
                    <div className="space-y-4">
                      {[
                        { level: 'Critical Risk', count: 12, color: 'bg-red-500', percentage: 4.2 },
                        { level: 'High Risk', count: 67, color: 'bg-orange-500', percentage: 23.5 },
                        { level: 'Medium Risk', count: 134, color: 'bg-yellow-500', percentage: 47.1 },
                        { level: 'Low Risk', count: 72, color: 'bg-green-500', percentage: 25.2 }
                      ].map((risk, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${risk.color} mr-3`}></div>
                            <span className="font-medium text-gray-900">{risk.level}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{risk.count}</div>
                            <div className="text-sm text-gray-500">{risk.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Alerts */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Risk Alerts</h3>
                    <div className="space-y-3">
                      {riskAlerts.slice(0, 4).map((alert, index) => {
                        const AlertIcon = getAlertIcon(alert.type);
                        return (
                          <div key={index} className={`p-4 rounded-lg border ${getRiskColor(alert.severity)}`}>
                            <div className="flex items-start">
                              <AlertIcon className="h-5 w-5 mr-3 mt-0.5" />
                              <div className="flex-1">
                                <div className="font-medium">{alert.title}</div>
                                <div className="text-sm opacity-75 mt-1">{alert.supplierName}</div>
                                <div className="text-sm opacity-75">{alert.impact}</div>
                              </div>
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                <ArrowRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Performance Trends */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive performance trend charts will be displayed here</p>
                    <p className="text-sm text-gray-500 mt-2">Showing supplier performance over time, predictive models, and risk correlation analysis</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'suppliers' && (
              <div>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Search className="h-5 w-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Search suppliers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
                      />
                    </div>
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={filterRisk}
                        onChange={(e) => setFilterRisk(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Risk Levels</option>
                        <option value="critical">Critical Risk</option>
                        <option value="high">High Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="low">Low Risk</option>
                      </select>
                    </div>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value as any)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="all">All Categories</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="grocery">Grocery</option>
                      <option value="home">Home & Kitchen</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* Suppliers Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Supplier
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Risk Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Next Delivery
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Alerts
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSuppliers.map((supplier, index) => {
                        const PerformanceTrend = getTrendIcon(supplier.trends.performance);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                                <div className="text-sm text-gray-500">{supplier.location} • {supplier.category}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(supplier.riskLevel)}`}>
                                  {supplier.riskLevel.toUpperCase()}
                                </span>
                                <span className="ml-2 text-sm text-gray-600">{supplier.riskScore}/10</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-900">{supplier.performanceScore}%</span>
                                {PerformanceTrend && (
                                  <PerformanceTrend className={`h-4 w-4 ml-1 ${
                                    supplier.trends.performance === 'up' ? 'text-green-500' : 'text-red-500'
                                  }`} />
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                Quality: {supplier.qualityScore}% • Lead Time: {supplier.leadTimeAccuracy}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{supplier.activeOrders} active</div>
                              <div className="text-sm text-gray-500">{supplier.totalOrders} total</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(supplier.nextDelivery).toLocaleDateString('en-IN')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {supplier.currentAlerts > 0 ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <Bell className="h-3 w-3 mr-1" />
                                  {supplier.currentAlerts}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-500">None</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-900">
                                  View Profile
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'risks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Active Risk Alerts</h3>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Settings className="h-4 w-4 mr-2" />
                      Alert Settings
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Bell className="h-4 w-4 mr-2" />
                      Mark All Read
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {riskAlerts.map((alert, index) => {
                    const AlertIcon = getAlertIcon(alert.type);
                    const supplier = suppliers.find(s => s.id === alert.supplierId);
                    const isExpanded = expandedAlert === alert.id;
                    
                    return (
                      <div key={index} className={`p-6 rounded-lg border ${getRiskColor(alert.severity)}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <AlertIcon className="h-6 w-6 mr-3" />
                            <div>
                              <h4 className="font-semibold">{alert.title}</h4>
                              <p className="text-sm opacity-75">{alert.supplierName}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Description:</p>
                            <p className="text-sm opacity-75">{alert.description}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Impact:</p>
                            <p className="text-sm opacity-75">{alert.impact}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Recommendation:</p>
                            <p className="text-sm opacity-75">{alert.recommendation}</p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-current border-opacity-20">
                            <span className="text-sm opacity-75">
                              {alert.affectedOrders} orders affected
                            </span>
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                                className="text-sm font-medium hover:underline"
                              >
                                {isExpanded ? 'Hide Details' : 'View Details'}
                              </button>
                              <button className="text-sm font-medium hover:underline">
                                Take Action
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded Details */}
                        {isExpanded && supplier && (
                          <motion.div 
                            className="mt-4 pt-4 border-t border-current border-opacity-20"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h5 className="font-medium mb-3">Detailed Supplier Analysis</h5>
                            
                            {/* Performance Metrics */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="text-sm">
                                <span className="opacity-75">Risk Score:</span>
                                <div className="font-semibold">{supplier.riskScore}/10</div>
                              </div>
                              <div className="text-sm">
                                <span className="opacity-75">Performance:</span>
                                <div className="font-semibold">{supplier.performanceScore}%</div>
                              </div>
                              <div className="text-sm">
                                <span className="opacity-75">Lead Time Accuracy:</span>
                                <div className="font-semibold">{supplier.leadTimeAccuracy}%</div>
                              </div>
                              <div className="text-sm">
                                <span className="opacity-75">Quality Score:</span>
                                <div className="font-semibold">{supplier.qualityScore}%</div>
                              </div>
                            </div>
                            
                            {/* Financial Impact */}
                            <div className="mb-4 p-3 bg-opacity-20 bg-current rounded-lg">
                              <h6 className="font-medium text-sm mb-2">Financial Impact</h6>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="opacity-75">Annual Revenue:</span>
                                  <div className="font-semibold">₹{(supplier.revenue / 10000000).toFixed(1)}Cr</div>
                                </div>
                                <div>
                                  <span className="opacity-75">Active Orders Value:</span>
                                  <div className="font-semibold">₹{(supplier.revenue * 0.15 / 100000).toFixed(1)}L</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Risk Factors */}
                            {supplier.riskFactors.length > 0 && (
                              <div className="mb-4">
                                <h6 className="font-medium text-sm mb-2">Current Risk Factors</h6>
                                <ul className="space-y-1">
                                  {supplier.riskFactors.map((factor, idx) => (
                                    <li key={idx} className="text-sm opacity-75 flex items-center">
                                      <div className="w-1.5 h-1.5 bg-current rounded-full mr-2 opacity-60"></div>
                                      {factor}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Performance Trends */}
                            <div className="mb-4">
                              <h6 className="font-medium text-sm mb-2">Recent Trends</h6>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="flex items-center">
                                  <span className="opacity-75">Performance:</span>
                                  {supplier.trends.performance === 'up' ? (
                                    <TrendingUp className="h-3 w-3 ml-1 text-green-600" />
                                  ) : supplier.trends.performance === 'down' ? (
                                    <TrendingDown className="h-3 w-3 ml-1 text-red-600" />
                                  ) : (
                                    <span className="ml-1 text-gray-500">Stable</span>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <span className="opacity-75">Lead Time:</span>
                                  {supplier.trends.leadTime === 'up' ? (
                                    <TrendingUp className="h-3 w-3 ml-1 text-green-600" />
                                  ) : supplier.trends.leadTime === 'down' ? (
                                    <TrendingDown className="h-3 w-3 ml-1 text-red-600" />
                                  ) : (
                                    <span className="ml-1 text-gray-500">Stable</span>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <span className="opacity-75">Quality:</span>
                                  {supplier.trends.quality === 'up' ? (
                                    <TrendingUp className="h-3 w-3 ml-1 text-green-600" />
                                  ) : supplier.trends.quality === 'down' ? (
                                    <TrendingDown className="h-3 w-3 ml-1 text-red-600" />
                                  ) : (
                                    <span className="ml-1 text-gray-500">Stable</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Alternate Suppliers */}
                            {supplier.alternateSuppliers.length > 0 && (
                              <div className="mb-4">
                                <h6 className="font-medium text-sm mb-2">Recommended Alternatives</h6>
                                <div className="flex flex-wrap gap-1">
                                  {supplier.alternateSuppliers.map((alt, idx) => (
                                    <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                      {alt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 pt-3 border-t border-current border-opacity-20">
                              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                Contact Supplier
                              </button>
                              <button className="px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                                Switch to Alternative
                              </button>
                              <button className="px-3 py-1 text-xs border border-current rounded hover:bg-current hover:bg-opacity-10 transition-colors">
                                View Full Profile
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Predictive Analytics & Intelligence</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Predictive Models */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">AI Model Performance</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Delay Prediction Model</span>
                          <span className="text-sm font-semibold text-green-600">94.2% Accuracy</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Predicts supplier delivery delays 7-14 days in advance
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '94.2%'}}></div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Quality Risk Assessment</span>
                          <span className="text-sm font-semibold text-blue-600">91.7% Accuracy</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Identifies quality issues before they impact customers
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '91.7%'}}></div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Geopolitical Risk Monitor</span>
                          <span className="text-sm font-semibold text-purple-600">87.3% Accuracy</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Monitors news, weather, and political events for supply chain impact
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: '87.3%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Data Intelligence Sources</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Globe className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-gray-900">Real-time News & Events</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Monitoring 500+ news sources for supply chain disruptions
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CloudRain className="h-5 w-5 text-gray-600 mr-2" />
                          <span className="font-medium text-gray-900">Weather Intelligence</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Advanced weather forecasting for 48+ regions globally
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Truck className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-gray-900">Transportation Networks</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Live tracking of port congestion, route delays, fuel costs
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <FileText className="h-5 w-5 text-orange-600 mr-2" />
                          <span className="font-medium text-gray-900">Supplier Behavioral Analysis</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Pattern recognition from historical performance data
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insights Section */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-700 mb-4">AI-Generated Insights</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <Zap className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Weekly Intelligence Summary</h5>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li>• Electronics suppliers in APAC region showing 15% increase in lead time variance</li>
                          <li>• Monsoon season predicted to affect 23 textile suppliers in next 2 weeks</li>
                          <li>• Port congestion in Shanghai likely to clear by July 18th</li>
                          <li>• Recommend activating backup suppliers for 3 high-risk electronics vendors</li>
                          <li>• Quality scores improving across Home & Kitchen category (+12% vs last month)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyMeshAI;
