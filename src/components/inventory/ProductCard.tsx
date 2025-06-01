import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  // Determine stock status
  const getStockStatus = () => {
    if (product.stockQuantity <= 0) {
      return { label: 'Out of Stock', color: 'bg-error-100 text-error-800' };
    } else if (product.stockQuantity < 10) {
      return { label: 'Low Stock', color: 'bg-warning-100 text-warning-800' };
    } else {
      return { label: 'In Stock', color: 'bg-success-100 text-success-800' };
    }
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.images[0] || 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=500'} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
            {stockStatus.label}
          </span>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-neutral-500 mt-1">{product.category} &middot; {product.subcategory}</p>
          </div>
          <div className="text-lg font-semibold text-primary-600">
            ${product.price.toFixed(2)}
          </div>
        </div>
        
        <p className="mt-2 text-sm text-neutral-700 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-3 flex items-center gap-2">
          {product.colors.slice(0, 3).map((color, index) => (
            <span key={index} className="inline-block text-xs">{color}</span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-neutral-500">+{product.colors.length - 3} more</span>
          )}
        </div>
        
        <div className="mt-2 flex items-center gap-2">
          {product.sizes.slice(0, 4).map((size, index) => (
            <span 
              key={index}
              className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-md text-xs border border-neutral-200"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-xs text-neutral-500">+{product.sizes.length - 4} more</span>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
          <div>
            <p className="text-xs text-neutral-500">SKU: {product.sku}</p>
            <p className="text-sm mt-1">Stock: <span className="font-medium">{product.stockQuantity}</span></p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(product)}
              className="p-1.5 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(product.id)}
              className="p-1.5 text-neutral-500 hover:text-error-600 hover:bg-error-50 rounded-full transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;