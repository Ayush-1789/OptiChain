import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Filter,
  Download,
  Search,
  Eye,
  BarChart3,
  RefreshCw,
  Truck,
  Calendar,
  Users,
  Target,
  Zap,
  Activity,
  Navigation as NavigationIcon,
  Layers,
  Timer,
  ArrowRight,
  Building,
  Route,
  Gauge,
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Bell,
  Settings,
  Play,
  Pause,
  RotateCcw,
  TrendingUpIcon
} from 'lucide-react';

interface DropSlot {
  id: string;
  supplierId: string;
  supplierName: string;
  dcLocation: string;
  scheduledTime: string;
  estimatedArrival: string;
  status: 'scheduled' | 'in-transit' | 'arrived' | 'completed' | 'delayed';
  loadType: string;
  truckCount: number;
  priority: 'high' | 'medium' | 'low';
  dwellTime: number;
  complianceScore: number;
  congestionLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  value: number;
}

interface DCMetrics {
  dcName: string;
  location: string;
  utilizationRate: number;
  avgDwellTime: number;
  activeSlots: number;
  totalSlots: number;
  congestionLevel: 'low' | 'medium' | 'high';
  todayThroughput: number;
  predictedLoad: number;
  efficiency: number;
}

interface SupplierPerformance {
  id: string;
  name: string;
  complianceScore: number;
  onTimeRate: number;
  avgDwellTime: number;
  totalShipments: number;
  valueDelivered: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastDelivery: string;
  improvementSuggestions: string[];
  trend: 'improving' | 'stable' | 'declining';
}

