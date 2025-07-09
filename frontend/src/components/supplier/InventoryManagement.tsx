import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface InventoryItem {
  id: string;
  product: string;
  category: string;
  sku: string;
  currentStock: number;
  reorderLevel: number;
  maxCapacity: number;
  unit: string;
  location: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstocked';
  supplier: string;
  costPerUnit: number;
  totalValue: number;
  expiryDate?: string;
  batchNumber?: string;
}

interface StockMovement {
  id: string;
  product: string;
  type: 'incoming' | 'outgoing' | 'adjustment' | 'expired';
  quantity: number;
  reason: string;
  timestamp: string;
  reference?: string;
}

interface WarehouseLocation {
  id: string;
  name: string;
  city: string;
  capacity: number;
  currentUtilization: number;
  status: 'active' | 'maintenance' | 'full';
}

const InventoryManagement: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stock-level');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const warehouseLocations: WarehouseLocation[] = [
    { id: 'WH001', name: 'Mumbai Central Warehouse', city: 'Mumbai', capacity: 10000, currentUtilization: 8500, status: 'active' },
    { id: 'WH002', name: 'Delhi North Distribution Center', city: 'Delhi', capacity: 12000, currentUtilization: 9200, status: 'active' },
    { id: 'WH003', name: 'Bangalore Tech Park Facility', city: 'Bangalore', capacity: 8000, currentUtilization: 7800, status: 'full' },
    { id: 'WH004', name: 'Hyderabad South Hub', city: 'Hyderabad', capacity: 9500, currentUtilization: 5400, status: 'active' },
    { id: 'WH005', name: 'Chennai Port Warehouse', city: 'Chennai', capacity: 11000, currentUtilization: 6800, status: 'maintenance' }
  ];

  const inventoryItems: InventoryItem[] = [
    {
      id: 'INV001',
      product: 'Organic Fuji Apples',
      category: 'Fresh Produce',
      sku: 'APP-ORG-FUJI-1KG',
      currentStock: 1250,
      reorderLevel: 500,
      maxCapacity: 2000,
      unit: 'kg',
      location: 'Mumbai Central Warehouse',
      lastUpdated: '2024-07-08T14:30:00Z',
      status: 'in-stock',
      supplier: 'Bharat Fresh Farms',
      costPerUnit: 180,
      totalValue: 225000,
      expiryDate: '2024-07-20',
      batchNumber: 'BFF-240708-001'
    },
    {
      id: 'INV002',
      product: 'Baby Spinach 250g',
      category: 'Leafy Greens',
      sku: 'SPN-BABY-250G',
      currentStock: 89,
      reorderLevel: 150,
      maxCapacity: 500,
      unit: 'packs',
      location: 'Delhi North Distribution Center',
      lastUpdated: '2024-07-08T11:15:00Z',
      status: 'low-stock',
      supplier: 'Bharat Fresh Farms',
      costPerUnit: 45,
      totalValue: 4005,
      expiryDate: '2024-07-12',
      batchNumber: 'BFF-240706-003'
    },
    {
      id: 'INV003',
      product: 'Organic Carrots 1kg',
      category: 'Root Vegetables',
      sku: 'CAR-ORG-1KG',
      currentStock: 0,
      reorderLevel: 200,
      maxCapacity: 800,
      unit: 'kg',
      location: 'Bangalore Tech Park Facility',
      lastUpdated: '2024-07-08T09:45:00Z',
      status: 'out-of-stock',
      supplier: 'Bharat Fresh Farms',
      costPerUnit: 65,
      totalValue: 0,
      batchNumber: 'BFF-240705-002'
    },
    {
      id: 'INV004',
      product: 'Cherry Tomatoes 400g',
      category: 'Tomatoes',
      sku: 'TOM-CHERRY-400G',
      currentStock: 2100,
      reorderLevel: 300,
      maxCapacity: 1000,
      unit: 'packs',
      location: 'Hyderabad South Hub',
      lastUpdated: '2024-07-08T16:20:00Z',
      status: 'overstocked',
      supplier: 'Bharat Fresh Farms',
      costPerUnit: 85,
      totalValue: 178500,
      expiryDate: '2024-07-15',
      batchNumber: 'BFF-240707-004'
    },
    {
      id: 'INV005',
      product: 'English Cucumbers',
      category: 'Cucumbers',
      sku: 'CUC-ENG-1PC',
      currentStock: 450,
      reorderLevel: 100,
      maxCapacity: 600,
      unit: 'pieces',
      location: 'Chennai Port Warehouse',
      lastUpdated: '2024-07-08T13:10:00Z',
      status: 'in-stock',
      supplier: 'Bharat Fresh Farms',
      costPerUnit: 25,
      totalValue: 11250,
      expiryDate: '2024-07-18',
      batchNumber: 'BFF-240708-005'
    },
    {
      id: 'INV006',
      product: 'Spring Mix 250g',
      category: 'Salad Mix',
      sku: 'SAL-SPRING-250G',
      currentStock: 120,
      reorderLevel: 200,
      maxCapacity: 400,
      unit: 'packs',
      location: 'Mumbai Central Warehouse',
      lastUpdated: '2024-07-08T10:30:00Z',
      status: 'low-stock',
      supplier: 'Bharat Fresh Farms',
      costPerUnit: 55,
      totalValue: 6600,
      expiryDate: '2024-07-14',
      batchNumber: 'BFF-240706-006'
    }
  ];

  const recentMovements: StockMovement[] = [
    {
      id: 'MOV001',
      product: 'Organic Fuji Apples',
      type: 'outgoing',
      quantity: 150,
      reason: 'Order fulfillment - WM-2024-08471',
      timestamp: '2024-07-08T14:30:00Z',
      reference: 'WM-2024-08471'
    },
    {
      id: 'MOV002',
      product: 'Baby Spinach 250g',
      type: 'incoming',
      quantity: 200,
      reason: 'Fresh harvest delivery',
      timestamp: '2024-07-08T11:15:00Z',
      reference: 'BFF-DEL-240708'
    },
    {
      id: 'MOV003',
      product: 'Organic Carrots 1kg',
      type: 'outgoing',
      quantity: 80,
      reason: 'Order fulfillment - WM-2024-08470',
      timestamp: '2024-07-08T09:45:00Z',
      reference: 'WM-2024-08470'
    },
    {
      id: 'MOV004',
      product: 'Spring Mix 250g',
      type: 'expired',
      quantity: 25,
      reason: 'Quality control - expired products',
      timestamp: '2024-07-08T08:20:00Z'
    },
    {
      id: 'MOV005',
      product: 'Cherry Tomatoes 400g',
      type: 'adjustment',
      quantity: -15,
      reason: 'Inventory count correction',
      timestamp: '2024-07-07T16:45:00Z'
    }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesLocation && matchesCategory && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'stock-level':
        return (a.currentStock / a.maxCapacity) - (b.currentStock / b.maxCapacity);
      case 'value':
        return b.totalValue - a.totalValue;
      case 'expiry':
        if (!a.expiryDate) return 1;
        if (!b.expiryDate) return -1;
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      case 'alphabetical':
        return a.product.localeCompare(b.product);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800 border border-green-200';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'out-of-stock': return 'bg-red-100 text-red-800 border border-red-200';
      case 'overstocked': return 'bg-blue-100 text-blue-800 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStockLevelColor = (current: number, reorder: number, max: number) => {
    const percentage = (current / max) * 100;
    if (current === 0) return 'bg-red-500';
    if (current <= reorder) return 'bg-yellow-500';
    if (percentage > 90) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        );
      case 'outgoing':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        );
      case 'adjustment':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        );
      case 'expired':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4h10M7 4a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1" />
          </svg>
        );
    }
  };

  const getWarehouseStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      case 'full': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const categories = ['all', ...Array.from(new Set(inventoryItems.map(item => item.category)))];
  const locations = ['all', ...Array.from(new Set(inventoryItems.map(item => item.location)))];
  const statuses = ['all', 'in-stock', 'low-stock', 'out-of-stock', 'overstocked'];

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // In a real app, this would make an API call to update the item
    console.log('Saving item:', editingItem);
    setShowEditModal(false);
    setEditingItem(null);
    // You would update the inventoryItems state here in a real implementation
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-900">Walmart</span>
                <span className="text-sm text-slate-600 ml-2">OptiChain Supplier Portal</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/supplier/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                Dashboard
              </Link>
              <Link to="/supplier/orders" className="text-slate-700 hover:text-blue-900 font-medium">
                Orders
              </Link>
              <Link to="/supplier/predictions" className="text-slate-700 hover:text-blue-900 font-medium">
                Predictions
              </Link>
              <Link to="/supplier/inventory" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                Inventory
              </Link>
              <Link to="/supplier/analytics" className="text-slate-700 hover:text-blue-900 font-medium">
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
                <span className="text-blue-900 font-bold text-sm">RS</span>
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Inventory Management</h1>
          <p className="text-slate-600">Track and manage your stock levels across all warehouse locations.</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Items</p>
                <p className="text-2xl font-bold text-slate-900">{inventoryItems.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-yellow-600">{inventoryItems.filter(item => item.status === 'low-stock').length}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{inventoryItems.filter(item => item.status === 'out-of-stock').length}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">{formatIndianCurrency(inventoryItems.reduce((sum, item) => sum + item.totalValue, 0))}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search products or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stock-level">Sort by Stock Level</option>
              <option value="value">Sort by Value</option>
              <option value="expiry">Sort by Expiry</option>
              <option value="alphabetical">Sort Alphabetically</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inventory Items */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Inventory Items</h2>
                  <span className="text-sm text-slate-600">{sortedItems.length} items</span>
                </div>
              </div>
              <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                {sortedItems.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    className="p-6 hover:bg-slate-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{item.product}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">SKU: {item.sku}</p>
                        <p className="text-sm text-slate-600">{item.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900">{item.currentStock} {item.unit}</p>
                        <p className="text-sm text-slate-600">{formatIndianCurrency(item.totalValue)}</p>
                      </div>
                    </div>

                    {/* Stock Level Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                        <span>Stock Level</span>
                        <span>{Math.round((item.currentStock / item.maxCapacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStockLevelColor(item.currentStock, item.reorderLevel, item.maxCapacity)}`}
                          style={{ width: `${Math.min((item.currentStock / item.maxCapacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>Reorder: {item.reorderLevel}</span>
                        <span>Max: {item.maxCapacity}</span>
                      </div>
                    </div>

                    {item.expiryDate && (
                      <div className="mb-4">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Expires:</span> {new Date(item.expiryDate).toLocaleDateString()}
                          <span className="ml-2 text-xs text-slate-500">Batch: {item.batchNumber}</span>
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleEditItem(item)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit Product
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                        Update Stock
                      </button>
                      <button className="px-3 py-1 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm">
                        Reorder
                      </button>
                      {item.status === 'low-stock' || item.status === 'out-of-stock' ? (
                        <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm">
                          Urgent Reorder
                        </button>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Warehouse Status */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Warehouse Status</h2>
              </div>
              <div className="p-6 space-y-4">
                {warehouseLocations.map((warehouse) => (
                  <div key={warehouse.id} className="border border-slate-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{warehouse.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWarehouseStatusColor(warehouse.status)}`}>
                        {warehouse.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{warehouse.city}</p>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Utilization</span>
                        <span>{Math.round((warehouse.currentUtilization / warehouse.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${Math.min((warehouse.currentUtilization / warehouse.capacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{warehouse.currentUtilization.toLocaleString()} / {warehouse.capacity.toLocaleString()} units</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Movements */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Recent Movements</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-b-0">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      {getMovementIcon(movement.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 text-sm">{movement.product}</h4>
                      <p className="text-sm text-slate-600">{movement.reason}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-sm font-medium ${
                          movement.type === 'incoming' ? 'text-green-600' : 
                          movement.type === 'outgoing' ? 'text-blue-600' : 
                          movement.type === 'expired' ? 'text-red-600' : 'text-purple-600'
                        }`}>
                          {movement.type === 'incoming' ? '+' : movement.type === 'adjustment' && movement.quantity < 0 ? '' : movement.type === 'outgoing' || movement.type === 'expired' ? '-' : ''}{Math.abs(movement.quantity)}
                        </span>
                        <span className="text-xs text-slate-500">{new Date(movement.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white rounded-lg border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Generate Report</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-900">Bulk Update</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Edit Product</h2>
                <button 
                  onClick={handleCancelEdit}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={editingItem.product}
                    onChange={(e) => setEditingItem({...editingItem, product: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">SKU</label>
                  <input
                    type="text"
                    value={editingItem.sku}
                    onChange={(e) => setEditingItem({...editingItem, sku: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Leafy Greens">Leafy Greens</option>
                    <option value="Root Vegetables">Root Vegetables</option>
                    <option value="Tomatoes">Tomatoes</option>
                    <option value="Cucumbers">Cucumbers</option>
                    <option value="Salad Mix">Salad Mix</option>
                  </select>
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                  <select
                    value={editingItem.unit}
                    onChange={(e) => setEditingItem({...editingItem, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="packs">Packs</option>
                    <option value="pieces">Pieces</option>
                    <option value="grams">Grams</option>
                    <option value="boxes">Boxes</option>
                  </select>
                </div>

                {/* Cost Per Unit */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cost Per Unit (₹)</label>
                  <input
                    type="number"
                    value={editingItem.costPerUnit}
                    onChange={(e) => setEditingItem({...editingItem, costPerUnit: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Current Stock */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Stock</label>
                  <input
                    type="number"
                    value={editingItem.currentStock}
                    onChange={(e) => {
                      const newStock = parseInt(e.target.value) || 0;
                      setEditingItem({
                        ...editingItem, 
                        currentStock: newStock,
                        totalValue: newStock * editingItem.costPerUnit
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                {/* Reorder Level */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Reorder Level</label>
                  <input
                    type="number"
                    value={editingItem.reorderLevel}
                    onChange={(e) => setEditingItem({...editingItem, reorderLevel: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                {/* Max Capacity */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Max Capacity</label>
                  <input
                    type="number"
                    value={editingItem.maxCapacity}
                    onChange={(e) => setEditingItem({...editingItem, maxCapacity: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Warehouse Location</label>
                  <select
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Mumbai Central Warehouse">Mumbai Central Warehouse</option>
                    <option value="Delhi North Distribution Center">Delhi North Distribution Center</option>
                    <option value="Bangalore Tech Park Facility">Bangalore Tech Park Facility</option>
                    <option value="Hyderabad South Hub">Hyderabad South Hub</option>
                    <option value="Chennai Port Warehouse">Chennai Port Warehouse</option>
                  </select>
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={editingItem.expiryDate ? editingItem.expiryDate.split('T')[0] : ''}
                    onChange={(e) => setEditingItem({...editingItem, expiryDate: e.target.value ? e.target.value + 'T00:00:00Z' : undefined})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Batch Number */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Batch Number (Optional)</label>
                  <input
                    type="text"
                    value={editingItem.batchNumber || ''}
                    onChange={(e) => setEditingItem({...editingItem, batchNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., BFF-240708-001"
                  />
                </div>
              </div>

              {/* Calculated Values Display */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-3">Calculated Values</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Total Value:</span>
                    <span className="ml-2 font-semibold text-slate-900">{formatIndianCurrency(editingItem.currentStock * editingItem.costPerUnit)}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Stock Level:</span>
                    <span className="ml-2 font-semibold text-slate-900">{Math.round((editingItem.currentStock / editingItem.maxCapacity) * 100)}%</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Status:</span>
                    <span className={`ml-2 font-semibold ${
                      editingItem.currentStock === 0 ? 'text-red-600' :
                      editingItem.currentStock <= editingItem.reorderLevel ? 'text-yellow-600' :
                      editingItem.currentStock / editingItem.maxCapacity > 0.9 ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {editingItem.currentStock === 0 ? 'Out of Stock' :
                       editingItem.currentStock <= editingItem.reorderLevel ? 'Low Stock' :
                       editingItem.currentStock / editingItem.maxCapacity > 0.9 ? 'Overstocked' :
                       'In Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
