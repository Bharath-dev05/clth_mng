import React, { useState } from 'react';
import { Plus, Filter, Calendar, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import SaleForm from '../components/sales/SaleForm';

const SalesPage: React.FC = () => {
  const { sales, addSale, deleteSale } = useApp();
  const [isAddingSale, setIsAddingSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter sales based on search and status
  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      (sale.customerName && sale.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.staffName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' ? true : sale.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddSale = (saleData: Omit<Sale, 'id' | 'date'>) => {
    addSale(saleData);
    setIsAddingSale(false);
  };

  const handleDeleteSale = (id: string) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      deleteSale(id);
    }
  };

  const getTotalAmount = () => {
    return filteredSales.reduce((sum, sale) => sum + sale.total, 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'returned':
        return 'bg-warning-100 text-warning-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="animate-fade-in">
      {isAddingSale ? (
        <SaleForm 
          onSubmit={handleAddSale}
          onCancel={() => setIsAddingSale(false)}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Sales Management</h1>
              <p className="text-neutral-500">Manage your sales transactions</p>
            </div>
            
            <button
              onClick={() => setIsAddingSale(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Sale
            </button>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search sales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 w-full px-4 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="returned">Returned</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  className="pl-10 w-full px-4 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 appearance-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Sales Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-100 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary-50 rounded-md">
                <p className="text-sm text-primary-600 font-medium">Total Sales</p>
                <p className="text-2xl font-bold text-primary-800">{getTotalAmount()}</p>
              </div>
              
              <div className="p-4 bg-secondary-50 rounded-md">
                <p className="text-sm text-secondary-600 font-medium">Transaction Count</p>
                <p className="text-2xl font-bold text-secondary-800">{filteredSales.length}</p>
              </div>
              
              <div className="p-4 bg-accent-50 rounded-md">
                <p className="text-sm text-accent-600 font-medium">Average Sale Value</p>
                <p className="text-2xl font-bold text-accent-800">
                  {filteredSales.length > 0 ? 
                    (filteredSales.reduce((sum, sale) => sum + sale.total, 0) / filteredSales.length).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }) : 
                    '$0.00'
                  }
                </p>
              </div>
            </div>
          </div>
          
          {/* Sales Table */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Sale ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredSales.length > 0 ? (
                    filteredSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          #{sale.id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          {sale.customerName || 'Guest Customer'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          {format(new Date(sale.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          {sale.products.length} {sale.products.length === 1 ? 'item' : 'items'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          {sale.total.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sale.status)}`}>
                            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          <button 
                            className="text-primary-600 hover:text-primary-800 mr-3"
                            onClick={() => alert(`View details for sale #${sale.id.substring(0, 8)}`)}
                          >
                            View
                          </button>
                          <button 
                            className="text-error-600 hover:text-error-800"
                            onClick={() => handleDeleteSale(sale.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-sm text-neutral-500">
                        No sales found. Create your first sale by clicking "New Sale".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesPage;