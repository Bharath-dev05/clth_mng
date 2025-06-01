import React, { useState } from 'react';
import { Plus, Filter, Search, UserPlus, Phone, Mail, MapPin, ShoppingBag, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const CustomersPage: React.FC = () => {
  const { customers, deleteCustomer } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter customers based on search
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (customer.phone && customer.phone.includes(searchQuery))
  );

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Customer Management</h1>
          <p className="text-neutral-500">Manage your customer information</p>
        </div>
        
        <button
          onClick={() => alert('Add customer form would open here')}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Customer
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
            placeholder="Search customers..."
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
              className="pl-10 w-full px-4 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 appearance-none"
            >
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div 
              key={customer.id} 
              className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    {customer.name.charAt(0).toUpperCase()}
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900">{customer.name}</h3>
                      <p className="text-neutral-500 text-sm">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`Edit customer: ${customer.name}`)}
                      className="p-1.5 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="p-1.5 text-neutral-500 hover:text-error-600 hover:bg-error-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  {customer.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-neutral-400" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-neutral-400" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.address && (
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-neutral-400 mt-0.5" />
                      <span>{customer.address}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm">
                      <ShoppingBag className="h-4 w-4 mr-2 text-neutral-400" />
                      <span className="text-neutral-700">Total Purchases:</span>
                    </div>
                    <span className="font-medium">
                      {customer.totalPurchases.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </span>
                  </div>
                  
                  {customer.lastPurchase && (
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                        <span className="text-neutral-700">Last Purchase:</span>
                      </div>
                      <span className="text-sm">
                        {format(new Date(customer.lastPurchase), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  )}
                  
                  {customer.loyaltyPoints !== undefined && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 mr-2 text-neutral-400" />
                        <span className="text-neutral-700">Loyalty Points:</span>
                      </div>
                      <span className="font-medium text-accent-600">
                        {customer.loyaltyPoints} pts
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-neutral-200">
            <div className="bg-neutral-100 p-4 rounded-full mb-4">
              <UserPlus className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">No customers found</h3>
            <p className="text-neutral-500 text-center max-w-md">
              {searchQuery
                ? "Try adjusting your search criteria."
                : "You don't have any customers yet. Add your first customer to get started."}
            </p>
            {!searchQuery && (
              <button
                onClick={() => alert('Add customer form would open here')}
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Your First Customer
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Import for the icons used in the component
import { Edit, Trash2, Award } from 'lucide-react';

export default CustomersPage;