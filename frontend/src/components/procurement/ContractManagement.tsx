import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock, 
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  RefreshCw,
  X,
  Award,
  Mail,
  Phone,
  MapPin
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

interface Contract {
  id: string;
  vendor: string;
  title: string;
  category: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'renewal' | 'terminated' | 'draft';
  renewalDate?: string;
  paymentTerms: string;
  deliveryTerms: string;
  penaltyClause: boolean;
  performanceMetrics: {
    deliveryCompliance: number;
    qualityScore: number;
    costSavings: number;
  };
  contactPerson: string;
  email: string;
  phone: string;
  riskLevel: 'low' | 'medium' | 'high';
  lastModified: string;
}

interface ContractMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  color: string;
}

const ContractManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showContractDetails, setShowContractDetails] = useState(false);

  // Contract metrics
  const contractMetrics: ContractMetric[] = [
    {
      label: 'Total Contract Value',
      value: formatIndianCurrency(2850000000),
      change: 18.5,
      icon: <DollarSign className="h-6 w-6" />,
      trend: 'up',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'Active Contracts',
      value: '156',
      change: 5.2,
      icon: <FileText className="h-6 w-6" />,
      trend: 'up',
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Renewal Due',
      value: '23',
      change: -8.1,
      icon: <Calendar className="h-6 w-6" />,
      trend: 'down',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      label: 'Compliance Score',
      value: '92.3%',
      change: 3.4,
      icon: <Award className="h-6 w-6" />,
      trend: 'up',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  // Sample contracts data
  const contracts: Contract[] = [
    {
      id: 'CON001',
      vendor: 'Reliance Industries',
      title: 'Electronics Supply Agreement',
      category: 'Electronics',
      value: 450000000,
      startDate: '2024-01-15',
      endDate: '2026-01-14',
      status: 'active',
      renewalDate: '2025-10-15',
      paymentTerms: 'NET 30',
      deliveryTerms: 'FOB Destination',
      penaltyClause: true,
      performanceMetrics: {
        deliveryCompliance: 96.5,
        qualityScore: 94.8,
        costSavings: 12.3
      },
      contactPerson: 'Priya Sharma',
      email: 'priya.sharma@reliance.com',
      phone: '+91 98765 43210',
      riskLevel: 'low',
      lastModified: '2024-01-10'
    },
    {
      id: 'CON002',
      vendor: 'Tata Consumer Products',
      title: 'Food & Beverage Supply Contract',
      category: 'Food & Beverage',
      value: 320000000,
      startDate: '2023-08-01',
      endDate: '2025-07-31',
      status: 'renewal',
      renewalDate: '2025-05-01',
      paymentTerms: 'NET 45',
      deliveryTerms: 'Ex-Works',
      penaltyClause: true,
      performanceMetrics: {
        deliveryCompliance: 89.2,
        qualityScore: 92.1,
        costSavings: 8.7
      },
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh.kumar@tata.com',
      phone: '+91 87654 32109',
      riskLevel: 'medium',
      lastModified: '2024-01-08'
    },
    {
      id: 'CON003',
      vendor: 'ITC Limited',
      title: 'Personal Care Products Agreement',
      category: 'Personal Care',
      value: 180000000,
      startDate: '2024-02-01',
      endDate: '2027-01-31',
      status: 'active',
      paymentTerms: 'NET 30',
      deliveryTerms: 'FOB Origin',
      penaltyClause: false,
      performanceMetrics: {
        deliveryCompliance: 94.7,
        qualityScore: 96.3,
        costSavings: 15.2
      },
      contactPerson: 'Anjali Gupta',
      email: 'anjali.gupta@itc.in',
      phone: '+91 76543 21098',
      riskLevel: 'low',
      lastModified: '2024-01-09'
    },
    {
      id: 'CON004',
      vendor: 'Godrej Consumer Products',
      title: 'Home & Garden Supply Contract',
      category: 'Home & Garden',
      value: 95000000,
      startDate: '2023-11-01',
      endDate: '2025-10-31',
      status: 'active',
      paymentTerms: 'NET 60',
      deliveryTerms: 'CIF',
      penaltyClause: true,
      performanceMetrics: {
        deliveryCompliance: 87.3,
        qualityScore: 89.5,
        costSavings: 6.8
      },
      contactPerson: 'Vikram Singh',
      email: 'vikram.singh@godrej.com',
      phone: '+91 65432 10987',
      riskLevel: 'high',
      lastModified: '2024-01-07'
    },
    {
      id: 'CON005',
      vendor: 'Hindustan Unilever',
      title: 'Beauty & Personal Care Supply',
      category: 'Personal Care',
      value: 275000000,
      startDate: '2024-03-01',
      endDate: '2026-02-28',
      status: 'active',
      paymentTerms: 'NET 30',
      deliveryTerms: 'FOB Destination',
      penaltyClause: true,
      performanceMetrics: {
        deliveryCompliance: 98.1,
        qualityScore: 97.2,
        costSavings: 18.9
      },
      contactPerson: 'Meera Patel',
      email: 'meera.patel@hul.co.in',
      phone: '+91 54321 09876',
      riskLevel: 'low',
      lastModified: '2024-01-11'
    },
    {
      id: 'CON006',
      vendor: 'Emami Limited',
      title: 'Health & Wellness Products',
      category: 'Health & Wellness',
      value: 150000000,
      startDate: '2023-06-01',
      endDate: '2025-05-31',
      status: 'renewal',
      renewalDate: '2025-03-01',
      paymentTerms: 'NET 45',
      deliveryTerms: 'Ex-Works',
      penaltyClause: false,
      performanceMetrics: {
        deliveryCompliance: 91.8,
        qualityScore: 93.4,
        costSavings: 11.5
      },
      contactPerson: 'Arjun Mehta',
      email: 'arjun.mehta@emami.com',
      phone: '+91 43210 98765',
      riskLevel: 'medium',
      lastModified: '2024-01-06'
    }
  ];

  // Filter contracts based on search and filters
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || contract.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || contract.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'renewal': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'terminated': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContractClick = (contract: Contract) => {
    setSelectedContract(contract);
    setShowContractDetails(true);
  };

  const categories = Array.from(new Set(contracts.map(contract => contract.category)));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Navigation role="procurement" currentPage="contracts" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contract Management</h1>
              <p className="text-gray-600 mt-1">Manage vendor contracts and agreements</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                New Contract
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contractMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Contracts</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by vendor, title, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="renewal">Renewal Due</option>
                <option value="expired">Expired</option>
                <option value="terminated">Terminated</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Contracts ({filteredContracts.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                        <div className="text-sm text-gray-500">{contract.id} • {contract.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contract.vendor}</div>
                      <div className="text-sm text-gray-500">{contract.contactPerson}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatIndianCurrency(contract.value)}</div>
                      <div className="text-sm text-gray-500">{contract.paymentTerms}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(contract.startDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">to {new Date(contract.endDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                        {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.performanceMetrics.deliveryCompliance}% delivery</div>
                      <div className="text-sm text-gray-500">{contract.performanceMetrics.qualityScore}% quality</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(contract.riskLevel)}`}>
                        {contract.riskLevel.charAt(0).toUpperCase() + contract.riskLevel.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleContractClick(contract)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Contract Details Modal */}
      {showContractDetails && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Contract Details</h2>
              <button
                onClick={() => setShowContractDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Contract Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contract ID</label>
                      <p className="text-sm text-gray-900">{selectedContract.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <p className="text-sm text-gray-900">{selectedContract.title}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900">{selectedContract.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contract Value</label>
                      <p className="text-sm text-gray-900">{formatIndianCurrency(selectedContract.value)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedContract.status)}`}>
                        {selectedContract.status.charAt(0).toUpperCase() + selectedContract.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vendor</label>
                      <p className="text-sm text-gray-900">{selectedContract.vendor}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                      <p className="text-sm text-gray-900">{selectedContract.contactPerson}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedContract.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{selectedContract.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Risk Level</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(selectedContract.riskLevel)}`}>
                        {selectedContract.riskLevel.charAt(0).toUpperCase() + selectedContract.riskLevel.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Terms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <p className="text-sm text-gray-900">{new Date(selectedContract.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <p className="text-sm text-gray-900">{new Date(selectedContract.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
                      <p className="text-sm text-gray-900">{selectedContract.paymentTerms}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Delivery Terms</label>
                      <p className="text-sm text-gray-900">{selectedContract.deliveryTerms}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Penalty Clause</label>
                      <p className="text-sm text-gray-900">{selectedContract.penaltyClause ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Modified</label>
                      <p className="text-sm text-gray-900">{new Date(selectedContract.lastModified).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Delivery Compliance</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900 mt-2">{selectedContract.performanceMetrics.deliveryCompliance}%</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Quality Score</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900 mt-2">{selectedContract.performanceMetrics.qualityScore}%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-purple-800">Cost Savings</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900 mt-2">{selectedContract.performanceMetrics.costSavings}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => setShowContractDetails(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Contract
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Renew Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractManagement;
