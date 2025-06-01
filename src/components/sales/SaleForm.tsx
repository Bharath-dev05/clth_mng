import React, { useState } from 'react';
import { Plus, X, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Sale, SaleItem, Product, Customer } from '../../types';

interface SaleFormProps {
  onSubmit: (sale: Omit<Sale, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const SaleForm: React.FC<SaleFormProps> = ({ onSubmit, onCancel }) => {
  const { products, customers, currentUser } = useApp();
  const [selectedItems, setSelectedItems] = useState<SaleItem[]>([]);
  const [customerId, setCustomerId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'mobile'>('cash');
  const [discount, setDiscount] = useState<number>(0);

  // Calculations
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax - discount;

  const handleAddItem = () => {
    const emptyItem: SaleItem = {
      productId: '',
      productName: '',
      sku: '',
      quantity: 1,
      price: 0,
    };
    setSelectedItems([...selectedItems, emptyItem]);
  };

  const handleItemChange = (index: number, field: keyof SaleItem, value: string | number) => {
    const newItems = [...selectedItems];
    
    if (field === 'productId' && typeof value === 'string') {
      const selectedProduct = products.find(p => p.id === value) as Product;
      if (selectedProduct) {
        newItems[index] = {
          ...newItems[index],
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          sku: selectedProduct.sku,
          price: selectedProduct.price,
        };
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    
    setSelectedItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItems.length) {
      alert('Please add at least one item to the sale');
      return;
    }
    
    // Check if all required fields are filled
    if (selectedItems.some(item => !item.productId || !item.quantity)) {
      alert('Please fill in all required fields for sale items');
      return;
    }
    
    const selectedCustomer = customers.find(c => c.id === customerId);
    
    const sale: Omit<Sale, 'id' | 'date'> = {
      products: selectedItems,
      customerId: customerId || undefined,
      customerName: selectedCustomer?.name,
      staffId: currentUser?.id || '',
      staffName: currentUser?.name || '',
      total,
      discount: discount || undefined,
      tax,
      subtotal,
      paymentMethod,
      status: 'completed',
    };
    
    onSubmit(sale);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">New Sale</h2>
        <button
          onClick={onCancel}
          className="text-neutral-500 hover:text-neutral-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Customer Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Customer
          </label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">-- Guest Customer --</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Products */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-neutral-700">
              Products
            </label>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center text-xs text-primary-600 hover:text-primary-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </button>
          </div>
          
          {selectedItems.length === 0 ? (
            <div className="border border-dashed border-neutral-300 rounded-md p-6 flex flex-col items-center justify-center text-neutral-500">
              <ShoppingCart className="h-8 w-8 mb-2" />
              <p className="text-sm">No items added yet</p>
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 text-xs text-primary-600 hover:text-primary-800 font-medium"
              >
                Add your first item
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-md bg-neutral-50">
                  <div className="flex-1">
                    <select
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">-- Select Product --</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} (${product.price.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="w-20">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-full px-2 py-1 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div className="w-24 text-right font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-neutral-400 hover:text-error-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Payment Method
          </label>
          <div className="flex gap-3">
            {(['cash', 'card', 'mobile'] as const).map((method) => (
              <label key={method} className="flex items-center">
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-neutral-700 capitalize">
                  {method}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Discount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Discount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-500">$</span>
            </div>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
              className="pl-7 w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        {/* Summary */}
        <div className="mb-6 p-4 bg-neutral-50 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600">Tax (8%):</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2 text-error-600">
              <span>Discount:</span>
              <span className="font-medium">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-neutral-200 mt-2">
            <span className="font-medium text-neutral-900">Total:</span>
            <span className="font-bold text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={selectedItems.length === 0}
          >
            Complete Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;