import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';

interface Order {
  id: string;
  storeLocation: string;
  products: {
    name: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
  }[];
  totalValue: number;
  orderDate: string;
  deadline: string;
  status: 'pending' | 'confirmed' | 'in-production' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  paymentStatus: 'pending' | 'partial' | 'completed';
  notes?: string;
  estimatedDelivery: string;
}

const OrderManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('deadline');

  // Helper function to format Indian currency
  const formatIndianCurrency = (amount: number): string => {
    if (amount >= 10000000) { // 1 crore
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) { // 1 lakh
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else if (amount >= 1000) { // 1 thousand
      return `₹${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const orders: Order[] = [
    {
      id: 'WM-2024-08471',
      storeLocation: 'Mumbai Supercenter #001',
      products: [
        { name: 'Organic Fuji Apples', quantity: 50, unit: 'kg', pricePerUnit: 180 },
        { name: 'Baby Spinach', quantity: 30, unit: 'packs (250g)', pricePerUnit: 45 },
        { name: 'Organic Carrots', quantity: 25, unit: 'kg', pricePerUnit: 65 }
      ],
      totalValue: 126250,
      orderDate: '2024-07-08',
      deadline: '2024-07-12',
      status: 'confirmed',
      priority: 'high',
      paymentStatus: 'pending',
      estimatedDelivery: '2024-07-11',
      notes: 'Store manager requested early morning delivery (6-8 AM) for fresh produce section restocking.'
    },
    {
      id: 'WM-2024-08472',
      storeLocation: 'Delhi Neighborhood Market #3029',
      products: [
        { name: 'Bananas', quantity: 40, unit: 'kg', pricePerUnit: 35 },
        { name: 'Strawberries', quantity: 20, unit: 'packs (500g)', pricePerUnit: 120 }
      ],
      totalValue: 38000,
      orderDate: '2024-07-07',
      deadline: '2024-07-13',
      status: 'in-production',
      priority: 'medium',
      paymentStatus: 'partial',
      estimatedDelivery: '2024-07-12'
    },
    {
      id: 'WM-2024-08473',
      storeLocation: 'Bangalore Supercenter #0004',
      products: [
        { name: 'Spring Mix Lettuce', quantity: 35, unit: 'packs (250g)', pricePerUnit: 55 },
        { name: 'Cherry Tomatoes', quantity: 28, unit: 'packs (400g)', pricePerUnit: 85 },
        { name: 'English Cucumbers', quantity: 45, unit: 'pieces', pricePerUnit: 25 },
        { name: 'Bell Peppers (Mixed)', quantity: 20, unit: 'kg', pricePerUnit: 95 }
      ],
      totalValue: 61900,
      orderDate: '2024-07-06',
      deadline: '2024-07-14',
      status: 'shipped',
      priority: 'medium',
      paymentStatus: 'completed',
      estimatedDelivery: '2024-07-13'
    },
    {
      id: 'WM-2024-08474',
      storeLocation: 'Hyderabad Supercenter #0100',
      products: [
        { name: 'Romaine Hearts', quantity: 25, unit: 'packs (3pc)', pricePerUnit: 75 },
        { name: 'Avocados', quantity: 30, unit: 'pieces', pricePerUnit: 45 },
        { name: 'Grape Tomatoes', quantity: 22, unit: 'packs (500g)', pricePerUnit: 90 }
      ],
      totalValue: 52050,
      orderDate: '2024-07-05',
      deadline: '2024-07-15',
      status: 'delivered',
      priority: 'low',
      paymentStatus: 'completed',
      estimatedDelivery: '2024-07-14'
    },
    {
      id: 'WM-2024-08475',
      storeLocation: 'Chennai Express Market #2050',
      products: [
        { name: 'Green Capsicum', quantity: 35, unit: 'kg', pricePerUnit: 70 },
        { name: 'Broccoli', quantity: 18, unit: 'pieces', pricePerUnit: 55 },
        { name: 'Cauliflower', quantity: 20, unit: 'pieces', pricePerUnit: 40 }
      ],
      totalValue: 42400,
      orderDate: '2024-07-08',
      deadline: '2024-07-16',
      status: 'pending',
      priority: 'low',
      paymentStatus: 'pending',
      estimatedDelivery: '2024-07-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'in-production': return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-slate-100 text-slate-800 border border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-amber-500 bg-amber-50';
      case 'low': return 'border-l-emerald-500 bg-emerald-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'partial': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || order.priority === selectedPriority;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.storeLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.totalValue, 0);
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending').length;
  const urgentOrders = filteredOrders.filter(order => order.priority === 'high' && order.status !== 'delivered').length;

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navigation role="supplier" currentPage="orders" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Management</h1>
          <p className="text-slate-600">Track and manage all your orders across India's Walmart locations.</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Order Value</p>
                <p className="text-2xl font-bold text-slate-900">{formatIndianCurrency(totalValue)}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Pending Orders</p>
                <p className="text-2xl font-bold text-slate-900">{pendingOrders}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Urgent Orders</p>
                <p className="text-2xl font-bold text-slate-900">{urgentOrders}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="bg-white rounded-lg border border-slate-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Search Orders</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by order ID, location, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-production">In Production</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="deadline">Deadline</option>
                <option value="orderDate">Order Date</option>
                <option value="totalValue">Total Value</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredOrders.map((order, index) => (
            <motion.div 
              key={order.id}
              className={`bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200 border-l-4 ${getPriorityColor(order.priority)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="p-6">
                {/* Order Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <span className="font-mono text-lg font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded">
                      {order.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      Payment: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">{formatIndianCurrency(order.totalValue)}</p>
                    <p className="text-sm text-slate-600">
                      {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)} Priority
                    </p>
                  </div>
                </div>

                {/* Store and Dates */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Store Location</p>
                    <p className="text-slate-900 font-semibold">{order.storeLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Order Date</p>
                    <p className="text-slate-900">{new Date(order.orderDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Deadline</p>
                    <p className="text-slate-900 font-semibold">{new Date(order.deadline).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-4">
                  <p className="text-sm text-slate-600 font-medium mb-3">Products Ordered</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-slate-900">{product.name}</p>
                            <p className="text-sm text-slate-600">
                              {product.quantity} {product.unit} × ₹{product.pricePerUnit}
                            </p>
                          </div>
                          <p className="font-semibold text-slate-900">
                            ₹{(product.quantity * product.pricePerUnit).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Estimated Delivery</p>
                    <p className="text-slate-900">{new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}</p>
                  </div>
                  {order.notes && (
                    <div>
                      <p className="text-sm text-slate-600 font-medium">Notes</p>
                      <p className="text-slate-900 text-sm">{order.notes}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-200">
                  {order.status === 'pending' && (
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium">
                      Confirm Order
                    </button>
                  )}
                  {(order.status === 'confirmed' || order.status === 'in-production') && (
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                      Update Status
                    </button>
                  )}
                  {(order.status === 'confirmed' || order.status === 'in-production') && (
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium">
                      Schedule Pickup
                    </button>
                  )}
                  {(order.status === 'shipped' || order.status === 'delivered') && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                      Generate Invoice
                    </button>
                  )}
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium">
                    View PO
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium">
                    Track Shipment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No orders found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
