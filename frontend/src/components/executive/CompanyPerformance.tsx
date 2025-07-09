import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Target,
  DollarSign,
  Users,
  Store,
  Package,
  Clock,
  Award,
  Globe,
  Zap,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle
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

interface PerformanceMetric {
  category: string;
  metrics: {
    label: string;
    value: string;
    change: number;
    trend: 'up' | 'down';
    target: string;
    status: 'excellent' | 'good' | 'average' | 'poor';
  }[];
}

interface DepartmentPerformance {
  department: string;
  head: string;
  budget: number;
  utilization: number;
  efficiency: number;
  kpis: {
    achieved: number;
    total: number;
  };
  status: 'excellent' | 'good' | 'average' | 'poor';
}

interface CompetitorAnalysis {
  competitor: string;
  marketShare: number;
  revenue: number;
  growth: number;
  strengths: string[];
  weaknesses: string[];
}

interface FinancialHighlight {
  quarter: string;
  revenue: number;
  profit: number;
  margin: number;
  growth: number;
}

const CompanyPerformance: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Performance metrics by category
  const performanceMetrics: PerformanceMetric[] = [
    {
      category: 'Financial Performance',
      metrics: [
        {
          label: 'Revenue',
          value: formatIndianCurrency(2850000000),
          change: 18.5,
          trend: 'up',
          target: formatIndianCurrency(3000000000),
          status: 'excellent'
        },
        {
          label: 'Gross Profit',
          value: formatIndianCurrency(810000000),
          change: 22.3,
          trend: 'up',
          target: formatIndianCurrency(900000000),
          status: 'excellent'
        },
        {
          label: 'EBITDA',
          value: formatIndianCurrency(427500000),
          change: 15.8,
          trend: 'up',
          target: formatIndianCurrency(450000000),
          status: 'good'
        },
        {
          label: 'Net Profit',
          value: formatIndianCurrency(342000000),
          change: 19.2,
          trend: 'up',
          target: formatIndianCurrency(360000000),
          status: 'good'
        }
      ]
    },
    {
      category: 'Operational Performance',
      metrics: [
        {
          label: 'Store Count',
          value: '287',
          change: 12.5,
          trend: 'up',
          target: '300',
          status: 'excellent'
        },
        {
          label: 'Same Store Sales',
          value: '8.7%',
          change: 2.3,
          trend: 'up',
          target: '10%',
          status: 'good'
        },
        {
          label: 'Inventory Turnover',
          value: '8.2x',
          change: 6.7,
          trend: 'up',
          target: '9x',
          status: 'good'
        },
        {
          label: 'Supply Chain Efficiency',
          value: '92.1%',
          change: 3.4,
          trend: 'up',
          target: '95%',
          status: 'good'
        }
      ]
    },
    {
      category: 'Customer Performance',
      metrics: [
        {
          label: 'Customer Base',
          value: '45.2M',
          change: 15.2,
          trend: 'up',
          target: '50M',
          status: 'excellent'
        },
        {
          label: 'Customer Satisfaction',
          value: '4.3/5',
          change: 4.9,
          trend: 'up',
          target: '4.5/5',
          status: 'good'
        },
        {
          label: 'Customer Retention',
          value: '87.2%',
          change: 2.8,
          trend: 'up',
          target: '90%',
          status: 'good'
        },
        {
          label: 'Net Promoter Score',
          value: '72',
          change: 8.3,
          trend: 'up',
          target: '75',
          status: 'good'
        }
      ]
    },
    {
      category: 'Market Performance',
      metrics: [
        {
          label: 'Market Share',
          value: '23.8%',
          change: 2.1,
          trend: 'up',
          target: '25%',
          status: 'excellent'
        },
        {
          label: 'Brand Value',
          value: formatIndianCurrency(1250000000),
          change: 12.8,
          trend: 'up',
          target: formatIndianCurrency(1400000000),
          status: 'good'
        },
        {
          label: 'Market Penetration',
          value: '31.5%',
          change: 5.2,
          trend: 'up',
          target: '35%',
          status: 'good'
        },
        {
          label: 'Competitive Index',
          value: '8.4/10',
          change: 6.7,
          trend: 'up',
          target: '9/10',
          status: 'excellent'
        }
      ]
    }
  ];

  // Department performance
  const departmentPerformances: DepartmentPerformance[] = [
    {
      department: 'Operations',
      head: 'Rajesh Kumar',
      budget: 450000000,
      utilization: 92,
      efficiency: 88,
      kpis: { achieved: 8, total: 10 },
      status: 'excellent'
    },
    {
      department: 'Technology',
      head: 'Priya Sharma',
      budget: 285000000,
      utilization: 87,
      efficiency: 94,
      kpis: { achieved: 9, total: 12 },
      status: 'good'
    },
    {
      department: 'Marketing',
      head: 'Arjun Patel',
      budget: 180000000,
      utilization: 95,
      efficiency: 82,
      kpis: { achieved: 7, total: 9 },
      status: 'good'
    },
    {
      department: 'Supply Chain',
      head: 'Kavita Singh',
      budget: 320000000,
      utilization: 89,
      efficiency: 91,
      kpis: { achieved: 11, total: 14 },
      status: 'excellent'
    },
    {
      department: 'Human Resources',
      head: 'Suresh Gupta',
      budget: 125000000,
      utilization: 78,
      efficiency: 85,
      kpis: { achieved: 6, total: 8 },
      status: 'average'
    },
    {
      department: 'Finance',
      head: 'Meera Reddy',
      budget: 95000000,
      utilization: 85,
      efficiency: 96,
      kpis: { achieved: 7, total: 8 },
      status: 'excellent'
    }
  ];

  // Competitor analysis
  const competitorAnalysis: CompetitorAnalysis[] = [
    {
      competitor: 'Reliance Retail',
      marketShare: 28.5,
      revenue: 3200000000,
      growth: 16.3,
      strengths: ['Strong brand presence', 'Digital integration', 'Aggressive pricing'],
      weaknesses: ['Limited rural reach', 'Supply chain gaps']
    },
    {
      competitor: 'Future Group',
      marketShare: 18.2,
      revenue: 2100000000,
      growth: 8.7,
      strengths: ['Store network', 'Customer loyalty', 'Private labels'],
      weaknesses: ['Financial constraints', 'Technology lag']
    },
    {
      competitor: 'Aditya Birla',
      marketShare: 15.6,
      revenue: 1800000000,
      growth: 12.1,
      strengths: ['Fashion focus', 'Premium positioning', 'Mall presence'],
      weaknesses: ['Limited food retail', 'High costs']
    },
    {
      competitor: 'Tata Group',
      marketShare: 13.9,
      revenue: 1600000000,
      growth: 22.5,
      strengths: ['Brand trust', 'Quality focus', 'Innovation'],
      weaknesses: ['Price premium', 'Limited scale']
    }
  ];

  // Financial highlights
  const financialHighlights: FinancialHighlight[] = [
    { quarter: 'Q1 2024', revenue: 650000000, profit: 78000000, margin: 12.0, growth: 15.2 },
    { quarter: 'Q2 2024', revenue: 720000000, profit: 86400000, margin: 12.0, growth: 18.5 },
    { quarter: 'Q3 2024', revenue: 765000000, profit: 91800000, margin: 12.0, growth: 19.8 },
    { quarter: 'Q4 2024', revenue: 715000000, profit: 85800000, margin: 12.0, growth: 17.2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
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
                <Link to="/executive/strategy" className="text-slate-700 hover:text-blue-900 font-medium">
                  Strategy
                </Link>
                <Link to="/executive/performance" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
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
            <h1 className="text-3xl font-bold text-gray-900">Company Performance</h1>
            <p className="text-gray-600 mt-1">Comprehensive performance analysis and benchmarking</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+18.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">95%</h3>
          <p className="text-gray-600 text-sm">Overall Performance Score</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">87%</h3>
          <p className="text-gray-600 text-sm">Target Achievement</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+15.8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">92%</h3>
          <p className="text-gray-600 text-sm">Efficiency Index</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Globe className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+2.1%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">23.8%</h3>
          <p className="text-gray-600 text-sm">Market Share</p>
        </div>
      </div>

      {/* Performance Metrics by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {performanceMetrics.map((category, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{metric.label}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                          {metric.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                            {metric.trend === 'up' ? '+' : '-'}{Math.abs(metric.change)}%
                          </span>
                          {getTrendIcon(metric.trend)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Target: {metric.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Department Performance</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Detailed View
              </button>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {departmentPerformances.map((dept, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{dept.department}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dept.status)}`}>
                        {dept.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Budget Utilization</p>
                      <p className="font-semibold">{dept.utilization}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-500">Head</p>
                      <p className="font-medium">{dept.head}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Efficiency</p>
                      <p className="font-medium">{dept.efficiency}%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        {dept.kpis.achieved}/{dept.kpis.total} KPIs achieved
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatIndianCurrency(dept.budget)} budget
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Competitor Analysis</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Full Analysis
              </button>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {competitorAnalysis.map((competitor, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{competitor.competitor}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getTrendColor('up')}`}>
                        +{competitor.growth}%
                      </span>
                      {getTrendIcon('up')}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-500">Market Share</p>
                      <p className="font-semibold text-lg">{competitor.marketShare}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-semibold text-lg">{formatIndianCurrency(competitor.revenue)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        {competitor.strengths.length} strengths
                      </span>
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                        {competitor.weaknesses.length} weaknesses
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Performance Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Financial Performance Trend</h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Detailed Analysis
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialHighlights.map((highlight, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{highlight.quarter}</h3>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-medium ${getTrendColor('up')}`}>
                      +{highlight.growth}%
                    </span>
                    {getTrendIcon('up')}
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="font-semibold">{formatIndianCurrency(highlight.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Profit</p>
                    <p className="font-semibold">{formatIndianCurrency(highlight.profit)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Margin</p>
                    <p className="font-semibold">{highlight.margin}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPerformance;
