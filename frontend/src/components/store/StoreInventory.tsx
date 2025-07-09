import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  maxStock: number;
  unit: string;
  price: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstocked';
  location: string;
}

interface StockAlert {
  id: string;
  type: 'low_stock' | 'expired' | 'near_expiry' | 'overstock' | 'out_of_stock';
  item: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

const StoreInventory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

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

  // Mock data - replace with real API calls
  const inventoryItems: InventoryItem[] = [
    {
      id: 'INV-001',
      name: 'Organic Basmati Rice 1kg',
      category: 'Grains & Cereals',
      currentStock: 45,
      reorderLevel: 25,
      maxStock: 100,
      unit: 'packets',
      price: 185,
      supplier: 'Rajesh Agro Industries',
      lastRestocked: '2024-07-05',
      location: 'Aisle 3, Shelf B',
      status: 'in_stock'
    },
    {
      id: 'INV-002',
      name: 'Amul Fresh Milk 1L',
      category: 'Dairy & Beverages',
      currentStock: 12,
      reorderLevel: 30,
      maxStock: 80,
      unit: 'bottles',
      price: 62,
      supplier: 'Amul Dairy',
      lastRestocked: '2024-07-07',
      expiryDate: '2024-07-10',
      location: 'Refrigerated Section A',
      status: 'low_stock'
    },
    {
      id: 'INV-003',
      name: 'Tata Tea Premium 250g',
      category: 'Beverages',
      currentStock: 0,
      reorderLevel: 20,
      maxStock: 60,
      unit: 'packets',
      price: 145,
      supplier: 'Tata Consumer Products',
      lastRestocked: '2024-07-02',
      location: 'Aisle 5, Shelf C',
      status: 'out_of_stock'
    },
    {
      id: 'INV-004',
      name: 'Britannia Good Day Cookies 150g',
      category: 'Snacks & Confectionery',
      currentStock: 95,
      reorderLevel: 30,
      maxStock: 80,
      unit: 'packets',
      price: 65,
      supplier: 'Britannia Industries',
      lastRestocked: '2024-07-06',
      location: 'Aisle 7, Shelf A',
      status: 'overstocked'
    },
    {
      id: 'INV-005',
      name: 'Patanjali Honey 500g',
      category: 'Health & Wellness',
      currentStock: 28,
      reorderLevel: 15,
      maxStock: 50,
      unit: 'jars',
      price: 295,
      supplier: 'Patanjali Ayurved',
      lastRestocked: '2024-07-04',
      location: 'Aisle 9, Shelf B',
      status: 'in_stock'
    },
    {
      id: 'INV-006',
      name: 'Maggi 2-Minute Noodles 70g',
      category: 'Instant Foods',
      currentStock: 18,
      reorderLevel: 25,
      maxStock: 75,
      unit: 'packets',
      price: 14,
      supplier: 'Nestlé India',
      lastRestocked: '2024-07-03',
      location: 'Aisle 6, Shelf D',
      status: 'low_stock'
    }
  ];

  const stockAlerts: StockAlert[] = [
    {
      id: '1',
      type: 'out_of_stock',
      item: 'Tata Tea Premium 250g',
      message: 'Out of stock - Immediate reorder required',
      severity: 'high',
      timestamp: '1 hour ago'
    },
    {
      id: '2',
      type: 'low_stock',
      item: 'Amul Fresh Milk 1L',
      message: 'Stock below reorder level (12/30 units)',
      severity: 'high',
      timestamp: '2 hours ago'
    },
    {
      id: '3',
      type: 'near_expiry',
      item: 'Amul Fresh Milk 1L',
      message: 'Expiring in 2 days (July 10, 2024)',
      severity: 'medium',
      timestamp: '3 hours ago'
    },
    {
      id: '4',
      type: 'overstock',
      item: 'Britannia Good Day Cookies 150g',
      message: 'Stock exceeds maximum level (95/80 units)',
      severity: 'low',
      timestamp: '4 hours ago'
    }
  ];

  const categories = [
    'all',
    'Grains & Cereals',
    'Dairy & Beverages',
    'Beverages',
    'Snacks & Confectionery',
    'Health & Wellness',
    'Instant Foods'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'low_stock': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'out_of_stock': return 'bg-red-100 text-red-800 border border-red-200';
      case 'overstocked': return 'bg-blue-100 text-blue-800 border border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return (
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'low_stock':
        return (
          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'out_of_stock':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'overstocked':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-amber-500 bg-amber-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
                <span className="text-sm text-slate-600 ml-2">Store Manager Portal</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/store/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                Dashboard
              </Link>
              <Link to="/store/inventory" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                Inventory
              </Link>
              <Link to="/store/staff" className="text-slate-700 hover:text-blue-900 font-medium">
                Staff
              </Link>
              <Link to="/store/customer" className="text-slate-700 hover:text-blue-900 font-medium">
                Customer
              </Link>
              <Link to="/store/operations" className="text-slate-700 hover:text-blue-900 font-medium">
                Operations
              </Link>
              <Link to="/store/analytics" className="text-slate-700 hover:text-blue-900 font-medium">
                Analytics
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-slate-500 hover:text-slate-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">AS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Store Inventory Management</h1>
          <p className="text-slate-600">Monitor stock levels, manage reorders, and track inventory health.</p>
        </motion.div>

        {/* Inventory Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">1,247</h3>
            <p className="text-sm text-slate-600 font-medium">Total SKUs</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">1,189</h3>
            <p className="text-sm text-slate-600 font-medium">In Stock</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">43</h3>
            <p className="text-sm text-slate-600 font-medium">Low Stock</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">15</h3>
            <p className="text-sm text-slate-600 font-medium">Out of Stock</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inventory List */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg border border-slate-200">
              {/* Search and Filters */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search inventory..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Inventory Items */}
              <div className="divide-y divide-slate-200">
                {filteredItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                          {item.id}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span>{item.status.replace('_', ' ').toUpperCase()}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">{formatIndianCurrency(item.price)}</div>
                        <div className="text-sm text-slate-600">per {item.unit.slice(0, -1)}</div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-slate-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-slate-600 mb-3">{item.category} • {item.supplier}</p>
                    
                    {/* Stock Level Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Stock Level</span>
                        <span>{item.currentStock}/{item.maxStock} {item.unit}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.status === 'out_of_stock' ? 'bg-red-500' :
                            item.status === 'low_stock' ? 'bg-amber-500' :
                            item.status === 'overstocked' ? 'bg-blue-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{item.location}</span>
                      <div className="flex items-center space-x-4">
                        <span>Reorder: {item.reorderLevel}</span>
                        <span>Last: {new Date(item.lastRestocked).toLocaleDateString()}</span>
                        {item.expiryDate && (
                          <span className="text-amber-600 font-medium">
                            Expires: {new Date(item.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Alerts & Actions */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Stock Alerts */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Stock Alerts</h2>
              </div>
              <div className="p-6 space-y-4">
                {stockAlerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertSeverityColor(alert.severity)}`}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {alert.type === 'low_stock' && (
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        )}
                        {alert.type === 'out_of_stock' && (
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {alert.type === 'near_expiry' && (
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {alert.type === 'overstock' && (
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 mb-1">{alert.item}</h4>
                        <p className="text-sm text-slate-700 mb-1">{alert.message}</p>
                        <p className="text-xs text-slate-500">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Urgent Reorders</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Stock Audit</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Add New Item</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Generate Report</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StoreInventory;
