import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Plus, 
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Truck,
  FileText,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  X
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

interface PurchaseOrder {
  id: string;
  vendor: string;
  category: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  totalValue: number;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  status: 'draft' | 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  urgency: 'high' | 'medium' | 'low';
  approvedBy?: string;
  notes?: string;
  paymentTerms: string;
  deliveryAddress: string;
  contactPerson: string;
  phone: string;
  email: string;
}

interface OrderMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  color: string;
}

const PurchaseOrders: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('orderDate');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Order metrics
  const orderMetrics: OrderMetric[] = [
    {
      label: 'Total Orders',
      value: '1,245',
      change: 12.5,
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      label: 'Total Value',
      value: formatIndianCurrency(785000000),
      change: 18.3,
      trend: 'up',
      color: 'bg-green-500'
    },
    {
      label: 'Pending Approval',
      value: '23',
      change: -8.2,
      trend: 'down',
      color: 'bg-yellow-500'
    },
    {
      label: 'Avg. Order Value',
      value: formatIndianCurrency(630000),
      change: 5.7,
      trend: 'up',
      color: 'bg-purple-500'
    }
  ];

  // Purchase orders data
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: 'PO-2024-001',
      vendor: 'Reliance Industries Ltd.',
      category: 'Electronics',
      items: [
        { name: 'Samsung Smart TV 55"', quantity: 50, unitPrice: 45000, total: 2250000 },
        { name: 'LG Refrigerator 350L', quantity: 30, unitPrice: 35000, total: 1050000 },
        { name: 'Microwave Oven', quantity: 40, unitPrice: 12000, total: 480000 }
      ],
      totalValue: 3780000,
      orderDate: '2024-07-06',
      expectedDelivery: '2024-07-12',
      status: 'shipped',
      urgency: 'high',
      approvedBy: 'Rajesh Kumar',
      notes: 'Urgent delivery required for store opening',
      paymentTerms: 'Net 30',
      deliveryAddress: 'Walmart Store, Andheri West, Mumbai',
      contactPerson: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@walmart.com'
    },
    {
      id: 'PO-2024-002',
      vendor: 'Tata Consumer Products Ltd.',
      category: 'Food & Beverages',
      items: [
        { name: 'Tata Tea Premium 1kg', quantity: 500, unitPrice: 450, total: 225000 },
        { name: 'Tata Salt 1kg', quantity: 1000, unitPrice: 20, total: 20000 },
        { name: 'Tata Sampann Spices', quantity: 200, unitPrice: 85, total: 17000 }
      ],
      totalValue: 262000,
      orderDate: '2024-07-05',
      expectedDelivery: '2024-07-11',
      status: 'approved',
      urgency: 'medium',
      approvedBy: 'Amit Patel',
      paymentTerms: 'Net 45',
      deliveryAddress: 'Walmart Distribution Center, Navi Mumbai',
      contactPerson: 'Sneha Gupta',
      phone: '+91 98765 43211',
      email: 'sneha.gupta@walmart.com'
    },
    {
      id: 'PO-2024-003',
      vendor: 'Hindustan Unilever Ltd.',
      category: 'Personal Care',
      items: [
        { name: 'Dove Soap 100g', quantity: 1000, unitPrice: 35, total: 35000 },
        { name: 'Sunsilk Shampoo 200ml', quantity: 500, unitPrice: 120, total: 60000 },
        { name: 'Fair & Lovely Cream 50g', quantity: 300, unitPrice: 85, total: 25500 }
      ],
      totalValue: 120500,
      orderDate: '2024-07-04',
      expectedDelivery: '2024-07-10',
      actualDelivery: '2024-07-09',
      status: 'delivered',
      urgency: 'low',
      approvedBy: 'Vikram Singh',
      paymentTerms: 'Net 30',
      deliveryAddress: 'Walmart Store, Bandra East, Mumbai',
      contactPerson: 'Kavita Reddy',
      phone: '+91 98765 43212',
      email: 'kavita.reddy@walmart.com'
    },
    {
      id: 'PO-2024-004',
      vendor: 'Marico Industries Ltd.',
      category: 'Home & Kitchen',
      items: [
        { name: 'Parachute Coconut Oil 500ml', quantity: 400, unitPrice: 180, total: 72000 },
        { name: 'Saffola Oil 1L', quantity: 200, unitPrice: 250, total: 50000 },
        { name: 'Hair & Care Oil 300ml', quantity: 300, unitPrice: 95, total: 28500 }
      ],
      totalValue: 150500,
      orderDate: '2024-07-03',
      expectedDelivery: '2024-07-09',
      status: 'pending',
      urgency: 'medium',
      notes: 'Waiting for vendor confirmation',
      paymentTerms: 'Net 60',
      deliveryAddress: 'Walmart Store, Thane West, Mumbai',
      contactPerson: 'Suresh Nair',
      phone: '+91 98765 43213',
      email: 'suresh.nair@walmart.com'
    },
    {
      id: 'PO-2024-005',
      vendor: 'Dabur India Ltd.',
      category: 'Health & Wellness',
      items: [
        { name: 'Dabur Chyawanprash 500g', quantity: 100, unitPrice: 220, total: 22000 },
        { name: 'Dabur Honey 500g', quantity: 150, unitPrice: 280, total: 42000 },
        { name: 'Dabur Amla Hair Oil 300ml', quantity: 200, unitPrice: 85, total: 17000 }
      ],
      totalValue: 81000,
      orderDate: '2024-07-02',
      expectedDelivery: '2024-07-08',
      status: 'cancelled',
      urgency: 'low',
      notes: 'Cancelled due to quality issues',
      paymentTerms: 'Net 45',
      deliveryAddress: 'Walmart Store, Powai, Mumbai',
      contactPerson: 'Meera Joshi',
      phone: '+91 98765 43214',
      email: 'meera.joshi@walmart.com'
    },
    {
      id: 'PO-2024-006',
      vendor: 'Nestle India Ltd.',
      category: 'Food & Beverages',
      items: [
        { name: 'Maggi Noodles 2-min', quantity: 800, unitPrice: 12, total: 9600 },
        { name: 'Nescafe Coffee 100g', quantity: 200, unitPrice: 180, total: 36000 },
        { name: 'KitKat Chocolate', quantity: 500, unitPrice: 25, total: 12500 }
      ],
      totalValue: 58100,
      orderDate: '2024-07-01',
      expectedDelivery: '2024-07-07',
      actualDelivery: '2024-07-06',
      status: 'delivered',
      urgency: 'medium',
      approvedBy: 'Ravi Gupta',
      paymentTerms: 'Net 30',
      deliveryAddress: 'Walmart Store, Malad West, Mumbai',
      contactPerson: 'Anita Sharma',
      phone: '+91 98765 43215',
      email: 'anita.sharma@walmart.com'
    },
    {
      id: 'PO-2024-007',
      vendor: 'ITC Limited',
      category: 'Food & Beverages',
      items: [
        { name: 'Aashirvaad Atta 10kg', quantity: 300, unitPrice: 450, total: 135000 },
        { name: 'Sunfeast Biscuits', quantity: 400, unitPrice: 35, total: 14000 },
        { name: 'Bingo Chips', quantity: 600, unitPrice: 20, total: 12000 }
      ],
      totalValue: 161000,
      orderDate: '2024-06-30',
      expectedDelivery: '2024-07-06',
      status: 'shipped',
      urgency: 'high',
      approvedBy: 'Deepak Patel',
      paymentTerms: 'Net 45',
      deliveryAddress: 'Walmart Distribution Center, Navi Mumbai',
      contactPerson: 'Rohit Kumar',
      phone: '+91 98765 43216',
      email: 'rohit.kumar@walmart.com'
    },
    {
      id: 'PO-2024-008',
      vendor: 'Godrej Consumer Products Ltd.',
      category: 'Personal Care',
      items: [
        { name: 'Cinthol Soap 100g', quantity: 500, unitPrice: 28, total: 14000 },
        { name: 'Godrej Hair Dye', quantity: 100, unitPrice: 85, total: 8500 },
        { name: 'Hit Spray 400ml', quantity: 200, unitPrice: 120, total: 24000 }
      ],
      totalValue: 46500,
      orderDate: '2024-06-29',
      expectedDelivery: '2024-07-05',
      status: 'draft',
      urgency: 'low',
      notes: 'Draft order - awaiting final approval',
      paymentTerms: 'Net 30',
      deliveryAddress: 'Walmart Store, Kandivali West, Mumbai',
      contactPerson: 'Pooja Singh',
      phone: '+91 98765 43217',
      email: 'pooja.singh@walmart.com'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4 text-gray-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'shipped': return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <X className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || order.category.toLowerCase().includes(selectedCategory);
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

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
              <Link to="/procurement/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                Dashboard
              </Link>
              <Link to="/procurement/vendors" className="text-slate-700 hover:text-blue-900 font-medium">
                Vendors
              </Link>
              <Link to="/procurement/orders" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
              <p className="text-gray-600 mt-1">Manage and track all purchase orders</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Orders
              </button>
            </div>
          </div>
        </div>

        {/* Order Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {orderMetrics.map((metric, index) => (
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
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
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
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Purchase Orders</h2>
            <span className="text-sm text-gray-500">{filteredOrders.length} orders</span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
                        {order.urgency} priority
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{order.vendor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        <span>{order.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Order: {new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        <span>Expected: {new Date(order.expectedDelivery).toLocaleDateString()}</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Total Value</h4>
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{formatIndianCurrency(order.totalValue)}</p>
                    <p className="text-sm text-gray-600">{order.items.length} items</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Contact Person</h4>
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-lg font-semibold text-green-600">{order.contactPerson}</p>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Payment Terms</h4>
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-lg font-semibold text-purple-600">{order.paymentTerms}</p>
                    <p className="text-sm text-gray-600">Payment terms</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-gray-600 ml-2">x{item.quantity}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-gray-900">{formatIndianCurrency(item.total)}</span>
                          <span className="text-gray-600 ml-2">@{formatIndianCurrency(item.unitPrice)}</span>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-sm text-gray-500 italic">
                        ... and {order.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Notes:</strong> {order.notes}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Delivery: {order.deliveryAddress}</span>
                    {order.approvedBy && (
                      <span>Approved by: {order.approvedBy}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {order.status === 'draft' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Submit for Approval
                      </button>
                    )}
                    {order.status === 'pending' && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Approve Order
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      View Details
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

export default PurchaseOrders;
