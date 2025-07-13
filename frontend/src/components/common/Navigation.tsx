import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  role: 'store' | 'supplier' | 'procurement' | 'regional' | 'delivery';
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
    if (path.includes('/returns-radar')) return 'returns-radar';
    if (path.includes('/supplymesh-ai')) return 'supplymesh-ai';
    if (path.includes('/demand-forecasting')) return 'demand-forecasting';
    if (path.includes('/smart-drop-sync')) return 'smart-drop-sync';
    if (path.includes('/dropbot-ai')) return 'dropbot-ai';
    if (path.includes('/loadswap')) return 'loadswap';
    return 'dashboard'; // fallback
  };

  const activePage = getCurrentPage();

  const getPortalName = () => {
    switch (role) {
      case 'store': return 'OptiChain Store Manager Portal';
      case 'supplier': return 'OptiChain Supplier Portal';
      case 'procurement': return 'OptiChain Procurement Portal';
      case 'regional': return 'OptiChain Regional Portal';
      case 'delivery': return 'OptiChain Delivery Portal';
      default: return 'OptiChain Portal';
    }
  };

  const getUserInitials = () => {
    switch (role) {
      case 'store': return 'SM';
      case 'supplier': return 'SP';
      case 'procurement': return 'PM';
      case 'regional': return 'RM';
      case 'delivery': return 'DM';
      default: return 'U';
    }
  };

  const getNavigationItems = () => {
    switch (role) {
      case 'store':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/store/dashboard' },
          { key: 'inventory', label: 'Inventory', path: '/store/inventory' },
          // { key: 'staff', label: 'Staff', path: '/store/staff' },
          { key: 'customer', label: 'Customer', path: '/store/customer' },
          // { key: 'operations', label: 'Operations', path: '/store/operations' },
          { key: 'analytics', label: 'Analytics', path: '/store/analytics' },
          { key: 'returns-radar', label: 'Returns Radar', path: '/store/returns-radar' },
          { key: 'demand-forecasting', label: 'Demand Forecasting', path: '/store/demand-forecasting' },
          { key: 'simulator', label: 'Simulator', path: '/store/inventory-simulator' }
        ];
      case 'supplier':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/supplier/dashboard' },
          { key: 'orders', label: 'Orders', path: '/supplier/orders' },
          // { key: 'predictions', label: 'Predictions', path: '/supplier/predictions' },
          { key: 'inventory', label: 'Inventory', path: '/supplier/inventory' },
          { key: 'analytics', label: 'Analytics', path: '/supplier/analytics' },
          // { key: 'returns-radar', label: 'Returns Radar', path: '/supplier/returns-radar' },
          { key: 'demand-forecasting', label: 'Demand Forecasting', path: '/supplier/demand-forecasting' },
          { key: 'smart-drop-sync', label: 'SmartDropSync', path: '/supplier/smart-drop-sync' },
          // { key: 'simulator', label: 'Simulator', path: '/supplier/inventory-simulator' }
        ];
      case 'procurement':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/procurement/dashboard' },
          { key: 'vendors', label: 'Vendors', path: '/procurement/vendors' },
          { key: 'orders', label: 'Orders', path: '/procurement/orders' },
          { key: 'contracts', label: 'Contracts', path: '/procurement/contracts' },
          { key: 'supplymesh-ai', label: 'SupplyMesh AI', path: '/procurement/supplymesh-ai' },
          { key: 'demand-forecasting', label: 'Demand Forecasting', path: '/procurement/demand-forecasting' },
          { key: 'smart-drop-sync', label: 'SmartDropSync', path: '/procurement/smart-drop-sync' },
          { key: 'simulator', label: 'Simulator', path: '/procurement/inventory-simulator' }
        ];
      case 'regional':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/regional/dashboard' },
          { key: 'analytics', label: 'Analytics', path: '/regional/analytics' },
          { key: 'network', label: 'Network', path: '/regional/network' },
          { key: 'operations', label: 'Operations', path: '/regional/operations' },
          { key: 'supplymesh-ai', label: 'SupplyMesh AI', path: '/regional/supplymesh-ai' },
          { key: 'demand-forecasting', label: 'Demand Forecasting', path: '/regional/demand-forecasting' },
          { key: 'simulator', label: 'Simulator', path: '/regional/inventory-simulator' }
        ];
      case 'delivery':
        return [
          { key: 'dashboard', label: 'Dashboard', path: '/delivery/dashboard' },
          { key: 'routes', label: 'Route Planning', path: '/delivery/routes' },
          { key: 'fleet', label: 'Fleet Management', path: '/delivery/fleet' },
          { key: 'dropbot-ai', label: 'DropBot AI', path: '/delivery/dropbot-ai' },
          { key: 'loadswap', label: 'LoadSwap', path: '/delivery/loadswap' }
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
              <div className="flex flex-col justify-center">
                <span className="text-4xl font-bold text-blue-900 leading-none">
                  Walmart
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 text-center">
                  OptiChain Suite
                </span>
              </div>
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 19V20H3V19L5 17V11C5 7.9 7.03 5.17 10 4.29C10.38 4.61 10.89 4.8 11.5 4.9C11.66 4.94 11.82 4.97 12 5C12.18 4.97 12.34 4.94 12.5 4.9C13.11 4.8 13.62 4.61 14 4.29C16.97 5.17 19 7.9 19 11V17L21 19ZM12 22C13.11 22 14 21.11 14 20H10C10 21.11 10.89 22 12 22Z"/>
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
