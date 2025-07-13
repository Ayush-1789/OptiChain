import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../common/Navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Filter,
  Download,
  Search,
  Eye,
  BarChart3,
  PieChart,
  RefreshCw,
  Zap,
  Target,
  Users,
  ShoppingCart,
  Brain,
  CloudRain,
  Thermometer,
  Star,
  Award,
  Activity,
  ArrowRight,
  Globe,
  Layers,
  Database,
  X,
  Shield
} from 'lucide-react';

interface DemandForecast {
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  predictedDemand: number;
  confidenceLevel: number;
  timeframe: '7d' | '14d' | '30d' | '90d';
  forecastAccuracy: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendedAction: string;
  expectedRevenue: number;
  seasonalTrend: 'peak' | 'declining' | 'stable' | 'rising';
  externalFactors: string[];
}

interface SeasonalPattern {
  period: string;
  demandMultiplier: number;
  confidence: number;
  keyEvents: string[];
}

interface ExternalFactor {
  type: 'weather' | 'festival' | 'economic' | 'social' | 'competitor';
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  strength: number;
  description: string;
  affectedCategories: string[];
}

const DemandForecastingAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forecasts' | 'seasonal' | 'external' | 'analytics'>('forecasts');
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d' | '90d'>('30d');
  const [filterCategory, setFilterCategory] = useState<'all' | 'electronics' | 'clothing' | 'grocery' | 'home'>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [showStrategyModal, setShowStrategyModal] = useState(false);

  // Mock data for demand forecasts
  const demandForecasts: DemandForecast[] = [
    {
      productId: "WM-EL-001",
      productName: "iPhone 15 Pro Max",
      category: "Electronics",
      currentStock: 245,
      predictedDemand: 420,
      confidenceLevel: 92,
      timeframe: '30d',
      forecastAccuracy: 94,
      riskLevel: "high",
      recommendedAction: "Increase stock by 175 units",
      expectedRevenue: 5040000,
      seasonalTrend: "peak",
      externalFactors: ["Festive season", "New launch buzz", "Competitor pricing"]
    },
    {
      productId: "WM-CL-045",
      productName: "Winter Jacket Collection",
      category: "Clothing",
      currentStock: 380,
      predictedDemand: 295,
      confidenceLevel: 88,
      timeframe: '30d',
      forecastAccuracy: 91,
      riskLevel: "medium",
      recommendedAction: "Reduce procurement by 20%",
      expectedRevenue: 1475000,
      seasonalTrend: "declining",
      externalFactors: ["Weather warming", "End of winter season"]
    },
    {
      productId: "WM-GR-023",
      productName: "Organic Rice 5kg",
      category: "Grocery",
      currentStock: 1250,
      predictedDemand: 1180,
      confidenceLevel: 96,
      timeframe: '30d',
      forecastAccuracy: 98,
      riskLevel: "low",
      recommendedAction: "Maintain current levels",
      expectedRevenue: 590000,
      seasonalTrend: "stable",
      externalFactors: ["Harvest season", "Health consciousness trend"]
    },
    {
      productId: "WM-HM-078",
      productName: "Smart TV 55 inch",
      category: "Electronics",
      currentStock: 85,
      predictedDemand: 165,
      confidenceLevel: 89,
      timeframe: '30d',
      forecastAccuracy: 87,
      riskLevel: "high",
      recommendedAction: "Urgent restocking needed",
      expectedRevenue: 8250000,
      seasonalTrend: "rising",
      externalFactors: ["Cricket season", "Streaming popularity", "Work from home"]
    }
  ];

  // Mock data for seasonal patterns
  const seasonalPatterns: SeasonalPattern[] = [
    {
      period: "Diwali Season (Oct-Nov)",
      demandMultiplier: 2.3,
      confidence: 94,
      keyEvents: ["Diwali", "Dhanteras", "Bhai Dooj", "Festive bonuses"]
    },
    {
      period: "Wedding Season (Nov-Feb)",
      demandMultiplier: 1.8,
      confidence: 91,
      keyEvents: ["Wedding season", "Gold buying", "Gifting surge"]
    },
    {
      period: "Summer (Mar-Jun)",
      demandMultiplier: 0.7,
      confidence: 88,
      keyEvents: ["School holidays", "AC demand", "Summer clothing"]
    },
    {
      period: "Monsoon (Jul-Sep)",
      demandMultiplier: 0.9,
      confidence: 85,
      keyEvents: ["Monsoon gear", "Indoor activities", "Health products"]
    }
  ];

  // Mock data for external factors
  const externalFactors: ExternalFactor[] = [
    {
      type: "weather",
      name: "Extended Monsoon",
      impact: "negative",
      strength: 78,
      description: "Prolonged monsoon affecting outdoor activities and clothing sales",
      affectedCategories: ["Clothing", "Sports", "Outdoor"]
    },
    {
      type: "festival",
      name: "Upcoming Diwali",
      impact: "positive",
      strength: 95,
      description: "Major festival driving electronics, clothing, and home decor demand",
      affectedCategories: ["Electronics", "Clothing", "Home & Kitchen", "Jewelry"]
    },
    {
      type: "economic",
      name: "GST Rate Changes",
      impact: "neutral",
      strength: 65,
      description: "Recent GST adjustments affecting pricing and demand patterns",
      affectedCategories: ["Electronics", "Automobiles"]
    },
    {
      type: "social",
      name: "Fitness Trend",
      impact: "positive",
      strength: 72,
      description: "Growing health consciousness driving fitness and wellness product demand",
      affectedCategories: ["Sports", "Health", "Organic Food"]
    },
    {
      type: "competitor",
      name: "Amazon Sale Event",
      impact: "negative",
      strength: 58,
      description: "Competitor promotional activities affecting market share",
      affectedCategories: ["Electronics", "Fashion", "Books"]
    }
  ];

  const filteredForecasts = demandForecasts.filter(forecast => {
    const matchesCategory = filterCategory === 'all' || forecast.category.toLowerCase().includes(filterCategory);
    const matchesRisk = filterRisk === 'all' || forecast.riskLevel === filterRisk;
    return matchesCategory && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'peak': return 'text-green-600 bg-green-100';
      case 'rising': return 'text-blue-600 bg-blue-100';
      case 'stable': return 'text-gray-600 bg-gray-100';
      case 'declining': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFactorIcon = (type: string) => {
    switch (type) {
      case 'weather': return CloudRain;
      case 'festival': return Star;
      case 'economic': return DollarSign;
      case 'social': return Users;
      case 'competitor': return Target;
      default: return Globe;
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
    <div className="min-h-screen bg-slate-50">
      <Navigation role={currentRole} currentPage="demand-forecasting" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Demand Forecasting AI</h1>
          <p className="text-gray-600 mt-2">
            Advanced AI-powered demand prediction with external factor analysis and seasonal intelligence
          </p>
        </div>

        {/* AI Insights Banner */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <Brain className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">
              AI Insight: Electronics demand expected to surge 35% in next 2 weeks due to upcoming festival season.
            </span>
            <button 
              onClick={() => setShowStrategyModal(true)}
              className="ml-auto text-blue-600 hover:text-blue-700 font-medium"
            >
              View Strategy →
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'forecasts', label: 'Demand Forecasts', icon: BarChart3 },
                { id: 'seasonal', label: 'Seasonal Patterns', icon: Calendar },
                { id: 'external', label: 'External Factors', icon: Globe },
                { id: 'analytics', label: 'Predictive Analytics', icon: Brain }
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
            {activeTab === 'forecasts' && (
              <div>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="7d">Next 7 Days</option>
                        <option value="14d">Next 14 Days</option>
                        <option value="30d">Next 30 Days</option>
                        <option value="90d">Next 90 Days</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-gray-400 mr-2" />
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="grocery">Grocery</option>
                        <option value="home">Home & Kitchen</option>
                      </select>
                    </div>
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
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Forecasts
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* Forecasts Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Predicted Demand
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Confidence
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trend
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recommendation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredForecasts.map((forecast, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{forecast.productName}</div>
                              <div className="text-sm text-gray-500">{forecast.productId} • {forecast.category}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{forecast.currentStock.toLocaleString()}</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${getRiskColor(forecast.riskLevel)}`}>
                              {forecast.riskLevel.toUpperCase()} RISK
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{forecast.predictedDemand.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">
                              Revenue: ₹{(forecast.expectedRevenue / 100000).toFixed(1)}L
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm text-gray-900">{forecast.confidenceLevel}%</div>
                              <div className="ml-2 w-12 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{width: `${forecast.confidenceLevel}%`}}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrendColor(forecast.seasonalTrend)}`}>
                              {forecast.seasonalTrend.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{forecast.recommendedAction}</div>
                            <div className="text-xs text-gray-500">Accuracy: {forecast.forecastAccuracy}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                Apply
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'seasonal' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Seasonal Demand Patterns</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Seasonal Patterns */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Key Seasonal Periods</h4>
                    <div className="space-y-4">
                      {seasonalPatterns.map((pattern, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-medium text-gray-900">{pattern.period}</div>
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-blue-600">
                                {pattern.demandMultiplier}x
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                ({pattern.confidence}% confidence)
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm text-gray-600">Key Events:</div>
                            <div className="flex flex-wrap gap-2">
                              {pattern.keyEvents.map((event, eventIndex) => (
                                <span key={eventIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {event}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Chart */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Seasonal Demand Visualization</h4>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="space-y-4">
                        {/* Chart Container */}
                        <div className="relative h-80">
                          <svg className="w-full h-full" viewBox="0 0 900 320">
                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                              <line
                                key={i}
                                x1="60"
                                y1={60 + i * 50}
                                x2="840"
                                y2={60 + i * 50}
                                stroke="#f3f4f6"
                                strokeWidth="1"
                              />
                            ))}
                            
                            {/* Y-axis labels */}
                            {['2.5x', '2.0x', '1.5x', '1.0x', '0.5x'].map((label, i) => (
                              <text
                                key={i}
                                x="50"
                                y={65 + i * 50}
                                textAnchor="end"
                                className="text-xs fill-gray-500"
                              >
                                {label}
                              </text>
                            ))}
                            
                            {/* X-axis baseline */}
                            <line
                              x1="60"
                              y1="270"
                              x2="840"
                              y2="270"
                              stroke="#e5e7eb"
                              strokeWidth="2"
                            />
                            
                            {/* X-axis labels - months */}
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                              <text
                                key={i}
                                x={85 + i * 65}
                                y="290"
                                textAnchor="middle"
                                className="text-xs fill-gray-600 font-medium"
                              >
                                {month}
                              </text>
                            ))}
                            
                            {/* Demand line chart based on actual seasonal data */}
                            <path
                              d="M 85,160 L 150,160 L 215,260 L 280,260 L 345,260 L 410,260 L 475,210 L 540,210 L 605,210 L 670,80 L 735,80 L 800,160"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="4"
                              className="drop-shadow-sm"
                            />
                            
                            {/* Data points with actual seasonal values */}
                            {[
                              { x: 85, y: 160, multiplier: 1.8, label: 'Wedding Season' },   // Jan
                              { x: 150, y: 160, multiplier: 1.8, label: 'Wedding Season' },  // Feb
                              { x: 215, y: 260, multiplier: 0.7, label: 'Summer' },         // Mar
                              { x: 280, y: 260, multiplier: 0.7, label: 'Summer' },         // Apr
                              { x: 345, y: 260, multiplier: 0.7, label: 'Summer' },         // May
                              { x: 410, y: 260, multiplier: 0.7, label: 'Summer' },         // Jun
                              { x: 475, y: 210, multiplier: 0.9, label: 'Monsoon' },        // Jul
                              { x: 540, y: 210, multiplier: 0.9, label: 'Monsoon' },        // Aug
                              { x: 605, y: 210, multiplier: 0.9, label: 'Monsoon' },        // Sep
                              { x: 670, y: 80, multiplier: 2.3, label: 'Diwali Season' },   // Oct
                              { x: 735, y: 80, multiplier: 2.3, label: 'Diwali Season' },   // Nov
                              { x: 800, y: 160, multiplier: 1.8, label: 'Wedding Season' }  // Dec
                            ].map((point, i) => (
                              <g key={i}>
                                <circle
                                  cx={point.x}
                                  cy={point.y}
                                  r="5"
                                  fill="#3b82f6"
                                  className="drop-shadow-sm"
                                />
                                <circle
                                  cx={point.x}
                                  cy={point.y}
                                  r="10"
                                  fill="transparent"
                                  className="hover:fill-blue-100 cursor-pointer transition-all"
                                />
                              </g>
                            ))}
                            
                            {/* Seasonal highlight areas - starting from baseline (1.0x = y=210) */}
                            {/* Diwali Season (Oct-Nov) - extends upward from baseline */}
                            <rect
                              x="655"
                              y="80"
                              width="140"
                              height="130"
                              fill="#fef3c7"
                              fillOpacity="0.3"
                              rx="6"
                            />
                            <text
                              x="725"
                              y="40"
                              textAnchor="middle"
                              className="text-sm fill-yellow-700 font-semibold"
                            >
                              Diwali Season (2.3x)
                            </text>
                            
                            {/* Wedding Season (Jan-Feb, Dec) - extends upward from baseline */}
                            <rect
                              x="70"
                              y="160"
                              width="145"
                              height="50"
                              fill="#dbeafe"
                              fillOpacity="0.4"
                              rx="6"
                            />
                            <text
                              x="142"
                              y="125"
                              textAnchor="middle"
                              className="text-sm fill-blue-700 font-semibold"
                            >
                              Wedding Season (1.8x)
                            </text>
                            
                            {/* Wedding Season Dec - extends upward from baseline */}
                            <rect
                              x="785"
                              y="160"
                              width="60"
                              height="50"
                              fill="#dbeafe"
                              fillOpacity="0.4"
                              rx="6"
                            />
                            
                            {/* Summer (Mar-Jun) - extends downward from baseline */}
                            <rect
                              x="200"
                              y="210"
                              width="225"
                              height="50"
                              fill="#fecaca"
                              fillOpacity="0.3"
                              rx="6"
                            />
                            <text
                              x="312"
                              y="310"
                              textAnchor="middle"
                              className="text-sm fill-red-700 font-semibold"
                            >
                              Summer (0.7x)
                            </text>
                            
                            {/* Monsoon (Jul-Sep) - extends downward from baseline */}
                            <rect
                              x="460"
                              y="210"
                              width="160"
                              height="20"
                              fill="#d1fae5"
                              fillOpacity="0.4"
                              rx="6"
                            />
                            <text
                              x="540"
                              y="175"
                              textAnchor="middle"
                              className="text-sm fill-green-700 font-semibold"
                            >
                              Monsoon (0.9x)
                            </text>
                            
                            {/* Baseline reference line (1.0x) */}
                            <line
                              x1="60"
                              y1="210"
                              x2="840"
                              y2="210"
                              stroke="#9ca3af"
                              strokeWidth="1"
                              strokeDasharray="5,5"
                            />
                            <text
                              x="50"
                              y="215"
                              textAnchor="end"
                              className="text-xs fill-gray-600 font-medium"
                            >
                              1.0x
                            </text>
                          </svg>
                        </div>
                        
                        {/* Legend */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-0.5 bg-blue-500 rounded"></div>
                              <span className="text-xs text-gray-600">Demand Multiplier</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                              <span className="text-xs text-gray-600">Peak Season</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Based on 3-year historical average
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Seasonal Insights */}
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-900">Seasonal Insight</span>
                      </div>
                      <p className="text-sm text-yellow-800">
                        Diwali season approaching in 45 days. Electronics and clothing categories expected to see 2.3x demand surge.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'external' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">External Factor Analysis</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {externalFactors.map((factor, index) => {
                    const FactorIcon = getFactorIcon(factor.type);
                    return (
                      <div key={index} className="p-6 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-gray-100 rounded-lg mr-3">
                              <FactorIcon className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{factor.name}</h4>
                              <p className="text-sm text-gray-500 capitalize">{factor.type} Factor</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(factor.impact)}`}>
                              {factor.impact.toUpperCase()}
                            </span>
                            <span className="ml-2 text-sm font-medium text-gray-900">
                              {factor.strength}%
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-4">{factor.description}</p>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Affected Categories:</p>
                          <div className="flex flex-wrap gap-2">
                            {factor.affectedCategories.map((category, catIndex) => (
                              <span key={catIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Impact Strength</span>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    factor.impact === 'positive' ? 'bg-green-500' :
                                    factor.impact === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                                  }`}
                                  style={{width: `${factor.strength}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{factor.strength}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Predictive Analytics Dashboard</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* AI Model Performance */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">AI Model Performance</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Short-term Forecasting (7-14 days)</span>
                          <span className="text-sm font-semibold text-green-600">96.2% Accuracy</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Optimized for immediate inventory decisions
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '96.2%'}}></div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Medium-term Forecasting (30 days)</span>
                          <span className="text-sm font-semibold text-blue-600">94.2% Accuracy</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Balances seasonal patterns with external factors
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '94.2%'}}></div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Long-term Forecasting (90 days)</span>
                          <span className="text-sm font-semibold text-orange-600">89.1% Accuracy</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Strategic planning with market trend analysis
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{width: '89.1%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Data Intelligence Sources</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Database className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-gray-900">Historical Sales Data</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          3+ years of transaction data across all categories and locations
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CloudRain className="h-5 w-5 text-gray-600 mr-2" />
                          <span className="font-medium text-gray-900">Weather Intelligence</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Real-time and forecasted weather data affecting demand patterns
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 text-yellow-600 mr-2" />
                          <span className="font-medium text-gray-900">Festival & Events Calendar</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Regional festivals, holidays, and cultural events impact analysis
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Activity className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="font-medium text-gray-900">Market Trends & Social Signals</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Social media trends, economic indicators, and competitor activities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights Section */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-700 mb-4">AI-Generated Insights</h4>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <Brain className="h-6 w-6 text-purple-600 mr-3 mt-1" />
                      <div>
                        <h5 className="font-semibold text-purple-900 mb-2">Weekly Intelligence Summary</h5>
                        <ul className="space-y-2 text-sm text-purple-800">
                          <li>• Electronics demand forecasted to surge 35% in next 14 days due to upcoming Diwali festival</li>
                          <li>• Monsoon extension likely to reduce outdoor sports equipment demand by 15-20%</li>
                          <li>• Health and wellness products showing sustained 25% growth due to fitness trends</li>
                          <li>• Competitor promotional activities may impact electronics sales by 8-12% next week</li>
                          <li>• Organic food demand stable with 18% seasonal growth pattern continuing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Strategy Modal */}
        {showStrategyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">AI Strategy Recommendations</h2>
                  </div>
                  <button 
                    onClick={() => setShowStrategyModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Comprehensive strategy recommendations based on AI demand forecasting analysis
                </p>
              </div>
              
              <div className="p-6">
                {/* Festival Season Strategy */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Star className="h-6 w-6 text-yellow-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Festival Season Strategy</h3>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="font-medium text-yellow-900 mb-2">Key Insight</div>
                    <p className="text-yellow-800">
                      Diwali festival (45 days away) will drive 35% demand surge in Electronics category. 
                      Historical data shows 2.3x demand multiplier during this period.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900 mb-2">📱 Electronics Priority Actions</div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Increase smartphone inventory by 40%</li>
                        <li>• Stock premium electronics (TV, laptops)</li>
                        <li>• Secure supplier commitments for peak demand</li>
                        <li>• Prepare gift packaging services</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900 mb-2">⏰ Timeline</div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Week 1-2: Secure additional inventory</li>
                        <li>• Week 3-4: Ramp up marketing campaigns</li>
                        <li>• Week 5-6: Peak season execution</li>
                        <li>• Week 7+: Post-festival clearance</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Inventory Optimization */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Package className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Inventory Optimization</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="font-medium text-green-900 mb-2">High Priority</div>
                      <div className="text-sm text-green-800">
                        <div className="font-medium">iPhone 15 Pro Max</div>
                        <div>Current: 245 units</div>
                        <div>Recommended: 420 units</div>
                        <div className="text-xs mt-1">92% confidence</div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                      <div className="font-medium text-yellow-900 mb-2">Medium Priority</div>
                      <div className="text-sm text-yellow-800">
                        <div className="font-medium">Smart TV 55"</div>
                        <div>Current: 85 units</div>
                        <div>Recommended: 165 units</div>
                        <div className="text-xs mt-1">89% confidence</div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="font-medium text-red-900 mb-2">Reduce Stock</div>
                      <div className="text-sm text-red-800">
                        <div className="font-medium">Winter Jackets</div>
                        <div>Current: 380 units</div>
                        <div>Recommended: 295 units</div>
                        <div className="text-xs mt-1">88% confidence</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Risk Management */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-red-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Risk Management</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                        <span className="font-medium text-red-900">Supply Chain Risk</span>
                      </div>
                      <p className="text-sm text-red-800">
                        Monitor Shanghai port congestion - may affect electronics supply by 5-7 days. 
                        Consider alternate shipping routes.
                      </p>
                    </div>
                    
                    <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                      <div className="flex items-center mb-2">
                        <CloudRain className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-900">Weather Impact</span>
                      </div>
                      <p className="text-sm text-yellow-800">
                        Extended monsoon may reduce outdoor/sports equipment demand by 15%. 
                        Adjust procurement accordingly.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Expected Outcomes */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Target className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Expected Outcomes</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">₹15.2Cr</div>
                      <div className="text-blue-800">Projected Revenue</div>
                      <div className="text-xs text-blue-600">+18% vs current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <div className="text-green-800">Stock Efficiency</div>
                      <div className="text-xs text-green-600">+5% improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">8.2%</div>
                      <div className="text-purple-800">Demand Volatility</div>
                      <div className="text-xs text-purple-600">-4.1% reduction</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Last updated: {new Date().toLocaleDateString('en-IN')} at {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                      Download Strategy
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Implement Strategy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemandForecastingAI;
