import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck,
  Zap,
  Battery,
  MapPin,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Gauge,
  Route,
  CloudRain,
  Wind,
  ThermometerSun,
  Navigation as NavigationIcon,
  Cpu,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Play,
  Pause,
  Settings
} from 'lucide-react';

interface DeliveryMode {
  id: string;
  name: string;
  type: 'drone' | 'bot' | 'van' | 'bike';
  status: 'active' | 'idle' | 'charging' | 'maintenance' | 'offline';
  batteryLevel: number;
  currentLoad: number;
  maxLoad: number;
  location: { lat: number; lng: number; address: string };
  estimatedRange: number;
  completedDeliveries: number;
  avgDeliveryTime: number;
  efficiency: number;
}

interface DeliveryOrder {
  id: string;
  customer: string;
  address: string;
  items: string[];
  totalWeight: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  timeWindow: string;
  distance: number;
  terrain: 'urban' | 'suburban' | 'campus' | 'rural';
  assignedMode: string | null;
  status: 'pending' | 'assigned' | 'in-transit' | 'delivered';
  estimatedDeliveryTime: string;
  weatherSensitive: boolean;
}

interface DispatchMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

const DropBotAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dispatcher' | 'fleet' | 'optimization' | 'analytics'>('dispatcher');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'assigned' | 'in-transit'>('all');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // Mock data for dispatch metrics
  const dispatchMetrics: DispatchMetric[] = [
    {
      title: "Active Deliveries",
      value: "127",
      change: 8.5,
      icon: Package,
      color: "bg-blue-500"
    },
    {
      title: "Fleet Efficiency",
      value: "94.2%",
      change: 3.1,
      icon: Gauge,
      color: "bg-green-500"
    },
    {
      title: "Avg Delivery Time",
      value: "18 min",
      change: -12.3,
      icon: Clock,
      color: "bg-purple-500"
    },
    {
      title: "Cost Per Delivery",
      value: "₹47",
      change: -8.7,
      icon: TrendingDown,
      color: "bg-orange-500"
    }
  ];

  // Mock fleet data
  const deliveryFleet: DeliveryMode[] = [
    {
      id: "DR-001",
      name: "SkyBot Alpha",
      type: "drone",
      status: "active",
      batteryLevel: 87,
      currentLoad: 2.5,
      maxLoad: 5.0,
      location: { lat: 19.0760, lng: 72.8777, address: "Andheri West, Mumbai" },
      estimatedRange: 12.3,
      completedDeliveries: 23,
      avgDeliveryTime: 14,
      efficiency: 92
    },
    {
      id: "DR-002",
      name: "SkyBot Beta",
      type: "drone",
      status: "charging",
      batteryLevel: 34,
      currentLoad: 0,
      maxLoad: 5.0,
      location: { lat: 19.0825, lng: 72.8814, address: "Versova Depot" },
      estimatedRange: 0,
      completedDeliveries: 31,
      avgDeliveryTime: 16,
      efficiency: 89
    },
    {
      id: "BT-001",
      name: "GroundBot Charlie",
      type: "bot",
      status: "active",
      batteryLevel: 76,
      currentLoad: 8.2,
      maxLoad: 15.0,
      location: { lat: 19.0896, lng: 72.8656, address: "Linking Road Campus" },
      estimatedRange: 8.7,
      completedDeliveries: 18,
      avgDeliveryTime: 22,
      efficiency: 85
    },
    {
      id: "VN-001",
      name: "EcoVan Delta",
      type: "van",
      status: "active",
      batteryLevel: 92,
      currentLoad: 145.0,
      maxLoad: 200.0,
      location: { lat: 19.0728, lng: 72.8826, address: "Santacruz East Hub" },
      estimatedRange: 45.2,
      completedDeliveries: 8,
      avgDeliveryTime: 35,
      efficiency: 78
    },
    {
      id: "BK-001",
      name: "SwiftBike Echo",
      type: "bike",
      status: "idle",
      batteryLevel: 100,
      currentLoad: 0,
      maxLoad: 25.0,
      location: { lat: 19.0748, lng: 72.8856, address: "Khar West Station" },
      estimatedRange: 25.0,
      completedDeliveries: 12,
      avgDeliveryTime: 28,
      efficiency: 88
    }
  ];

  // Mock orders data
  const pendingOrders: DeliveryOrder[] = [
    {
      id: "ORD-2025-001",
      customer: "Priya Sharma",
      address: "Bandra West, Mumbai",
      items: ["Medicine Pack", "Energy Bars"],
      totalWeight: 0.8,
      priority: "urgent",
      timeWindow: "30 min",
      distance: 3.2,
      terrain: "urban",
      assignedMode: null,
      status: "pending",
      estimatedDeliveryTime: "15 min",
      weatherSensitive: false
    },
    {
      id: "ORD-2025-002",
      customer: "Raj Patel",
      address: "IIT Bombay Campus",
      items: ["Groceries Pack", "Snacks", "Beverages"],
      totalWeight: 12.5,
      priority: "medium",
      timeWindow: "90 min",
      distance: 5.1,
      terrain: "campus",
      assignedMode: "BT-001",
      status: "assigned",
      estimatedDeliveryTime: "45 min",
      weatherSensitive: false
    },
    {
      id: "ORD-2025-003",
      customer: "Mumbai Store #1247",
      address: "Powai Business District",
      items: ["Electronics", "Home Goods", "Books"],
      totalWeight: 85.0,
      priority: "high",
      timeWindow: "2 hours",
      distance: 8.7,
      terrain: "suburban",
      assignedMode: "VN-001",
      status: "in-transit",
      estimatedDeliveryTime: "65 min",
      weatherSensitive: true
    }
  ];

  const weatherConditions = {
    temperature: 28,
    windSpeed: 12,
    humidity: 78,
    visibility: 8.5,
    precipitation: 15,
    droneFlightSafe: true,
    botOperationSafe: true
  };

  const filteredOrders = filterStatus === 'all' 
    ? pendingOrders 
    : pendingOrders.filter(order => order.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'idle': return 'text-blue-600 bg-blue-50';
      case 'charging': return 'text-yellow-600 bg-yellow-50';
      case 'maintenance': return 'text-orange-600 bg-orange-50';
      case 'offline': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
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

  const getModeIcon = (type: string) => {
    switch (type) {
      case 'drone': return '🚁';
      case 'bot': return '🤖';
      case 'van': return '🚐';
      case 'bike': return '🏍️';
      default: return '📦';
    }
  };

  const getModeColor = (type: string) => {
    switch (type) {
      case 'drone': return 'bg-sky-50 text-sky-600 border-sky-200';
      case 'bot': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'van': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'bike': return 'bg-orange-50 text-orange-600 border-orange-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
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
      <Navigation role={currentRole} currentPage="dropbot-ai" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">DropBot AI</h1>
          <p className="text-gray-600 mt-2">
            Multi-Mode Autonomous Delivery Dispatcher - Intelligent routing for drones, bots, vans & bikes
          </p>
        </div>

        {/* Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {dispatchMetrics.map((metric, index) => (
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

        {/* Weather & Conditions Panel */}
        <motion.div 
          className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Environmental Conditions</h3>
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-600 font-medium">All Systems Online</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="text-center">
              <ThermometerSun className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Temperature</div>
              <div className="font-semibold">{weatherConditions.temperature}°C</div>
            </div>
            <div className="text-center">
              <Wind className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Wind Speed</div>
              <div className="font-semibold">{weatherConditions.windSpeed} km/h</div>
            </div>
            <div className="text-center">
              <CloudRain className="h-6 w-6 text-slate-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="font-semibold">{weatherConditions.humidity}%</div>
            </div>
            <div className="text-center">
              <Eye className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Visibility</div>
              <div className="font-semibold">{weatherConditions.visibility} km</div>
            </div>
            <div className="text-center">
              <Activity className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Precipitation</div>
              <div className="font-semibold">{weatherConditions.precipitation}%</div>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Drone Safe</div>
              <div className="font-semibold text-green-600">Yes</div>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Bot Safe</div>
              <div className="font-semibold text-green-600">Yes</div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'dispatcher', label: 'Smart Dispatcher', icon: Cpu },
                { id: 'fleet', label: 'Fleet Status', icon: Truck },
                { id: 'optimization', label: 'Route Optimization', icon: Route },
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
            {activeTab === 'dispatcher' && (
              <div>
                {/* Dispatch Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending Assignment</option>
                        <option value="assigned">Assigned</option>
                        <option value="in-transit">In Transit</option>
                      </select>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Cpu className="h-4 w-4 mr-2" />
                      Auto-Dispatch All
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Queue
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Settings className="h-4 w-4 mr-2" />
                      Dispatch Rules
                    </button>
                  </div>
                </div>

                {/* Orders Queue */}
                <div className="space-y-4">
                  {filteredOrders.map((order, index) => (
                    <div key={index} className={`border rounded-lg p-6 ${getPriorityColor(order.priority)}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-mono text-sm font-medium bg-white px-2 py-1 rounded border">
                              {order.id}
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                              {order.priority.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-600">
                              📍 {order.distance} km • {order.terrain}
                            </span>
                            {order.weatherSensitive && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                                Weather Sensitive
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{order.customer}</h4>
                          <p className="text-sm text-gray-600 mb-2">{order.address}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {order.items.map((item, idx) => (
                              <span key={idx} className="bg-white bg-opacity-70 text-gray-700 px-2 py-1 rounded text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>⚖️ {order.totalWeight} kg</span>
                            <span>⏱️ {order.timeWindow}</span>
                            <span>🕒 Est: {order.estimatedDeliveryTime}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {order.assignedMode ? (
                            <div className={`px-3 py-2 rounded-lg border ${getModeColor(deliveryFleet.find(f => f.id === order.assignedMode)?.type || 'drone')}`}>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">
                                  {getModeIcon(deliveryFleet.find(f => f.id === order.assignedMode)?.type || 'drone')}
                                </span>
                                <div>
                                  <div className="font-medium text-sm">{order.assignedMode}</div>
                                  <div className="text-xs opacity-75">
                                    {deliveryFleet.find(f => f.id === order.assignedMode)?.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                              Auto-Assign
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* AI Recommendation */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Cpu className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">AI Recommendation</span>
                        </div>
                        <p className="text-sm text-blue-800">
                          {order.priority === 'urgent' 
                            ? `Best: Drone (${order.distance < 5 ? 'close range' : 'medium range'}) - fastest delivery for urgent medicine`
                            : order.totalWeight > 20 
                            ? `Best: EV Van - heavy load requires van capacity`
                            : order.terrain === 'campus'
                            ? `Best: Ground Bot - campus terrain optimal for bot navigation`
                            : `Best: Drone - optimal for ${order.totalWeight}kg load over ${order.distance}km`
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fleet' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Fleet Overview</h3>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Eye className="h-4 w-4 mr-2" />
                      Map View
                    </button>
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Deploy All Available
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {deliveryFleet.map((vehicle, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${getModeColor(vehicle.type)}`}>
                            {getModeIcon(vehicle.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                            <p className="text-sm text-gray-600">{vehicle.id}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {/* Battery Level */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Battery className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Battery</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  vehicle.batteryLevel > 70 ? 'bg-green-500' : 
                                  vehicle.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${vehicle.batteryLevel}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{vehicle.batteryLevel}%</span>
                          </div>
                        </div>

                        {/* Load Capacity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Load</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${(vehicle.currentLoad / vehicle.maxLoad) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {vehicle.currentLoad}/{vehicle.maxLoad} kg
                            </span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Location</span>
                          </div>
                          <span className="text-sm text-gray-900 text-right max-w-32 truncate">
                            {vehicle.location.address}
                          </span>
                        </div>

                        {/* Performance Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{vehicle.completedDeliveries}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{vehicle.avgDeliveryTime}m</div>
                            <div className="text-xs text-gray-500">Avg Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{vehicle.efficiency}%</div>
                            <div className="text-xs text-gray-500">Efficiency</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-3">
                          <button className="flex-1 py-2 px-3 border border-gray-300 rounded text-sm hover:bg-gray-100">
                            Track
                          </button>
                          <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                            Assign
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'optimization' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Route Optimization & Multi-Modal Coordination</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Route Efficiency */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Active Route Clusters</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                              🚁
                            </div>
                            <span className="font-medium text-blue-900">Drone Cluster - Andheri</span>
                          </div>
                          <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded">3 orders</span>
                        </div>
                        <p className="text-sm text-blue-800">
                          Medicine + light groceries • 2.1-4.3 km radius • Est. completion: 42 min
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-blue-600">Efficiency: 94%</span>
                          <button className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded hover:bg-blue-300">
                            Optimize Route
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">
                              🤖
                            </div>
                            <span className="font-medium text-purple-900">Bot Route - IIT Campus</span>
                          </div>
                          <span className="text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded">5 orders</span>
                        </div>
                        <p className="text-sm text-purple-800">
                          Campus deliveries • 0.8-2.1 km range • Est. completion: 67 min
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-purple-600">Efficiency: 87%</span>
                          <button className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded hover:bg-purple-300">
                            Optimize Route
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-emerald-200 rounded-lg bg-emerald-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm">
                              🚐
                            </div>
                            <span className="font-medium text-emerald-900">Van Route - Powai Hub</span>
                          </div>
                          <span className="text-sm text-emerald-700 bg-emerald-100 px-2 py-1 rounded">2 orders</span>
                        </div>
                        <p className="text-sm text-emerald-800">
                          Bulk groceries • 5.3-8.7 km range • Est. completion: 95 min
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-emerald-600">Efficiency: 78%</span>
                          <button className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded hover:bg-emerald-300">
                            Optimize Route
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Optimization Insights */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">AI Optimization Insights</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-gray-900">Efficiency Improvement</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Switching 3 medium-weight orders from vans to drones could reduce delivery time by 27 minutes
                        </p>
                        <button className="mt-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">
                          Apply Suggestion
                        </button>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Battery className="h-5 w-5 text-amber-600 mr-2" />
                          <span className="font-medium text-gray-900">Battery Optimization</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Drone Beta at 34% battery - route 2 nearby orders before returning to charge
                        </p>
                        <button className="mt-2 text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded hover:bg-amber-200">
                          Assign Orders
                        </button>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Route className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-gray-900">Multi-Modal Coordination</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Van can drop bulk items at IIT main gate, bot can handle last-mile to dorms
                        </p>
                        <button className="mt-2 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200">
                          Coordinate Handoff
                        </button>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                          <span className="font-medium text-gray-900">Weather Advisory</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          15% precipitation chance in 2 hours - prioritize drone deliveries now
                        </p>
                        <button className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200">
                          Adjust Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics & AI Learning</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Mode Performance Comparison */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Delivery Mode Performance</h4>
                    <div className="space-y-4">
                      {[
                        { mode: 'Drone', efficiency: 92, avgTime: 15, costPer: 25, color: 'bg-sky-500' },
                        { mode: 'Ground Bot', efficiency: 85, avgTime: 25, costPer: 35, color: 'bg-purple-500' },
                        { mode: 'EV Van', efficiency: 78, avgTime: 45, costPer: 85, color: 'bg-emerald-500' },
                        { mode: 'E-Bike', efficiency: 88, avgTime: 30, costPer: 40, color: 'bg-orange-500' }
                      ].map((mode, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${mode.color}`} />
                              <span className="font-medium text-gray-900">{mode.mode}</span>
                            </div>
                            <span className="text-sm text-gray-600">{mode.efficiency}% efficiency</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Avg Time</div>
                              <div className="font-medium">{mode.avgTime} min</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Cost/Delivery</div>
                              <div className="font-medium">₹{mode.costPer}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Efficiency</div>
                              <div className="font-medium">{mode.efficiency}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Learning Progress */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">AI Learning & Adaptation</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Route Optimization Model</span>
                          <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">Active</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Learning from 1,247 completed deliveries
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Model confidence: 87%</div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Weather Impact Predictor</span>
                          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">Training</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Analyzing weather patterns vs delivery performance
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '64%' }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Training progress: 64%</div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Multi-Modal Coordinator</span>
                          <span className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded">Learning</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Optimizing handoffs between delivery modes
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Optimization level: 72%</div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg bg-amber-50">
                        <div className="flex items-center mb-2">
                          <Cpu className="h-5 w-5 text-amber-600 mr-2" />
                          <span className="font-medium text-amber-900">Recent AI Insights</span>
                        </div>
                        <ul className="text-sm text-amber-800 space-y-1">
                          <li>• Campus deliveries 23% faster with bots vs drones</li>
                          <li>• Rainy weather reduces drone efficiency by 31%</li>
                          <li>• Van+bot handoffs save 18% on suburban routes</li>
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

export default DropBotAI;
