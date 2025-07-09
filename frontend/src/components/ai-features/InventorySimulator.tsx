import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  currentStock: number;
  reorderPoint: number;
  maxStock: number;
  dailyDemand: number;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  leadTime: number;
  seasonalityFactor: number;
  popularity: 'high' | 'medium' | 'low';
  location: string;
  sku: string;
}

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  type: 'custom' | 'predefined';
  category: 'demand' | 'supply' | 'seasonal' | 'competitive' | 'economic';
  parameters: {
    demandMultiplier: number;
    supplyDisruption: number;
    priceImpact: number;
    duration: number;
    seasonalBoost: number;
  };
  isCustom: boolean;
  createdBy?: string;
  createdAt?: Date;
}

interface SimulationConfig {
  selectedProducts: string[];
  timeHorizon: number;
  iterations: number;
  confidenceLevel: number;
  includeSeasonality: boolean;
  includeCompetition: boolean;
  includeSupplyChain: boolean;
}

interface SimulationResult {
  productId: string;
  productName: string;
  currentMetrics: {
    stock: number;
    turnover: number;
    margin: number;
    stockoutRisk: number;
  };
  projectedMetrics: {
    stock: number;
    turnover: number;
    margin: number;
    stockoutRisk: number;
    revenueImpact: number;
    costSaving: number;
  };
  recommendations: string[];
  riskFactors: string[];
  optimalActions: {
    action: string;
    priority: 'high' | 'medium' | 'low';
    timeline: string;
    impact: number;
  }[];
}

