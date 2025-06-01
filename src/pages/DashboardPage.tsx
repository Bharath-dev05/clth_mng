import React, { useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  AlertTriangle,
  TrendingUp 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/dashboard/StatCard';
import RecentSalesTable from '../components/dashboard/RecentSalesTable';
import TopProductsChart from '../components/dashboard/TopProductsChart';

const DashboardPage: React.FC = () => {
  const { dashboardData, refreshDashboard } = useApp();

  useEffect(() => {
    refreshDashboard();
    // In a real app, we might set up an interval to refresh data periodically
  }, [refreshDashboard]);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500">Welcome to your cloth store management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Daily Sales" 
          value={dashboardData.dailySales}
          icon={<DollarSign className="h-6 w-6 text-primary-500" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard 
          title="Weekly Sales" 
          value={dashboardData.weeklySales}
          icon={<TrendingUp className="h-6 w-6 text-secondary-500" />}
          trend={{ value: 5.8, isPositive: true }}
        />
        <StatCard 
          title="Monthly Sales" 
          value={dashboardData.monthlySales}
          icon={<ShoppingBag className="h-6 w-6 text-accent-500" />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatCard 
          title="Low Stock Items" 
          value={dashboardData.lowStockItems}
          icon={<AlertTriangle className="h-6 w-6 text-warning-500" />}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Selling Products */}
        <TopProductsChart products={dashboardData.topSellingProducts} />
        
        {/* Recent Sales */}
        <RecentSalesTable sales={dashboardData.recentSales} />
      </div>
    </div>
  );
};

export default DashboardPage;