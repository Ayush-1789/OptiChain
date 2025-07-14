import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  DollarSign,
  Clock,
  MapPin,
  Filter,
  Download,
  Search,
  Eye,
  BarChart3,
  PieChart,
  RefreshCw
} from 'lucide-react';

interface ReturnPrediction {
  productId: string;
  productName: string;
  category: string;
  returnProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedReturnDate: string;
  estimatedValue: number;
  recommendedAction: string;
  nearestCenter: string;
  potentialBuyer: string;
  reasonPrediction: string[];
}

interface ReturnMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

const ReturnsRadar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'predictions' | 'analytics' | 'optimization'>('predictions');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Mock data for return predictions
  const returnMetrics: ReturnMetric[] = [
    {
      title: "Predicted Returns Today",
      value: "847",
      change: -12.5,
      icon: RotateCcw,
      color: "bg-orange-500"
    },
    {
      title: "Return Value At Risk",
      value: "₹4.2L",
      change: -8.3,
      icon: DollarSign,
      color: "bg-red-500"
    },
    {
      title: "Optimization Savings",
      value: "₹89K",
      change: 24.7,
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      title: "Processing Efficiency",
      value: "87%",
      change: 5.2,
      icon: CheckCircle,
      color: "bg-blue-500"
    }
  ];

  const returnPredictions: ReturnPrediction[] = [
    {
      productId: "WM-EL-001",
      productName: "Samsung Galaxy Earbuds",
      category: "Electronics",
      returnProbability: 85,
      riskLevel: "high",
      estimatedReturnDate: "2025-07-12",
      estimatedValue: 8999,
      recommendedAction: "Ship from nearest center",
      nearestCenter: "Mumbai DC",
      potentialBuyer: "Refurb Electronics Hub",
      reasonPrediction: ["Quality issues", "Size mismatch", "Customer preference"]
    },
    {
      productId: "WM-CL-045",
      productName: "Peter England Shirt",
      category: "Clothing",
      returnProbability: 72,
      riskLevel: "medium",
      estimatedReturnDate: "2025-07-14",
      estimatedValue: 1299,
      recommendedAction: "Local store clearance",
      nearestCenter: "Delhi Regional",
      potentialBuyer: "Local Clearance Store",
      reasonPrediction: ["Size issues", "Color preference"]
    },
    {
      productId: "WM-HM-023",
      productName: "Pressure Cooker 5L",
      category: "Home & Kitchen",
      returnProbability: 45,
      riskLevel: "low",
      estimatedReturnDate: "2025-07-16",
      estimatedValue: 2799,
      recommendedAction: "Standard processing",
      nearestCenter: "Bangalore Hub",
      potentialBuyer: "Kitchen Outlet Store",
      reasonPrediction: ["Feature complexity"]
    },
    {
      productId: "WM-BK-078",
      productName: "Fiction Novel Set",
      category: "Books",
      returnProbability: 28,
      riskLevel: "low",
      estimatedReturnDate: "2025-07-18",
      estimatedValue: 899,
      recommendedAction: "Standard processing",
      nearestCenter: "Hyderabad Center",
      potentialBuyer: "Book Exchange",
      reasonPrediction: ["Content preference"]
    }
  ];

  const categoryAnalytics = [
    { category: "Electronics", returnRate: 18.5, value: "₹2.1L", trend: "increasing" },
    { category: "Clothing", returnRate: 24.3, value: "₹1.8L", trend: "stable" },
    { category: "Home & Kitchen", returnRate: 12.7, value: "₹89K", trend: "decreasing" },
    { category: "Books", returnRate: 8.2, value: "₹45K", trend: "stable" },
    { category: "Sports", returnRate: 15.1, value: "₹67K", trend: "decreasing" }
  ];

  const filteredPredictions = filterRisk === 'all' 
    ? returnPredictions 
    : returnPredictions.filter(p => p.riskLevel === filterRisk);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Determine current role from URL
  const getCurrentRole = (): 'store' | 'supplier' | 'procurement' | 'regional' => {
    const path = window.location.pathname;
    if (path.includes('/store/')) return 'store';
    if (path.includes('/supplier/')) return 'supplier';
    if (path.includes('/procurement/')) return 'procurement';
    if (path.includes('/regional/')) return 'regional';
    return 'store';
  };

  const currentRole = getCurrentRole();

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navigation role={currentRole} currentPage="returns-radar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Returns Radar</h1>
          <p className="text-gray-600 mt-2">
            AI-powered predictive reverse logistics and resale market matching
          </p>
        </div>

        {/* Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {returnMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'predictions', label: 'Return Predictions', icon: AlertTriangle },
                { id: 'analytics', label: 'Category Analytics', icon: BarChart3 },
                { id: 'optimization', label: 'Route Optimization', icon: MapPin }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'predictions' && (
              <div>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={filterRisk}
                        onChange={(e) => setFilterRisk(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Risk Levels</option>
                        <option value="high">High Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="low">Low Risk</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Predictions
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* Predictions Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Return Risk
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Est. Return Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value at Risk
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommended Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPredictions.map((prediction, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{prediction.productName}</div>
                              <div className="text-sm text-gray-500">{prediction.productId} • {prediction.category}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(prediction.riskLevel)}`}>
                                {prediction.riskLevel.toUpperCase()}
                              </span>
                              <span className="ml-2 text-sm text-gray-600">{prediction.returnProbability}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(prediction.estimatedReturnDate).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{prediction.estimatedValue.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm text-gray-900">{prediction.recommendedAction}</div>
                              <div className="text-sm text-gray-500">{prediction.nearestCenter}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Apply Route
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Return Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Category Performance */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Return Rates by Category</h4>
                    <div className="space-y-4">
                      {categoryAnalytics.map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{category.category}</div>
                            <div className="text-sm text-gray-500">Return Rate: {category.returnRate}%</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">{category.value}</div>
                            <div className={`text-sm ${
                              category.trend === 'increasing' ? 'text-red-600' : 
                              category.trend === 'decreasing' ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {category.trend}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Chart */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Return Trend Analysis</h4>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        {/* Pie Chart */}
                        <div className="relative w-48 h-48">
                          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                            {(() => {
                              const total = categoryAnalytics.reduce((sum, item) => sum + item.returnRate, 0);
                              let currentAngle = 0;
                              const colors = ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b'];
                              
                              return categoryAnalytics.map((item, index) => {
                                const percentage = (item.returnRate / total) * 100;
                                const angle = (percentage / 100) * 360;
                                const radius = 40;
                                const centerX = 50;
                                const centerY = 50;
                                
                                const startAngle = (currentAngle * Math.PI) / 180;
                                const endAngle = ((currentAngle + angle) * Math.PI) / 180;
                                
                                const x1 = centerX + radius * Math.cos(startAngle);
                                const y1 = centerY + radius * Math.sin(startAngle);
                                const x2 = centerX + radius * Math.cos(endAngle);
                                const y2 = centerY + radius * Math.sin(endAngle);
                                
                                const largeArcFlag = angle > 180 ? 1 : 0;
                                
                                const pathData = [
                                  `M ${centerX} ${centerY}`,
                                  `L ${x1} ${y1}`,
                                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                  'Z'
                                ].join(' ');
                                
                                currentAngle += angle;
                                
                                return (
                                  <path
                                    key={index}
                                    d={pathData}
                                    fill={colors[index]}
                                    stroke="white"
                                    strokeWidth="0.5"
                                    className="hover:opacity-80 transition-opacity duration-200"
                                  />
                                );
                              });
                            })()}
                          </svg>
                          
                          {/* Center circle */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center border border-gray-200">
                              <div className="text-center">
                                <div className="text-xs font-medium text-gray-700">Total</div>
                                <div className="text-sm font-bold text-gray-900">
                                  {categoryAnalytics.reduce((sum, item) => sum + item.returnRate, 0).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Legend */}
                        <div className="space-y-3 ml-8">
                          {categoryAnalytics.map((item, index) => {
                            const colors = ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b'];
                            const total = categoryAnalytics.reduce((sum, cat) => sum + cat.returnRate, 0);
                            const percentage = ((item.returnRate / total) * 100).toFixed(1);
                            
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <div 
                                  className="w-4 h-4 rounded-sm"
                                  style={{ backgroundColor: colors[index] }}
                                ></div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                                    <div className="flex items-center gap-2">
                                      {item.trend === 'increasing' && (
                                        <TrendingUp className="h-3 w-3 text-red-500" />
                                      )}
                                      {item.trend === 'decreasing' && (
                                        <TrendingDown className="h-3 w-3 text-green-500" />
                                      )}
                                      {item.trend === 'stable' && (
                                        <div className="h-3 w-3 flex items-center justify-center">
                                          <div className="h-0.5 w-2 bg-gray-400 rounded"></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{item.returnRate}% return rate</span>
                                    <span>{percentage}% of total</span>
                                  </div>
                                  <div className="text-xs text-gray-600">{item.value} in returns</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'optimization' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Route Optimization & Resale Matching</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Optimization Recommendations */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Optimization Opportunities</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-green-900">Mumbai - Electronics Route</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Consolidate 12 high-risk electronics returns. Est. savings: ₹15,000
                        </p>
                      </div>
                      
                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-blue-900">Delhi Clothing Clearance</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Direct route to clearance store for 8 clothing items. Est. savings: ₹8,500
                        </p>
                      </div>

                      <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                          <span className="font-medium text-orange-900">High-Value Items Alert</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          5 high-value items require immediate processing. Ship from nearest centers.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resale Matching */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Resale Market Matching</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">Refurb Electronics Hub</div>
                        <div className="text-sm text-gray-600 mb-2">Match Rate: 78% • Avg. Recovery: 65%</div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Pending: 23 items</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">Local Clearance Stores</div>
                        <div className="text-sm text-gray-600 mb-2">Match Rate: 92% • Avg. Recovery: 45%</div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Pending: 67 items</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">Online Marketplaces</div>
                        <div className="text-sm text-gray-600 mb-2">Match Rate: 85% • Avg. Recovery: 55%</div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Pending: 34 items</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsRadar;
