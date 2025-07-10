import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck,
  Package,
  MapPin,
  Clock,
  ArrowLeftRight,
  CheckCircle,
  AlertTriangle,
  Navigation as NavigationIcon,
  Users,
  Zap,
  BarChart3,
  Activity,
  Gauge,
  Route,
  RefreshCw,
  Eye,
  Filter,
  Download,
  Play,
  Pause,
  Settings,
  Target,
  Timer,
  Layers,
  Shuffle
} from 'lucide-react';

interface SwapNode {
  id: string;
  name: string;
  type: 'store' | 'microhub' | 'depot';
  location: { lat: number; lng: number; address: string };
  capacity: number;
  currentLoad: number;
  activeSwaps: number;
  efficiency: number;
  avgSwapTime: number;
  status: 'active' | 'busy' | 'maintenance' | 'offline';
}

interface Vehicle {
  id: string;
  driver: string;
  type: 'van' | 'truck' | 'bike';
  currentLoad: number;
  maxCapacity: number;
  packagesCount: number;
  location: { lat: number; lng: number; address: string };
  nextStop: string;
  eta: string;
  loadStatus: 'optimal' | 'overloaded' | 'underutilized';
  efficiency: number;
  availableForSwap: boolean;
}

interface SwapOpportunity {
  id: string;
  fromVehicle: string;
  toVehicle: string;
  swapNode: string;
  packagesCount: number;
  estimatedSavings: number;
  timeReduction: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  reason: string;
  confidence: number;
  eta: string;
}

interface LoadSwapMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

