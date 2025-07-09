import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Target, 
  TrendingUp, 
  Map, 
  Users, 
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Lightbulb,
  BarChart3,
  PieChart,
  Globe,
  Store,
  Package,
  Download,
  Plus,
  Edit,
  Eye
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

interface StrategicGoal {
  id: string;
  title: string;
  description: string;
  category: 'growth' | 'efficiency' | 'market' | 'innovation';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  target: string;
  deadline: string;
  owner: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
}

interface Initiative {
  id: string;
  name: string;
  description: string;
  budget: number;
  expectedROI: number;
  timeline: string;
  department: string;
  impact: 'high' | 'medium' | 'low';
  status: 'planning' | 'in-progress' | 'completed' | 'paused';
  progress: number;
}

interface MarketOpportunity {
  id: string;
  title: string;
  description: string;
  marketSize: number;
  potential: number;
  competition: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  timeline: string;
  risk: 'low' | 'medium' | 'high';
}

const StrategicPlanning: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('goals');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-2025');

  // Strategic goals
  const strategicGoals: StrategicGoal[] = [
    {
      id: 'G001',
      title: 'Expand to 350 stores by 2025',
      description: 'Aggressive expansion plan targeting tier-2 and tier-3 cities',
      category: 'growth',
      priority: 'high',
      progress: 68,
      target: '350 stores',
      deadline: 'Dec 2025',
      owner: 'Regional Expansion Team',
      status: 'on-track'
    },
    {
      id: 'G002',
      title: 'Achieve 30% market share in key metros',
      description: 'Strengthen position in Mumbai, Delhi, Bangalore, Chennai',
      category: 'market',
      priority: 'high',
      progress: 79,
      target: '30% market share',
      deadline: 'Mar 2025',
      owner: 'Market Strategy Team',
      status: 'on-track'
    },
    {
      id: 'G003',
      title: 'Implement AI-driven inventory management',
      description: 'Deploy advanced AI systems across all stores for optimal inventory',
      category: 'innovation',
      priority: 'medium',
      progress: 45,
      target: '100% AI coverage',
      deadline: 'Aug 2024',
      owner: 'Technology Team',
      status: 'at-risk'
    },
    {
      id: 'G004',
      title: 'Reduce operational costs by 15%',
      description: 'Optimize supply chain and store operations for cost efficiency',
      category: 'efficiency',
      priority: 'high',
      progress: 62,
      target: '15% cost reduction',
      deadline: 'Dec 2024',
      owner: 'Operations Team',
      status: 'on-track'
    },
    {
      id: 'G005',
      title: 'Launch sustainable packaging initiative',
      description: 'Transition to 100% eco-friendly packaging across all products',
      category: 'innovation',
      priority: 'medium',
      progress: 33,
      target: '100% eco-packaging',
      deadline: 'Jun 2025',
      owner: 'Sustainability Team',
      status: 'delayed'
    }
  ];

  // Strategic initiatives
  const initiatives: Initiative[] = [
    {
      id: 'I001',
      name: 'Digital Transformation Program',
      description: 'Comprehensive digitization of all business processes',
      budget: 125000000,
      expectedROI: 240,
      timeline: '18 months',
      department: 'Technology',
      impact: 'high',
      status: 'in-progress',
      progress: 58
    },
    {
      id: 'I002',
      name: 'Supply Chain Optimization',
      description: 'End-to-end supply chain modernization and automation',
      budget: 85000000,
      expectedROI: 180,
      timeline: '12 months',
      department: 'Operations',
      impact: 'high',
      status: 'in-progress',
      progress: 72
    },
    {
      id: 'I003',
      name: 'Customer Experience Enhancement',
      description: 'Omnichannel customer experience platform',
      budget: 65000000,
      expectedROI: 150,
      timeline: '15 months',
      department: 'Marketing',
      impact: 'medium',
      status: 'planning',
      progress: 15
    },
    {
      id: 'I004',
      name: 'Workforce Development Program',
      description: 'Comprehensive training and skill development for all employees',
      budget: 45000000,
      expectedROI: 120,
      timeline: '24 months',
      department: 'HR',
      impact: 'medium',
      status: 'in-progress',
      progress: 41
    }
  ];

  // Market opportunities
  const marketOpportunities: MarketOpportunity[] = [
    {
      id: 'O001',
      title: 'Tier-3 City Expansion',
      description: 'Untapped market in smaller cities with growing middle class',
      marketSize: 850000000,
      potential: 180000000,
      competition: 'low',
      difficulty: 'medium',
      timeline: '2-3 years',
      risk: 'medium'
    },
    {
      id: 'O002',
      title: 'Online Grocery Delivery',
      description: 'Rapid growth in e-commerce and home delivery services',
      marketSize: 1200000000,
      potential: 300000000,
      competition: 'high',
      difficulty: 'hard',
      timeline: '1-2 years',
      risk: 'high'
    },
    {
      id: 'O003',
      title: 'Private Label Expansion',
      description: 'Increase private label products for better margins',
      marketSize: 650000000,
      potential: 130000000,
      competition: 'medium',
      difficulty: 'easy',
      timeline: '1 year',
      risk: 'low'
    },
    {
      id: 'O004',
      title: 'Health & Wellness Category',
      description: 'Growing demand for health and wellness products',
      marketSize: 480000000,
      potential: 96000000,
      competition: 'medium',
      difficulty: 'medium',
      timeline: '1.5 years',
      risk: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm rounded-lg mb-6">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Building className="h-5 w-5 text-white" />
                </div>
              </Link>
              <nav className="flex space-x-8">
                <Link to="/executive/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                  Dashboard
                </Link>
                <Link to="/executive/analytics" className="text-slate-700 hover:text-blue-900 font-medium">
                  Analytics
                </Link>
                <Link to="/executive/strategy" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
                  Strategy
                </Link>
                <Link to="/executive/performance" className="text-slate-700 hover:text-blue-900 font-medium">
                  Performance
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Strategic Planning</h1>
            <p className="text-gray-600 mt-1">Long-term strategy planning and execution tracking</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              New Initiative
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Plan
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedTab('goals')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                selectedTab === 'goals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Strategic Goals
            </button>
            <button
              onClick={() => setSelectedTab('initiatives')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                selectedTab === 'initiatives'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Initiatives
            </button>
            <button
              onClick={() => setSelectedTab('opportunities')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                selectedTab === 'opportunities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Market Opportunities
            </button>
          </nav>
        </div>
      </div>

      {/* Strategic Goals Tab */}
      {selectedTab === 'goals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-8 w-8 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Total Goals</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{strategicGoals.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h3 className="font-semibold text-gray-900">On Track</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {strategicGoals.filter(g => g.status === 'on-track').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">At Risk</h3>
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                {strategicGoals.filter(g => g.status === 'at-risk').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-8 w-8 text-red-600" />
                <h3 className="font-semibold text-gray-900">Delayed</h3>
              </div>
              <p className="text-3xl font-bold text-red-600">
                {strategicGoals.filter(g => g.status === 'delayed').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Strategic Goals</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {strategicGoals.map((goal) => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                            {goal.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                            {goal.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>📅 {goal.deadline}</span>
                          <span>👤 {goal.owner}</span>
                          <span>🎯 {goal.target}</span>
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
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initiatives Tab */}
      {selectedTab === 'initiatives' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-8 w-8 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Active Initiatives</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{initiatives.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <h3 className="font-semibold text-gray-900">Total Budget</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {formatIndianCurrency(initiatives.reduce((sum, i) => sum + i.budget, 0))}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Avg. ROI</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {Math.round(initiatives.reduce((sum, i) => sum + i.expectedROI, 0) / initiatives.length)}%
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Avg. Progress</h3>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {Math.round(initiatives.reduce((sum, i) => sum + i.progress, 0) / initiatives.length)}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Strategic Initiatives</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {initiatives.map((initiative) => (
                  <div key={initiative.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{initiative.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(initiative.impact)}`}>
                            {initiative.impact} impact
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                            {initiative.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{initiative.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Budget</p>
                            <p className="font-semibold">{formatIndianCurrency(initiative.budget)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Expected ROI</p>
                            <p className="font-semibold">{initiative.expectedROI}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Timeline</p>
                            <p className="font-semibold">{initiative.timeline}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Department</p>
                            <p className="font-semibold">{initiative.department}</p>
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
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{initiative.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${initiative.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Opportunities Tab */}
      {selectedTab === 'opportunities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="h-8 w-8 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">Opportunities</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{marketOpportunities.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-8 w-8 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Total Market</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {formatIndianCurrency(marketOpportunities.reduce((sum, o) => sum + o.marketSize, 0))}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-8 w-8 text-green-600" />
                <h3 className="font-semibold text-gray-900">Potential</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {formatIndianCurrency(marketOpportunities.reduce((sum, o) => sum + o.potential, 0))}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-8 w-8 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Low Risk</h3>
              </div>
              <p className="text-3xl font-bold text-purple-600">
                {marketOpportunities.filter(o => o.risk === 'low').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Market Opportunities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {marketOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(opportunity.risk)}`}>
                            {opportunity.risk} risk
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{opportunity.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Market Size</p>
                            <p className="font-semibold">{formatIndianCurrency(opportunity.marketSize)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Potential</p>
                            <p className="font-semibold">{formatIndianCurrency(opportunity.potential)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Timeline</p>
                            <p className="font-semibold">{opportunity.timeline}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Competition</p>
                            <p className="font-semibold">{opportunity.competition}</p>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          opportunity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          opportunity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {opportunity.difficulty} difficulty
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          opportunity.competition === 'low' ? 'bg-green-100 text-green-800' :
                          opportunity.competition === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {opportunity.competition} competition
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Analyze
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicPlanning;