const InventorySimulator: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'scenarios' | 'simulation' | 'results'>('products');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig>({
    selectedProducts: [],
    timeHorizon: 30,
    iterations: 1000,
    confidenceLevel: 95,
    includeSeasonality: true,
    includeCompetition: true,
    includeSupplyChain: true
  });
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [customScenario, setCustomScenario] = useState<Partial<SimulationScenario>>({
    name: '',
    description: '',
    parameters: {
      demandMultiplier: 1.0,
      supplyDisruption: 0,
      priceImpact: 0,
      duration: 30,
      seasonalBoost: 0
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCustomScenario, setShowCustomScenario] = useState(false);

  // Mock products data with comprehensive Indian retail context
  const products: Product[] = [
    {
      id: 'p1',
      name: 'Basmati Rice Premium 1kg',
      category: 'Grocery',
      brand: 'India Gate',
      currentStock: 450,
      reorderPoint: 100,
      maxStock: 800,
      dailyDemand: 25,
      costPrice: 85,
      sellingPrice: 120,
      supplier: 'Punjab Grains Ltd',
      leadTime: 3,
      seasonalityFactor: 1.2,
      popularity: 'high',
      location: 'Aisle 3-A',
      sku: 'GRC-IG-001'
    },
    {
      id: 'p2',
      name: 'Samsung LED TV 32"',
      category: 'Electronics',
      brand: 'Samsung',
      currentStock: 15,
      reorderPoint: 5,
      maxStock: 30,
      dailyDemand: 2,
      costPrice: 18500,
      sellingPrice: 22000,
      supplier: 'Samsung India',
      leadTime: 7,
      seasonalityFactor: 1.5,
      popularity: 'medium',
      location: 'Electronics Section',
      sku: 'ELE-SAM-001'
    },
    {
      id: 'p3',
      name: 'Amul Fresh Milk 1L',
      category: 'Dairy',
      brand: 'Amul',
      currentStock: 200,
      reorderPoint: 50,
      maxStock: 400,
      dailyDemand: 45,
      costPrice: 52,
      sellingPrice: 60,
      supplier: 'Amul Dairy',
      leadTime: 1,
      seasonalityFactor: 1.1,
      popularity: 'high',
      location: 'Dairy Section',
      sku: 'DAI-AML-001'
    },
    {
      id: 'p4',
      name: 'Colgate Total Toothpaste',
      category: 'Personal Care',
      brand: 'Colgate',
      currentStock: 180,
      reorderPoint: 40,
      maxStock: 300,
      dailyDemand: 12,
      costPrice: 45,
      sellingPrice: 65,
      supplier: 'Colgate India',
      leadTime: 5,
      seasonalityFactor: 1.0,
      popularity: 'medium',
      location: 'Personal Care',
      sku: 'PC-COL-001'
    },
    {
      id: 'p5',
      name: 'Diwali Decoration Lights',
      category: 'Seasonal',
      brand: 'Philips',
      currentStock: 50,
      reorderPoint: 20,
      maxStock: 200,
      dailyDemand: 8,
      costPrice: 120,
      sellingPrice: 180,
      supplier: 'Philips India',
      leadTime: 10,
      seasonalityFactor: 3.0,
      popularity: 'high',
      location: 'Seasonal Section',
      sku: 'SEA-PHI-001'
    },
    {
      id: 'p6',
      name: 'Tata Salt 1kg',
      category: 'Grocery',
      brand: 'Tata',
      currentStock: 300,
      reorderPoint: 80,
      maxStock: 500,
      dailyDemand: 20,
      costPrice: 18,
      sellingPrice: 25,
      supplier: 'Tata Consumer',
      leadTime: 4,
      seasonalityFactor: 1.0,
      popularity: 'high',
      location: 'Aisle 2-B',
      sku: 'GRC-TAT-001'
    },
    {
      id: 'p7',
      name: 'Lakme Lipstick',
      category: 'Cosmetics',
      brand: 'Lakme',
      currentStock: 80,
      reorderPoint: 25,
      maxStock: 150,
      dailyDemand: 6,
      costPrice: 180,
      sellingPrice: 250,
      supplier: 'Hindustan Unilever',
      leadTime: 7,
      seasonalityFactor: 1.4,
      popularity: 'medium',
      location: 'Cosmetics Counter',
      sku: 'COS-LAK-001'
    },
    {
      id: 'p8',
      name: 'Britannia Good Day Cookies',
      category: 'Snacks',
      brand: 'Britannia',
      currentStock: 120,
      reorderPoint: 30,
      maxStock: 200,
      dailyDemand: 15,
      costPrice: 25,
      sellingPrice: 35,
      supplier: 'Britannia Industries',
      leadTime: 2,
      seasonalityFactor: 1.1,
      popularity: 'high',
      location: 'Snacks Aisle',
      sku: 'SNK-BRI-001'
    }
  ];

  // Predefined scenarios
  const predefinedScenarios: SimulationScenario[] = [
    {
      id: 's1',
      name: 'Diwali Festival Surge',
      description: 'Major festival season with 200-300% increase in demand for seasonal items, electronics, and food items',
      type: 'predefined',
      category: 'seasonal',
      parameters: {
        demandMultiplier: 2.5,
        supplyDisruption: 0.1,
        priceImpact: 0.15,
        duration: 21,
        seasonalBoost: 0.8
      },
      isCustom: false
    },
    {
      id: 's2',
      name: 'Monsoon Supply Chain Disruption',
      description: 'Heavy rainfall disrupting transportation and supply chain from major distribution centers',
      type: 'predefined',
      category: 'supply',
      parameters: {
        demandMultiplier: 1.1,
        supplyDisruption: 0.6,
        priceImpact: 0.25,
        duration: 14,
        seasonalBoost: 0
      },
      isCustom: false
    },
    {
      id: 's3',
      name: 'Competitor Price War',
      description: 'Aggressive pricing by competitors requiring strategic inventory and pricing adjustments',
      type: 'predefined',
      category: 'competitive',
      parameters: {
        demandMultiplier: 0.8,
        supplyDisruption: 0,
        priceImpact: -0.2,
        duration: 45,
        seasonalBoost: 0
      },
      isCustom: false
    },
    {
      id: 's4',
      name: 'Economic Recession Impact',
      description: 'Economic downturn affecting consumer spending patterns and demand for premium products',
      type: 'predefined',
      category: 'economic',
      parameters: {
        demandMultiplier: 0.7,
        supplyDisruption: 0.05,
        priceImpact: -0.15,
        duration: 90,
        seasonalBoost: 0
      },
      isCustom: false
    }
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₹${amount.toFixed(0)}`;
    }
  };

  // Handle product selection
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Select all filtered products
  const selectAllProducts = () => {
    setSelectedProducts(filteredProducts.map(p => p.id));
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedProducts([]);
  };

  // Create custom scenario
  const createCustomScenario = () => {
    if (!customScenario.name || !customScenario.description) {
      alert('Please fill in scenario name and description');
      return;
    }

    const newScenario: SimulationScenario = {
      id: `custom_${Date.now()}`,
      name: customScenario.name,
      description: customScenario.description,
      type: 'custom',
      category: 'demand',
      parameters: customScenario.parameters || {
        demandMultiplier: 1.0,
        supplyDisruption: 0,
        priceImpact: 0,
        duration: 30,
        seasonalBoost: 0
      },
      isCustom: true,
      createdBy: 'Current User',
      createdAt: new Date()
    };

    setSelectedScenario(newScenario);
    setShowCustomScenario(false);
    setActiveTab('simulation');
  };

  // Run simulation
  const runSimulation = async () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    if (!selectedScenario) {
      alert('Please select a scenario');
      return;
    }

    setIsRunning(true);
    setActiveTab('results');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock results
    const results: SimulationResult[] = selectedProducts.map(productId => {
      const product = products.find(p => p.id === productId)!;
      const scenario = selectedScenario;
      
      const baseRevenue = product.currentStock * product.sellingPrice;
      const revenueImpact = baseRevenue * scenario.parameters.demandMultiplier * 0.1;
      const costSaving = product.currentStock * product.costPrice * 0.05;

      return {
        productId: product.id,
        productName: product.name,
        currentMetrics: {
          stock: product.currentStock,
          turnover: product.dailyDemand * 365 / product.currentStock,
          margin: ((product.sellingPrice - product.costPrice) / product.sellingPrice) * 100,
          stockoutRisk: product.currentStock <= product.reorderPoint ? 0.8 : 0.2
        },
        projectedMetrics: {
          stock: Math.max(0, product.currentStock * (1 + scenario.parameters.demandMultiplier * 0.1)),
          turnover: (product.dailyDemand * scenario.parameters.demandMultiplier * 365) / product.currentStock,
          margin: ((product.sellingPrice - product.costPrice) / product.sellingPrice) * 100 * (1 + scenario.parameters.priceImpact),
          stockoutRisk: Math.max(0, Math.min(1, (product.currentStock <= product.reorderPoint ? 0.8 : 0.2) + scenario.parameters.supplyDisruption)),
          revenueImpact,
          costSaving
        },
        recommendations: [
          `Adjust safety stock to ${Math.ceil(product.reorderPoint * 1.2)} units`,
          `Implement dynamic pricing strategy`,
          `Monitor competitor pricing closely`,
          `Optimize supplier lead times`
        ],
        riskFactors: [
          'Seasonal demand volatility',
          'Supply chain disruptions',
          'Competitor actions',
          'Economic conditions'
        ],
        optimalActions: [
          {
            action: 'Increase order quantity by 25%',
            priority: 'high',
            timeline: '3 days',
            impact: 0.15
          },
          {
            action: 'Negotiate better supplier terms',
            priority: 'medium',
            timeline: '2 weeks',
            impact: 0.08
          },
          {
            action: 'Implement automatic reordering',
            priority: 'low',
            timeline: '1 month',
            impact: 0.12
          }
        ]
      };
    });

    setSimulationResults(results);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Inventory Simulator AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Advanced AI-Powered</span>
                <span className="ml-2">Inventory Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'products', label: 'Select Products', icon: '📦' },
              { key: 'scenarios', label: 'Choose Scenario', icon: '🎯' },
              { key: 'simulation', label: 'Configure & Run', icon: '⚡' },
              { key: 'results', label: 'Results & Insights', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Selection Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Products for Simulation</h2>
              <p className="text-gray-600">Choose one or multiple products to analyze. You have complete control over which products to include in your simulation.</p>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                  <input
                    type="text"
                    placeholder="Search by name, brand, or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="w-full md:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {filteredProducts.length} products found • {selectedProducts.length} selected
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={selectAllProducts}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAllSelections}
                    className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isSelected = selectedProducts.includes(product.id);
                const daysOfStock = Math.floor(product.currentStock / product.dailyDemand);
                const stockStatus = product.currentStock <= product.reorderPoint ? 'low' : 
                                   daysOfStock <= 7 ? 'warning' : 'good';

                return (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 shadow-md ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleProductSelection(product.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <div className="text-sm text-gray-500 space-y-1">
                            <div>Brand: {product.brand}</div>
                            <div>SKU: {product.sku}</div>
                            <div>Location: {product.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.popularity === 'high'
                              ? 'bg-green-100 text-green-800'
                              : product.popularity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.popularity.toUpperCase()}
                          </span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleProductSelection(product.id)}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Current Stock</div>
                          <div className="text-lg font-semibold text-gray-900">{product.currentStock}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Daily Demand</div>
                          <div className="text-lg font-semibold text-gray-900">{product.dailyDemand}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Cost Price</div>
                          <div className="text-lg font-semibold text-gray-900">{formatCurrency(product.costPrice)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Selling Price</div>
                          <div className="text-lg font-semibold text-gray-900">{formatCurrency(product.sellingPrice)}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {daysOfStock} days of stock
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          stockStatus === 'low'
                            ? 'bg-red-100 text-red-800'
                            : stockStatus === 'warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {stockStatus === 'low' ? 'LOW STOCK' : stockStatus === 'warning' ? 'REORDER SOON' : 'ADEQUATE'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {selectedProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setActiveTab('scenarios')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Proceed to Scenarios ({selectedProducts.length} products selected)</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Scenarios Tab */}
        {activeTab === 'scenarios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Simulation Scenario</h2>
              <p className="text-gray-600">Select from predefined scenarios or create your own custom scenario with complete control over parameters.</p>
            </div>

            {/* Create Custom Scenario Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowCustomScenario(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Custom Scenario</span>
              </button>
            </div>

            {/* Custom Scenario Modal */}
            {showCustomScenario && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Custom Scenario</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Scenario Name</label>
                      <input
                        type="text"
                        value={customScenario.name || ''}
                        onChange={(e) => setCustomScenario(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter scenario name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={customScenario.description || ''}
                        onChange={(e) => setCustomScenario(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Describe your scenario"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Demand Multiplier</label>
                        <input
                          type="number"
                          step="0.1"
                          value={customScenario.parameters?.demandMultiplier || 1.0}
                          onChange={(e) => setCustomScenario(prev => ({
                            ...prev,
                            parameters: { ...prev.parameters!, demandMultiplier: parseFloat(e.target.value) }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                        <input
                          type="number"
                          value={customScenario.parameters?.duration || 30}
                          onChange={(e) => setCustomScenario(prev => ({
                            ...prev,
                            parameters: { ...prev.parameters!, duration: parseInt(e.target.value) }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setShowCustomScenario(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={createCustomScenario}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Scenario
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Predefined Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predefinedScenarios.map((scenario) => (
                <motion.div
                  key={scenario.id}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-200 ${
                    selectedScenario?.id === scenario.id
                      ? 'border-blue-500 shadow-md ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        scenario.category === 'seasonal'
                          ? 'bg-orange-100 text-orange-800'
                          : scenario.category === 'supply'
                          ? 'bg-red-100 text-red-800'
                          : scenario.category === 'competitive'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {scenario.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Demand Impact</div>
                        <div className={`font-semibold ${
                          scenario.parameters.demandMultiplier > 1 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {scenario.parameters.demandMultiplier > 1 ? '+' : ''}
                          {((scenario.parameters.demandMultiplier - 1) * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="font-semibold text-gray-900">{scenario.parameters.duration} days</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Supply Risk</div>
                        <div className={`font-semibold ${
                          scenario.parameters.supplyDisruption > 0.3 ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {(scenario.parameters.supplyDisruption * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Price Impact</div>
                        <div className={`font-semibold ${
                          scenario.parameters.priceImpact > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {scenario.parameters.priceImpact > 0 ? '+' : ''}
                          {(scenario.parameters.priceImpact * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedScenario && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setActiveTab('simulation')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Configure Simulation</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Simulation Tab */}
        {activeTab === 'simulation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Configure & Run Simulation</h2>
              <p className="text-gray-600">Fine-tune simulation parameters and run advanced AI-powered analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Configuration Panel */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Parameters</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Horizon (days)
                      </label>
                      <input
                        type="number"
                        value={simulationConfig.timeHorizon}
                        onChange={(e) => setSimulationConfig(prev => ({ ...prev, timeHorizon: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        max="365"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monte Carlo Iterations
                      </label>
                      <select
                        value={simulationConfig.iterations}
                        onChange={(e) => setSimulationConfig(prev => ({ ...prev, iterations: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={100}>100 (Fast)</option>
                        <option value={1000}>1,000 (Standard)</option>
                        <option value={10000}>10,000 (High Precision)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confidence Level
                      </label>
                      <select
                        value={simulationConfig.confidenceLevel}
                        onChange={(e) => setSimulationConfig(prev => ({ ...prev, confidenceLevel: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={90}>90%</option>
                        <option value={95}>95%</option>
                        <option value={99}>99%</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={simulationConfig.includeSeasonality}
                        onChange={(e) => setSimulationConfig(prev => ({ ...prev, includeSeasonality: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Include seasonality factors</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={simulationConfig.includeCompetition}
                        onChange={(e) => setSimulationConfig(prev => ({ ...prev, includeCompetition: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Include competitive dynamics</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={simulationConfig.includeSupplyChain}
                        onChange={(e) => setSimulationConfig(prev => ({ ...prev, includeSupplyChain: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Include supply chain variability</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Summary Panel */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Selected Scenario</div>
                      <div className="font-medium text-gray-900">{selectedScenario?.name || 'None selected'}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Products to Analyze</div>
                      <div className="font-medium text-gray-900">{selectedProducts.length} products</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Simulation Duration</div>
                      <div className="font-medium text-gray-900">{simulationConfig.timeHorizon} days</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Analysis Depth</div>
                      <div className="font-medium text-gray-900">{simulationConfig.iterations.toLocaleString()} iterations</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Products</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedProducts.map(productId => {
                      const product = products.find(p => p.id === productId);
                      return product ? (
                        <div key={productId} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.category}</div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={runSimulation}
                disabled={isRunning || selectedProducts.length === 0 || !selectedScenario}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Running AI Analysis...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Run AI-Powered Simulation</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isRunning ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis in Progress</h3>
                <p className="text-gray-600">Processing {simulationConfig.iterations.toLocaleString()} iterations across {selectedProducts.length} products...</p>
              </div>
            ) : simulationResults.length > 0 ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Simulation Results & AI Insights</h2>
                  <p className="text-gray-600">
                    Analysis completed for {simulationResults.length} products under scenario: <span className="font-medium">{selectedScenario?.name}</span>
                  </p>
                </div>

                <div className="space-y-8">
                  {simulationResults.map((result, index) => (
                    <div key={result.productId} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">{result.productName}</h3>
                        <span className="text-sm text-gray-500">Product {index + 1} of {simulationResults.length}</span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Metrics Comparison */}
                        <div>
                          <h4 className="text-md font-medium text-gray-900 mb-4">Performance Metrics</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">Inventory Turnover</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{result.currentMetrics.turnover.toFixed(1)}x</span>
                                <span className="text-sm text-gray-400">→</span>
                                <span className="text-sm font-medium text-blue-600">{result.projectedMetrics.turnover.toFixed(1)}x</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">Profit Margin</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{result.currentMetrics.margin.toFixed(1)}%</span>
                                <span className="text-sm text-gray-400">→</span>
                                <span className="text-sm font-medium text-green-600">{result.projectedMetrics.margin.toFixed(1)}%</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">Stockout Risk</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{(result.currentMetrics.stockoutRisk * 100).toFixed(1)}%</span>
                                <span className="text-sm text-gray-400">→</span>
                                <span className={`text-sm font-medium ${result.projectedMetrics.stockoutRisk > result.currentMetrics.stockoutRisk ? 'text-red-600' : 'text-green-600'}`}>
                                  {(result.projectedMetrics.stockoutRisk * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm text-gray-600">Revenue Impact</span>
                              <span className="text-sm font-medium text-blue-600">{formatCurrency(result.projectedMetrics.revenueImpact)}</span>
                            </div>
                          </div>
                        </div>

                        {/* AI Recommendations */}
                        <div>
                          <h4 className="text-md font-medium text-gray-900 mb-4">AI Recommendations</h4>
                          <div className="space-y-3">
                            {result.recommendations.map((rec, recIndex) => (
                              <div key={recIndex} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                  <span className="text-blue-600 text-xs font-medium">{recIndex + 1}</span>
                                </div>
                                <p className="text-sm text-gray-700">{rec}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Items */}
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Recommended Actions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {result.optimalActions.map((action, actionIndex) => (
                            <div key={actionIndex} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  action.priority === 'high'
                                    ? 'bg-red-100 text-red-800'
                                    : action.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {action.priority.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">{action.timeline}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{action.action}</p>
                              <div className="text-xs text-gray-500">
                                Expected impact: {(action.impact * 100).toFixed(0)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setActiveTab('products');
                      setSimulationResults([]);
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    New Simulation
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Export Report</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Yet</h3>
                <p className="text-gray-600">Select products and run a simulation to see AI-powered insights here.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InventorySimulator;
