import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../common/Navigation';
import { Search, Plus, Minus, Clock, TrendingUp, TrendingDown, Zap, Star, RotateCcw, FileText } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  costPrice: number;
  sellingPrice: number;
  image: string;
  brand: string;
  dailyDemand: number;
}

interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface QuickScenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  emoji: string;
  products: string[];
  estimatedImpact: {
    revenue: number;
    margin: number;
    risk: 'low' | 'medium' | 'high';
  };
}

interface SimulationResult {
  id: string;
  scenarioName: string;
  timestamp: string;
  duration: string;
  products: SelectedProduct[];
  results: {
    totalRevenue: number;
    totalProfit: number;
    inventoryTurnover: number;
    stockoutRisk: number;
    overallRisk: 'low' | 'medium' | 'high';
  };
  recommendations: string[];
}

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

const InventorySimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'scenario' | 'products' | 'results'>('scenario');
  const [selectedScenario, setSelectedScenario] = useState<QuickScenario | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1_week');
  const [currentResults, setCurrentResults] = useState<SimulationResult | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<SimulationResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Quick scenario templates
  const quickScenarios: QuickScenario[] = [
    {
      id: 'heatwave',
      name: 'Heatwave Prep',
      description: 'High demand for cooling products during summer heatwave',
      icon: '🌡️',
      emoji: '🔥',
      products: ['fans', 'ac', 'cold-drinks', 'ice-cream'],
      estimatedImpact: { revenue: 250000, margin: 18, risk: 'medium' }
    },
    {
      id: 'black_friday',
      name: 'Black Friday Rush',
      description: 'Electronics and gadgets surge during sale period',
      icon: '🛍️',
      emoji: '⚡',
      products: ['smartphones', 'laptops', 'headphones', 'speakers'],
      estimatedImpact: { revenue: 850000, margin: 22, risk: 'high' }
    },
    {
      id: 'monsoon',
      name: 'Monsoon Season',
      description: 'Rain gear and indoor entertainment demand',
      icon: '🌧️',
      emoji: '☔',
      products: ['umbrellas', 'raincoats', 'indoor-games', 'books'],
      estimatedImpact: { revenue: 180000, margin: 15, risk: 'low' }
    },
    {
      id: 'back_to_school',
      name: 'Back to School',
      description: 'Student supplies and electronics for new academic year',
      icon: '📚',
      emoji: '🎒',
      products: ['notebooks', 'pens', 'bags', 'calculators'],
      estimatedImpact: { revenue: 320000, margin: 20, risk: 'medium' }
    },
    {
      id: 'festival',
      name: 'Festival Season',
      description: 'Diwali decorations, gifts, and sweets',
      icon: '🎄',
      emoji: '✨',
      products: ['decorations', 'sweets', 'gifts', 'lights'],
      estimatedImpact: { revenue: 450000, margin: 25, risk: 'high' }
    },
    {
      id: 'custom',
      name: 'Custom Scenario',
      description: 'Build your own scenario with specific products',
      icon: '⚡',
      emoji: '🎯',
      products: [],
      estimatedImpact: { revenue: 0, margin: 0, risk: 'low' }
    }
  ];

  // Mock product database
  const allProducts: Product[] = [
    {
      id: 'fan_ceiling_01',
      name: 'Crompton Ceiling Fan 48"',
      category: 'Home Appliances',
      currentStock: 85,
      costPrice: 2500,
      sellingPrice: 3200,
      image: '🪭',
      brand: 'Crompton',
      dailyDemand: 8
    },
    {
      id: 'ac_split_01',
      name: 'LG 1.5 Ton Split AC',
      category: 'Home Appliances', 
      currentStock: 25,
      costPrice: 32000,
      sellingPrice: 42000,
      image: '❄️',
      brand: 'LG',
      dailyDemand: 3
    },
    {
      id: 'cold_drink_01',
      name: 'Coca Cola 2L Bottle',
      category: 'Beverages',
      currentStock: 450,
      costPrice: 85,
      sellingPrice: 110,
      image: '🥤',
      brand: 'Coca Cola',
      dailyDemand: 45
    },
    {
      id: 'smartphone_01',
      name: 'iPhone 15 128GB',
      category: 'Electronics',
      currentStock: 15,
      costPrice: 75000,
      sellingPrice: 79900,
      image: '📱',
      brand: 'Apple',
      dailyDemand: 2
    },
    {
      id: 'laptop_01',
      name: 'MacBook Air M2',
      category: 'Electronics',
      currentStock: 8,
      costPrice: 95000,
      sellingPrice: 114900,
      image: '💻',
      brand: 'Apple',
      dailyDemand: 1
    },
    {
      id: 'umbrella_01',
      name: 'Auto Open Umbrella',
      category: 'Accessories',
      currentStock: 120,
      costPrice: 350,
      sellingPrice: 599,
      image: '☂️',
      brand: 'Generic',
      dailyDemand: 15
    }
  ];

  // Filter products based on search
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle scenario selection
  const handleScenarioSelect = (scenario: QuickScenario) => {
    setSelectedScenario(scenario);
    setCurrentStep('products');
    if (scenario.id !== 'custom') {
      // Auto-populate products for quick scenarios
      const scenarioProducts = allProducts.filter(product => 
        scenario.products.some(p => product.name.toLowerCase().includes(p) || product.category.toLowerCase().includes(p))
      );
      setSelectedProducts(scenarioProducts.map(product => ({
        product,
        quantity: Math.min(product.dailyDemand * 7, Math.floor(product.currentStock * 0.3)) // Default quantity
      })));
    } else {
      setSelectedProducts([]);
    }
  };

  // Add product to selection
  const addProduct = (product: Product) => {
    const existing = selectedProducts.find(sp => sp.product.id === product.id);
    if (existing) {
      setSelectedProducts(selectedProducts.map(sp =>
        sp.product.id === product.id
          ? { ...sp, quantity: sp.quantity + 1 }
          : sp
      ));
    } else {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
    }
  };

  // Update product quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedProducts(selectedProducts.filter(sp => sp.product.id !== productId));
    } else {
      setSelectedProducts(selectedProducts.map(sp =>
        sp.product.id === productId
          ? { ...sp, quantity: Math.min(newQuantity, sp.product.currentStock) }
          : sp
      ));
    }
  };

  // Calculate real-time results
  const calculateResults = (): SimulationResult | null => {
    if (selectedProducts.length === 0) return null;

    const timeMultiplier = selectedTimeframe === '1_week' ? 7 : selectedTimeframe === '2_weeks' ? 14 : 30;
    
    let totalRevenue = 0;
    let totalProfit = 0;
    let totalCost = 0;

    selectedProducts.forEach(({ product, quantity }) => {
      const revenue = product.sellingPrice * quantity;
      const cost = product.costPrice * quantity;
      totalRevenue += revenue;
      totalCost += cost;
      totalProfit += (revenue - cost);
    });

    const inventoryTurnover = totalRevenue / (totalCost * 0.5); // Simplified calculation
    const stockoutRisk = selectedProducts.some(sp => sp.quantity > sp.product.currentStock * 0.8) ? 75 : 25;
    const overallRisk: 'low' | 'medium' | 'high' = 
      totalRevenue > 500000 || stockoutRisk > 50 ? 'high' : 
      totalRevenue > 200000 ? 'medium' : 'low';

    return {
      id: Date.now().toString(),
      scenarioName: selectedScenario?.name || 'Custom Scenario',
      timestamp: new Date().toISOString(),
      duration: selectedTimeframe.replace('_', ' '),
      products: selectedProducts,
      results: {
        totalRevenue,
        totalProfit,
        inventoryTurnover,
        stockoutRisk,
        overallRisk
      },
      recommendations: [
        'Monitor stock levels closely for high-demand items',
        'Consider bundle offers to increase average transaction value',
        'Setup automated reorder alerts for critical products',
        'Implement dynamic pricing based on demand patterns'
      ]
    };
  };

  // Run simulation
  const runSimulation = () => {
    const results = calculateResults();
    if (results) {
      setIsCalculating(true);
      setCurrentStep('results');
      setTimeout(() => {
        setCurrentResults(results);
        setSimulationHistory([results, ...simulationHistory.slice(0, 4)]); // Keep last 5 simulations
        setIsCalculating(false);
      }, 1500); // Simulate calculation time
    }
  };

  // Reset to start
  const resetSimulation = () => {
    setCurrentStep('scenario');
    setSelectedScenario(null);
    setSelectedProducts([]);
    setCurrentResults(null);
    setSearchTerm('');
  };

  // Auto-calculate results when inputs change (but don't show them yet)
  useEffect(() => {
    const results = calculateResults();
    // Only set results if we're in results step
    if (currentStep === 'results') {
      setCurrentResults(results);
    }
  }, [selectedProducts, selectedTimeframe, currentStep]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navigation role="store" currentPage="inventory-simulator" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Quantum Inventory Simulator
              </h1>
              <p className="text-slate-600">
                Test what-if scenarios for Mumbai Central Store inventory
              </p>
            </div>
            {(currentStep === 'products' || currentStep === 'results') && (
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200"
              >
                Start Over
              </button>
            )}
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                currentStep === 'scenario' ? 'bg-blue-600 border-blue-600 text-white' : 
                currentStep === 'products' || currentStep === 'results' ? 'bg-blue-600 border-blue-600 text-white' : 
                'border-slate-300 text-slate-400'
              }`}>
                1
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep === 'scenario' ? 'text-blue-600' : 'text-slate-500'
              }`}>
                Scenario
              </span>
            </div>
            <div className={`w-16 h-0.5 ${
              currentStep === 'products' || currentStep === 'results' ? 'bg-blue-600' : 'bg-slate-200'
            }`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                currentStep === 'products' ? 'bg-blue-600 border-blue-600 text-white' : 
                currentStep === 'results' ? 'bg-blue-600 border-blue-600 text-white' : 
                'border-slate-300 text-slate-400'
              }`}>
                2
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep === 'products' ? 'text-blue-600' : 'text-slate-500'
              }`}>
                Products
              </span>
            </div>
            <div className={`w-16 h-0.5 ${
              currentStep === 'results' ? 'bg-blue-600' : 'bg-slate-200'
            }`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                currentStep === 'results' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-400'
              }`}>
                3
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep === 'results' ? 'text-blue-600' : 'text-slate-500'
              }`}>
                Results
              </span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Scenario Selection */}
          {currentStep === 'scenario' && (
            <motion.div
              key="scenario"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Select Scenario Type</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Choose from pre-configured business scenarios or build a custom simulation</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickScenarios.map((scenario) => (
                  <motion.button
                    key={scenario.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleScenarioSelect(scenario)}
                    className="group p-6 bg-white rounded-lg shadow-sm border border-slate-200 text-left hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <span className="text-lg">{scenario.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-base">{scenario.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{scenario.description}</p>
                        </div>
                      </div>
                    </div>
                    {scenario.id !== 'custom' && (
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">Est. Revenue</span>
                          <span className="text-sm font-semibold text-slate-900">
                            {formatIndianCurrency(scenario.estimatedImpact.revenue)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">Risk Level</span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            scenario.estimatedImpact.risk === 'high' ? 'bg-red-50 text-red-700 border border-red-100' :
                            scenario.estimatedImpact.risk === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                            'bg-green-50 text-green-700 border border-green-100'
                          }`}>
                            {scenario.estimatedImpact.risk.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Product Selection */}
          {currentStep === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Configure Products for "{selectedScenario?.name}"
                </h2>
                <p className="text-slate-600">Adjust quantities and add/remove products as needed</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Available Products */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Available Products</h3>
                    <span className="text-sm text-slate-500">{filteredProducts.length} items</span>
                  </div>
                  
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  {/* Product List */}
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm">{product.image}</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.brand} • Stock: {product.currentStock}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => addProduct(product)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Products */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Selected Products</h3>
                    {selectedProducts.length > 0 && (
                      <span className="text-sm text-slate-500">{selectedProducts.length} selected</span>
                    )}
                  </div>
                  
                  {selectedProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📦</span>
                      </div>
                      <p className="text-slate-600 font-medium">No products selected</p>
                      <p className="text-sm text-slate-500">Add products from the left panel</p>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {selectedProducts.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                              <span className="text-sm">{product.image}</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                              <p className="text-xs text-slate-500">{formatIndianCurrency(product.sellingPrice)} each</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-12 text-center text-sm font-medium bg-white px-2 py-1.5 rounded border border-slate-200">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedProducts.length > 0 && (
                    <>
                      {/* Timeframe Selection */}
                      <div className="mb-6 pt-4 border-t border-slate-100">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Simulation Timeframe</label>
                        <select
                          value={selectedTimeframe}
                          onChange={(e) => setSelectedTimeframe(e.target.value)}
                          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                          <option value="1_week">1 Week</option>
                          <option value="2_weeks">2 Weeks</option>
                          <option value="1_month">1 Month</option>
                        </select>
                      </div>

                      {/* Run Simulation Button */}
                      <button
                        onClick={runSimulation}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                      >
                        Run Simulation
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              {isCalculating ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-slate-200">
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-200 border-t-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Processing Simulation</h3>
                  <p className="text-slate-600">Analyzing scenario parameters...</p>
                </div>
              ) : currentResults ? (
                <div className="space-y-6">
                  {/* Scenario Summary */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-slate-900">
                        Simulation Results: {currentResults.scenarioName}
                      </h2>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        currentResults.results.overallRisk === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                        currentResults.results.overallRisk === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {currentResults.results.overallRisk.toUpperCase()} RISK
                      </span>
                    </div>
                    <p className="text-slate-600">
                      Simulation for {currentResults.duration} with {currentResults.products.length} products
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="text-xs text-slate-500 font-medium">REVENUE</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatIndianCurrency(currentResults.results.totalRevenue)}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="text-xs text-slate-500 font-medium">PROFIT</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatIndianCurrency(currentResults.results.totalProfit)}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-yellow-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <RotateCcw className="h-5 w-5 text-yellow-600" />
                        <span className="text-xs text-slate-500 font-medium">TURNOVER</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {currentResults.results.inventoryTurnover.toFixed(1)}x
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-red-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        <span className="text-xs text-slate-500 font-medium">STOCKOUT RISK</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {currentResults.results.stockoutRisk.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentResults.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                          <p className="text-sm text-slate-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setCurrentStep('products')}
                      className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                    >
                      Modify Products
                    </button>
                    <button
                      onClick={resetSimulation}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      New Scenario
                    </button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Simulations Section */}
        {simulationHistory.length > 0 && (
          <motion.div 
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Recent Simulations
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {simulationHistory.map((sim) => (
                    <motion.div
                      key={sim.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => {
                        // Set all necessary state to properly display the historical simulation
                        setCurrentResults(sim);
                        setSelectedProducts(sim.products);
                        setSelectedScenario(quickScenarios.find(s => s.name === sim.scenarioName) || null);
                        setCurrentStep('results');
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-slate-900 text-sm">{sim.scenarioName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          sim.results.overallRisk === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                          sim.results.overallRisk === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          {sim.results.overallRisk}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span className="font-medium text-slate-900">{formatIndianCurrency(sim.results.totalRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{new Date(sim.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InventorySimulator;