const SmartDropSync: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'slots' | 'optimization' | 'analytics'>('dashboard');
  const [filterDC, setFilterDC] = useState<'all' | 'mumbai' | 'delhi' | 'bangalore' | 'chennai'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'in-transit' | 'delayed'>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('today');

  // Mock data for drop slots
  const dropSlots: DropSlot[] = [
    {
      id: "DS-001",
      supplierId: "SUP-TechFlow",
      supplierName: "TechFlow Electronics",
      dcLocation: "Mumbai DC",
      scheduledTime: "2025-07-10T10:30:00",
      estimatedArrival: "2025-07-10T10:25:00",
      status: "in-transit",
      loadType: "Electronics",
      truckCount: 3,
      priority: "high",
      dwellTime: 45,
      complianceScore: 94,
      congestionLevel: "medium",
      recommendations: ["Optimize unloading sequence", "Pre-stage receiving team"],
      value: 2500000
    },
    {
      id: "DS-002",
      supplierId: "SUP-Fashion",
      supplierName: "Fashion Forward Textiles",
      dcLocation: "Delhi DC",
      scheduledTime: "2025-07-10T14:00:00",
      estimatedArrival: "2025-07-10T14:15:00",
      status: "scheduled",
      loadType: "Apparel",
      truckCount: 2,
      priority: "medium",
      dwellTime: 38,
      complianceScore: 87,
      congestionLevel: "low",
      recommendations: ["Standard processing", "Monitor traffic conditions"],
      value: 1800000
    },
    {
      id: "DS-003",
      supplierId: "SUP-Global",
      supplierName: "Global Grocery Distributors",
      dcLocation: "Bangalore DC",
      scheduledTime: "2025-07-10T08:00:00",
      estimatedArrival: "2025-07-10T08:45:00",
      status: "delayed",
      loadType: "FMCG",
      truckCount: 4,
      priority: "high",
      dwellTime: 65,
      complianceScore: 76,
      congestionLevel: "high",
      recommendations: ["Reschedule to afternoon slot", "Implement penalty clause"],
      value: 3200000
    },
    {
      id: "DS-004",
      supplierId: "SUP-Home",
      supplierName: "HomeEssentials Mfg",
      dcLocation: "Chennai DC",
      scheduledTime: "2025-07-10T16:30:00",
      estimatedArrival: "2025-07-10T16:30:00",
      status: "scheduled",
      loadType: "Home & Kitchen",
      truckCount: 2,
      priority: "low",
      dwellTime: 42,
      complianceScore: 91,
      congestionLevel: "low",
      recommendations: ["On track for optimal delivery"],
      value: 1450000
    }
  ];

  // Mock data for DC metrics
  const dcMetrics: DCMetrics[] = [
    {
      dcName: "Mumbai DC",
      location: "Bhiwandi, Mumbai",
      utilizationRate: 87,
      avgDwellTime: 48,
      activeSlots: 12,
      totalSlots: 16,
      congestionLevel: "medium",
      todayThroughput: 145,
      predictedLoad: 92,
      efficiency: 91
    },
    {
      dcName: "Delhi DC",
      location: "Gurgaon, Delhi NCR",
      utilizationRate: 73,
      avgDwellTime: 41,
      activeSlots: 8,
      totalSlots: 14,
      congestionLevel: "low",
      todayThroughput: 128,
      predictedLoad: 78,
      efficiency: 94
    },
    {
      dcName: "Bangalore DC",
      location: "Whitefield, Bangalore",
      utilizationRate: 95,
      avgDwellTime: 52,
      activeSlots: 15,
      totalSlots: 18,
      congestionLevel: "high",
      todayThroughput: 167,
      predictedLoad: 98,
      efficiency: 88
    },
    {
      dcName: "Chennai DC",
      location: "Sriperumbudur, Chennai",
      utilizationRate: 81,
      avgDwellTime: 39,
      activeSlots: 11,
      totalSlots: 15,
      congestionLevel: "low",
      todayThroughput: 134,
      predictedLoad: 85,
      efficiency: 96
    }
  ];

  // Mock data for supplier performance
  const supplierPerformance: SupplierPerformance[] = [
    {
      id: "SUP-TechFlow",
      name: "TechFlow Electronics",
      complianceScore: 94,
      onTimeRate: 91,
      avgDwellTime: 45,
      totalShipments: 156,
      valueDelivered: 25000000,
      riskLevel: "low",
      lastDelivery: "2025-07-09",
      improvementSuggestions: ["Optimize truck loading sequence", "Implement real-time tracking"],
      trend: "improving"
    },
    {
      id: "SUP-Fashion",
      name: "Fashion Forward Textiles",
      complianceScore: 87,
      onTimeRate: 85,
      avgDwellTime: 38,
      totalShipments: 89,
      valueDelivered: 18000000,
      riskLevel: "medium",
      lastDelivery: "2025-07-08",
      improvementSuggestions: ["Better route planning", "Weather contingency planning"],
      trend: "stable"
    },
    {
      id: "SUP-Global",
      name: "Global Grocery Distributors",
      complianceScore: 76,
      onTimeRate: 78,
      avgDwellTime: 65,
      totalShipments: 203,
      valueDelivered: 32000000,
      riskLevel: "high",
      lastDelivery: "2025-07-10",
      improvementSuggestions: ["Urgent: Reduce loading time", "Implement penalty system"],
      trend: "declining"
    }
  ];

  const filteredSlots = dropSlots.filter(slot => {
    const matchesDC = filterDC === 'all' || slot.dcLocation.toLowerCase().includes(filterDC);
    const matchesStatus = filterStatus === 'all' || slot.status === filterStatus;
    return matchesDC && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'in-transit': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'scheduled': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'delayed': return 'text-red-600 bg-red-100 border-red-200';
      case 'arrived': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
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
      <Navigation role={currentRole} currentPage="smartdrop-sync" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SmartDropSync</h1>
          <p className="text-gray-600 mt-2">
            Intelligent Cross-Docking System Between Suppliers & Walmart DCs
          </p>
        </div>

        {/* AI Optimization Banner */}
        <motion.div 
          className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-green-600 mr-2" />
            <span className="font-medium text-green-900">
              AI Optimization Active: 23% reduction in dwell time achieved this week. Next optimization window in 2 hours.
            </span>
            <button className="ml-auto text-green-600 hover:text-green-700 font-medium">
              View Details →
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'dashboard', label: 'DC Dashboard', icon: BarChart3 },
                { id: 'slots', label: 'Drop Slots', icon: Calendar },
                { id: 'optimization', label: 'Route Optimization', icon: NavigationIcon },
                { id: 'analytics', label: 'Performance Analytics', icon: Target }
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
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribution Center Dashboard</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dcMetrics.map((dc, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{dc.dcName}</h4>
                          <p className="text-sm text-gray-600">{dc.location}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCongestionColor(dc.congestionLevel)}`}>
                          {dc.congestionLevel.toUpperCase()} LOAD
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Utilization Rate</div>
                          <div className="text-lg font-semibold text-gray-900">{dc.utilizationRate}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{width: `${dc.utilizationRate}%`}}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Efficiency Score</div>
                          <div className="text-lg font-semibold text-gray-900">{dc.efficiency}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{width: `${dc.efficiency}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Active Slots</div>
                          <div className="font-semibold">{dc.activeSlots}/{dc.totalSlots}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Dwell Time</div>
                          <div className="font-semibold">{dc.avgDwellTime}min</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Throughput</div>
                          <div className="font-semibold">{dc.todayThroughput}</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Predicted Load</span>
                          <span className="text-sm font-medium text-gray-900">{dc.predictedLoad}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-600">Active Shipments</div>
                        <div className="text-xl font-bold text-gray-900">46</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Timer className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-600">Avg Dwell Time</div>
                        <div className="text-xl font-bold text-gray-900">46min</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-600">On-Time Rate</div>
                        <div className="text-xl font-bold text-gray-900">87%</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-600">Cost Savings</div>
                        <div className="text-xl font-bold text-gray-900">₹12.4L</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'slots' && (
              <div>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={filterDC}
                        onChange={(e) => setFilterDC(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All DCs</option>
                        <option value="mumbai">Mumbai DC</option>
                        <option value="delhi">Delhi DC</option>
                        <option value="bangalore">Bangalore DC</option>
                        <option value="chennai">Chennai DC</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule New
                    </button>
                  </div>
                </div>

                {/* Drop Slots Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Supplier & Load
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          DC & Slot Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value & Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSlots.map((slot, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{slot.supplierName}</div>
                              <div className="text-sm text-gray-500">{slot.loadType} • {slot.truckCount} trucks</div>
                              <div className="text-xs text-gray-400">ID: {slot.supplierId}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{slot.dcLocation}</div>
                              <div className="text-sm text-gray-500">
                                Scheduled: {new Date(slot.scheduledTime).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}
                              </div>
                              <div className="text-sm text-gray-500">
                                ETA: {new Date(slot.estimatedArrival).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(slot.status)}`}>
                                {slot.status.toUpperCase()}
                              </span>
                              <div className={`text-xs px-2 py-1 rounded ${getCongestionColor(slot.congestionLevel)}`}>
                                {slot.congestionLevel.toUpperCase()} CONGESTION
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm text-gray-900">Compliance: {slot.complianceScore}%</div>
                              <div className="text-sm text-gray-500">Dwell: {slot.dwellTime}min</div>
                              <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                                <div 
                                  className="bg-blue-600 h-1 rounded-full" 
                                  style={{width: `${slot.complianceScore}%`}}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">₹{(slot.value / 100000).toFixed(1)}L</div>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                slot.priority === 'high' ? 'bg-red-100 text-red-800' :
                                slot.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {slot.priority.toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                Optimize
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'optimization' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Powered Route & Dock Optimization</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Optimization Recommendations */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Current Optimization Opportunities</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-center mb-2">
                          <Zap className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-blue-900">Mumbai DC - Consolidation Opportunity</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-2">
                          Combine 3 electronics shipments into single time slot. Reduces dock congestion by 45 minutes.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600">Savings: ₹28,000</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Apply Optimization
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-green-900">Delhi DC - Route Efficiency</span>
                        </div>
                        <p className="text-sm text-green-700 mb-2">
                          Reschedule Fashion Forward delivery to avoid peak traffic. ETA improvement: 35 minutes.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600">Savings: ₹15,000</span>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Apply Route
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                          <span className="font-medium text-orange-900">Bangalore DC - Congestion Alert</span>
                        </div>
                        <p className="text-sm text-orange-700 mb-2">
                          High congestion detected. Recommend moving 2 low-priority deliveries to off-peak hours.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-orange-600">Risk Mitigation</span>
                          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">AI Learning Insights</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Activity className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="font-medium text-gray-900">Pattern Recognition</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Electronics deliveries show 23% better efficiency when scheduled in 10:00-12:00 window across all DCs.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Target className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-gray-900">Predictive Model</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Weather forecast suggests 15% traffic delay tomorrow. Pre-adjusting schedules for 12 shipments.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Users className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-gray-900">Supplier Behavioral Analysis</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          TechFlow Electronics consistently arrives 5 min early. Adjusting buffer times for better slot utilization.
                        </p>
                      </div>
                    </div>

                    {/* Optimization Stats */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-3">This Week's AI Optimizations</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Dwell Time Reduction</div>
                          <div className="font-bold text-green-600">-23%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Cost Savings</div>
                          <div className="font-bold text-green-600">₹3.4L</div>
                        </div>
                        <div>
                          <div className="text-gray-600">On-Time Improvement</div>
                          <div className="font-bold text-green-600">+12%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Truck Utilization</div>
                          <div className="font-bold text-green-600">+18%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Supplier Performance Analytics</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {supplierPerformance.map((supplier, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-lg mr-3">
                            <Truck className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{supplier.name}</h4>
                            <p className="text-sm text-gray-600">ID: {supplier.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(supplier.riskLevel)}`}>
                            {supplier.riskLevel.toUpperCase()} RISK
                          </div>
                          {getTrendIcon(supplier.trend)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Compliance Score</div>
                          <div className="text-xl font-bold text-gray-900">{supplier.complianceScore}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{width: `${supplier.complianceScore}%`}}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">On-Time Rate</div>
                          <div className="text-xl font-bold text-gray-900">{supplier.onTimeRate}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{width: `${supplier.onTimeRate}%`}}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Avg Dwell Time</div>
                          <div className="text-xl font-bold text-gray-900">{supplier.avgDwellTime}min</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Value Delivered</div>
                          <div className="text-xl font-bold text-gray-900">₹{(supplier.valueDelivered / 10000000).toFixed(1)}Cr</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <div className="text-gray-600">Total Shipments</div>
                          <div className="font-semibold">{supplier.totalShipments}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Last Delivery</div>
                          <div className="font-semibold">{new Date(supplier.lastDelivery).toLocaleDateString('en-IN')}</div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Improvement Suggestions:</div>
                        <div className="space-y-1">
                          {supplier.improvementSuggestions.map((suggestion, sugIndex) => (
                            <div key={sugIndex} className="text-sm text-gray-600 flex items-center">
                              <ArrowRight className="h-3 w-3 mr-2 text-blue-500" />
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Performance Summary */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Cross-Docking Performance Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">87%</div>
                      <div className="text-sm text-gray-600">Overall On-Time Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">46min</div>
                      <div className="text-sm text-gray-600">Avg Dwell Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">₹3.4L</div>
                      <div className="text-sm text-gray-600">Weekly Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">23%</div>
                      <div className="text-sm text-gray-600">Efficiency Improvement</div>
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

export default SmartDropSync;
