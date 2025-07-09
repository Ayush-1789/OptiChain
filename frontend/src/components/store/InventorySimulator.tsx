import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  type: 'demand_surge' | 'supply_disruption' | 'seasonal_change' | 'price_fluctuation' | 'competitor_action';
  impact: 'high' | 'medium' | 'low';
  duration: string;
  affectedCategories: string[];
  estimatedImpact: {
    sales: number;
    inventory: number;
    margin: number;
  };
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  maxStock: number;
  dailyDemand: number;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  leadTime: number;
  brand: string;
}

interface SimulationResult {
  scenario: string;
  duration: number;
  recommendations: string[];
  projectedOutcomes: {
    totalSales: number;
    inventoryTurnover: number;
    stockoutRisk: number;
    excessInventory: number;
    profitMargin: number;
  };
  riskFactors: string[];
  actionItems: string[];
}

const InventorySimulator: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'scenarios' | 'simulation' | 'results'>('scenarios');
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7_days');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Mock data for Indian retail scenarios
  const scenarios: SimulationScenario[] = [
    {
      id: '1',
      name: 'Diwali Festival Surge',
      description: 'Simulate inventory needs during Diwali festival with 300% increase in demand for decorative items, sweets, and electronics',
      type: 'seasonal_change',
      impact: 'high',
      duration: '15 days',
      affectedCategories: ['Electronics', 'Home Decor', 'Confectionery', 'Apparel'],
      estimatedImpact: {
        sales: 285,
        inventory: -40,
        margin: 15
      }
    },
    {
      id: '2',
      name: 'Monsoon Supply Disruption',
      description: 'Heavy rainfall disrupting supply chain from major suppliers in Delhi and Mumbai',
      type: 'supply_disruption',
      impact: 'high',
      duration: '10 days',
      affectedCategories: ['Fresh Produce', 'Dairy', 'Pharmaceuticals'],
      estimatedImpact: {
        sales: -25,
        inventory: -60,
        margin: -8
      }
    },
    {
      id: '3',
      name: 'Competitor Price War',
      description: 'Major competitor Big Bazaar launches aggressive pricing on FMCG products',
      type: 'competitor_action',
      impact: 'medium',
      duration: '30 days',
      affectedCategories: ['FMCG', 'Personal Care', 'Household'],
      estimatedImpact: {
        sales: -15,
        inventory: 20,
        margin: -12
      }
    },
    {
      id: '4',
      name: 'School Reopening Demand',
      description: 'Back-to-school season with increased demand for stationery, uniforms, and educational supplies',
      type: 'seasonal_change',
      impact: 'medium',
      duration: '21 days',
      affectedCategories: ['Stationery', 'Apparel', 'Books', 'Electronics'],
      estimatedImpact: {
        sales: 180,
        inventory: -30,
        margin: 22
      }
    },
    {
      id: '5',
      name: 'GST Rate Change Impact',
      description: 'Government announces GST rate reduction on essential items affecting pricing and demand',
      type: 'price_fluctuation',
      impact: 'medium',
      duration: '45 days',
      affectedCategories: ['Grocery', 'Personal Care', 'Household'],
      estimatedImpact: {
        sales: 35,
        inventory: -15,
        margin: -5
      }
    }
  ];

  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Basmati Rice (1kg)',
      category: 'Grocery',
      currentStock: 450,
      reorderPoint: 100,
      maxStock: 800,
      dailyDemand: 25,
      costPrice: 85,
      sellingPrice: 120,
      supplier: 'Punjab Grains Ltd',
      leadTime: 3,
      brand: 'India Gate'
    },
    {
      id: '2',
      name: 'LED TV 32 inch',
      category: 'Electronics',
      currentStock: 15,
      reorderPoint: 5,
      maxStock: 30,
      dailyDemand: 2,
      costPrice: 18500,
      sellingPrice: 22000,
      supplier: 'Samsung India',
      leadTime: 7,
      brand: 'Samsung'
    },
    {
      id: '3',
      name: 'Amul Milk 1L',
      category: 'Dairy',
      currentStock: 200,
      reorderPoint: 50,
      maxStock: 400,
      dailyDemand: 45,
      costPrice: 52,
      sellingPrice: 60,
      supplier: 'Amul Dairy',
      leadTime: 1,
      brand: 'Amul'
    },
    {
      id: '4',
      name: 'Colgate Toothpaste 100g',
      category: 'Personal Care',
      currentStock: 180,
      reorderPoint: 40,
      maxStock: 300,
      dailyDemand: 12,
      costPrice: 45,
      sellingPrice: 65,
      supplier: 'Colgate India',
      leadTime: 5,
      brand: 'Colgate'
    }
  ];

  // Helper function to format Indian currency
  const formatIndianCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₹${amount.toFixed(0)}`;
    }
  };

  // Function to run simulation
  const runSimulation = async () => {
    if (!selectedScenario) return;
    
    setSimulationRunning(true);
    setActiveTab('results');
    
    // Simulate API call with delay
    setTimeout(() => {
      const mockResults: SimulationResult = {
        scenario: selectedScenario.name,
        duration: parseInt(selectedTimeframe.split('_')[0]),
        recommendations: [
          'Increase safety stock for high-demand categories by 25%',
          'Implement dynamic pricing strategy for electronics',
          'Establish backup suppliers for critical items',
          'Optimize reorder points based on historical data',
          'Consider promotional campaigns for slow-moving inventory'
        ],
        projectedOutcomes: {
          totalSales: 2500000 + (selectedScenario.estimatedImpact.sales * 10000),
          inventoryTurnover: 4.2 + (selectedScenario.estimatedImpact.inventory * 0.01),
          stockoutRisk: Math.max(0, 15 + selectedScenario.estimatedImpact.inventory * 0.3),
          excessInventory: Math.max(0, 12 - selectedScenario.estimatedImpact.inventory * 0.2),
          profitMargin: 18 + selectedScenario.estimatedImpact.margin
        },
        riskFactors: [
          'Seasonal demand fluctuations',
          'Supplier reliability issues',
          'Storage capacity constraints',
          'Competitive pricing pressure'
        ],
        actionItems: [
          'Review supplier contracts by end of week',
          'Implement automated reorder system',
          'Train staff on demand forecasting',
          'Update inventory management policies'
        ]
      };
      
      setSimulationResults(mockResults);
      setSimulationRunning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/store')}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Inventory Simulator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Store: Mumbai Central</span>
              <span className="text-sm text-gray-500">Manager: Rahul Sharma</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'scenarios', label: 'Scenarios', icon: '🎯' },
              { key: 'simulation', label: 'Simulation', icon: '⚡' },
              { key: 'results', label: 'Results', icon: '📊' }
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
        {activeTab === 'scenarios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Simulation Scenario</h2>
              <p className="text-gray-600">Choose a business scenario to simulate its impact on your inventory management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario) => (
                <motion.div
                  key={scenario.id}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-200 ${
                    selectedScenario?.id === scenario.id
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        scenario.impact === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : scenario.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {scenario.impact.toUpperCase()} IMPACT
                      </div>
                      <span className="text-sm text-gray-500">{scenario.duration}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Affected Categories:</h4>
                      <div className="flex flex-wrap gap-2">
                        {scenario.affectedCategories.map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className={`text-lg font-bold ${
                          scenario.estimatedImpact.sales > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {scenario.estimatedImpact.sales > 0 ? '+' : ''}{scenario.estimatedImpact.sales}%
                        </div>
                        <div className="text-xs text-gray-500">Sales</div>
                      </div>
                      <div>
                        <div className={`text-lg font-bold ${
                          scenario.estimatedImpact.inventory > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {scenario.estimatedImpact.inventory > 0 ? '+' : ''}{scenario.estimatedImpact.inventory}%
                        </div>
                        <div className="text-xs text-gray-500">Inventory</div>
                      </div>
                      <div>
                        <div className={`text-lg font-bold ${
                          scenario.estimatedImpact.margin > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {scenario.estimatedImpact.margin > 0 ? '+' : ''}{scenario.estimatedImpact.margin}%
                        </div>
                        <div className="text-xs text-gray-500">Margin</div>
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

        {activeTab === 'simulation' && selectedScenario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Configuration Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Configuration</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Scenario
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">{selectedScenario.name}</div>
                        <div className="text-sm text-gray-600">{selectedScenario.duration}</div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Simulation Period
                      </label>
                      <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="7_days">7 Days</option>
                        <option value="14_days">14 Days</option>
                        <option value="30_days">30 Days</option>
                        <option value="60_days">60 Days</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Focus Categories
                      </label>
                      <div className="space-y-2">
                        {selectedScenario.affectedCategories.map((category) => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCategories([...selectedCategories, category]);
                                } else {
                                  setSelectedCategories(selectedCategories.filter(c => c !== category));
                                }
                              }}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={runSimulation}
                      disabled={simulationRunning}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      {simulationRunning ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Running Simulation...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Run Simulation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Inventory Status */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Inventory Status</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Product</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Current Stock</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Daily Demand</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Days Until Reorder</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {inventoryItems.map((item) => {
                          const daysUntilReorder = Math.max(0, Math.floor((item.currentStock - item.reorderPoint) / item.dailyDemand));
                          const status = item.currentStock <= item.reorderPoint ? 'Low Stock' : 
                                        daysUntilReorder <= 3 ? 'Reorder Soon' : 'Adequate';
                          
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div>
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-xs text-gray-500">{item.category} • {item.brand}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-900">{item.currentStock}</td>
                              <td className="px-4 py-3 text-gray-900">{item.dailyDemand}</td>
                              <td className="px-4 py-3 text-gray-900">{daysUntilReorder} days</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  status === 'Low Stock' 
                                    ? 'bg-red-100 text-red-800'
                                    : status === 'Reorder Soon'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'results' && simulationResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Simulation Results</h2>
              <p className="text-gray-600">
                Scenario: <span className="font-medium">{simulationResults.scenario}</span> 
                ({simulationResults.duration} days)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Metrics */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Projected Outcomes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Sales</span>
                    <span className="font-semibold text-green-600">
                      {formatIndianCurrency(simulationResults.projectedOutcomes.totalSales)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Inventory Turnover</span>
                    <span className="font-semibold text-blue-600">
                      {simulationResults.projectedOutcomes.inventoryTurnover.toFixed(1)}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Stockout Risk</span>
                    <span className={`font-semibold ${
                      simulationResults.projectedOutcomes.stockoutRisk > 20 ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {simulationResults.projectedOutcomes.stockoutRisk.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Excess Inventory</span>
                    <span className="font-semibold text-orange-600">
                      {simulationResults.projectedOutcomes.excessInventory.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Profit Margin</span>
                    <span className="font-semibold text-green-600">
                      {simulationResults.projectedOutcomes.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
                <div className="space-y-3">
                  {simulationResults.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
                <div className="space-y-3">
                  {simulationResults.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h3>
                <div className="space-y-3">
                  {simulationResults.actionItems.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <p className="text-gray-700 text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => {
                  setActiveTab('scenarios');
                  setSimulationResults(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Run Another Simulation
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Export Report</span>
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'results' && !simulationResults && (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Simulation Results</h3>
            <p className="text-gray-600">Select a scenario and run a simulation to see the results here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventorySimulator;
