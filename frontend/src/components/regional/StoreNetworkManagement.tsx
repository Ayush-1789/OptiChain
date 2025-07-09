import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { 
  Store, 
  MapPin, 
  Users, 
  DollarSign,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Target
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

interface StoreDetails {
  id: string;
  name: string;
  location: string;
  region: string;
  manager: string;
  openDate: string;
  size: number; // in sq ft
  revenue: number;
  target: number;
  customers: number;
  staff: number;
  satisfaction: number;
  efficiency: number;
  status: 'operational' | 'renovation' | 'new' | 'underperforming';
  format: 'supercenter' | 'neighborhood' | 'express';
  alerts: number;
  lastAudit: string;
}

interface ExpansionPlan {
  id: string;
  location: string;
  region: string;
  format: string;
  timeline: string;
  investment: number;
  expectedRevenue: number;
  status: 'planning' | 'approved' | 'construction' | 'opening-soon';
  completion: number;
}

const StoreNetworkManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'expansion'>('list');

  // Store network data
  const stores: StoreDetails[] = [
    {
      id: 'STR001',
      name: 'Walmart Andheri West Supercenter',
      location: 'Andheri West, Mumbai',
      region: 'Mumbai',
      manager: 'Priya Sharma',
      openDate: '2019-03-15',
      size: 125000,
      revenue: 3450000,
      target: 3500000,
      customers: 15630,
      staff: 45,
      satisfaction: 4.5,
      efficiency: 95,
      status: 'operational',
      format: 'supercenter',
      alerts: 0,
      lastAudit: '2024-06-15'
    },
    {
      id: 'STR002',
      name: 'Walmart Bandra East',
      location: 'Bandra East, Mumbai',
      region: 'Mumbai',
      manager: 'Rajesh Kumar',
      openDate: '2020-08-22',
      size: 85000,
      revenue: 2890000,
      target: 3200000,
      customers: 12890,
      staff: 38,
      satisfaction: 4.2,
      efficiency: 88,
      status: 'operational',
      format: 'neighborhood',
      alerts: 2,
      lastAudit: '2024-07-01'
    },
    {
      id: 'STR003',
      name: 'Walmart CP Express',
      location: 'Connaught Place, Delhi',
      region: 'Delhi NCR',
      manager: 'Amit Singh',
      openDate: '2021-11-10',
      size: 35000,
      revenue: 1890000,
      target: 2200000,
      customers: 8760,
      staff: 22,
      satisfaction: 4.1,
      efficiency: 82,
      status: 'underperforming',
      format: 'express',
      alerts: 3,
      lastAudit: '2024-06-20'
    },
    {
      id: 'STR004',
      name: 'Walmart Whitefield',
      location: 'Whitefield, Bangalore',
      region: 'Bangalore',
      manager: 'Sneha Reddy',
      openDate: '2022-01-05',
      size: 95000,
      revenue: 2650000,
      target: 2800000,
      customers: 11200,
      staff: 35,
      satisfaction: 4.3,
      efficiency: 90,
      status: 'operational',
      format: 'neighborhood',
      alerts: 1,
      lastAudit: '2024-07-05'
    },
    {
      id: 'STR005',
      name: 'Walmart Hitech City',
      location: 'Hitech City, Hyderabad',
      region: 'Hyderabad',
      manager: 'Vikram Patel',
      openDate: '2023-09-18',
      size: 75000,
      revenue: 1980000,
      target: 2500000,
      customers: 9340,
      staff: 28,
      satisfaction: 4.0,
      efficiency: 85,
      status: 'new',
      format: 'neighborhood',
      alerts: 2,
      lastAudit: '2024-06-30'
    }
  ];

  // Expansion plans
  const expansionPlans: ExpansionPlan[] = [
    {
      id: 'EXP001',
      location: 'Gurgaon Sector 29',
      region: 'Delhi NCR',
      format: 'Supercenter',
      timeline: 'Q2 2025',
      investment: 250000000,
      expectedRevenue: 400000000,
      status: 'construction',
      completion: 65
    },
    {
      id: 'EXP002',
      location: 'Koramangala, Bangalore',
      region: 'Bangalore',
      format: 'Neighborhood Market',
      timeline: 'Q3 2025',
      investment: 150000000,
      expectedRevenue: 280000000,
      status: 'approved',
      completion: 25
    },
    {
      id: 'EXP003',
      location: 'Anna Nagar, Chennai',
      region: 'Chennai',
      format: 'Express',
      timeline: 'Q4 2025',
      investment: 80000000,
      expectedRevenue: 180000000,
      status: 'planning',
      completion: 10
    },
    {
      id: 'EXP004',
      location: 'Vashi, Navi Mumbai',
      region: 'Mumbai',
      format: 'Neighborhood Market',
      timeline: 'Q1 2026',
      investment: 180000000,
      expectedRevenue: 320000000,
      status: 'planning',
      completion: 5
    }
  ];

  const filteredStores = stores.filter(store => {
    return (
      (searchTerm === '' || 
       store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
       store.manager.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRegion === 'all' || store.region === selectedRegion) &&
      (selectedStatus === 'all' || store.status === selectedStatus)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'renovation': return 'bg-yellow-100 text-yellow-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'underperforming': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'supercenter': return 'bg-purple-100 text-purple-800';
      case 'neighborhood': return 'bg-blue-100 text-blue-800';
      case 'express': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpansionStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'construction': return 'bg-yellow-100 text-yellow-800';
      case 'opening-soon': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation role="regional" currentPage="network" />

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Store Network Management</h1>
              <p className="text-gray-600 mt-1">Manage store portfolio and expansion plans</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Store Directory
                </button>
                <button
                  onClick={() => setViewMode('expansion')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'expansion' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Expansion Plans
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add Store
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search stores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Regions</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="operational">Operational</option>
                  <option value="renovation">Renovation</option>
                  <option value="new">New</option>
                  <option value="underperforming">Underperforming</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Store List */}
            <div className="space-y-4">
              {filteredStores.map((store) => (
                <div key={store.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(store.status)}`}>
                          {store.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(store.format)}`}>
                          {store.format}
                        </span>
                        {store.alerts > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            {store.alerts} alerts
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Location & Manager</p>
                          <p className="font-medium text-gray-900">📍 {store.location}</p>
                          <p className="text-sm text-gray-600">👤 {store.manager}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Performance</p>
                          <p className="font-medium text-gray-900">Revenue: {formatIndianCurrency(store.revenue)}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Target: {formatIndianCurrency(store.target)}</span>
                            <span className={`font-medium ${
                              (store.revenue / store.target) >= 0.95 ? 'text-green-600' : 
                              (store.revenue / store.target) >= 0.85 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              ({((store.revenue / store.target) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Operations</p>
                          <p className="font-medium text-gray-900">Staff: {store.staff} • Size: {(store.size / 1000).toFixed(0)}K sq ft</p>
                          <p className="text-sm text-gray-600">Satisfaction: {store.satisfaction}/5 • Efficiency: {store.efficiency}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Opened: {new Date(store.openDate).toLocaleDateString('en-IN')}</span>
                          <span>Last Audit: {new Date(store.lastAudit).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Expansion Plans View */
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600">Active Plans</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{expansionPlans.length}</h3>
                <p className="text-sm text-gray-600">Expansion Projects</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-xs font-medium text-emerald-600">Investment</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {formatIndianCurrency(expansionPlans.reduce((sum, plan) => sum + plan.investment, 0))}
                </h3>
                <p className="text-sm text-gray-600">Total Investment</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-purple-600">Expected</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {formatIndianCurrency(expansionPlans.reduce((sum, plan) => sum + plan.expectedRevenue, 0))}
                </h3>
                <p className="text-sm text-gray-600">Annual Revenue</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-medium text-orange-600">Timeline</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">Q1 2026</h3>
                <p className="text-sm text-gray-600">All Complete</p>
              </div>
            </div>

            {/* Expansion Plans List */}
            <div className="space-y-4">
              {expansionPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.location}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExpansionStatusColor(plan.status)}`}>
                          {plan.status.replace('-', ' ')}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          {plan.format}
                        </span>
                      </div>
                      <p className="text-gray-600">📍 {plan.region} • 📅 {plan.timeline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Progress</p>
                      <p className="text-lg font-bold text-gray-900">{plan.completion}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Investment</p>
                      <p className="text-lg font-semibold text-gray-900">{formatIndianCurrency(plan.investment)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Expected Annual Revenue</p>
                      <p className="text-lg font-semibold text-gray-900">{formatIndianCurrency(plan.expectedRevenue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">ROI Timeline</p>
                      <p className="text-lg font-semibold text-gray-900">{(plan.investment / plan.expectedRevenue).toFixed(1)} years</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Project Progress</span>
                      <span className="text-sm text-gray-500">{plan.completion}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plan.completion}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Target Opening: {plan.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
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

export default StoreNetworkManagement;
