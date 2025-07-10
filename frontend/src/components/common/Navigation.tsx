import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  role: 'store' | 'supplier' | 'procurement' | 'regional';
  currentPage?: string; // Optional: to override auto-detection
}

const Navigation: React.FC<NavigationProps> = ({ role, currentPage }) => {
  const location = useLocation();
  
  // Auto-detect current page from URL if not provided
  const getCurrentPage = (): string => {
    if (currentPage) return currentPage;
    
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/inventory-simulator')) return 'simulator';
    if (path.includes('/inventory')) return 'inventory';
    if (path.includes('/staff')) return 'staff';
    if (path.includes('/customer')) return 'customer';
    if (path.includes('/operations')) return 'operations';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/predictions')) return 'predictions';
    if (path.includes('/vendors')) return 'vendors';
    if (path.includes('/contracts')) return 'contracts';
    if (path.includes('/network')) return 'network';
    return 'dashboard'; // fallback
  };

  const activePage = getCurrentPage();

  const getPortalName = () => {
    switch (role) {
      case 'store': return 'OptiChain Store Manager Portal';
      case 'supplier': return 'OptiChain Supplier Portal';
      case 'procurement': return 'OptiChain Procurement Portal';
      case 'regional': return 'OptiChain Regional Portal';
      default: return 'OptiChain Portal';
    }
  };

  const getUserInitials = () => {
    switch (role) {
      case 'store': return 'SM';
      case 'supplier': return 'SP';
      case 'procurement': return 'PM';
      case 'regional': return 'RM';
      default: return 'U';
    }
  };

  const getNavigationItems = () => {
    switch (role) {
      case 'store':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/store/dashboard' },
          { key: 'inventory', label: 'Inventory', path: '/store/inventory' },
          { key: 'staff', label: 'Staff', path: '/store/staff' },
          { key: 'customer', label: 'Customer', path: '/store/customer' },
          { key: 'operations', label: 'Operations', path: '/store/operations' },
          { key: 'analytics', label: 'Analytics', path: '/store/analytics' },
          { key: 'returns-radar', label: 'Returns Radar', path: '/store/returns-radar' },
          { key: 'simulator', label: 'Simulator', path: '/store/inventory-simulator' }
        ];
      case 'supplier':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/supplier/dashboard' },
          { key: 'orders', label: 'Orders', path: '/supplier/orders' },
          { key: 'predictions', label: 'Predictions', path: '/supplier/predictions' },
          { key: 'inventory', label: 'Inventory', path: '/supplier/inventory' },
          { key: 'analytics', label: 'Analytics', path: '/supplier/analytics' },
          { key: 'returns-radar', label: 'Returns Radar', path: '/supplier/returns-radar' },
          { key: 'simulator', label: 'Simulator', path: '/supplier/inventory-simulator' }
        ];
      case 'procurement':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/procurement/dashboard' },
          { key: 'vendors', label: 'Vendors', path: '/procurement/vendors' },
          { key: 'orders', label: 'Orders', path: '/procurement/orders' },
          { key: 'contracts', label: 'Contracts', path: '/procurement/contracts' },
          { key: 'simulator', label: 'Simulator', path: '/procurement/inventory-simulator' }
        ];
      case 'regional':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/regional/dashboard' },
          { key: 'analytics', label: 'Analytics', path: '/regional/analytics' },
          { key: 'network', label: 'Network', path: '/regional/network' },
          { key: 'operations', label: 'Operations', path: '/regional/operations' },
          { key: 'simulator', label: 'Simulator', path: '/regional/inventory-simulator' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-900">Walmart</span>
              <span className="text-sm text-slate-600 ml-2">{getPortalName()}</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={
                  activePage === item.key
                    ? "text-blue-900 font-medium border-b-2 border-blue-900 pb-1"
                    : "text-slate-700 hover:text-blue-900 font-medium"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-slate-500 hover:text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-900 font-bold text-sm">{getUserInitials()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
