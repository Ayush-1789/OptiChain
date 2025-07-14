import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { 
  MapPin, 
  Navigation as NavigationIcon, 
  Clock, 
  Truck, 
  Route,
  Plus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Package
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

interface DeliveryRoute {
  id: string;
  name: string;
  driver: string;
  vehicle: string;
  status: 'planned' | 'active' | 'completed' | 'optimizing';
  totalDistance: number;
  estimatedTime: string;
  stops: number;
  orders: number;
  priority: 'high' | 'medium' | 'low';
  startTime: string;
  areas: string[];
}

interface RouteStop {
  id: string;
  address: string;
  customerName: string;
  orderValue: number;
  estimatedTime: string;
  status: 'pending' | 'completed' | 'delayed';
  priority: number;
  specialInstructions?: string;
}

interface OptimizationSuggestion {
  type: 'distance' | 'time' | 'fuel' | 'traffic';
  impact: string;
  description: string;
  savings: string;
}

const RoutePlanning: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Sample delivery routes
  const deliveryRoutes: DeliveryRoute[] = [
    {
      id: 'ROUTE001',
      name: 'Western Suburbs Route',
      driver: 'Rajesh Kumar',
      vehicle: 'MH-01-AB-1234',
      status: 'active',
      totalDistance: 45.2,
      estimatedTime: '3h 15m',
      stops: 12,
      orders: 18,
      priority: 'high',
      startTime: '09:00 AM',
      areas: ['Andheri', 'Bandra', 'Worli', 'Mahim']
    },
    {
      id: 'ROUTE002',
      name: 'Central Mumbai Route',
      driver: 'Suresh Patel',
      vehicle: 'MH-01-CD-5678',
      status: 'planned',
      totalDistance: 32.8,
      estimatedTime: '2h 45m',
      stops: 8,
      orders: 15,
      priority: 'medium',
      startTime: '10:30 AM',
      areas: ['Fort', 'Colaba', 'Churchgate', 'Marine Lines']
    },
    {
      id: 'ROUTE003',
      name: 'Eastern Suburbs Route',
      driver: 'Amit Singh',
      vehicle: 'MH-01-EF-9012',
      status: 'optimizing',
      totalDistance: 52.1,
      estimatedTime: '4h 20m',
      stops: 15,
      orders: 22,
      priority: 'high',
      startTime: '08:30 AM',
      areas: ['Powai', 'Vikhroli', 'Ghatkopar', 'Kurla']
    },
    {
      id: 'ROUTE004',
      name: 'Thane District Route',
      driver: 'Vikram Sharma',
      vehicle: 'MH-01-GH-3456',
      status: 'completed',
      totalDistance: 67.3,
      estimatedTime: '5h 10m',
      stops: 20,
      orders: 28,
      priority: 'medium',
      startTime: '07:00 AM',
      areas: ['Thane', 'Mulund', 'Bhandup', 'Nahur']
    }
  ];

  // Sample route stops for selected route
  const routeStops: RouteStop[] = [
    {
      id: 'STOP001',
      address: 'Shop 12, Linking Road, Bandra West',
      customerName: 'Priya Fashions',
      orderValue: 15000,
      estimatedTime: '09:30 AM',
      status: 'completed',
      priority: 1
    },
    {
      id: 'STOP002',
      address: 'B-204, Shivaji Nagar, Worli',
      customerName: 'Mumbai Electronics',
      orderValue: 25000,
      estimatedTime: '10:15 AM',
      status: 'completed',
      priority: 2
    },
    {
      id: 'STOP003',
      address: 'Office 301, Nariman Point',
      customerName: 'Corporate Solutions Ltd',
      orderValue: 45000,
      estimatedTime: '11:00 AM',
      status: 'pending',
      priority: 3,
      specialInstructions: 'Security clearance required'
    },
    {
      id: 'STOP004',
      address: 'Flat 15A, Mahim Causeway',
      customerName: 'Residencial Complex',
      orderValue: 8500,
      estimatedTime: '11:45 AM',
      status: 'pending',
      priority: 4
    },
    {
      id: 'STOP005',
      address: 'Store 7, Phoenix Mills, Lower Parel',
      customerName: 'Retail Paradise',
      orderValue: 32000,
      estimatedTime: '12:30 PM',
      status: 'delayed',
      priority: 5,
      specialInstructions: 'Loading dock access required'
    }
  ];

  // Optimization suggestions
  const optimizationSuggestions: OptimizationSuggestion[] = [
    {
      type: 'distance',
      impact: '15% reduction',
      description: 'Reorder stops to minimize backtracking',
      savings: '6.8 km saved'
    },
    {
      type: 'time',
      impact: '25 minutes saved',
      description: 'Avoid peak traffic hours for certain areas',
      savings: '₹450 in fuel costs'
    },
    {
      type: 'traffic',
      impact: 'Moderate impact',
      description: 'Alternative route via Eastern Express Highway',
      savings: '12 minutes faster'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'optimizing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getStopStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOptimizeRoute = (routeId: string) => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navigation role="delivery" currentPage="routes" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Route Planning</h1>
              <p className="text-gray-600 mt-1">Optimize delivery routes and manage logistics</p>
            </div>
            <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Map View
              </button>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              New Route
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Routes List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Route className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Delivery Routes</h2>
                </div>
                <span className="text-sm text-gray-500">{deliveryRoutes.length} routes</span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {deliveryRoutes.map((route) => (
                  <div 
                    key={route.id} 
                    className={`bg-gray-50 rounded-lg p-4 border-l-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                      getPriorityColor(route.priority)
                    } ${selectedRoute === route.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{route.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                            {route.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          👤 {route.driver} • 🚛 {route.vehicle}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>📍 {route.stops} stops</span>
                          <span>📦 {route.orders} orders</span>
                          <span>🛣️ {route.totalDistance} km</span>
                          <span>⏱️ {route.estimatedTime}</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">
                            Areas: {route.areas.join(' → ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOptimizeRoute(route.id);
                          }}
                          disabled={route.status === 'completed' || isOptimizing}
                          className="p-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
                        >
                          <RefreshCw className={`h-4 w-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Route Details */}
        <div className="space-y-6">
          {selectedRoute ? (
            <>
              {/* Route Stops */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-semibold text-gray-900">Route Stops</h2>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Optimize Order
                    </button>
                  </div>
                </div>
                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {routeStops.map((stop, index) => (
                      <div key={stop.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 text-sm">{stop.customerName}</h3>
                              <p className="text-xs text-gray-600">{stop.address}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStopStatusColor(stop.status)}`}>
                            {stop.status}
                          </span>
                        </div>
                        <div className="ml-11 grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <span>💰 {formatIndianCurrency(stop.orderValue)}</span>
                          <span>⏰ {stop.estimatedTime}</span>
                        </div>
                        {stop.specialInstructions && (
                          <div className="ml-11 mt-2">
                            <p className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                              ⚠️ {stop.specialInstructions}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optimization Suggestions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <NavigationIcon className="h-6 w-6 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Optimization</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {optimizationSuggestions.map((suggestion, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-900 text-sm">{suggestion.impact}</span>
                          </div>
                        </div>
                        <p className="text-sm text-green-800 mb-1">{suggestion.description}</p>
                        <p className="text-xs text-green-600">💾 {suggestion.savings}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Save className="h-4 w-4 mr-2" />
                    Apply Optimizations
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Route</h3>
              <p className="text-gray-600">Choose a delivery route from the list to view details and optimization suggestions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RoutePlanning;
