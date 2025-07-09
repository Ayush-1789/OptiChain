import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Fuel, 
  Wrench, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Filter,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Settings
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

interface Vehicle {
  id: string;
  vehicleNumber: string;
  model: string;
  driver: string;
  status: 'active' | 'idle' | 'maintenance' | 'breakdown';
  location: string;
  fuelLevel: number;
  mileage: number;
  lastService: string;
  nextService: string;
  capacity: string;
  currentLoad: number;
  dailyDistance: number;
  avgSpeed: number;
}

interface MaintenanceRecord {
  id: string;
  vehicleNumber: string;
  type: 'routine' | 'repair' | 'emergency';
  description: string;
  cost: number;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  mechanic: string;
  estimatedCompletion: string;
}

interface FuelRecord {
  vehicleNumber: string;
  date: string;
  amount: number;
  cost: number;
  mileage: number;
  fuelEfficiency: number;
}

const FleetManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'vehicles' | 'maintenance' | 'fuel'>('vehicles');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample vehicle data
  const vehicles: Vehicle[] = [
    {
      id: '1',
      vehicleNumber: 'MH-01-AB-1234',
      model: 'Tata Ace Gold',
      driver: 'Rajesh Kumar',
      status: 'active',
      location: 'Bandra West',
      fuelLevel: 75,
      mileage: 45230,
      lastService: '15 Dec 2024',
      nextService: '15 Mar 2025',
      capacity: '1.5 Ton',
      currentLoad: 85,
      dailyDistance: 67,
      avgSpeed: 28
    },
    {
      id: '2',
      vehicleNumber: 'MH-01-CD-5678',
      model: 'Mahindra Bolero Pickup',
      driver: 'Suresh Patel',
      status: 'idle',
      location: 'Warehouse',
      fuelLevel: 45,
      mileage: 38450,
      lastService: '10 Dec 2024',
      nextService: '10 Mar 2025',
      capacity: '2 Ton',
      currentLoad: 0,
      dailyDistance: 0,
      avgSpeed: 0
    },
    {
      id: '3',
      vehicleNumber: 'MH-01-EF-9012',
      model: 'Ashok Leyland Dost',
      driver: 'Amit Singh',
      status: 'maintenance',
      location: 'Service Center',
      fuelLevel: 30,
      mileage: 52100,
      lastService: '20 Nov 2024',
      nextService: 'In Progress',
      capacity: '1.25 Ton',
      currentLoad: 0,
      dailyDistance: 0,
      avgSpeed: 0
    },
    {
      id: '4',
      vehicleNumber: 'MH-01-GH-3456',
      model: 'Isuzu D-Max',
      driver: 'Vikram Sharma',
      status: 'active',
      location: 'Thane',
      fuelLevel: 90,
      mileage: 28900,
      lastService: '05 Dec 2024',
      nextService: '05 Mar 2025',
      capacity: '3 Ton',
      currentLoad: 95,
      dailyDistance: 89,
      avgSpeed: 32
    },
    {
      id: '5',
      vehicleNumber: 'MH-01-IJ-7890',
      model: 'Force Traveller',
      driver: 'Pradeep Gupta',
      status: 'breakdown',
      location: 'Eastern Highway',
      fuelLevel: 20,
      mileage: 67800,
      lastService: '25 Nov 2024',
      nextService: '25 Feb 2025',
      capacity: '2.5 Ton',
      currentLoad: 70,
      dailyDistance: 34,
      avgSpeed: 15
    }
  ];

  // Sample maintenance records
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: '1',
      vehicleNumber: 'MH-01-EF-9012',
      type: 'routine',
      description: 'Engine oil change, brake inspection, tire rotation',
      cost: 8500,
      date: 'Today',
      status: 'in-progress',
      mechanic: 'Ram Mechanics',
      estimatedCompletion: '4:00 PM'
    },
    {
      id: '2',
      vehicleNumber: 'MH-01-IJ-7890',
      type: 'emergency',
      description: 'Engine overheating, radiator repair required',
      cost: 15000,
      date: 'Today',
      status: 'scheduled',
      mechanic: 'Quick Fix Auto',
      estimatedCompletion: '6:00 PM'
    },
    {
      id: '3',
      vehicleNumber: 'MH-01-AB-1234',
      type: 'routine',
      description: 'Scheduled 3-month service',
      cost: 12000,
      date: '15 Mar 2025',
      status: 'scheduled',
      mechanic: 'TBD',
      estimatedCompletion: 'TBD'
    }
  ];

  // Sample fuel records
  const fuelRecords: FuelRecord[] = [
    {
      vehicleNumber: 'MH-01-AB-1234',
      date: 'Today',
      amount: 40,
      cost: 3600,
      mileage: 45230,
      fuelEfficiency: 12.5
    },
    {
      vehicleNumber: 'MH-01-GH-3456',
      date: 'Today',
      amount: 50,
      cost: 4500,
      mileage: 28900,
      fuelEfficiency: 11.8
    },
    {
      vehicleNumber: 'MH-01-CD-5678',
      date: 'Yesterday',
      amount: 35,
      cost: 3150,
      mileage: 38420,
      fuelEfficiency: 13.2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'breakdown': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceTypeColor = (type: string) => {
    switch (type) {
      case 'routine': return 'border-l-green-500';
      case 'repair': return 'border-l-yellow-500';
      case 'emergency': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  const getFuelLevelColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredVehicles = filterStatus === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-900">Walmart</span>
                <span className="text-sm text-slate-600 ml-2">OptiChain Delivery Portal</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/delivery/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                Dashboard
              </Link>
              <Link to="/delivery/routes" className="text-slate-700 hover:text-blue-900 font-medium">
                Route Planning
              </Link>
              <Link to="/delivery/fleet" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                Fleet Management
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-slate-500 hover:text-slate-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">DM</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage delivery vehicles</p>
            </div>
            <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'vehicles', label: 'Vehicles', icon: Truck },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench },
              { id: 'fuel', label: 'Fuel Records', icon: Fuel }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Vehicles Tab */}
      {selectedTab === 'vehicles' && (
        <div>
          {/* Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Vehicles</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="maintenance">In Maintenance</option>
                <option value="breakdown">Breakdown</option>
              </select>
              <span className="text-sm text-gray-500">
                {filteredVehicles.length} of {vehicles.length} vehicles
              </span>
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{vehicle.vehicleNumber}</h3>
                    <p className="text-sm text-gray-600">{vehicle.model}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">👤 Driver</span>
                    <span className="font-medium">{vehicle.driver}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">📍 Location</span>
                    <span className="font-medium">{vehicle.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">⚡ Fuel Level</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getFuelLevelColor(vehicle.fuelLevel)}`}
                          style={{ width: `${vehicle.fuelLevel}%` }}
                        />
                      </div>
                      <span className="font-medium">{vehicle.fuelLevel}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">📦 Load</span>
                    <span className="font-medium">{vehicle.currentLoad}% of {vehicle.capacity}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Daily Distance</p>
                    <p className="font-medium">{vehicle.dailyDistance} km</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Avg Speed</p>
                    <p className="font-medium">{vehicle.avgSpeed} km/h</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Track
                  </button>
                  <button className="flex-1 px-3 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Maintenance Tab */}
      {selectedTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wrench className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Maintenance Records</h2>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {maintenanceRecords.map((record) => (
                  <div key={record.id} className={`bg-gray-50 rounded-lg p-4 border-l-4 ${getMaintenanceTypeColor(record.type)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{record.vehicleNumber}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaintenanceStatusColor(record.status)}`}>
                            {record.status.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.type === 'emergency' ? 'bg-red-100 text-red-800' :
                            record.type === 'repair' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {record.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{record.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>🏪 {record.mechanic}</span>
                          <span>💰 {formatIndianCurrency(record.cost)}</span>
                          <span>📅 {record.date}</span>
                          <span>⏰ ETA: {record.estimatedCompletion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fuel Tab */}
      {selectedTab === 'fuel' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Fuel className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Fuel Records</h2>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Fuel Entry
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-medium text-gray-900">Vehicle</th>
                      <th className="text-left py-3 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 font-medium text-gray-900">Amount (L)</th>
                      <th className="text-left py-3 font-medium text-gray-900">Cost</th>
                      <th className="text-left py-3 font-medium text-gray-900">Mileage</th>
                      <th className="text-left py-3 font-medium text-gray-900">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fuelRecords.map((record, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 font-medium text-gray-900">{record.vehicleNumber}</td>
                        <td className="py-3 text-gray-600">{record.date}</td>
                        <td className="py-3 text-gray-600">{record.amount}L</td>
                        <td className="py-3 text-gray-600">{formatIndianCurrency(record.cost)}</td>
                        <td className="py-3 text-gray-600">{record.mileage.toLocaleString()} km</td>
                        <td className="py-3 text-gray-600">{record.fuelEfficiency} km/L</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Fuel Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Fuel className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Total Fuel Cost</h3>
                  <p className="text-2xl font-bold text-gray-900">{formatIndianCurrency(11250)}</p>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Avg Efficiency</h3>
                  <p className="text-2xl font-bold text-gray-900">12.5 km/L</p>
                  <p className="text-sm text-gray-500">Fleet average</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Low Fuel Alerts</h3>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-sm text-gray-500">Vehicles need refuel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default FleetManagement;
