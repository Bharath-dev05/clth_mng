import React from 'react';
import { format } from 'date-fns';
import { Sale } from '../../types';

interface RecentSalesTableProps {
  sales: Sale[];
}

const RecentSalesTable: React.FC<RecentSalesTableProps> = ({ sales }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
      <div className="p-6 border-b border-neutral-100">
        <h3 className="text-lg font-medium text-neutral-900">Recent Sales</h3>
      </div>
      
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
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {sales.map((sale) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                  {sale.total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    sale.status === 'completed' 
                      ? 'bg-success-100 text-success-800' 
                      : sale.status === 'returned'
                      ? 'bg-warning-100 text-warning-800'
                      : 'bg-error-100 text-error-800'
                  }`}>
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSalesTable;