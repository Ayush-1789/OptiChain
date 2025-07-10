import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageSimple from './components/LandingPageSimple';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import SupplierDashboard from './components/supplier/SupplierDashboard';
import OrderManagement from './components/supplier/OrderManagement';
import DemandPredictions from './components/supplier/DemandPredictions';
import InventoryManagement from './components/supplier/InventoryManagement';
import SupplierAnalytics from './components/supplier/SupplierAnalytics';
import StoreDashboard from './components/store/StoreDashboard';
import StoreInventory from './components/store/StoreInventory';
import StaffManagement from './components/store/StaffManagement';
import CustomerExperience from './components/store/CustomerExperience';
import StoreOperations from './components/store/StoreOperations';
import SalesAnalytics from './components/store/SalesAnalytics';
import InventorySimulator from './components/store/InventorySimulator';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import RoutePlanning from './components/delivery/RoutePlanning';
import FleetManagement from './components/delivery/FleetManagement';
import RegionalDashboard from './components/regional/RegionalDashboard';
import ProcurementDashboard from './components/procurement/ProcurementDashboard';
import VendorManagement from './components/procurement/VendorManagement';
import PurchaseOrders from './components/procurement/PurchaseOrders';
import ContractManagement from './components/procurement/ContractManagement';
import ReturnsRadar from './components/ai-features/ReturnsRadar';
import SupplyMeshAI from './components/ai-features/SupplyMeshAI';
import DemandForecastingAI from './components/ai-features/DemandForecastingAI';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPageSimple />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/orders" element={<OrderManagement />} />
          <Route path="/supplier/predictions" element={<DemandPredictions />} />
          <Route path="/supplier/inventory" element={<InventoryManagement />} />
          <Route path="/supplier/analytics" element={<SupplierAnalytics />} />
          <Route path="/store/dashboard" element={<StoreDashboard />} />
          <Route path="/store/inventory" element={<StoreInventory />} />
          <Route path="/store/staff" element={<StaffManagement />} />
          <Route path="/store/customer" element={<CustomerExperience />} />
          <Route path="/store/operations" element={<StoreOperations />} />
          <Route path="/store/analytics" element={<SalesAnalytics />} />
          <Route path="/store/inventory-simulator" element={<InventorySimulator />} />
          <Route path="/supplier/inventory-simulator" element={<InventorySimulator />} />
          <Route path="/procurement/inventory-simulator" element={<InventorySimulator />} />
          <Route path="/regional/inventory-simulator" element={<InventorySimulator />} />
          <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
          <Route path="/delivery/routes" element={<RoutePlanning />} />
          <Route path="/delivery/fleet" element={<FleetManagement />} />
          <Route path="/regional/dashboard" element={<RegionalDashboard />} />
          <Route path="/procurement/dashboard" element={<ProcurementDashboard />} />
          <Route path="/procurement/vendors" element={<VendorManagement />} />
          <Route path="/procurement/orders" element={<PurchaseOrders />} />
          <Route path="/procurement/contracts" element={<ContractManagement />} />
          <Route path="/store/returns-radar" element={<ReturnsRadar />} />
          <Route path="/supplier/returns-radar" element={<ReturnsRadar />} />
          <Route path="/procurement/supplymesh-ai" element={<SupplyMeshAI />} />
          <Route path="/regional/supplymesh-ai" element={<SupplyMeshAI />} />
          <Route path="/store/demand-forecasting" element={<DemandForecastingAI />} />
          <Route path="/supplier/demand-forecasting" element={<DemandForecastingAI />} />
          <Route path="/procurement/demand-forecasting" element={<DemandForecastingAI />} />
          <Route path="/regional/demand-forecasting" element={<DemandForecastingAI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