const LoadSwap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'swap-nodes' | 'optimization' | 'analytics'>('dashboard');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'available' | 'optimal'>('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Mock metrics data
  const loadSwapMetrics: LoadSwapMetric[] = [
    {
      title: "Active Swaps",
      value: "23",
      change: 15.3,
      icon: ArrowLeftRight,
      color: "bg-blue-500"
    },
    {
      title: "Load Efficiency",
      value: "87.4%",
      change: 8.7,
      icon: Gauge,
      color: "bg-green-500"
    },
    {
      title: "Time Saved",
      value: "142 min",
      change: 23.5,
      icon: Timer,
      color: "bg-purple-500"
    },
    {
      title: "Cost Savings",
      value: "₹18.5K",
      change: 31.2,
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ];

  // Mock swap nodes data
  const swapNodes: SwapNode[] = [
    {
      id: "SW-001",
      name: "Andheri West Store",
      type: "store",
      location: { lat: 19.1367, lng: 72.8264, address: "Andheri West, Mumbai" },
      capacity: 50,
      currentLoad: 23,
      activeSwaps: 3,
      efficiency: 94,
      avgSwapTime: 8,
      status: "active"
    },
    {
      id: "SW-002", 
      name: "Bandra MicroHub",
      type: "microhub",
      location: { lat: 19.0544, lng: 72.8409, address: "Bandra East, Mumbai" },
      capacity: 100,
      currentLoad: 67,
      activeSwaps: 5,
      efficiency: 89,
      avgSwapTime: 12,
      status: "busy"
    },
    {
      id: "SW-003",
      name: "Powai Distribution Center",
      type: "depot",
      location: { lat: 19.1197, lng: 72.9111, address: "Powai, Mumbai" },
      capacity: 200,
      currentLoad: 134,
      activeSwaps: 8,
      efficiency: 91,
      avgSwapTime: 15,
      status: "active"
    },
    {
      id: "SW-004",
      name: "Malad Smart Point",
      type: "microhub",
      location: { lat: 19.1864, lng: 72.8493, address: "Malad West, Mumbai" },
      capacity: 75,
      currentLoad: 12,
      activeSwaps: 1,
      efficiency: 76,
      avgSwapTime: 10,
      status: "active"
    }
  ];

  // Mock vehicles data
  const vehicles: Vehicle[] = [
    {
      id: "VAN-001",
      driver: "Rajesh Kumar",
      type: "van",
      currentLoad: 85,
      maxCapacity: 100,
      packagesCount: 24,
      location: { lat: 19.1258, lng: 72.8397, address: "Kurla West" },
      nextStop: "Bandra MicroHub",
      eta: "12 min",
      loadStatus: "optimal",
      efficiency: 92,
      availableForSwap: true
    },
    {
      id: "VAN-002",
      driver: "Amit Sharma",
      type: "van",
      currentLoad: 120,
      maxCapacity: 100,
      packagesCount: 32,
      location: { lat: 19.0755, lng: 72.8775, address: "Andheri East" },
      nextStop: "Andheri West Store",
      eta: "8 min",
      loadStatus: "overloaded",
      efficiency: 76,
      availableForSwap: true
    },
    {
      id: "VAN-003",
      driver: "Suresh Yadav",
      type: "van",
      currentLoad: 45,
      maxCapacity: 100,
      packagesCount: 12,
      location: { lat: 19.1764, lng: 72.8553, address: "Malad West" },
      nextStop: "Malad Smart Point",
      eta: "5 min",
      loadStatus: "underutilized",
      efficiency: 68,
      availableForSwap: true
    },
    {
      id: "TRK-001",
      driver: "Manoj Singh",
      type: "truck",
      currentLoad: 450,
      maxCapacity: 500,
      packagesCount: 87,
      location: { lat: 19.1134, lng: 72.9045, address: "Powai" },
      nextStop: "Powai Distribution Center",
      eta: "3 min",
      loadStatus: "optimal",
      efficiency: 88,
      availableForSwap: false
    }
  ];

  // Mock swap opportunities
  const swapOpportunities: SwapOpportunity[] = [
    {
      id: "SWAP-001",
      fromVehicle: "VAN-002",
      toVehicle: "VAN-003",
      swapNode: "SW-001",
      packagesCount: 8,
      estimatedSavings: 1250,
      timeReduction: 18,
      priority: "urgent",
      reason: "Overload + Underutilization",
      confidence: 94,
      eta: "8 min"
    },
    {
      id: "SWAP-002",
      fromVehicle: "VAN-001",
      toVehicle: "VAN-003",
      swapNode: "SW-004",
      packagesCount: 5,
      estimatedSavings: 800,
      timeReduction: 12,
      priority: "medium",
      reason: "Route Optimization",
      confidence: 87,
      eta: "15 min"
    },
    {
      id: "SWAP-003",
      fromVehicle: "TRK-001",
      toVehicle: "VAN-001",
      swapNode: "SW-003",
      packagesCount: 12,
      estimatedSavings: 1800,
      timeReduction: 25,
      priority: "high",
      reason: "Last-Mile Efficiency",
      confidence: 91,
      eta: "5 min"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'busy': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'maintenance': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'offline': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLoadStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-50 border-green-200';
      case 'overloaded': return 'text-red-600 bg-red-50 border-red-200';
      case 'underutilized': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case 'store': return '🏪';
      case 'microhub': return '📦';
      case 'depot': return '🏭';
      default: return '📍';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'van': return '🚐';
      case 'truck': return '🚛';
      case 'bike': return '🏍️';
      default: return '🚚';
    }
  };

  const getCurrentRole = (): 'delivery' | 'store' | 'supplier' | 'procurement' | 'regional' => {
    const path = window.location.pathname;
    if (path.includes('/delivery/')) return 'delivery';
    if (path.includes('/store/')) return 'store';
    if (path.includes('/supplier/')) return 'supplier';
    if (path.includes('/procurement/')) return 'procurement';
    if (path.includes('/regional/')) return 'regional';
    return 'delivery';
  };

  const currentRole = getCurrentRole();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation role={currentRole} currentPage="loadswap" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LoadSwap</h1>
          <p className="text-gray-600 mt-2">
            Real-Time Delivery Load Rebalancing via Enroute Swap Nodes
          </p>
        </div>

        {/* Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {loadSwapMetrics.map((metric, index) => (
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

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'dashboard', label: 'Swap Dashboard', icon: Activity },
                { id: 'swap-nodes', label: 'Swap Nodes', icon: MapPin },
                { id: 'optimization', label: 'Live Optimization', icon: Target },
                { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 }
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
                {/* Dashboard Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Vehicles</option>
                        <option value="active">Active Swaps</option>
                        <option value="available">Available for Swap</option>
                        <option value="optimal">Optimal Load</option>
                      </select>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Auto-Optimize All
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Settings className="h-4 w-4 mr-2" />
                      Swap Settings
                    </button>
                  </div>
                </div>

                {/* Live Swap Opportunities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Urgent Swap Opportunities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Urgent Swap Opportunities</h3>
                    <div className="space-y-4">
                      {swapOpportunities
                        .filter(swap => swap.priority === 'urgent' || swap.priority === 'high')
                        .map((swap, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${getPriorityColor(swap.priority)}`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(swap.priority)}`}>
                                {swap.priority.toUpperCase()}
                              </span>
                              <span className="text-sm font-medium">{swap.id}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">₹{swap.estimatedSavings}</div>
                              <div className="text-xs text-gray-500">Est. Savings</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div className="text-center">
                              <div className="text-xs text-gray-500">From</div>
                              <div className="text-sm font-medium">{swap.fromVehicle}</div>
                            </div>
                            <div className="text-center">
                              <ArrowLeftRight className="h-5 w-5 mx-auto text-blue-600" />
                              <div className="text-xs text-gray-500">{swap.packagesCount} packages</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500">To</div>
                              <div className="text-sm font-medium">{swap.toVehicle}</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-600">
                              📍 {swapNodes.find(n => n.id === swap.swapNode)?.name}
                            </span>
                            <span className="text-sm text-gray-600">⏱️ ETA: {swap.eta}</span>
                          </div>

                          <div className="text-sm text-gray-700 mb-3">{swap.reason}</div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-xs text-gray-500">
                                Confidence: {swap.confidence}%
                              </span>
                              <span className="text-xs text-gray-500">
                                Time Saved: {swap.timeReduction}m
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                                Execute Swap
                              </button>
                              <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                                Review
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Load Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Load Status</h3>
                    <div className="space-y-4">
                      {vehicles.map((vehicle, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{getVehicleIcon(vehicle.type)}</div>
                              <div>
                                <div className="font-medium text-gray-900">{vehicle.id}</div>
                                <div className="text-sm text-gray-600">{vehicle.driver}</div>
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getLoadStatusColor(vehicle.loadStatus)}`}>
                              {vehicle.loadStatus.toUpperCase()}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {/* Load Capacity Bar */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Load</span>
                              <span className="font-medium">
                                {vehicle.currentLoad}/{vehicle.maxCapacity} kg
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  vehicle.loadStatus === 'overloaded' ? 'bg-red-500' :
                                  vehicle.loadStatus === 'optimal' ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${Math.min((vehicle.currentLoad / vehicle.maxCapacity) * 100, 100)}%` }}
                              />
                            </div>

                            {/* Vehicle Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                              <div>
                                <span className="text-gray-500">Packages:</span>
                                <span className="ml-1 font-medium">{vehicle.packagesCount}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Efficiency:</span>
                                <span className="ml-1 font-medium">{vehicle.efficiency}%</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Next Stop:</span>
                                <span className="ml-1 font-medium">{vehicle.nextStop}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">ETA:</span>
                                <span className="ml-1 font-medium">{vehicle.eta}</span>
                              </div>
                            </div>

                            {vehicle.availableForSwap && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <button className="w-full py-2 px-3 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                                  Find Swap Opportunities
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'swap-nodes' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Smart Swap Nodes Network</h3>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Eye className="h-4 w-4 mr-2" />
                      Map View
                    </button>
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <MapPin className="h-4 w-4 mr-2" />
                      Add New Node
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {swapNodes.map((node, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{getNodeTypeIcon(node.type)}</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{node.name}</h4>
                            <p className="text-sm text-gray-600">{node.location.address}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(node.status)}`}>
                          {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                        </span>
                      </div>

                      {/* Capacity Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Capacity</span>
                          <span className="font-medium">{node.currentLoad}/{node.capacity}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              (node.currentLoad / node.capacity) > 0.8 ? 'bg-red-500' :
                              (node.currentLoad / node.capacity) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(node.currentLoad / node.capacity) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Node Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900">{node.activeSwaps}</div>
                          <div className="text-xs text-gray-500">Active Swaps</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{node.efficiency}%</div>
                          <div className="text-xs text-gray-500">Efficiency</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{node.avgSwapTime}m</div>
                          <div className="text-xs text-gray-500">Avg Swap Time</div>
                        </div>
                      </div>

                      {/* Node Actions */}
                      <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                        <button className="flex-1 py-2 px-3 border border-gray-300 rounded text-sm hover:bg-gray-50">
                          View Details
                        </button>
                        <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                          Schedule Swap
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'optimization' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Live Route Optimization & Swap Coordination</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* AI Optimization Engine */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">AI Optimization Engine</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-center mb-2">
                          <Target className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-blue-900">Real-Time Load Balancing</span>
                        </div>
                        <p className="text-sm text-blue-800 mb-3">
                          Continuously analyzing vehicle loads and suggesting optimal swap points
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-600">Processing 24 vehicles</span>
                          <button className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded hover:bg-blue-300">
                            View Algorithm
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center mb-2">
                          <Zap className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-green-900">Predictive Swap Routing</span>
                        </div>
                        <p className="text-sm text-green-800 mb-3">
                          Anticipating future load imbalances and pre-positioning swaps
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600">12 predictions active</span>
                          <button className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded hover:bg-green-300">
                            Review Predictions
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                        <div className="flex items-center mb-2">
                          <Shuffle className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="font-medium text-purple-900">Dynamic Rebalancing</span>
                        </div>
                        <p className="text-sm text-purple-800 mb-3">
                          Automatically executing approved swaps and updating routes
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-600">Auto-mode enabled</span>
                          <button className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded hover:bg-purple-300">
                            Configure Rules
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Swap Coordination */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Live Swap Coordination</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Next Swap: SWAP-001</span>
                          <span className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">In Progress</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          VAN-002 → VAN-003 at Andheri West Store
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Packages:</span>
                            <span className="ml-1 font-medium">8 items</span>
                          </div>
                          <div>
                            <span className="text-gray-500">ETA:</span>
                            <span className="ml-1 font-medium">3 min</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }} />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Vehicles approaching swap point</div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Queue: SWAP-003</span>
                          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">Scheduled</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          TRK-001 → VAN-001 at Powai Distribution Center
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Packages:</span>
                            <span className="ml-1 font-medium">12 items</span>
                          </div>
                          <div>
                            <span className="text-gray-500">ETA:</span>
                            <span className="ml-1 font-medium">5 min</span>
                          </div>
                        </div>
                        <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                          Monitor Swap
                        </button>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Completed: SWAP-004</span>
                          <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">✓ Success</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          VAN-004 → VAN-005 at Malad Smart Point
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Time Saved:</span>
                            <span className="ml-1 font-medium">15 min</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Cost Saved:</span>
                            <span className="ml-1 font-medium">₹950</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">LoadSwap Performance Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Efficiency Metrics */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Swap Efficiency Analysis</h4>
                    <div className="space-y-4">
                      {[
                        { metric: "Load Utilization", current: 87.4, target: 90, trend: "+5.2%" },
                        { metric: "Swap Success Rate", current: 94.2, target: 95, trend: "+2.8%" },
                        { metric: "Average Swap Time", current: 11.5, target: 10, trend: "-8.1%" },
                        { metric: "Cost per Delivery", current: 47, target: 45, trend: "-12.3%" }
                      ].map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{item.metric}</span>
                            <span className={`text-sm ${
                              item.trend.startsWith('+') && item.metric !== "Average Swap Time" ? 'text-green-600' :
                              item.trend.startsWith('-') && item.metric === "Average Swap Time" ? 'text-green-600' :
                              item.trend.startsWith('-') && item.metric !== "Average Swap Time" ? 'text-green-600' :
                              'text-red-600'
                            }`}>
                              {item.trend}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold text-gray-900">{item.current}{item.metric.includes("Time") ? "m" : item.metric.includes("Cost") ? "" : "%"}</span>
                            <span className="text-sm text-gray-500">Target: {item.target}{item.metric.includes("Time") ? "m" : item.metric.includes("Cost") ? "" : "%"}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                item.current >= item.target ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Swap Node Performance */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Top Performing Swap Nodes</h4>
                    <div className="space-y-4">
                      {swapNodes
                        .sort((a, b) => b.efficiency - a.efficiency)
                        .map((node, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getNodeTypeIcon(node.type)}</span>
                              <span className="font-medium text-gray-900">{node.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-green-600">{node.efficiency}%</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Swaps/Day:</span>
                              <div className="font-medium">{node.activeSwaps * 3}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Avg Time:</span>
                              <div className="font-medium">{node.avgSwapTime}m</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Utilization:</span>
                              <div className="font-medium">{Math.round((node.currentLoad / node.capacity) * 100)}%</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${node.efficiency}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cost Savings Summary */}
                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                    <h4 className="text-lg font-semibold text-green-900">LoadSwap Impact Summary</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-900">₹1.2L</div>
                      <div className="text-sm text-green-700">Monthly Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-900">847</div>
                      <div className="text-sm text-green-700">Successful Swaps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-900">23.5%</div>
                      <div className="text-sm text-green-700">Efficiency Gain</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-900">142h</div>
                      <div className="text-sm text-green-700">Time Saved</div>
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

export default LoadSwap;
