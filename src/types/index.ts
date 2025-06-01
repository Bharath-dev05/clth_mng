export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  sku: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  images: string[];
  sizes: string[];
  colors: string[];
  material?: string;
  brand?: string;
  createdAt: string;
  updatedAt: string;
  supplier?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  loyaltyPoints?: number;
  totalPurchases: number;
  createdAt: string;
  lastPurchase?: string;
}

export interface Sale {
  id: string;
  products: SaleItem[];
  customerId?: string;
  customerName?: string;
  staffId: string;
  staffName: string;
  date: string;
  total: number;
  discount?: number;
  tax: number;
  subtotal: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
  status: 'completed' | 'returned' | 'cancelled';
}

export interface SaleItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  products?: string[];
  lastOrder?: string;
}

export interface DashboardSummary {
  dailySales: number;
  weeklySales: number;
  monthlySales: number;
  lowStockItems: number;
  topSellingProducts: {
    productId: string;
    name: string;
    quantity: number;
    amount: number;
  }[];
  recentSales: Sale[];
}