import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  employeeId: string;
  email: string;
  phone: string;
  shift: 'morning' | 'afternoon' | 'night';
  status: 'active' | 'on_leave' | 'inactive';
  joinDate: string;
  lastCheckIn: string;
  lastCheckOut: string;
  monthlyHours: number;
  targetHours: number;
  performance: number; // 0-100
  salary: number;
  avatar?: string;
}

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  requiredStaff: number;
  currentStaff: number;
  date: string;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'casual' | 'annual' | 'emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

const StaffManagement: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedShift, setSelectedShift] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'staff' | 'schedules' | 'leaves'>('staff');

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

  // Sample data
  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      position: 'Senior Sales Associate',
      department: 'Electronics',
      employeeId: 'WM001',
      email: 'priya.sharma@walmart.in',
      phone: '+91 98765 43210',
      shift: 'morning',
      status: 'active',
      joinDate: '2023-03-15',
      lastCheckIn: '09:00',
      lastCheckOut: '18:00',
      monthlyHours: 184,
      targetHours: 180,
      performance: 95,
      salary: 35000
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      position: 'Department Supervisor',
      department: 'Groceries',
      employeeId: 'WM002',
      email: 'rajesh.kumar@walmart.in',
      phone: '+91 98765 43211',
      shift: 'afternoon',
      status: 'active',
      joinDate: '2022-11-20',
      lastCheckIn: '14:00',
      lastCheckOut: '23:00',
      monthlyHours: 192,
      targetHours: 180,
      performance: 88,
      salary: 45000
    },
    {
      id: '3',
      name: 'Anita Patel',
      position: 'Cashier',
      department: 'Customer Service',
      employeeId: 'WM003',
      email: 'anita.patel@walmart.in',
      phone: '+91 98765 43212',
      shift: 'morning',
      status: 'on_leave',
      joinDate: '2023-01-10',
      lastCheckIn: '09:00',
      lastCheckOut: '18:00',
      monthlyHours: 156,
      targetHours: 180,
      performance: 82,
      salary: 28000
    }
  ];

  const shifts: Shift[] = [
    {
      id: '1',
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '18:00',
      requiredStaff: 15,
      currentStaff: 14,
      date: '2025-07-08'
    },
    {
      id: '2',
      name: 'Afternoon Shift',
      startTime: '14:00',
      endTime: '23:00',
      requiredStaff: 12,
      currentStaff: 11,
      date: '2025-07-08'
    },
    {
      id: '3',
      name: 'Night Shift',
      startTime: '23:00',
      endTime: '08:00',
      requiredStaff: 8,
      currentStaff: 8,
      date: '2025-07-08'
    }
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      employeeId: 'WM003',
      employeeName: 'Anita Patel',
      type: 'sick',
      startDate: '2025-07-08',
      endDate: '2025-07-10',
      reason: 'Fever and flu symptoms',
      status: 'approved',
      appliedDate: '2025-07-07'
    },
    {
      id: '2',
      employeeId: 'WM004',
      employeeName: 'Vikram Singh',
      type: 'casual',
      startDate: '2025-07-15',
      endDate: '2025-07-15',
      reason: 'Personal work',
      status: 'pending',
      appliedDate: '2025-07-08'
    }
  ];

  // Filter functions
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment;
    const matchesShift = selectedShift === 'all' || staff.shift === selectedShift;
    
    return matchesSearch && matchesDepartment && matchesShift;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border border-green-200';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning': return 'bg-blue-100 text-blue-800';
      case 'afternoon': return 'bg-orange-100 text-orange-800';
      case 'night': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'sick': return 'bg-red-100 text-red-800';
      case 'casual': return 'bg-blue-100 text-blue-800';
      case 'annual': return 'bg-green-100 text-green-800';
      case 'emergency': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate summary statistics
  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter(s => s.status === 'active').length;
  const onLeaveStaff = staffMembers.filter(s => s.status === 'on_leave').length;
  const avgPerformance = staffMembers.reduce((sum, s) => sum + s.performance, 0) / staffMembers.length;
  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-900">Walmart</span>
                <span className="text-sm text-slate-600 ml-2">OptiChain Store Manager Portal</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/store/dashboard" className="text-slate-700 hover:text-blue-900 font-medium">
                Dashboard
              </Link>
              <Link to="/store/inventory" className="text-slate-700 hover:text-blue-900 font-medium">
                Inventory
              </Link>
              <Link to="/store/staff" className="text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
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
                <span className="text-blue-900 font-bold text-sm">RS</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
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
              <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
              <p className="text-slate-600">Store #1247 - Connaught Place, New Delhi</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Staff
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Staff</h3>
                <p className="text-2xl font-bold text-gray-900">{totalStaff}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Active</h3>
                <p className="text-2xl font-bold text-gray-900">{activeStaff}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">On Leave</h3>
                <p className="text-2xl font-bold text-gray-900">{onLeaveStaff}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Avg Performance</h3>
                <p className="text-2xl font-bold text-gray-900">{avgPerformance.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Pending Leaves</h3>
                <p className="text-2xl font-bold text-gray-900">{pendingLeaves}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('staff')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'staff'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Staff Directory
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'schedules'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Shift Schedules
              </button>
              <button
                onClick={() => setActiveTab('leaves')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'leaves'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Leave Management
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'staff' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search staff..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shift</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                  >
                    <option value="all">All Shifts</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {staff.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                              <div className="text-sm text-gray-500">{staff.position}</div>
                              <div className="text-xs text-gray-400">{staff.employeeId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getShiftColor(staff.shift)}`}>
                            {staff.shift}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(staff.status)}`}>
                            {staff.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-semibold ${getPerformanceColor(staff.performance)}`}>
                            {staff.performance}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatIndianCurrency(staff.salary)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'schedules' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Shifts - July 8, 2025</h3>
              <div className="space-y-4">
                {shifts.map((shift) => (
                  <div key={shift.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{shift.name}</h4>
                        <p className="text-sm text-gray-500">{shift.startTime} - {shift.endTime}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {shift.currentStaff}/{shift.requiredStaff}
                        </div>
                        <div className="text-sm text-gray-500">Staff Assigned</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            shift.currentStaff >= shift.requiredStaff ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(shift.currentStaff / shift.requiredStaff) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'leaves' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Leave Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaveRequests.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                          <div className="text-sm text-gray-500">{leave.employeeId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeaveTypeColor(leave.type)}`}>
                            {leave.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {leave.startDate} to {leave.endDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {leave.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeaveStatusColor(leave.status)}`}>
                            {leave.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {leave.status === 'pending' && (
                            <>
                              <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                              <button className="text-red-600 hover:text-red-900">Reject</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;
