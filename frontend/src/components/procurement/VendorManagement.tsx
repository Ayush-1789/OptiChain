import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { 
  Package, 
  Users, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  FileText,
  Target,
  Award
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

interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  rating: number;
  totalOrders: number;
  totalValue: number;
  onTimeDelivery: number;
  qualityScore: number;
  paymentTerms: string;
  contractStart: string;
  contractEnd: string;
  status: 'excellent' | 'good' | 'average' | 'poor' | 'inactive';
  certifications: string[];
  riskLevel: 'low' | 'medium' | 'high';
  lastDelivery: string;
  nextReview: string;
}

interface VendorMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  color: string;
}

const VendorManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Vendor metrics
  const vendorMetrics: VendorMetric[] = [
    {
      label: 'Total Vendors',
      value: '287',
      change: 8.3,
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      label: 'Active Contracts',
      value: '245',
      change: 5.7,
      trend: 'up',
      color: 'bg-green-500'
    },
    {
      label: 'Avg. Rating',
      value: '4.2',
      change: 3.1,
      trend: 'up',
      color: 'bg-yellow-500'
    },
    {
      label: 'On-Time Delivery',
      value: '91.3%',
      change: 2.8,
      trend: 'up',
      color: 'bg-purple-500'
    }
  ];

  // Vendors data
  const vendors: Vendor[] = [
    {
      id: 'V001',
      name: 'Reliance Industries Ltd.',
      category: 'Electronics',
      location: 'Mumbai, Maharashtra',
      contactPerson: 'Rajesh Sharma',
      email: 'rajesh.sharma@reliance.com',
      phone: '+91 98765 43210',
      rating: 4.8,
      totalOrders: 156,
      totalValue: 125000000,
      onTimeDelivery: 96,
      qualityScore: 98,
      paymentTerms: 'Net 30',
      contractStart: '2024-01-15',
      contractEnd: '2025-01-14',
      status: 'excellent',
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
      riskLevel: 'low',
      lastDelivery: '2024-07-06',
      nextReview: '2024-08-15'
    },
    {
      id: 'V002',
      name: 'Tata Consumer Products Ltd.',
      category: 'Food & Beverages',
      location: 'Kolkata, West Bengal',
      contactPerson: 'Priya Patel',
      email: 'priya.patel@tatacp.com',
      phone: '+91 98765 43211',
      rating: 4.6,
      totalOrders: 203,
      totalValue: 89000000,
      onTimeDelivery: 94,
      qualityScore: 96,
      paymentTerms: 'Net 45',
      contractStart: '2024-02-01',
      contractEnd: '2025-01-31',
      status: 'excellent',
      certifications: ['ISO 9001', 'HACCP', 'BRC'],
      riskLevel: 'low',
      lastDelivery: '2024-07-07',
      nextReview: '2024-09-01'
    },
    {
      id: 'V003',
      name: 'Hindustan Unilever Ltd.',
      category: 'Personal Care',
      location: 'Chennai, Tamil Nadu',
      contactPerson: 'Amit Kumar',
      email: 'amit.kumar@hul.com',
      phone: '+91 98765 43212',
      rating: 4.4,
      totalOrders: 178,
      totalValue: 67000000,
      onTimeDelivery: 91,
      qualityScore: 93,
      paymentTerms: 'Net 30',
      contractStart: '2024-01-01',
      contractEnd: '2024-12-31',
      status: 'good',
      certifications: ['ISO 9001', 'ISO 22716', 'RSPO'],
      riskLevel: 'low',
      lastDelivery: '2024-07-05',
      nextReview: '2024-07-15'
    },
    {
      id: 'V004',
      name: 'Marico Industries Ltd.',
      category: 'Home & Kitchen',
      location: 'Bangalore, Karnataka',
      contactPerson: 'Sneha Gupta',
      email: 'sneha.gupta@marico.com',
      phone: '+91 98765 43213',
      rating: 4.1,
      totalOrders: 142,
      totalValue: 45000000,
      onTimeDelivery: 87,
      qualityScore: 89,
      paymentTerms: 'Net 60',
      contractStart: '2024-03-01',
      contractEnd: '2025-02-28',
      status: 'good',
      certifications: ['ISO 9001', 'ISO 14001'],
      riskLevel: 'medium',
      lastDelivery: '2024-07-03',
      nextReview: '2024-08-01'
    },
    {
      id: 'V005',
      name: 'Dabur India Ltd.',
      category: 'Health & Wellness',
      location: 'Ghaziabad, Uttar Pradesh',
      contactPerson: 'Vikram Singh',
      email: 'vikram.singh@dabur.com',
      phone: '+91 98765 43214',
      rating: 3.8,
      totalOrders: 98,
      totalValue: 32000000,
      onTimeDelivery: 82,
      qualityScore: 85,
      paymentTerms: 'Net 45',
      contractStart: '2024-01-10',
      contractEnd: '2024-12-31',
      status: 'average',
      certifications: ['ISO 9001', 'WHO-GMP'],
      riskLevel: 'medium',
      lastDelivery: '2024-07-01',
      nextReview: '2024-07-20'
    },
    {
      id: 'V006',
      name: 'Godrej Consumer Products Ltd.',
      category: 'Personal Care',
      location: 'Mumbai, Maharashtra',
      contactPerson: 'Kavita Reddy',
      email: 'kavita.reddy@godrej.com',
      phone: '+91 98765 43215',
      rating: 4.3,
      totalOrders: 134,
      totalValue: 54000000,
      onTimeDelivery: 89,
      qualityScore: 91,
      paymentTerms: 'Net 30',
      contractStart: '2024-02-15',
      contractEnd: '2025-02-14',
      status: 'good',
      certifications: ['ISO 9001', 'ISO 22716'],
      riskLevel: 'low',
      lastDelivery: '2024-07-04',
      nextReview: '2024-08-15'
    },
    {
      id: 'V007',
      name: 'ITC Limited',
      category: 'Food & Beverages',
      location: 'Hyderabad, Telangana',
      contactPerson: 'Suresh Nair',
      email: 'suresh.nair@itc.com',
      phone: '+91 98765 43216',
      rating: 4.5,
      totalOrders: 189,
      totalValue: 78000000,
      onTimeDelivery: 93,
      qualityScore: 95,
      paymentTerms: 'Net 45',
      contractStart: '2024-01-20',
      contractEnd: '2025-01-19',
      status: 'excellent',
      certifications: ['ISO 9001', 'HACCP', 'BRC', 'SQF'],
      riskLevel: 'low',
      lastDelivery: '2024-07-06',
      nextReview: '2024-09-20'
    },
    {
      id: 'V008',
      name: 'Nestle India Ltd.',
      category: 'Food & Beverages',
      location: 'Gurgaon, Haryana',
      contactPerson: 'Meera Joshi',
      email: 'meera.joshi@nestle.com',
      phone: '+91 98765 43217',
      rating: 4.7,
      totalOrders: 167,
      totalValue: 92000000,
      onTimeDelivery: 95,
      qualityScore: 97,
      paymentTerms: 'Net 30',
      contractStart: '2024-01-05',
      contractEnd: '2024-12-31',
      status: 'excellent',
      certifications: ['ISO 9001', 'ISO 22000', 'HACCP'],
      riskLevel: 'low',
      lastDelivery: '2024-07-07',
      nextReview: '2024-08-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'all' || vendor.category.toLowerCase().includes(selectedCategory);
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Navigation role="procurement" currentPage="vendors" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
              <p className="text-gray-600 mt-1">Manage vendor relationships and performance</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add Vendor
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>

      {/* Vendor Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {vendorMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <BarChart3 className="h-6 w-6 text-white" />
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
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food & Beverages</option>
            <option value="personal">Personal Care</option>
            <option value="home">Home & Kitchen</option>
            <option value="health">Health & Wellness</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Sort by Rating</option>
            <option value="value">Sort by Value</option>
            <option value="orders">Sort by Orders</option>
            <option value="delivery">Sort by Delivery</option>
          </select>
        </div>
      </div>

      {/* Vendor List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Vendor Directory</h2>
            <span className="text-sm text-gray-500">{filteredVendors.length} vendors</span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{vendor.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                        {vendor.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(vendor.riskLevel)}`}>
                        {vendor.riskLevel} risk
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(vendor.rating)}
                        <span className="ml-1 text-sm text-gray-600">({vendor.rating})</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{vendor.category}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {vendor.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {vendor.contactPerson}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {vendor.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {vendor.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        Contract: {new Date(vendor.contractStart).toLocaleDateString()} - {new Date(vendor.contractEnd).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        {vendor.paymentTerms}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Total Value</h4>
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{formatIndianCurrency(vendor.totalValue)}</p>
                    <p className="text-sm text-gray-600">{vendor.totalOrders} orders</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">On-Time Delivery</h4>
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{vendor.onTimeDelivery}%</p>
                    <p className="text-sm text-gray-600">Last: {new Date(vendor.lastDelivery).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Quality Score</h4>
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{vendor.qualityScore}%</p>
                    <p className="text-sm text-gray-600">Excellent quality</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Next Review</h4>
                      <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{new Date(vendor.nextReview).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Performance review</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Certifications:</span>
                    <div className="flex items-center gap-1">
                      {vendor.certifications.map((cert, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default VendorManagement;
